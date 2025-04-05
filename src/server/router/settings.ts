import { z } from "zod";
import {
  getApiKeys,
  getSettings,
  upsertApiKeys,
  upsertSettings,
} from "../db/query";
import { procedure, router } from "../trpc";

const settingsSchema = z.object({
  apiKeys: z.object({
    openai: z.string().nullable(),
    anthropic: z.string().nullable(),
    google: z.string().nullable(),
  }),
  provider: z.enum(["openai", "anthropic", "google"]),
});

export const settingsRouter = router({
  getSettings: procedure.query(async () => {
    const apiKeys = await getApiKeys();
    const settings = await getSettings();

    return {
      openai: apiKeys?.openai || null,
      anthropic: apiKeys?.anthropic || null,
      google: apiKeys?.google || null,
      provider: settings?.provider || "openai",
    };
  }),

  upsertSettings: procedure.input(settingsSchema).mutation(async (req) => {
    const { openai, anthropic, google } = req.input.apiKeys;
    const provider = req.input.provider;

    await upsertApiKeys(openai, anthropic, google);
    await upsertSettings(provider);
  }),
});
