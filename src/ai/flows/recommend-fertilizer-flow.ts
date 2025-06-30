
'use server';
/**
 * @fileOverview An AI agent that recommends fertilizer based on soil and crop data.
 *
 * - recommendFertilizer - A function that handles the fertilizer recommendation process.
 * - RecommendFertilizerInput - The input type for the recommendFertilizer function.
 * - RecommendFertilizerOutput - The return type for the recommendFertilizer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendFertilizerInputSchema = z.object({
  temperature: z.number().describe('The current temperature in degrees Celsius.'),
  humidity: z.number().describe('The current humidity as a percentage.'),
  moisture: z.number().describe('The current soil moisture content as a percentage.'),
  soilType: z.string().describe('The type of soil (e.g., "Sandy", "Loamy", "Clayey", "Red", "Black").'),
  cropType: z.string().describe('The type of crop being grown (e.g., "Rice", "Maize", "Cotton").'),
  nitrogen: z.number().describe('The amount of Nitrogen in the soil (kg/ha).'),
  phosphorous: z.number().describe('The amount of Phosphorous in the soil (kg/ha).'),
  potassium: z.number().describe('The amount of Potassium in the soil (kg/ha).'),
});
export type RecommendFertilizerInput = z.infer<typeof RecommendFertilizerInputSchema>;

const RecommendFertilizerOutputSchema = z.object({
  fertilizerName: z.string().describe('The name of the recommended fertilizer (e.g., "Urea", "DAP", "10-26-26").'),
  reasoning: z.string().describe('A detailed, one-paragraph explanation for why this fertilizer is recommended based on the inputs.'),
});
export type RecommendFertilizerOutput = z.infer<typeof RecommendFertilizerOutputSchema>;

export async function recommendFertilizer(
  input: RecommendFertilizerInput
): Promise<RecommendFertilizerOutput> {
  return recommendFertilizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendFertilizerPrompt',
  input: {schema: RecommendFertilizerInputSchema},
  output: {schema: RecommendFertilizerOutputSchema},
  prompt: `You are an expert agricultural scientist specializing in soil health and crop nutrition in India.

Based on the provided environmental and soil data, recommend the most suitable fertilizer.

Context:
- Crop Type: {{{cropType}}}
- Soil Type: {{{soilType}}}
- Temperature: {{{temperature}}}°C
- Humidity: {{{humidity}}}%
- Soil Moisture: {{{moisture}}}%
- Nitrogen (N): {{{nitrogen}}} kg/ha
- Phosphorous (P): {{{phosphorous}}} kg/ha
- Potassium (K): {{{potassium}}} kg/ha

Your task is to:
1.  Analyze the provided data to determine nutrient deficiencies or imbalances for the specified crop.
2.  Recommend a single, appropriate fertilizer by name (e.g., "Urea", "DAP", "14-35-14", "28-28-0").
3.  Provide a clear, one-paragraph reasoning for your recommendation, explaining how the fertilizer addresses the specific needs of the crop in the given conditions.

Return only the structured JSON data.`,
});

const recommendFertilizerFlow = ai.defineFlow(
  {
    name: 'recommendFertilizerFlow',
    inputSchema: RecommendFertilizerInputSchema,
    outputSchema: RecommendFertilizerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
