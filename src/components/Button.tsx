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
      className={`${className} ${disabled && 'opacity-30'} border-foreground w-fit rounded-md border-2 px-3 py-1`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
