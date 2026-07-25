import SpendingForm from './components/SpendingForm';
import Button from '@/src/components/Button';
import { logout } from '@/src/actions/auth';
import { verifySession } from '@/src/lib/session';
import { LogOut } from 'lucide-react';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { username } = await verifySession();

  return (
    <>
      <div className="flex gap-4 justify-between items-center mb-4">
        <p className="text-sm text-foreground/50">Hallo {username}</p>
        <Button
          className="text-sm   border-none flex gap-2 items-center"
          onClick={logout}
        >
          <LogOut size={18} />
        </Button>
      </div>
      {children}
      <SpendingForm />
    </>
  );
}
