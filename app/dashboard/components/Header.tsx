import Nav from './Nav';

import { LogOut } from 'lucide-react';
import { logout } from '@/src/actions/auth';
import Button from '@/src/components/Button';
import { verifySession } from '@/src/lib/session';

export default async function Header() {
  const { username } = await verifySession();
  return (
    <header className="sticky top-0 py-5 bg-background text-sm">
      <div className="flex gap-4 justify-between items-center mb-4">
        <p className="text-sm text-foreground/50">Hallo {username}</p>
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
