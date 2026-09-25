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
            className="fixed top-0 left-0 z-50 flex h-dvh w-dvw items-center justify-center"
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
              className="absolute inset-0 z-0 bg-black/20 backdrop-blur-sm"
              exit={{ opacity: 0 }}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
