import { integer, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const sepdings = pgTable('spendings', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
