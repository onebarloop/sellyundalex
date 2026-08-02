import 'server-only';

import { db } from '@/src/db/db';
import { sum, sql, desc, and, gte, lte } from 'drizzle-orm';
import { spendings } from '@/src/db/schema';

const getTotalAmountByDate = async () => {
  const total = await db
    .select({
      month: sql<string>`DATE_TRUNC('month', ${spendings.createdAt})::date`,
      total: sum(spendings.amount).mapWith(Number),
    })
    .from(spendings)
    .groupBy(sql`DATE_TRUNC('month', ${spendings.createdAt})`)
    .orderBy(desc(sql`DATE_TRUNC('month', ${spendings.createdAt})`));

  return total;
};

type TotalAmountByDate = Awaited<ReturnType<typeof getTotalAmountByDate>>;

export { getTotalAmountByDate };

export type { TotalAmountByDate };
