import { verifySession } from '@/src/lib/session';
import MonthlyExpenses from './MonthlyExpenses';
import { getTotalAmountByDate } from '@/src/db/queries';

export default async function Page() {
  await verifySession();

  const start = new Date('2026-08-01T00:00:00.000Z');
  const end = new Date('2026-08-31T23:59:59.999Z');

  const amount = await getTotalAmountByDate(start, end);

  return (
    <div>
      <h2 className="mb-6">Ausgaben im August</h2>
      <MonthlyExpenses amount={amount} />
    </div>
  );
}
