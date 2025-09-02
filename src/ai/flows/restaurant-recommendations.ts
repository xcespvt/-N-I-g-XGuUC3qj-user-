
'use server';

/**
 * @fileOverview Provides restaurant recommendations based on user history and preferences.
 *
 * - getRestaurantRecommendations - A function that takes user order history and preferences and returns restaurant recommendations.
 * - RestaurantRecommendationsInput - The input type for the getRestaurantRecommendations function.
 * - RestaurantRecommendationsOutput - The return type for the getRestaurantRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RestaurantRecommendationInputSchema = z.object({
  orderHistory: z.string().describe('A stringified JSON array containing the user order history, including restaurant names, cuisine types, and order dates.'),
  cuisinePreference: z.string().describe('The user preferred cuisine types.'),
  dietaryRestrictions: z.string().optional().describe('Any dietary restrictions the user may have, such as vegetarian, vegan, or gluten-free.'),
});
export type RestaurantRecommendationsInput = z.infer<typeof RestaurantRecommendationInputSchema>;

const RestaurantRecommendationOutputSchema = z.object({
  restaurants: z.array(z.string()).describe('An array of recommended restaurant names.'),
  reasoning: z.string().describe('Explanation of why these restaurants were recommended based on user preferences and order history.'),
});
export type RestaurantRecommendationsOutput = z.infer<typeof RestaurantRecommendationOutputSchema>;

export async function getRestaurantRecommendations(input: RestaurantRecommendationsInput): Promise<RestaurantRecommendationsOutput> {
  return restaurantRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'restaurantRecommendationsPrompt',
  input: {schema: RestaurantRecommendationInputSchema},
  output: {schema: RestaurantRecommendationOutputSchema},
  prompt: `You are a restaurant recommendation expert. Based on the user's order history and preferences, provide a list of restaurants they might enjoy.

Order History: {{{orderHistory}}}
Cuisine Preference: {{{cuisinePreference}}}
Dietary Restrictions: {{{dietaryRestrictions}}}

Consider the user's order history, cuisine preferences, and any dietary restrictions. Explain your reasoning for the recommendations.
`, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const restaurantRecommendationsFlow = ai.defineFlow(
  {
    name: 'restaurantRecommendationsFlow',
    inputSchema: RestaurantRecommendationInputSchema,
    outputSchema: RestaurantRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
