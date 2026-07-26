'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Button from '@/src/components/Button';
import { LogOut } from 'lucide-react';
import { logout } from '@/src/actions/auth';

export default function Nav({ username }: { username: string }) {
  const pathname = usePathname();

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
      <nav className="flex justify-between  ">
        <Link
          className={`link ${pathname === '/dashboard' ? 'underline ' : ''}`}
          href="/dashboard"
        >
          Ausgaben
        </Link>

        <Link
          className={`link ${pathname === '/dashboard/monatlich' ? 'underline   ' : ''}`}
          href="/dashboard/monatlich"
        >
          Monatlich
        </Link>
        <Link
          className={`link ${pathname === '/dashboard/statistik' ? 'underline   ' : ''}`}
          href="/dashboard/statistik"
        >
          Statistik
        </Link>
        <Link
          className={`link ${pathname === '/dashboard/abrechnung' ? 'underline  ' : ''}`}
          href="/dashboard/abrechnung"
        >
          Abrechnung
        </Link>
      </nav>
    </header>
  );
}
