import { ReactNode, SetStateAction, Dispatch } from 'react';
import Button from './Button';

type Props = {
  className: string;
  icon: ReactNode;
  children: ReactNode;
  show: boolean;
  onShowChange: Dispatch<SetStateAction<boolean>>;
};

export default function Popup({
  className,
  icon,
  children,
  show,
  onShowChange,
}: Props) {
  if (!show) {
    return (
      <Button className={className} onClick={() => onShowChange(true)}>
        {icon}
      </Button>
    );
  } else {
    return (
      <dialog
        className="w-screen h-screen top-0 bg-black/20 backdrop-blur-sm flex items-center justify-center"
        onClick={() => onShowChange(false)}
      >
        {children}
      </dialog>
    );
  }
}
