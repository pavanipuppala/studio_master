'use server';
/**
 * @fileOverview An AI agent that provides ideal growing conditions for a specific crop.
 *
 * - getIdealConditions - A function that gets ideal crop conditions.
 * - IdealConditionsInput - The input type for the getIdealConditions function.
 * - IdealConditionsOutput - The return type for the getIdealConditions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdealConditionsInputSchema = z.object({
  cropName: z.string().describe('The name of the crop.'),
});
export type IdealConditionsInput = z.infer<typeof IdealConditionsInputSchema>;

const IdealConditionsOutputSchema = z.object({
  temperatureRange: z.string().describe('The ideal temperature range for the crop in Celsius (e.g., "18°C - 24°C").'),
  humidityRange: z.string().describe('The ideal relative humidity range as a percentage (e.g., "60% - 75%").'),
  lightInfo: z.string().describe('Information about light requirements, like DLI (Daily Light Integral) or photoperiod (e.g., "14-16 hours of light per day").'),
  description: z.string().describe('A brief, one-paragraph summary of the ideal growing environment for this crop.'),
});
export type IdealConditionsOutput = z.infer<typeof IdealConditionsOutputSchema>;

export async function getIdealConditions(
  input: IdealConditionsInput
): Promise<IdealConditionsOutput> {
  return getIdealConditionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getIdealConditionsPrompt',
  input: {schema: IdealConditionsInputSchema},
  output: {schema: IdealConditionsOutputSchema},
  prompt: `You are an agricultural expert specializing in vertical farming. For the given crop, provide the ideal environmental conditions for growing it indoors.

Crop: {{{cropName}}}

Provide the optimal temperature range in Celsius, the ideal relative humidity range, and information about its light requirements (e.g., daily hours of light or DLI). Also, provide a short, one-paragraph summary describing the perfect environment for this crop.

Return only the structured data.`,
});

const getIdealConditionsFlow = ai.defineFlow(
  {
    name: 'getIdealConditionsFlow',
    inputSchema: IdealConditionsInputSchema,
    outputSchema: IdealConditionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
