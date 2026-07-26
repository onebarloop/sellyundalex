import SpendingForm from './components/SpendingForm';
import Button from '@/src/components/Button';
import { logout } from '@/src/actions/auth';
import { verifySession } from '@/src/lib/session';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import Nav from './components/Nav';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { username } = await verifySession();

  return (
    <>
      <Nav username={username} />
      {children}
      <SpendingForm />
    </>
  );
}
