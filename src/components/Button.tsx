'use client';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
};

export default function Button({
  children,
  onClick,
  className,
  type,
  disabled,
}: Props) {
  return (
    <button
      className={`${className} ${disabled && 'opacity-30'} border-2 rounded border-foreground px-3 py-1 w-fit`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
