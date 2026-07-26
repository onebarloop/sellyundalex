import { verifySession } from '@/src/lib/session';

export default async function Page() {
  await verifySession();
  return (
    <div>
      <h1>Statistik</h1>
    </div>
  );
}
