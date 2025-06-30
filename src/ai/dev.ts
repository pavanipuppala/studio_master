
import { config } from 'dotenv';
config();

import '@/ai/flows/optimize-crop-yield.ts';
import '@/ai/flows/recommend-crop-flow.ts';
import '@/ai/flows/get-city-climate-flow.ts';
import '@/ai/flows/generate-alerts-flow.ts';
import '@/ai/flows/recommend-fertilizer-flow.ts';
