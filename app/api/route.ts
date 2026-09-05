import { verifySession } from '@/src/lib/session';
import { spendingsWithSpender } from '@/src/db/queries';

export async function GET(request: Request) {
  await verifySession();

  const data = await spendingsWithSpender();

  return Response.json(data);
}
