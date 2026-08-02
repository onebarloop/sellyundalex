ALTER TABLE "spendings" ALTER COLUMN "spending_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "spendings" ALTER COLUMN "spending_date" SET NOT NULL;