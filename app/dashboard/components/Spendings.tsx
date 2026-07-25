'use client';

import { remove } from '@/src/actions/spendings';
import type { Spending, User } from '@/src/db/schema';
import { AnimatePresence, motion } from 'motion/react';
import { Trash2, CircleEuro } from 'lucide-react';

type SpendingWithSpender = Spending & { spender: User | null };

type Props = {
  spendings: SpendingWithSpender[];
};

export default function Spendings({ spendings }: Props) {
  const convert = (amount: number | null) => {
    if (!amount) return '0 €';
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount / 100);
  };

  return (
    <ul className="mb-2 grid grid-cols-[repeat(2,1fr)_auto] gap-y-1">
      <AnimatePresence initial={false}>
        {spendings.map((spending) => (
          <motion.li
            className={`p-2 col-span-3 grid grid-cols-subgrid ${spending.spender?.name === 'Alex' ? 'bg-pink-900' : 'bg-purple-800'}`}
            key={spending.id}
            exit={{ opacity: 0, scale: 0 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="truncate ">{spending.title}</span>
            <span className="flex gap-1 font-bold">
              {convert(spending.amount)}
            </span>
            {/* <span>{spending.createdAt.toLocaleDateString()}</span>
            <span>{spending.createdAt.toLocaleTimeString()}</span> */}
            <button
              className="ml-auto"
              onClick={async () => await remove(spending)}
            >
              <Trash2 />
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
