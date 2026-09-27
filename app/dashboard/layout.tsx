import SpendingForm from './components/SpendingForm';
import Header from './components/Header';
import { ViewTransition } from 'react';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] p-4">
      <Header />
      <ViewTransition default="none" update="dashboard-page">
        <main className="overflow-auto">{children}</main>
      </ViewTransition>
      <SpendingForm />
    </div>
  );
}
