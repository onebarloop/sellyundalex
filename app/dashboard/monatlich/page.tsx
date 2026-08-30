import { verifySession } from '@/src/lib/session';
import MonthlyExpenses from './MonthlyExpenses';
import { totalsAndUsersPerMonth } from '@/src/db/queries';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function Page() {
  await verifySession();

  const totals = await totalsAndUsersPerMonth();

  return <MonthlyExpenses data={totals} />;
}
