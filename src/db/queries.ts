import 'server-only';

import { db } from '@/src/db/db';
import { sum, and, gte, lte } from 'drizzle-orm';
import { spendings } from '@/src/db/schema';

const getTotalAmountByDate = async (start: Date, end: Date) => {
  const [{ total }] = await db
    .select({
      total: sum(spendings.amount).mapWith(Number),
    })
    .from(spendings)
    .where(and(gte(spendings.createdAt, start), lte(spendings.createdAt, end)));

  return total;
};

export { getTotalAmountByDate };
