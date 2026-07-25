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
      createdAt: 'desc',
    },
  });
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Spendings</h1>
      <Spendings spendings={spendings} />
    </div>
  );
}
