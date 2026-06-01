import Button from '@/src/components/Button';
import { verifySession } from '../../src/lib/session';
import { logout } from '@/src/actions/auth';
import { add } from '@/src/actions/spendings';
import { db } from '@/src/db/db';
import Spendings from './components/Spendings';

export default async function DashboardPage() {
  const { username } = await verifySession();

  const spendings = await db.query.spendings.findMany({
    with: {
      spender: true,
    },
  });
  console.log(spendings);
  return (
    <div>
      <p>Hallo {username}</p>
      <h1>Spendings</h1>
      <Spendings spendings={spendings} />
    </div>
  );
}
