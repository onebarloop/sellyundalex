import { verifySession } from '@/src/lib/session';
import { Construction } from 'lucide-react';
import { totalsByMonthAndType } from '@/src/db/queries';

export default async function Page() {
  await verifySession();

  const data = await totalsByMonthAndType();
  console.log(data);

  return (
    <div className="flex justify-center">
      <Construction size={128} />
    </div>
  );
}
