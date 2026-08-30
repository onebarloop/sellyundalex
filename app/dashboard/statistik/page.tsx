import { verifySession } from '@/src/lib/session';
import { Construction } from 'lucide-react';

export default async function Page() {
  await verifySession();
  return (
    <div className="flex justify-center">
      <Construction size={128} />
    </div>
  );
}
