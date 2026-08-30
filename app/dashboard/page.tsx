import { verifySession } from '@/src/lib/session';
import Spendings from './components/Spendings';
import { spendingsWithSpender } from '@/src/db/queries';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function DashboardPage() {
  const { username } = await verifySession();
  const spendings = await spendingsWithSpender();

  return <Spendings spendings={spendings} userName={username} />;
}
