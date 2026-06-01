import Button from '@/src/components/Button';
import { verifySession } from '../../src/lib/session';
import { logout } from '@/src/actions/auth';
import { add } from '@/src/actions/spendings';
import { db } from '@/src/db/db';
import Spendings from './components/Spendings';

export default async function DashboardPage() {
  const { userId, username } = await verifySession();

  const spendings = await db.query.spendings.findMany({
    where: {
      spenderId: userId,
    },
  });
  return (
    <div style={{ padding: '20px' }}>
      <h1>🔒 Dashboard (Geschützter Bereich)</h1>

      <p>
        Wenn du das sehen kannst, war dein Passwort-Hash-Vergleich erfolgreich!
      </p>
      <p>Hallo {username}</p>

      <Spendings spendings={spendings} />

      <div className="flex flex-col gap-4">
        <Button action={add}>Add</Button>

        <Button action={logout}>Logout</Button>
      </div>
    </div>
  );
}
