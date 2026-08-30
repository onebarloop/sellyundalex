import { verifySession } from '@/src/lib/session';
import Spendings from './components/Spendings';
import { spendingsWithSpender } from '@/src/db/queries';

export default async function DashboardPage() {
  const { username } = await verifySession();
  const spendings = await spendingsWithSpender();

  return <Spendings spendings={spendings} userName={username} />;
}
