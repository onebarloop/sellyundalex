import { verifySession } from '@/src/lib/session';
import { spendingsWithSpender } from '@/src/db/queries';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  await verifySession();

  const pageParam = request.nextUrl.searchParams.get('page');
  const page = Number(pageParam);

  if (!Number.isInteger(page) || page < 1) {
    return Response.json(
      { error: 'page must be a positive integer' },
      { status: 400 },
    );
  }

  const data = await spendingsWithSpender(Number(page));

  return Response.json(data);
}
