import { verifySession } from '@/src/lib/session';
import MonthlyExpenses from './MonthlyExpenses';
import { totalsAndUsersPerMonth } from '@/src/db/queries';

export default async function Page() {
  await verifySession();

  const totals = await totalsAndUsersPerMonth();

  return <MonthlyExpenses data={totals} />;
}
