import chickenImage from '@/public/chicken.jpeg';
import { StaticImageData } from 'next/image';

export interface User {
  id: string;
  email: string
  age: number;
  weight: number;
  allergies: string[];
  preferences: string[];
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Recipe {
  prep_time: string;
  cook_time: string;
  difficulty: string;
  steps: string[];
}

export interface Meal {
  category: string;
  name: string;
  ingredients: string[];
  nutrition: Nutrition;
  recipe: Recipe;
  image: string | StaticImageData;
}

export interface Day {
  day_name: string;
  date: string;
  meals: Meal[];
}

export interface Week {
  week_number: number;
  days: Day[];
}

export interface MealPlan {
  id: string;
  user_id: string;
  month_year: string;
  generated_at: string;
  weeks: Week[];
}

export interface MealData {
  users: User[];
  meal_plans: MealPlan[];
}

const mockMealData: MealData = {
  users: [
    {
      id: "user-001",
      email: "r@gmail.com",
      age: 28,
      weight: 72.5,
      allergies: ["dairy", "shellfish"],
      preferences: ["vegetarian", "low-carb"],
    },
  ],
  meal_plans: [
    {
      id: "monthly-plan-001",
      user_id: "user-001",
      month_year: "April-2025",
      generated_at: "2024-02-20T09:00:00Z",
      weeks: [
        {
          week_number: 1,
          days: [
            {
              day_name: "Monday",
              date: "2025-04-01",
              meals: [
                {
                  category: "breakfast",
                  name: "Spinach Omelette",
                  ingredients: ["eggs", "spinach", "cherry tomatoes", "feta cheese"],
                  nutrition: {
                    calories: 320,
                    protein: 22,
                    carbs: 8,
                    fats: 18,
                  },
                  recipe: {
                    prep_time: "10 mins",
                    cook_time: "15 mins",
                    difficulty: "easy",
                    steps: [
                      "Whisk 3 eggs in a bowl",
                      "Sauté spinach and tomatoes",
                      "Pour eggs over vegetables",
                      "Add feta and cook until set",
                    ],
                  },
                  image: chickenImage,
                },
                {
                  category: "lunch",
                  name: "Quinoa Bowl",
                  ingredients: ["quinoa", "chickpeas", "avocado", "kale"],
                  nutrition: {
                    calories: 450,
                    protein: 18,
                    carbs: 35,
                    fats: 22,
                  },
                  recipe: {
                    prep_time: "15 mins",
                    cook_time: "20 mins",
                    difficulty: "medium",
                    steps: [
                      "Cook quinoa according to package",
                      "Roast chickpeas with spices",
                      "Assemble bowl with fresh veggies",
                      "Add lemon-tahini dressing",
                    ],
                  },
                  image: chickenImage,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default mockMealData;