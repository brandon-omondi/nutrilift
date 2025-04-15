'use client';
import { useState } from 'react';
import { z } from 'zod';

// Zod schema matching API response
const MealPlanSchema = z.object({
  month_year: z.string(),
  weeks: z.array(
    z.object({
      week_number: z.number(),
      days: z.array(
        z.object({
          day_name: z.string(),
          date: z.string(),
          meals: z.array(
            z.object({
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
                difficulty: z.string(),
                steps: z.array(z.string())
              })
            })
          )
        })
      )
    })
  )
});

type MealPlan = z.infer<typeof MealPlanSchema>;

export default function MealPlanner() {
  const [formState, setFormState] = useState({
    age: 30,
    weight: 70,
    allergies: [''],
    preferences: ['vegetarian'],
    monthYear: '2025-04'
  });
  const [plan, setPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formState,
          allergies: formState.allergies.filter(a => a.trim()),
          preferences: formState.preferences.filter(p => p.trim())
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate plan');
      }

      const data = await response.json();
      const validated = MealPlanSchema.parse(data);
      setPlan(validated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Age</label>
            <input
              type="number"
              value={formState.age}
              onChange={e => setFormState({...formState, age: Number(e.target.value)})}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Weight (kg)</label>
            <input
              type="number"
              value={formState.weight}
              onChange={e => setFormState({...formState, weight: Number(e.target.value)})}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Allergies (comma separated)</label>
          <input
            type="text"
            value={formState.allergies.join(', ')}
            onChange={e => setFormState({
              ...formState,
              allergies: e.target.value.split(',').map(a => a.trim())
            })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Preferences (comma separated)</label>
          <input
            type="text"
            value={formState.preferences.join(', ')}
            onChange={e => setFormState({
              ...formState,
              preferences: e.target.value.split(',').map(p => p.trim())
            })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Target Month</label>
          <input
            type="month"
            value={formState.monthYear}
            onChange={e => setFormState({...formState, monthYear: e.target.value})}
            className="p-2 border rounded"
            min="2024-01"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border-red-400 text-red-700 p-4 mb-4 rounded">
          {error}
        </div>
      )}

      {plan && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Meal Plan for {plan.month_year}
          </h2>
          
          {plan.weeks.map(week => (
            <div key={week.week_number} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Week {week.week_number}</h3>
              
              <div className="space-y-6">
                {week.days.map(day => (
                  <div key={day.date} className="border rounded p-4">
                    <div className="flex justify-between mb-4">
                      <h4 className="font-medium">{day.day_name}</h4>
                      <span className="text-gray-600">{day.date}</span>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      {day.meals.map(meal => (
                        <div key={meal.name} className="bg-gray-50 rounded p-4">
                          <div className="mb-2">
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                              {meal.category}
                            </span>
                          </div>
                          
                          <h5 className="font-medium mb-2">{meal.name}</h5>
                          
                          <div className="mb-3">
                            <p className="text-sm font-semibold">Nutrition per serving:</p>
                            <div className="grid grid-cols-2 gap-1 text-sm">
                              <span>Calories: {meal.nutrition.calories}kcal</span>
                              <span>Protein: {meal.nutrition.protein}g</span>
                              <span>Carbs: {meal.nutrition.carbs}g</span>
                              <span>Fats: {meal.nutrition.fats}g</span>
                            </div>
                          </div>
                          
                          <details className="mb-2">
                            <summary className="cursor-pointer text-blue-600">
                              View Recipe
                            </summary>
                            <div className="mt-2 text-sm">
                              <p className="font-medium">Preparation:</p>
                              <p>Prep: {meal.recipe.prep_time} • Cook: {meal.recipe.cook_time}</p>
                              <p className="mt-2">Steps:</p>
                              <ol className="list-decimal list-inside">
                                {meal.recipe.steps.map((step, i) => (
                                  <li key={i} className="mb-1">{step}</li>
                                ))}
                              </ol>
                            </div>
                          </details>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}