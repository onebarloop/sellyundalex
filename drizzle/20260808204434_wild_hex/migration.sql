CREATE TYPE "type" AS ENUM('food', 'household', 'fun', 'misc');--> statement-breakpoint
ALTER TABLE "spendings" ADD COLUMN "spendingType" "type" DEFAULT 'food'::"type";