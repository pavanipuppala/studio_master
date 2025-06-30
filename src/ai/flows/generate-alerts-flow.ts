'use server';
/**
 * @fileOverview An AI agent that generates realistic system alerts for a vertical farm.
 *
 * - generateAlerts - A function that generates a list of alerts.
 * - GenerateAlertsInput - The input type for the generateAlerts function.
 * - GenerateAlertsOutput - The return type for the generateAlerts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AlertSchema = z.object({
  id: z.string().describe('A short, unique identifier for the alert (e.g., "alert-001").'),
  severity: z.enum(['Critical', 'Warning', 'Info']).describe('The severity of the alert.'),
  type: z.enum(['Temperature', 'Moisture', 'Nutrients', 'Light', 'Hardware', 'Power']).describe('The category of the alert.'),
  component: z.string().describe('The farm component that the alert originates from (e.g., "Tray 2", "Rack 1 - Pump", "Zone B Sensor").'),
  message: z.string().describe('A concise, descriptive message about the alert.'),
  timestamp: z.string().describe('A relative timestamp for when the alert occurred (e.g., "5m ago", "2h ago").'),
  status: z.enum(['Active', 'Resolved']).describe('The current status of the alert.'),
  suggestion: z.string().describe('A brief, actionable suggestion on how to resolve the alert.'),
});

const GenerateAlertsInputSchema = z.object({
  city: z.string().describe('The city where the farm is located.'),
  state: z.string().describe('The state where the farm is located.'),
  cropName: z.string().describe('The primary crop being grown.'),
  farmType: z.string().describe('The type of vertical farm (e.g., "Hydroponics").'),
});
export type GenerateAlertsInput = z.infer<typeof GenerateAlertsInputSchema>;

const GenerateAlertsOutputSchema = z.object({
  alerts: z.array(AlertSchema).describe('A list of 5 to 10 generated alerts.'),
});
export type GenerateAlertsOutput = z.infer<typeof GenerateAlertsOutputSchema>;

export async function generateAlerts(
  input: GenerateAlertsInput
): Promise<GenerateAlertsOutput> {
  return generateAlertsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAlertsPrompt',
  input: {schema: GenerateAlertsInputSchema},
  output: {schema: GenerateAlertsOutputSchema},
  prompt: `You are a vertical farm monitoring system. Based on the provided farm context, generate a list of 5 to 10 realistic system alerts.

Farm Location: '{{{city}}}, {{{state}}}'
Primary Crop: '{{{cropName}}}'
Farm Type: '{{{farmType}}}'

Instructions:
1.  Generate a unique ID for each alert.
2.  Assign a 'type' from the available categories.
3.  Assign a 'severity' ('Critical', 'Warning', 'Info'). Critical alerts are for immediate, system-threatening issues.
4.  Write a clear, concise 'message'.
5.  Provide a realistic 'component' name where the alert originates.
6.  Set a recent, relative 'timestamp'.
7.  Provide a helpful, actionable 'suggestion' for resolving the alert.
8.  Make most alerts 'Active', but include one or two 'Resolved' alerts for realism.

Example Alerts:
- Temperature: "High temperature detected in Tray 2: 38°C"
- Moisture: "Soil moisture low in Rack 1 – Water pump not triggered."
- Nutrients: "Nutrient tank nearing empty – 10% remaining."
- Light: "LED lights not functioning in Tower 4"
- Hardware: "Humidity sensor failure in Zone B"
- Power: "Backup battery at 20% – Please charge."

Return only the structured JSON data.`,
});

const generateAlertsFlow = ai.defineFlow(
  {
    name: 'generateAlertsFlow',
    inputSchema: GenerateAlertsInputSchema,
    outputSchema: GenerateAlertsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

    