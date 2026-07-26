import { verifySession } from '../../src/lib/session';
import { db } from '@/src/db/db';
import Spendings from './components/Spendings';

export default async function DashboardPage() {
  const spendings = await db.query.spendings.findMany({
    with: {
      spender: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return <Spendings spendings={spendings} />;
}
