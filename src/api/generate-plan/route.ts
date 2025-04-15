import { NextResponse } from "next/server";
import { z } from "zod";
import { LRUCache } from "lru-cache";

// Create a simple in-memory rate limiting cache.
const rateLimitCache = new LRUCache<string, number>({
  max: 1000,
  ttl: 60 * 1000 // 1 minute
});

// Schema for validating the request body.
const requestSchema = z.object({
  age: z.number().int().positive(),
  weight: z.number().positive(),
  allergies: z.array(z.string().min(2)),
  preferences: z.array(z.string().min(2)),
  monthYear: z.string().regex(/^\d{4}-\d{2}$/)
});




























// Schema for validating each meal.
const mealSchema = z.object({
  category: z.enum(["breakfast", "lunch", "dinner"]),
  name: z.string().min(3),
  ingredients: z.array(z.string().min(2)),
  nutrition: z.object({
    calories: z.number().positive(),
    protein: z.number().positive(),
    carbs: z.number().positive(),
    fats: z.number().positive()
  }),
  recipe: z.object({
    prep_time: z.string().regex(/^\d+ mins$/),
    cook_time: z.string().regex(/^\d+ mins$/),
    difficulty: z.enum(["easy", "medium", "hard"]),
    steps: z.array(z.string().min(10))
  })
});

export async function POST(request: Request) {
  // Rate limiting: use the x-forwarded-for header if available.
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  const count = (rateLimitCache.get(ip) || 0) + 1;
  if (count > 5) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": "0"
        }
      }
    );
  }
  rateLimitCache.set(ip, count);

  try {
    // Parse and validate the request body.
    const body = await request.json();
    const { age, weight, allergies, preferences, monthYear } = requestSchema.parse(body);

    // Construct the prompt with strict JSON instructions.
    const prompt = `
      Generate a complete monthly meal plan for ${monthYear} in STRICT JSON FORMAT.
      Follow these rules absolutely:
      1. Respond ONLY with valid JSON, no other text
      2. Use exactly this structure:
      {
        "month_year": "${monthYear}",
        "weeks": [
          {
            "week_number": 1,
            "days": [
              {
                "day_name": "Monday",
                "date": "YYYY-MM-DD",
                "meals": [
                  {
                    "category": "breakfast",
                    "name": "Meal Name",
                    "ingredients": ["item1", "item2"],
                    "nutrition": {
                      "calories": number,
                      "protein": number,
                      "carbs": number,
                      "fats": number
                    },
                    "recipe": {
                      "prep_time": "X mins",
                      "cook_time": "Y mins",
                      "difficulty": "easy/medium/hard",
                      "steps": ["step1", "step2"]
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
      
      User Requirements:
      - Age: ${age}
      - Weight: ${weight} kg
      - Allergies: ${allergies.join(', ')}
      - Preferences: ${preferences.join(', ')}
      
      Strict Rules:
      1. Validate JSON syntax before responding
      2. Escape special characters
      3. No markdown formatting
      4. Include all 4 weeks
      5. 3 meals per day (breakfast, lunch, dinner)
      6. Valid dates for ${monthYear}
      7. No allergens in ingredients
      8. Complete nutrition data including fats
    `;

    // Call the external DeepSeek API.
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
      })
    });

    // Ensure the response is JSON.
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response:", text.substring(0, 200));
      throw new Error("API returned non-JSON response");
    }
    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data);
      throw new Error(data.error?.message || "API request failed");
    }

    // Clean the returned JSON (remove markdown formatting if any).
    const rawJson = data.choices[0].message.content;
    const cleanJson = rawJson.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanJson);

    // Validate the structure of the meal plan.
    const validated = z.object({
      month_year: z.string(),
      weeks: z.array(
        z.object({
          week_number: z.number().int().positive(),
          days: z.array(
            z.object({
              day_name: z.string(),
              date: z.string(),
              meals: z.array(mealSchema)
            })
          )
        })
      )
    }).parse(parsed);

    const fullResponse = {
      ...validated,
      generated_at: new Date().toISOString(),
      user_metrics: { age, weight },
      dietary_constraints: { allergies, preferences }
    };

    return NextResponse.json(fullResponse, {
      status: 200,
      headers: {
        "X-RateLimit-Limit": "5",
        "X-RateLimit-Remaining": `${5 - count}`
      }
    });
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.errors },
        { status: 422 }
      );
    }
    return NextResponse.json(
      {
        error: "Generation failed",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}