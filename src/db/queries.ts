import 'server-only';

import { db } from '@/src/db/db';
import { sum, sql, desc, eq, EmptyFilter } from 'drizzle-orm';
import { spendings, users } from '@/src/db/schema';

const PAGE_SIZE = 5;
type SpendingCursor = { date: string; id: number };

const spendingsWithSpender = async (cursor?: SpendingCursor) => {
  const rows = await db.query.spendings.findMany({
    with: {
      spender: {
        columns: {
          name: true,
          id: true,
        },
      },
    },

    where: cursor
      ? {
          OR: [
            {
              RAW: (table) => sql`DATE(${table.spendingDate}) < ${cursor.date}`,
            },
            {
              AND: [
                {
                  RAW: (table) =>
                    sql`DATE(${table.spendingDate}) = ${cursor.date}`,
                },
                {
                  RAW: (table) => sql`${table.id} < ${cursor.id}`,
                },
              ],
            },
          ],
        }
      : EmptyFilter,

    orderBy: (fields, { desc }) => [
      desc(sql`DATE(${fields.spendingDate})`),
      desc(fields.id),
    ],
    limit: PAGE_SIZE + 1,
  });

  const hasNextPage = rows.length > PAGE_SIZE;
  const items = rows.slice(0, PAGE_SIZE);
  const lastItem = items.at(-1);

  return {
    items,
    nextCursor:
      hasNextPage && lastItem
        ? {
            date: new Date(lastItem.spendingDate).toISOString().slice(0, 10),
            id: lastItem.id,
          }
        : null,
  };
};

type SpendingPage = Awaited<ReturnType<typeof spendingsWithSpender>>;
type SpendingWithSpender = SpendingPage['items'];

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
  SpendingCursor,
  SpendingPage,
  SpendingWithSpender,
  TotalsPerMonth,
  UsersPerMonth,
  TotalsAndUsersPerMonth,
};
