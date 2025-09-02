
'use server';

/**
 * @fileOverview A personal food sommelier AI agent that recommends food items from nearby restaurants.
 *
 * - getFoodRecommendations - A function that provides food recommendations based on user's mood and preferences.
 * - FoodSommelierInput - The input type for the getFoodRecommendations function.
 * - FoodSommelierOutput - The return type for the getFoodRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { restaurants } from '@/lib/mock-data';

// Simplified restaurant and menu structure to pass to the AI
const restaurantMenuData = restaurants.map(r => ({
    id: r.id,
    name: r.name,
    cuisine: r.cuisine,
    rating: r.rating,
    deliveryTime: r.deliveryTime,
    priceForTwo: r.priceForTwo,
}));

const FoodSommelierInputSchema = z.object({
  mood: z.string().describe("The user's mood, feeling, or craving. e.g., 'feeling lazy but craving something spicy'"),
  timeOfDay: z.string().describe("The current time of day. e.g., '8 PM'"),
  location: z.string().describe("The user's current location or city. e.g., 'Bangalore'"),
  dietaryPreferences: z.string().optional().describe("Any dietary preferences or restrictions. e.g., 'Vegetarian'"),
  mealType: z.string().describe("The type of meal the user is looking for. e.g., 'breakfast', 'lunch', 'dinner', 'snack'"),
  restaurantContext: z.string().describe("A JSON string of available restaurants and their menus to consider for recommendations."),
});
export type FoodSommelierInput = z.infer<typeof FoodSommelierInputSchema>;

const FoodSommelierOutputSchema = z.object({
  greeting: z.string().describe("A friendly greeting or playful comment acknowledging the user’s mood."),
  recommendations: z.array(z.object({
    dishName: z.string().describe("The name of the recommended dish."),
    restaurantId: z.string().describe("The ID of the restaurant offering the dish."),
    restaurantName: z.string().describe("The name of the restaurant."),
    description: z.string().describe("A short, witty description for the option (flavor profile, why it suits the mood, or uniqueness)."),
    price: z.number().describe("The price of the dish."),
    isVeg: z.boolean().describe("Whether the dish is vegetarian or not."),
    rating: z.number().describe("The rating of the restaurant."),
    deliveryTime: z.number().describe("The estimated delivery time in minutes."),
    image: z.string().url().describe("A placeholder image URL for the dish."),
  })).describe("3-5 personalized dish recommendations from the provided restaurant list."),
  closing: z.string().describe("An encouraging or playful call-to-action."),
});
export type FoodSommelierOutput = z.infer<typeof FoodSommelierOutputSchema>;


export async function getFoodRecommendations(input: Omit<FoodSommelierInput, 'restaurantContext'>): Promise<FoodSommelierOutput> {
  const restaurantContext = JSON.stringify(restaurantMenuData);
  return foodSommelierFlow({...input, restaurantContext});
}

const prompt = ai.definePrompt({
  name: 'foodSommelierPrompt',
  input: {schema: FoodSommelierInputSchema},
  output: {schema: FoodSommelierOutputSchema},
  prompt: `You are a personal food sommelier for Crevings, a food discovery app. Your goal is to recommend specific dishes from a list of nearby restaurants based on the user's mood, cravings, or abstract feelings. Make your responses fun, helpful, and human-like.

User inputs:
- Mood / Feeling / Craving: {{{mood}}}
- Time of day: {{{timeOfDay}}}
- Location / City: {{{location}}}
- Dietary preferences / Restrictions: {{#if dietaryPreferences}}{{{dietaryPreferences}}}{{else}}None{{/if}}
- Meal type: {{{mealType}}}

Available Restaurants (JSON format):
{{{restaurantContext}}}

Instructions for responses:
1.  **Analyze User Input & Restaurant Data**: Carefully consider the user's mood, preferences, and the provided restaurant data.
2.  **Select Specific Dishes**: From the provided restaurants, recommend 3-5 specific dishes that perfectly match the user's request.
3.  **Structure the Output**: Format your response according to the output schema. For each recommendation, provide:
    dishName: A suitable dish name. You can be creative if a menu isn't detailed (e.g., 'Spicy Chicken Wings' from a Pizza place).
    restaurantId: The exact ID from the provided restaurant data.
    restaurantName: The exact name of the restaurant from the data.
    description: A short, witty, and compelling reason why this dish is a great choice for the user's mood.
    price: A realistic price for the dish, considering the restaurant's price for two.
    isVeg: Set to true if the dish is vegetarian. Infer this based on dietary preferences and dish name.
    rating: The restaurant's rating.
    deliveryTime: The restaurant's delivery time.
    image: A placeholder image URL: "https://placehold.co/600x400.png".
4.  **Tone and Personality**:
    - Start with a friendly greeting acknowledging the user's mood.
    - End with an encouraging or playful call-to-action.
    - Keep the tone human, witty, and relatable.
`,
});

const foodSommelierFlow = ai.defineFlow(
  {
    name: 'foodSommelierFlow',
    inputSchema: FoodSommelierInputSchema,
    outputSchema: FoodSommelierOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
