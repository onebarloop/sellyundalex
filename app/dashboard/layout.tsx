import SpendingForm from './components/SpendingForm';
import Header from './components/Header';
import Providers from './components/Providers';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Header />
      {children}
      <SpendingForm />
    </Providers>
  );
}
