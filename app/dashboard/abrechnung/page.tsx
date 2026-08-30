import { verifySession } from '@/src/lib/session';
import Invoice from './Invoice';
import { totalsAndUsersPerMonth } from '@/src/db/queries';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

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
