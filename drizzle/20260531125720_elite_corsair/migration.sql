ALTER TABLE "spendings" RENAME COLUMN "owner_id" TO "amount";--> statement-breakpoint
ALTER TABLE "spendings" ADD COLUMN "spender_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "spendings" ALTER COLUMN "amount" SET DEFAULT 0;