import { eq } from "drizzle-orm";
import { db } from "./connection";
import { apiKeys, errorExplanations, terminalErrors } from "./schema";

export async function getApiKeys() {
  const keys = await db
    .select()
    .from(apiKeys)
    .limit(1)
    .then((rows) => rows.at(0));

  return {
    openai: keys?.openai || null,
    anthropic: keys?.anthropic || null,
    google: keys?.google || null,
  };
}

export async function insertExplanation(
  errorId: number,
  explanation: string,
  solution: string,
) {
  await db.insert(errorExplanations).values({ errorId, explanation, solution });
}

export async function findErrorAndExplanation(id: number) {
  const errors = await db
    .select()
    .from(terminalErrors)
    .innerJoin(
      errorExplanations,
      eq(errorExplanations.errorId, terminalErrors.id),
    )
    .where(eq(terminalErrors.id, id))
    .then((rows) => rows.at(0));
  if (!errors) return null;

  return {
    id: errors.terminal_errors.id,
    value: errors.terminal_errors.value,
    explanation: errors.error_explanations.explanation,
    solution: errors.error_explanations.solution,
    timestamp: errors.terminal_errors.createdAt,
  };
}
