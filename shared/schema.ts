import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

// === JOBS TABLE ===
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  status: text("status").notNull().default("pending"), 
  progress: integer("progress").notNull().default(0),
  currentStep: text("current_step").notNull().default("Initializing"),
  logs: text("logs").notNull().default("[]"),
  resultUrl: text("result_url"),
  imageUrl: text("image_url"),
  error: text("error"),
  createdAt: timestamp("created_at").defaultNow(),
});

export * from "./models/chat";

// === SCHEMA FOR PARSED ADN ===
export const adnFileSchema = z.object({
  name: z.string(),
  content: z.string(),
});

export type ADNFile = z.infer<typeof adnFileSchema>;

// === API CONTRACT TYPES ===
export type Job = typeof jobs.$inferSelect;
// Manual definition instead of drizzle-zod to avoid build errors
export type InsertJob = {
  status?: string;
  progress?: number;
  currentStep?: string;
  logs?: string;
  resultUrl?: string | null;
  error?: string | null;
};

export type CreateJobRequest = {
  files: ADNFile[]; 
};

export type JobStatusResponse = Job;
