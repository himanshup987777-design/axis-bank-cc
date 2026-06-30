import type { Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import path from "path";

type App = Hono<{ Bindings: HttpBindings }>;

export function serveStaticFiles(app: App) {
  const distPath = path.resolve(import.meta.dirname, "../dist/public");

  // Serve static files, but SKIP all /api/* requests
  app.use("*", async (c, next) => {
    const url = c.req.url;
    if (url.includes("/api/")) {
      return next();
    }
    return serveStatic({ root: "./dist/public" })(c, next);
  });

  // SPA fallback for non-API routes
  app.notFound((c) => {
    const url = c.req.url;
    // Never serve index.html for API routes
    if (url.includes("/api/")) {
      return c.json({ error: "API endpoint not found" }, 404);
    }
    const accept = c.req.header("accept") ?? "";
    if (!accept.includes("text/html")) {
      return c.json({ error: "Not Found" }, 404);
    }
    const indexPath = path.resolve(distPath, "index.html");
    const content = fs.readFileSync(indexPath, "utf-8");
    return c.html(content);
  });
}
