import { verifySession } from '@/src/lib/session';
import { Construction } from 'lucide-react';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function Page() {
  await verifySession();
  return (
    <div className="flex justify-center">
      <Construction size={128} />
    </div>
  );
}
