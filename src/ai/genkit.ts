import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { anthropic } from 'genkitx-anthropic';

const plugins = [googleAI()];
if (process.env.ANTHROPIC_API_KEY) {
  plugins.push(
    anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
  );
}

export const ai = genkit({
  plugins,
  model: 'googleai/gemini-2.5-flash',
});

