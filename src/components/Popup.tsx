import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Props = {
  trigger: ReactNode;
  children: ReactNode;
  show: boolean;
  onClick: () => void;
};

export default function Popup({ trigger, children, show, onClick }: Props) {
  return (
    <>
      {trigger}
      <AnimatePresence>
        {show && (
          <div
            className="w-dvw h-dvh top-0 left-0 flex items-center justify-center fixed z-50 "
            onClick={onClick}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="realtive z-10"
            >
              {children}
            </motion.div>
            <motion.div
              className="bg-black/20 backdrop-blur-sm absolute inset-0 z-0"
              exit={{ opacity: 0 }}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
