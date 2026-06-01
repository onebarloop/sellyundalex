'use client';

import { remove } from '@/src/actions/spendings';
import type { Spending, User } from '@/src/db/schema';
import { AnimatePresence, motion } from 'motion/react';

type SpendingWithSpender = Spending & { spender: User | null };

type Props = {
  spendings: SpendingWithSpender[];
};

export default function Spendings({ spendings }: Props) {
  return (
    <ul>
      <AnimatePresence initial={false}>
        {spendings.map((spending) => (
          <motion.li
            className="p-2 border-2 flex gap-2"
            key={spending.id}
            exit={{ opacity: 0, scale: 0 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span>{spending.title}</span>
            <span>{spending.amount}</span>
            <span>{spending.spender?.name}</span>
            <span>{spending.createdAt.toLocaleDateString()}</span>
            <span>{spending.createdAt.toLocaleTimeString()}</span>
            <button onClick={async () => await remove(spending)}>Remove</button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
