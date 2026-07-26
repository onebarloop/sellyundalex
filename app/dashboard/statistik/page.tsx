import { verifySession } from '@/src/lib/session';

export default async function Page() {
  await verifySession();
  return <div className="flex h-full r justify-center text-3xl">🚧 🚧 🚧</div>;
}
