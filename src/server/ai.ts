import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { type LanguageModelV1, generateObject } from "ai";
import { z } from "zod";
import { getApiKeys, getSettings } from "./db/query";

export async function generateExplanation(terminalError: string) {
  const model = await createModel();

  const res = await generateObject({
    model: model,
    schema: z.object({
      explanation: z.string(),
      solution: z.string(),
    }),
    prompt: `Explain the following terminal error and provide a solution:\n\n${terminalError}`,
  });

  return res.object;
}

async function createModel() {
  const settings = await getSettings();
  const keys = await getApiKeys();

  let model: LanguageModelV1;
  switch (settings.provider) {
    case "openai": {
      if (!keys.openai) {
        throw new Error("OpenAI API key is not set");
      }
      const openai = createOpenAI({
        apiKey: keys.openai,
      });
      model = openai("o3-mini-2025-01-31");
      break;
    }
    case "anthropic": {
      if (!keys.anthropic) {
        throw new Error("Anthropic API key is not set");
      }
      const anthropic = createAnthropic({
        apiKey: keys.anthropic,
      });
      model = anthropic("claude-3-7-sonnet-20250219");
      break;
    }
    case "google": {
      if (!keys.google) {
        throw new Error("Google API key is not set");
      }
      const google = createGoogleGenerativeAI({
        apiKey: keys.google,
      });
      model = google("gemini-2.5-pro-exp-03-25");
      break;
    }
    default:
      throw new Error("No provider found");
  }

  return model;
}
