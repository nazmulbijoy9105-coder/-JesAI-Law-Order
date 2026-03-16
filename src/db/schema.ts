import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  image: text("image"),
  emailVerified: integer("email_verified", { mode: "timestamp" }),
  googleId: text("google_id"),
  role: text("role", { enum: ["user", "admin"] }).default("user").notNull(),
  phone: text("phone"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const services = sqliteTable("services", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  titleBn: text("title_bn").notNull(),
  description: text("description").notNull(),
  descriptionBn: text("description_bn").notNull(),
  category: text("category").notNull(),
  price: real("price").default(0),
  isFree: integer("is_free", { mode: "boolean" }).default(true),
  isPopular: integer("is_popular", { mode: "boolean" }).default(false),
  icon: text("icon").default("Scale"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const subscriptions = sqliteTable("subscriptions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull(),
  serviceId: integer("service_id").references(() => services.id).notNull(),
  status: text("status", { enum: ["pending", "paid", "expired", "cancelled"] }).default("pending"),
  paymentMethod: text("payment_method", { enum: ["bkash", "nagad", "card", "free"] }),
  transactionId: text("transaction_id"),
  amount: real("amount").default(0),
  startedAt: integer("started_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  expiresAt: integer("expires_at", { mode: "timestamp" }),
});

export const queries = sqliteTable("queries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  sessionId: text("session_id"),
  question: text("question").notNull(),
  answer: text("answer"),
  isPremium: integer("is_premium", { mode: "boolean" }).default(false),
  serviceId: integer("service_id").references(() => services.id),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const payments = sqliteTable("payments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull(),
  subscriptionId: integer("subscription_id").references(() => subscriptions.id),
  amount: real("amount").notNull(),
  method: text("method", { enum: ["bkash", "nagad", "card"] }).notNull(),
  transactionId: text("transaction_id").notNull(),
  status: text("status", { enum: ["pending", "verified", "rejected"] }).default("pending"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  verifiedAt: integer("verified_at", { mode: "timestamp" }),
  verifiedBy: integer("verified_by").references(() => users.id),
});
