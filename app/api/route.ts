import { verifySession } from '@/src/lib/session';
import { spendingsWithSpender } from '@/src/db/queries';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest): Promise<Response> {
  await verifySession();

  const date = request.nextUrl.searchParams.get('date');
  const idParam = request.nextUrl.searchParams.get('id');
  const id = idParam === null ? undefined : Number(idParam);

  if (
    (date === null) !== (id === undefined) ||
    (date !== null && !/^\d{4}-\d{2}-\d{2}$/.test(date)) ||
    (id !== undefined && (!Number.isInteger(id) || id < 1))
  ) {
    return Response.json(
      { error: 'date and id must be provided together and be valid' },
      { status: 400 },
    );
  }

  const data = await spendingsWithSpender(
    date !== null && id !== undefined ? { date, id } : undefined,
  );

  return Response.json(data);
}
