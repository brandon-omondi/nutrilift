import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { z } from 'zod';
import { LRUCache } from 'lru-cache';

// Configure rate limiting
const rateLimitCache = new LRUCache<string, number>({
  max: 1000,
  ttl: 60 * 1000 // 1 minute
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Zod validation schema
const MealSchema = z.object({
  category: z.enum(['breakfast', 'lunch', 'dinner']),
  name: z.string(),
  ingredients: z.array(z.string()),
  nutrition: z.object({
    calories: z.number(),
    protein: z.number(),
    carbs: z.number(),
    fats: z.number()
  }),
  recipe: z.object({
    prep_time: z.string(),
    cook_time: z.string(),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    steps: z.array(z.string())
  })
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Rate limiting
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const limit = 5; // Requests per minute
  const count = (rateLimitCache.get(ip as string) || 0) + 1;
  
  if (count > limit) {
    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', 0);
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  rateLimitCache.set(ip as string, count);
  res.setHeader('X-RateLimit-Limit', limit);
  res.setHeader('X-RateLimit-Remaining', limit - count);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { age, weight, allergies, preferences, monthYear } = req.body;

    const prompt = `
    Generate a complete monthly meal plan for ${monthYear} in this EXACT JSON format:
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
    - Include detailed recipes with timing
    - Provide complete nutrition data including fats
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: prompt
      }],
      temperature: 0.7,
    });

    const rawData = completion.choices[0].message.content;
    const cleanedData = rawData?.replace(/```json/g, '').replace(/```/g, '') || '{}';
    const parsedData = JSON.parse(cleanedData);

    // Validate response
    const WeekSchema = z.object({
      week_number: z.number(),
      days: z.array(
        z.object({
          day_name: z.string(),
          date: z.string(),
          meals: z.array(MealSchema)
        })
      )
    });

    const FullPlanSchema = z.object({
      month_year: z.string(),
      weeks: z.array(WeekSchema)
    });

    const validatedData = FullPlanSchema.parse(parsedData);

    const fullPlan = {
      ...validatedData,
      generated_at: new Date().toISOString(),
      user_data: { age, weight, allergies, preferences }
    };

    res.status(200).json(fullPlan);

  } catch (error) {
    console.error('API Error:', error);
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        error: 'Validation failed',
        details: error.errors
      });
    }
    res.status(500).json({
      error: 'Failed to generate meal plan',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}