'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 py-5 bg-background text-sm">
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
