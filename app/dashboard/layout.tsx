import SpendingForm from './components/SpendingForm';
import Header from './components/Header';
import { ViewTransition } from 'react';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr] pb-0">
      <Header />
      <ViewTransition
        default="none"
        update={{
          'spending-update': 'none',
          'settings-update': 'none',
          default: 'dashboard-page',
        }}
      >
        <main className="overflow-auto px-4">{children}</main>
      </ViewTransition>
      <SpendingForm />
    </div>
  );
}
