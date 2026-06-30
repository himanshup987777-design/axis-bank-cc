import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { sql } from "drizzle-orm";

export const healthRouter = createRouter({
  check: publicQuery.query(async () => {
    const checks: Record<string, any> = {};

    checks.app_id = process.env.APP_ID ? "SET" : "MISSING";
    checks.app_secret = process.env.APP_SECRET ? "SET" : "MISSING";
    checks.database_url = process.env.DATABASE_URL ? "SET" : "MISSING";
    checks.node_env = process.env.NODE_ENV || "not set";

    try {
      const db = getDb();
      const result = await db.execute(sql`SELECT NOW()`);
      checks.database = "CONNECTED";
    } catch (e: any) {
      checks.database = "FAILED";
      checks.db_error = e.message;
    }

    return checks;
  }),
});
