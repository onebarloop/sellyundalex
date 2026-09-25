import Nav from './Nav';

import { LogOut, Settings } from 'lucide-react';
import { logout } from '@/src/actions/auth';
import Button from '@/src/components/Button';
import { verifySession } from '@/src/lib/session';
import Link from 'next/link';

export default async function Header() {
  const { username } = await verifySession();
  return (
    <header className="bg-background sticky top-0 z-10 py-4 text-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <Link
          className="text-foreground/50 flex items-center gap-1"
          href="/dashboard/settings"
        >
          <span className="text-sm">Hallo {username}</span>
          <Settings size={16} />
        </Link>

        <Button
          className="flex items-center gap-2 border-none p-0"
          onClick={logout}
        >
          <LogOut size={16} />
        </Button>
      </div>
      <Nav />
    </header>
  );
}
