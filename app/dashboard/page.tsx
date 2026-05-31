import Button from '@/src/components/Button';
import { verifySession } from '../../src/lib/session';
import { logout } from '@/src/actions/auth';
import { add } from '@/src/actions/spendings';
import { db } from '@/src/db/db';
import Spending from './components/Spending';

export default async function DashboardPage() {
  const { userId, username } = await verifySession();

  const result = await db.query.spendings.findMany({
    where: {
      spenderId: userId,
    },
  });

  console.log(result);

  return (
    <div style={{ padding: '20px' }}>
      <h1>🔒 Dashboard (Geschützter Bereich)</h1>

      <p>
        Wenn du das sehen kannst, war dein Passwort-Hash-Vergleich erfolgreich!
      </p>
      <p>Hallo {username}</p>

      <ul>
        {result.map((s) => (
          <Spending spending={s} key={s.id} />
        ))}
      </ul>

      <div className="flex flex-col gap-4">
        <Button action={add}>Add</Button>

        <Button action={logout}>Logout</Button>
      </div>
    </div>
  );
}
