import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema.ts';

export const db = drizzle({
  connection: process.env.DATABASE_URL!,
  schema: schema,
  relations: schema.relations,
});
