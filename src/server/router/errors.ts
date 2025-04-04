import { z } from "zod";
import { findErrorAndExplanation } from "../db/query";
import { procedure, router } from "../trpc";

const findDetailSchema = z.object({
  id: z.number(),
});

export const terminalErrorRouter = router({
  findDetail: procedure.input(findDetailSchema).query(async (req) => {
    return await findErrorAndExplanation(req.input.id);
  }),
});
