import SpendingForm from './components/SpendingForm';
import Button from '@/src/components/Button';
import { logout } from '@/src/actions/auth';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <SpendingForm />
      <div>
        <Button action={logout}>Logout</Button>
      </div>
    </>
  );
}
