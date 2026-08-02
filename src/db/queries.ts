import 'server-only';

import { db } from '@/src/db/db';
import { sum, sql, desc } from 'drizzle-orm';
import { spendings } from '@/src/db/schema';

const getTotalAmountByDate = async () => {
  const total = await db
    .select({
      month: sql<string>`DATE_TRUNC('month', ${spendings.spendingDate})::date`,
      total: sum(spendings.amount).mapWith(Number),
    })
    .from(spendings)
    .groupBy(sql`DATE_TRUNC('month', ${spendings.spendingDate})`)
    .orderBy(desc(sql`DATE_TRUNC('month', ${spendings.spendingDate})`));

  return total;
};

type TotalAmountByDate = Awaited<ReturnType<typeof getTotalAmountByDate>>;

export { getTotalAmountByDate };

export type { TotalAmountByDate };
