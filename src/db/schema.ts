import { integer, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { defineRelations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const spendings = pgTable('spendings', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  amount: integer().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  spenderId: integer('spender_id').notNull(),
});

export const relations = defineRelations({ users, spendings }, (r) => ({
  spendings: {
    spender: r.one.users({
      from: r.spendings.spenderId,
      to: r.users.id,
    }),
  },
}));

export type Spending = typeof spendings.$inferSelect;
