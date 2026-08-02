import { verifySession } from '@/src/lib/session';
import MonthlyExpenses from './MonthlyExpenses';
import { getTotalAmountByDate } from '@/src/db/queries';

export default async function Page() {
  await verifySession();

  const amount = await getTotalAmountByDate();

  return <MonthlyExpenses data={amount} />;
}
