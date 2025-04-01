import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/connection";
import { apiKeys } from "../db/schema";
import { procedure, router } from "../trpc";

const settingsSchema = z.object({
  apiKeys: z.object({
    openai: z.string().nullable(),
    anthropic: z.string().nullable(),
    google: z.string().nullable(),
  }),
});

export const settingsRouter = router({
  getSettings: procedure.query(async () => {
    const settings = await db
      .select()
      .from(apiKeys)
      .where(eq(apiKeys.id, 1))
      .then((rows) => rows.at(0));

    return (
      settings || {
        openai: null,
        anthropic: null,
        google: null,
      }
    );
  }),

  upsertSettings: procedure.input(settingsSchema).mutation(async (req) => {
    const { openai, anthropic, google } = req.input.apiKeys;
    await db
      .insert(apiKeys)
      .values({ id: 1, openai, anthropic, google })
      .onConflictDoUpdate({
        target: [apiKeys.id],
        set: {
          openai,
          anthropic,
          google,
        },
      });
  }),
});
