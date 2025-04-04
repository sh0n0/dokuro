import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { getApiKeys } from "./db/query";

export async function generateExplanation(terminalError: string) {
  const keys = await getApiKeys();
  if (!keys.openai) {
    throw new Error("OpenAI API key is not set");
  }

  const openai = createOpenAI({
    apiKey: keys.openai,
  });

  const res = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: z.object({
      explanation: z.string(),
      solution: z.string(),
    }),
    prompt: `Explain the following terminal error and provide a solution:\n\n${terminalError}`,
  });

  return res.object;
}
