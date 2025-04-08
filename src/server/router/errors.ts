import { z } from "zod";
import { findErrorAndExplanation, getErrorList } from "../db/query";
import { procedure, router } from "../trpc";

const findDetailSchema = z.object({
  id: z.number(),
});

export const terminalErrorRouter = router({
  getList: procedure.query(async () => {
    const errors = await getErrorList();

    return errors.map((error) => ({
      type: "terminal_error",
      id: error.id,
      value: error.value,
      timestamp: error.createdAt,
    })) satisfies TerminalError[];
  }),

  findDetail: procedure.input(findDetailSchema).query(async (req) => {
    return await findErrorAndExplanation(req.input.id);
  }),
});
