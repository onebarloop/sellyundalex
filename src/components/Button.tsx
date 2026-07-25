'use client';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
};

export default function Button({ children, onClick, className, type }: Props) {
  return (
    <button
      className={`${className} border rounded border-white px-3 py-1 w-fit`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
