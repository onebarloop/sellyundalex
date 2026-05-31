import { drizzle } from 'drizzle-orm/node-postgres';
import { defineRelations } from 'drizzle-orm';
import * as schema from './schema';

export const db = drizzle({
  connection: process.env.DATABASE_URL!,
  schema: schema,
  relations: defineRelations(schema, () => ({})),
});
