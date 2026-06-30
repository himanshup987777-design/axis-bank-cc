import { createRouter, publicQuery } from "./middleware";
import { submissionsRouter } from "./routers/submissions";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  submissions: submissionsRouter,
});

export type AppRouter = typeof appRouter;
