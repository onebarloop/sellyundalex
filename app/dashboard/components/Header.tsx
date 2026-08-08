import Nav from './Nav';

import { LogOut, Settings } from 'lucide-react';
import { logout } from '@/src/actions/auth';
import Button from '@/src/components/Button';
import { verifySession } from '@/src/lib/session';
import Link from 'next/link';

export default async function Header() {
  const { username } = await verifySession();
  return (
    <header className="sticky z-10 top-0 py-5 bg-background text-sm">
      <div className="flex gap-4 justify-between items-center mb-4">
        <Link
          className="flex gap-1 items-center text-foreground/50"
          href="/dashboard/settings"
        >
          <span className="text-sm">Hallo {username}</span>
          <Settings size={16} />
        </Link>

        <Button
          className="border-none flex gap-2 items-center p-0"
          onClick={logout}
        >
          <LogOut size={16} />
        </Button>
      </div>
      <Nav />
    </header>
  );
}
