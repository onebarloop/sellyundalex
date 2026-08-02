import { verifySession } from '../../src/lib/session';
import { db } from '@/src/db/db';
import Spendings from './components/Spendings';

export default async function DashboardPage() {
  const { username } = await verifySession();
  const spendings = await db.query.spendings.findMany({
    with: {
      spender: true,
    },
    orderBy: {
      spendingDate: 'desc',
    },
  });
  return <Spendings spendings={spendings} userName={username} />;
}
