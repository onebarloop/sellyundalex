import SpendingForm from './components/SpendingForm';
import Header from './components/Header';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <SpendingForm />
    </>
  );
}
