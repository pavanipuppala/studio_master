'use server';
/**
 * @fileOverview An AI agent that provides climate data for a given city.
 *
 * - getCityClimate - A function that gets climate data.
 * - GetCityClimateInput - The input type for the getCityClimate function.
 * - GetCityClimateOutput - The return type for the getCityClimate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetCityClimateInputSchema = z.object({
  city: z.string().describe('The city in India.'),
  state: z.string().describe('The state in India.'),
});
export type GetCityClimateInput = z.infer<typeof GetCityClimateInputSchema>;

const GetCityClimateOutputSchema = z.object({
  averageTemp: z.number().describe('The typical average temperature in Celsius.'),
  averageHumidity: z.number().describe('The typical average humidity as a percentage.'),
  climateDescription: z.string().describe('A brief, one-sentence description of the city\'s climate (e.g., "Hot and humid tropical climate.").'),
});
export type GetCityClimateOutput = z.infer<typeof GetCityClimateOutputSchema>;

export async function getCityClimate(
  input: GetCityClimateInput
): Promise<GetCityClimateOutput> {
  return getCityClimateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getCityClimatePrompt',
  input: {schema: GetCityClimateInputSchema},
  output: {schema: GetCityClimateOutputSchema},
  prompt: `You are a climatologist. For the given city and state in India, provide the typical average annual temperature in Celsius, the typical average annual humidity percentage, and a one-sentence description of the climate.

City: {{{city}}}
State: {{{state}}}

Return only the structured data.`,
});

const getCityClimateFlow = ai.defineFlow(
  {
    name: 'getCityClimateFlow',
    inputSchema: GetCityClimateInputSchema,
    outputSchema: GetCityClimateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
