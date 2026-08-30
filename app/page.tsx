import { Heart } from 'lucide-react';
import Link from 'next/link';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function Home() {
  return (
    <div className="flex flex-wrap gap-12 justify-center items-center flex-1">
      <span className="text-2xl font-bold">Selly</span>
      <Link href="/login">
        <Heart className="animate-beat fill-alex shrink-0" size={42} />
      </Link>
      <span className="text-2xl font-bold">Alex</span>
    </div>
  );
}
