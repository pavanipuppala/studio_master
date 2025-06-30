'use server';

/**
 * @fileOverview An AI agent that recommends crops and a suitable vertical farming method based on location.
 *
 * - recommendCrop - A function that handles the crop recommendation process.
 * - RecommendCropInput - The input type for the recommendCrop function.
 * - RecommendCropOutput - The return type for the recommendCrop function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendCropInputSchema = z.object({
  city: z.string().describe('The city where the farm is located.'),
  state: z.string().describe('The state where the farm is located.'),
  excludeCrops: z.array(z.string()).optional().describe('A list of crop names to exclude from the recommendation.'),
  forceCropName: z.string().optional().describe('If provided, generate a recommendation for this specific crop instead of finding a new one.')
});
export type RecommendCropInput = z.infer<typeof RecommendCropInputSchema>;

const RecommendCropOutputSchema = z.object({
  cropName: z.string().describe('The name of the recommended crop.'),
  reason: z.string().describe('A detailed explanation for the recommendation.'),
  predictedFarmType: z.string().describe('The most suitable vertical farming method (e.g., "Hydroponics", "Aeroponics") for the location.'),
});
export type RecommendCropOutput = z.infer<typeof RecommendCropOutputSchema>;

export async function recommendCrop(
  input: RecommendCropInput
): Promise<RecommendCropOutput> {
  return recommendCropFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendCropPrompt',
  input: {schema: RecommendCropInputSchema},
  output: {schema: RecommendCropOutputSchema},
  prompt: `You are an agricultural expert and creative consultant for vertical farming startups in India.

{{#if forceCropName}}
Your goal is to provide a detailed justification for growing '{{{forceCropName}}}' in the specified location, along with the most suitable vertical farming method.
For the output, set 'cropName' to '{{{forceCropName}}}'.
Provide a new 'reason' and 'predictedFarmType' based on the analysis for '{{{forceCropName}}}'.
{{else}}
Your goal is to provide unique and profitable crop recommendations tailored to a specific location. Avoid common choices like spinach or lettuce unless they are exceptionally well-suited for the given location.

{{#if excludeCrops}}
Please do not recommend any of the following crops: {{#each excludeCrops}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}. Find a suitable alternative.
{{/if}}

Based on the location provided, recommend a single, highly suitable crop to grow and the most appropriate vertical farming method (e.g., Hydroponics, Aeroponics, Aquaponics).
{{/if}}

Your recommendation must be based on a detailed analysis of:
1.  **Local Climate**: The general climate of the region.
2.  **Market Demand**: What crops have high local market value or are popular in local cuisine?
3.  **Resource Availability**: Consider factors like water and electricity that might favor one farming technique over another.
4.  **Profitability**: Suggest a crop that could be profitable for a small-scale urban farm.

Location: {{{city}}}, {{{state}}}, India

Provide a clear, concise reason for your crop recommendation that explicitly references the factors above.
The output 'predictedFarmType' field should contain the name of the single recommended farming method.`,
});

const recommendCropFlow = ai.defineFlow(
  {
    name: 'recommendCropFlow',
    inputSchema: RecommendCropInputSchema,
    outputSchema: RecommendCropOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
