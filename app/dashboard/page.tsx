import { verifySession } from '@/src/lib/session';
import { toMonth } from '@/src/lib/utils';
import { db } from '@/src/db/db';
import Spendings from './components/Spendings';
import { spendingsWithSpender } from '@/src/db/queries';

export default async function DashboardPage() {
  const { username } = await verifySession();
  const spendings = await spendingsWithSpender();

  return <Spendings spendings={spendings} userName={username} />;
}
