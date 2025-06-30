// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview An AI agent that optimizes crop yield based on sensor data.
 *
 * - optimizeCropYield - A function that handles the crop yield optimization process.
 * - OptimizeCropYieldInput - The input type for the optimizeCropYield function.
 * - OptimizeCropYieldOutput - The return type for the optimizeCropYield function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeCropYieldInputSchema = z.object({
  temperature: z
    .number()
    .describe('The current temperature in degrees Celsius.'),
  humidity: z.number().describe('The current humidity as a percentage.'),
  lightLevel: z
    .number()
    .describe('The current light level in Lux.'),
  cropType: z.string().describe('The type of crop being grown.'),
});
export type OptimizeCropYieldInput = z.infer<typeof OptimizeCropYieldInputSchema>;

const OptimizeCropYieldOutputSchema = z.object({
  temperatureAdjustment: z
    .string()
    .describe('Recommended temperature adjustment.'),
  humidityAdjustment: z.string().describe('Recommended humidity adjustment.'),
  lightLevelAdjustment: z
    .string()
    .describe('Recommended light level adjustment.'),
  summary: z.string().describe('Summary of why these adjustments are needed'),
});
export type OptimizeCropYieldOutput = z.infer<typeof OptimizeCropYieldOutputSchema>;

export async function optimizeCropYield(
  input: OptimizeCropYieldInput
): Promise<OptimizeCropYieldOutput> {
  return optimizeCropYieldFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeCropYieldPrompt',
  input: {schema: OptimizeCropYieldInputSchema},
  output: {schema: OptimizeCropYieldOutputSchema},
  prompt: `You are an expert agricultural consultant specializing in urban vertical farming.

You are advising a farmer on how to optimize their crop yield.

Based on the following sensor data, recommend adjustments to the temperature, humidity, and light levels to optimize the yield for the specified crop.

Crop Type: {{{cropType}}}
Current Temperature: {{{temperature}}}°C
Current Humidity: {{{humidity}}}%
Current Light Level: {{{lightLevel}}} Lux

Give a short summary of the reason you are making this recommendation.

Consider the following:
* Optimal growing conditions for the crop type.
* Potential issues based on current conditions.
* Actions to take to correct these issues.

Temperature Adjustment: {{temperatureAdjustment}}
Humidity Adjustment: {{humidityAdjustment}}
Light Level Adjustment: {{lightLevelAdjustment}}
Summary: {{summary}}`,
});

const optimizeCropYieldFlow = ai.defineFlow(
  {
    name: 'optimizeCropYieldFlow',
    inputSchema: OptimizeCropYieldInputSchema,
    outputSchema: OptimizeCropYieldOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
