import { createRouter, publicQuery } from "./middleware";
import { submissionsRouter } from "./routers/submissions";
import { healthRouter } from "./routers/health";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  submissions: submissionsRouter,
  health: healthRouter,
});

export type AppRouter = typeof appRouter;
