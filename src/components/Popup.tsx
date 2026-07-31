import { ReactNode, SetStateAction, Dispatch } from 'react';
import Button from './Button';

type Props = {
  className?: string;
  icon: ReactNode;
  children: ReactNode;
  show: boolean;
  disabled?: boolean;
  onShowChange: Dispatch<SetStateAction<boolean>>;
};

export default function Popup({
  className,
  icon,
  children,
  show,
  disabled,
  onShowChange,
}: Props) {
  return (
    <>
      <Button
        disabled={disabled}
        className={className}
        onClick={() => onShowChange(true)}
      >
        {icon}
      </Button>
      {show && (
        <div
          className="w-dvw h-dvh top-0 left-0 bg-black/20 backdrop-blur-sm flex items-center justify-center fixed z-50"
          onClick={() => onShowChange(false)}
        >
          {children}
        </div>
      )}
    </>
  );
}
