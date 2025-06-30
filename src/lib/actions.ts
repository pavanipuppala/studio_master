
'use server';

import { optimizeCropYield, type OptimizeCropYieldOutput } from '@/ai/flows/optimize-crop-yield';
import { recommendCrop, type RecommendCropOutput } from '@/ai/flows/recommend-crop-flow';
import { getCityClimate as getCityClimateFlow, type GetCityClimateOutput } from '@/ai/flows/get-city-climate-flow';
import { generateAlerts as generateAlertsFlow, type GenerateAlertsOutput } from '@/ai/flows/generate-alerts-flow';
import { recommendFertilizer, type RecommendFertilizerOutput } from '@/ai/flows/recommend-fertilizer-flow';
import { AiOptimizerSchema, CropRecommendationSchema, CityClimateSchema, GenerateAlertsInputSchema, FertilizerRecommenderSchema } from './schemas';

export async function getAiOptimization(
    formData: unknown
): Promise<{ data?: OptimizeCropYieldOutput; error?: string }> {
  const validatedFields = AiOptimizerSchema.safeParse(formData);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { error: 'Invalid input.' };
  }

  try {
    const result = await optimizeCropYield(validatedFields.data);
    return { data: result };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `Failed to get optimization suggestions: ${errorMessage}` };
  }
}

export async function getRecommendedCrop(
    locationData: unknown
): Promise<{ data?: RecommendCropOutput; error?: string }> {
    const validatedFields = CropRecommendationSchema.safeParse(locationData);

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);
        return { error: 'Invalid location data.' };
    }

    try {
        const result = await recommendCrop(validatedFields.data);
        return { data: result };
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        return { error: `Failed to get crop recommendation: ${errorMessage}` };
    }
}

export async function getCityClimate(
    locationData: unknown
): Promise<{ data?: GetCityClimateOutput; error?: string }> {
    const validatedFields = CityClimateSchema.safeParse(locationData);

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);
        return { error: 'Invalid location data.' };
    }

    try {
        const result = await getCityClimateFlow(validatedFields.data);
        return { data: result };
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        return { error: `Failed to get city climate: ${errorMessage}` };
    }
}

export async function getGeneratedAlerts(
    inputData: unknown
): Promise<{ data?: GenerateAlertsOutput; error?: string }> {
    const validatedFields = GenerateAlertsInputSchema.safeParse(inputData);

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);
        return { error: 'Invalid input data.' };
    }

    try {
        const result = await generateAlertsFlow(validatedFields.data);
        return { data: result };
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        return { error: `Failed to generate alerts: ${errorMessage}` };
    }
}

export async function getFertilizerRecommendation(
    formData: unknown
): Promise<{ data?: RecommendFertilizerOutput; error?: string }> {
    const validatedFields = FertilizerRecommenderSchema.safeParse(formData);

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);
        return { error: 'Invalid input.' };
    }

    try {
        const result = await recommendFertilizer(validatedFields.data);
        return { data: result };
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        return { error: `Failed to get fertilizer recommendation: ${errorMessage}` };
    }
}
