'use server';
/**
 * @fileOverview An AI agent that generates a personalized cleaning plan based on user input.
 *
 * - generateCustomCleaningPlan - A function that handles the personalized cleaning plan generation process.
 * - GenerateCustomCleaningPlanInput - The input type for the generateCustomCleaningPlan function.
 * - GenerateCustomCleaningPlanOutput - The return type for the generateCustomCleaningPlan function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCustomCleaningPlanInputSchema = z.object({
  numBedrooms: z.number().int().min(0).describe('Number of bedrooms in the home.'),
  numBathrooms: z.number().int().min(0).describe('Number of bathrooms in the home.'),
  squareFootage: z.number().int().min(0).optional().describe('Approximate square footage of the home.'),
  cleaningFrequency: z.enum(['one-time', 'weekly', 'bi-weekly', 'monthly']).describe('Desired cleaning frequency.'),
  cleaningIntensity: z.enum(['standard', 'deep-clean']).describe('Desired cleaning intensity.'),
  focusAreas: z.array(z.string()).optional().describe('Specific areas user wants to focus on (e.g., "kitchen", "master bathroom").'),
  areasToAvoid: z.array(z.string()).optional().describe('Specific areas user wants to avoid cleaning (e.g., "guest bedroom", "office").'),
  additionalNotes: z.string().optional().describe('Any additional notes or specific instructions from the user.'),
});
export type GenerateCustomCleaningPlanInput = z.infer<typeof GenerateCustomCleaningPlanInputSchema>;

const GenerateCustomCleaningPlanOutputSchema = z.object({
  suggestedPlanSummary: z.string().describe('A summary of the personalized cleaning plan, explaining the recommended services based on inputs.'),
  detailedChecklist: z.array(z.string()).describe('A detailed list of specific cleaning tasks included in the personalized plan, selected from the 49-Point Checklist.'),
});
export type GenerateCustomCleaningPlanOutput = z.infer<typeof GenerateCustomCleaningPlanOutputSchema>;

// The 49-Point Checklist - provided to the LLM as knowledge base
const fortyNinePointChecklist = `
Sparkle Pro's 49-Point Checklist - A Detailed Cleaning Guide:

**Kitchen (12 Points):**
1.  Clean and sanitize sink
2.  Scrub and shine faucet
3.  Wipe down and sanitize countertops
4.  Clean and polish exterior of microwave
5.  Clean microwave interior
6.  Clean and polish exterior of refrigerator
7.  Clean and polish exterior of oven/stove
8.  Wipe down stovetop and burners
9.  Wipe down cabinet and drawer fronts
10. Dust light fixtures and ceiling fan
11. Wipe down baseboards and window sills
12. Vacuum and mop floor

**Bathrooms (13 Points):**
1.  Clean and sanitize toilet (inside and out)
2.  Scrub and sanitize shower/tub walls
3.  Clean shower door/curtain
4.  Scrub and sanitize shower/tub floor
5.  Clean and sanitize sink and vanity top
6.  Scrub and shine faucet
7.  Clean mirrors
8.  Shine chrome fixtures
9.  Wipe down cabinet and drawer fronts
10. Dust light fixtures and ceiling fan
11. Wipe down baseboards and window sills
12. Empty trash and replace liner
13. Vacuum and mop floor

**Bedrooms (12 Points):**
1.  Dust all accessible surfaces (dressers, nightstands, shelves)
2.  Wipe down furniture exteriors
3.  Dust picture frames and decor
4.  Dust ceiling fans and light fixtures
5.  Wipe down baseboards
6.  Clean interior and exterior of windows (accessible)
7.  Clean mirrors
8.  Make beds (if clean linens are provided)
9.  Empty trash and replace liner
10. Vacuum all carpeted areas
11. Mop hard floors (if applicable)
12. General tidying (straighten items)

**Living Areas / Common Areas (12 Points):**
1.  Dust all accessible surfaces (coffee tables, end tables, entertainment centers)
2.  Wipe down furniture exteriors
3.  Dust picture frames and decor
4.  Dust ceiling fans and light fixtures
5.  Wipe down baseboards
6.  Clean interior and exterior of windows (accessible)
7.  Clean glass table tops
8.  Tidy up (straighten pillows, arrange magazines, organize remotes)
9.  Empty trash and replace liner
10. Vacuum all carpeted areas
11. Mop hard floors (if applicable)
12. Wipe down light switches and door handles
`;

const prompt = ai.definePrompt({
  name: 'generateCustomCleaningPlanPrompt',
  input: { schema: GenerateCustomCleaningPlanInputSchema },
  output: { schema: GenerateCustomCleaningPlanOutputSchema },
  prompt: `
YouHackathon are an expert cleaning service agent for Sparkle Pro, dedicated to providing personalized cleaning plans.
Your goal is to create a tailored cleaning plan and checklist for a customer based on their home details and preferences, utilizing Sparkle Pro's comprehensive 49-Point Checklist.

The customer's home details and preferences are as follows:
- Number of Bedrooms: {{{numBedrooms}}}
- Number of Bathrooms: {{{numBathrooms}}}
{{#if squareFootage}}- Approximate Square Footage: {{{squareFootage}}}{{/if}}
- Desired Cleaning Frequency: {{{cleaningFrequency}}}
- Desired Cleaning Intensity: {{{cleaningIntensity}}}
{{#if focusAreas}}
- Areas to Focus On: {{#each focusAreas}} "{{{this}}}" {{/each}}
{{/if}}
{{#if areasToAvoid}}
- Areas to Avoid: {{#each areasToAvoid}} "{{{this}}}" {{/each}}
{{/if}}
{{#if additionalNotes}}
- Additional Notes: "{{{additionalNotes}}}"
{{/if}}

Based on the provided information, generate a "suggestedPlanSummary" and a "detailedChecklist".

**Important Guidelines:**
1.  **Personalization:** Tailor the plan specifically to the user's input.
2.  **49-Point Checklist Integration:** Select relevant items from the "Sparkle Pro's 49-Point Checklist" provided below to form the "detailedChecklist". Do not invent new tasks; stick to the provided list.
3.  **Cleaning Intensity:**
    *   For "standard" cleaning, select a thorough but general set of tasks.
    *   For "deep-clean", include all relevant tasks from the checklist, focusing on thoroughness and hard-to-reach areas.
4.  **Focus/Avoid Areas:** Incorporate or omit tasks based on "focusAreas" and "areasToAvoid". If a "focusArea" is mentioned, ensure comprehensive tasks for that area are included. If an "areaToAvoid" is mentioned, explicitly state that area will not be cleaned and omit relevant tasks.
5.  **Summary:** The "suggestedPlanSummary" should be a concise paragraph explaining what the plan covers, referencing the home's size, cleaning frequency, and intensity.
6.  **Formatting:** The "detailedChecklist" should be an array of strings, where each string is a specific task.

Here is Sparkle Pro's 49-Point Checklist:
${fortyNinePointChecklist}
`,
});

const generateCustomCleaningPlanFlow = ai.defineFlow(
  {
    name: 'generateCustomCleaningPlanFlow',
    inputSchema: GenerateCustomCleaningPlanInputSchema,
    outputSchema: GenerateCustomCleaningPlanOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

export async function generateCustomCleaningPlan(input: GenerateCustomCleaningPlanInput): Promise<GenerateCustomCleaningPlanOutput> {
  return generateCustomCleaningPlanFlow(input);
}
