import { verifySession } from '@/src/lib/session';

export default async function Page() {
  await verifySession();
  return (
    <div>
      <h1>Abrechnung</h1>
    </div>
  );
}
