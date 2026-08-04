import { ReactNode } from 'react';

type Props = {
  trigger: ReactNode;
  children: ReactNode;
  show: boolean;
  onClick?: () => void;
};

export default function Popup({ trigger, children, show, onClick }: Props) {
  return (
    <>
      {trigger}
      {show && (
        <div
          className="w-dvw h-dvh top-0 left-0 bg-black/20 backdrop-blur-sm flex items-center justify-center fixed z-50"
          onClick={onClick}
        >
          {children}
        </div>
      )}
    </>
  );
}
