'use client';

type Props = {
  children: React.ReactNode;
  action: () => void;
};

export default function Button({ children, action }: Props) {
  return <button onClick={async () => await action()}>{children}</button>;
}
