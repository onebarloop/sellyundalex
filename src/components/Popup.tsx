import { ReactNode, SetStateAction, Dispatch } from 'react';
import Button from './Button';

type Props = {
  icon: ReactNode;
  children: ReactNode;
  show: boolean;
  onShowChange: Dispatch<SetStateAction<boolean>>;
};

export default function Popup({ icon, children, show, onShowChange }: Props) {
  if (!show) {
    return (
      <Button
        className="bg-amber-200 fixed bottom-6 right-6"
        onClick={() => onShowChange(true)}
      >
        {icon}
      </Button>
    );
  } else {
    return (
      <dialog
        className="w-screen h-screen top-0 bg-white/10 backdrop-blur-sm m-0 p-8 flex items-center justify-center"
        onClick={() => onShowChange(false)}
      >
        {children}
      </dialog>
    );
  }
}
