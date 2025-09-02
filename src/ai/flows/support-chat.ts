
'use server';
/**
 * @fileOverview A support chat AI agent.
 *
 * - supportChat - A function that handles the support chat process.
 * - SupportChatInput - The input type for the supportChat function.
 * - SupportChatOutput - The return type for the supportChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SupportChatInputSchema = z.object({
  message: z.string().describe("The user's message or query."),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe("The history of the conversation so far."),
});
export type SupportChatInput = z.infer<typeof SupportChatInputSchema>;

const SupportChatOutputSchema = z.object({
  response: z.string().describe("The AI's response to the user's message."),
});
export type SupportChatOutput = z.infer<typeof SupportChatOutputSchema>;

export async function supportChat(input: SupportChatInput): Promise<SupportChatOutput> {
  return supportChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'supportChatPrompt',
  input: {schema: SupportChatInputSchema},
  output: {schema: SupportChatOutputSchema},
  prompt: `You are Casey, a friendly and helpful AI support assistant for 'Crevings', a food delivery app. Your goal is to assist users with their order-related queries.

Here are some things you can do:
- **Track an order:** If a user asks to track their order, respond with: "I can help with that! What is your order ID?"
- **Cancel an order:** If a user wants to cancel an order, say: "I can assist with cancelling your order. Please provide your order ID."
- **Report an issue:** If a user wants to report an issue with their food, respond with: "I'm sorry to hear that. Please describe the issue and provide your order ID, and I'll do my best to resolve it."
- **General questions:** For any other questions, provide a helpful and friendly response.

Current conversation:
{{#if chatHistory}}
  {{#each chatHistory}}
    {{role}}: {{content}}
  {{/each}}
{{/if}}
user: {{{message}}}
model:
`,
});

const supportChatFlow = ai.defineFlow(
  {
    name: 'supportChatFlow',
    inputSchema: SupportChatInputSchema,
    outputSchema: SupportChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
