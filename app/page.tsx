import { Heart } from 'lucide-react';
import Link from 'next/link';

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
