import { verifySession } from '@/src/lib/session';
import Invoice from './Invoice';
import { totalsAndUsersPerMonth } from '@/src/db/queries';

export default async function Page() {
  await verifySession();

  const totals = await totalsAndUsersPerMonth();

  return (
    <ul className="flex flex-col gap-4">
      {totals.map((month) => (
        <Invoice key={month.month} month={month} />
      ))}
    </ul>
  );
}
