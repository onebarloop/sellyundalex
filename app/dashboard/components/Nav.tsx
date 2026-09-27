'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="py-5 text-sm">
      <nav className="flex justify-between">
        <Link
          className={`link ${pathname === '/dashboard' ? 'underline' : ''}`}
          href="/dashboard"
          transitionTypes={['dashboard-page']}
        >
          Ausgaben
        </Link>

        <Link
          className={`link ${pathname === '/dashboard/monatlich' ? 'underline' : ''}`}
          href="/dashboard/monatlich"
          transitionTypes={['dashboard-page']}
        >
          Monatlich
        </Link>
        <Link
          className={`link ${pathname === '/dashboard/statistik' ? 'underline' : ''}`}
          href="/dashboard/statistik"
          transitionTypes={['dashboard-page']}
        >
          Statistik
        </Link>
        <Link
          className={`link ${pathname === '/dashboard/abrechnung' ? 'underline' : ''}`}
          href="/dashboard/abrechnung"
          transitionTypes={['dashboard-page']}
        >
          Abrechnung
        </Link>
      </nav>
    </header>
  );
}
