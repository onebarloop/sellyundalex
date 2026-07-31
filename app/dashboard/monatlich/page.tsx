import { verifySession } from '@/src/lib/session';
import { db } from '@/src/db/db';
import MonthlyExpenses from './MonthlyExpenses';

export default async function Page() {
  const start = new Date('2026-08-01T00:00:00.000Z');
  const end = new Date('2026-08-31T23:59:59.999Z');
  await verifySession();
  const spendings = await db.query.spendings.findMany({
    with: {
      spender: true,
    },
    where: {
      AND: [
        {
          createdAt: { gte: start },
        },
        {
          createdAt: { lte: end },
        },
      ],
    },
  });
  const amount = spendings.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div>
      <h2 className="mb-6">Ausgaben im August</h2>
      <MonthlyExpenses amount={amount} />
    </div>
  );
}
