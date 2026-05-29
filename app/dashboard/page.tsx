import Button from '@/src/components/Button';
import { verifySession } from '../../src/lib/session';
import { logout } from '@/src/actions/auth';

export default async function DashboardPage() {
  const session = await verifySession();

  console.log(session);

  return (
    <div style={{ padding: '20px' }}>
      <h1>🔒 Dashboard (Geschützter Bereich)</h1>

      <p>
        Wenn du das sehen kannst, war dein Passwort-Hash-Vergleich erfolgreich!
      </p>
      <p>Hallo {session.username}</p>

      <Button action={logout}>Logout</Button>
    </div>
  );
}
