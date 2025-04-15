// pages/api/generate-plan.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { LRUCache } from 'lru-cache';

const rateLimitCache = new LRUCache<string, number>({
  max: 1000,
  ttl: 60 * 1000 // 1 minute window
});

const requestSchema = z.object({
  age: z.number().int().positive(),
  weight: z.number().positive(),
  allergies: z.array(z.string().min(2)),
  preferences: z.array(z.string().min(2)),
  monthYear: z.string().regex(/^\d{4}-\d{2}$/)
});

const mealSchema = z.object({
  category: z.enum(['breakfast', 'lunch', 'dinner']),
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
    difficulty: z.enum(['easy', 'medium', 'hard']),
    steps: z.array(z.string().min(10))
  })
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Rate limiting
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const count = (rateLimitCache.get(ip as string) || 0) + 1;
  
  if (count > 5) {
    res.setHeader('X-RateLimit-Limit', '5');
    res.setHeader('X-RateLimit-Remaining', '0');
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  
  rateLimitCache.set(ip as string, count);
  res.setHeader('X-RateLimit-Limit', '5');
  res.setHeader('X-RateLimit-Remaining', `${5 - count}`);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate request body
    const body = requestSchema.parse(req.body);
    const { age, weight, allergies, preferences, monthYear } = body;

    // Construct strict prompt
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

    // Call DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{
          role: "user",
          content: prompt
        }],
        temperature: 0.3, // Lower temp for consistency
        response_format: { type: "json_object" }
      })
    });

    // Validate response format
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text.substring(0, 200));
      throw new Error('API returned non-JSON response');
    }

    const data = await response.json();
    
    // Strict validation
    if (!response.ok) {
      console.error('API Error:', data);
      throw new Error(data.error?.message || 'API request failed');
    }

    // Extract and clean JSON
    const rawJson = data.choices[0].message.content;
    const cleanJson = rawJson
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    // Parse and validate structure
    const parsed = JSON.parse(cleanJson);
    const validated = z.object({
      month_year: z.string(),
      weeks: z.array(
        z.object({
          week_number: z.number().int().positive(),
          days: z.array(
            z.object({
              day_name: z.string(),
              date: z.string().date(),
              meals: z.array(mealSchema)
            })
          )
        })
      )
    }).parse(parsed);

    // Add generation metadata
    const fullResponse = {
      ...validated,
      generated_at: new Date().toISOString(),
      user_metrics: { age, weight },
      dietary_constraints: { allergies, preferences }
    };

    return res.status(200).json(fullResponse);

  } catch (error) {
    console.error('Error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        error: 'Validation failed',
        issues: error.errors
      });
    }
    
    return res.status(500).json({
      error: 'Generation failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}