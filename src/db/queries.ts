import 'server-only';

import { db } from '@/src/db/db';
import { sum, sql, desc, eq } from 'drizzle-orm';
import { spendings, users } from '@/src/db/schema';

const spendingsWithSpender = async () =>
  await db.query.spendings.findMany({
    with: {
      spender: true,
    },
    orderBy: {
      spendingDate: 'desc',
    },
  });

type SpendingWithSpender = Awaited<ReturnType<typeof spendingsWithSpender>>;

const totalsPerMonth = async () => {
  const total = await db
    .select({
      month: sql<string>`DATE_TRUNC('month', ${spendings.spendingDate})::date`,
      total: sum(spendings.amount).mapWith(Number),
    })
    .from(spendings)
    .groupBy(sql<string>`DATE_TRUNC('month', ${spendings.spendingDate})`)
    .orderBy(desc(sql`DATE_TRUNC('month', ${spendings.spendingDate})`));

  return total;
};

type TotalsPerMonth = Awaited<ReturnType<typeof totalsPerMonth>>;

const usersPerMonth = async () =>
  await db
    .select({
      month: sql<string>`DATE_TRUNC('month', ${spendings.spendingDate})::date`,
      userId: users.id,
      userName: users.name,
      total: sum(spendings.amount).mapWith(Number),
    })
    .from(spendings)
    .leftJoin(users, eq(spendings.spenderId, users.id))
    .groupBy(
      sql<string>`DATE_TRUNC('month', ${spendings.spendingDate})`,
      users.id,
      users.name,
    )
    .orderBy(desc(sql`DATE_TRUNC('month', ${spendings.spendingDate})`));

type UsersPerMonth = Awaited<ReturnType<typeof usersPerMonth>>;

const totalsAndUsersPerMonth = async () => {
  const [totals, users] = await Promise.all([
    totalsPerMonth(),
    usersPerMonth(),
  ]);
  return totals.map((m) => ({
    month: m.month,
    total: Number(m.total),
    users: users
      .filter((u) => String(u.month) === String(m.month))
      .map((u) => ({
        id: u.userId,
        name: u.userName,
        total: Number(u.total),
      })),
  }));
};

type TotalsAndUsersPerMonth = Awaited<
  ReturnType<typeof totalsAndUsersPerMonth>
>;

export { spendingsWithSpender, totalsAndUsersPerMonth };

export type {
  SpendingWithSpender,
  TotalsPerMonth,
  UsersPerMonth,
  TotalsAndUsersPerMonth,
};
