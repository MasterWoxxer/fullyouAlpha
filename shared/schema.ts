import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Team Assessment model
export const teamAssessments = pgTable("team_assessments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  energy: integer("energy").notNull(),
  autonomy: integer("autonomy").notNull(),
  hope: integer("hope").notNull(),
  clarity: integer("clarity").notNull(),
  safety: integer("safety").notNull(),
  lastVacation: integer("last_vacation").notNull(),
  lastSelfCare: integer("last_self_care").notNull(),
  journal: text("journal"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTeamAssessmentSchema = createInsertSchema(teamAssessments).omit({
  id: true, 
  createdAt: true
});

// Time Distribution model
export const timeDistributions = pgTable("time_distributions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  sleep: integer("sleep").notNull(),
  work: integer("work").notNull(),
  family: integer("family").notNull(),
  fitness: integer("fitness").notNull(),
  meals: integer("meals").notNull(),
  friends: integer("friends").notNull(),
  optimalSleep: integer("optimal_sleep").notNull(),
  optimalWork: integer("optimal_work").notNull(),
  optimalFamily: integer("optimal_family").notNull(),
  optimalFitness: integer("optimal_fitness").notNull(),
  optimalMeals: integer("optimal_meals").notNull(),
  optimalFriends: integer("optimal_friends").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTimeDistributionSchema = createInsertSchema(timeDistributions).omit({
  id: true,
  createdAt: true
});

// Workflow model
export const workflows = pgTable("workflows", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  isTestingEnabled: boolean("is_testing_enabled").notNull().default(false),
  versionATraffic: integer("version_a_traffic").notNull().default(50),
  versionBTraffic: integer("version_b_traffic").notNull().default(50),
  primaryMetric: text("primary_metric").notNull().default("Customer Satisfaction"),
  testDuration: text("test_duration").notNull().default("7 days"),
  nodes: json("nodes").notNull(),
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertWorkflowSchema = createInsertSchema(workflows).omit({
  id: true,
  createdAt: true
});

// Customer model
export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  brandPerception: integer("brand_perception").notNull().default(50),
  purchaseConsideration: integer("purchase_consideration").notNull().default(50),
  loyalty: integer("loyalty").notNull().default(50),
  satisfaction: integer("satisfaction").notNull().default(50),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCustomerSchema = createInsertSchema(customers).omit({
  id: true,
  createdAt: true
});

// Customer Interactions model
export const customerInteractions = pgTable("customer_interactions", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(),
  metadata: json("metadata"),
  date: timestamp("date").notNull().defaultNow(),
});

export const insertCustomerInteractionSchema = createInsertSchema(customerInteractions).omit({
  id: true
});

// Define export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type TeamAssessment = typeof teamAssessments.$inferSelect;
export type InsertTeamAssessment = z.infer<typeof insertTeamAssessmentSchema>;

export type TimeDistribution = typeof timeDistributions.$inferSelect;
export type InsertTimeDistribution = z.infer<typeof insertTimeDistributionSchema>;

export type Workflow = typeof workflows.$inferSelect;
export type InsertWorkflow = z.infer<typeof insertWorkflowSchema>;

export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;

export type CustomerInteraction = typeof customerInteractions.$inferSelect;
export type InsertCustomerInteraction = z.infer<typeof insertCustomerInteractionSchema>;
