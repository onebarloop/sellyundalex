import SpendingForm from './components/SpendingForm';
import Header from './components/Header';
import { ViewTransition } from 'react';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <ViewTransition default="none" update="dashboard-page">
        {children}
      </ViewTransition>
      <SpendingForm />
    </>
  );
}
