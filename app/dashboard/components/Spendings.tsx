'use client';

import { remove } from '@/src/actions/spendings';
import type { Spending, User } from '@/src/db/schema';
import { AnimatePresence, motion } from 'motion/react';
import { Trash2 } from 'lucide-react';

type SpendingWithSpender = Spending & { spender: User | null };

type Props = {
  spendings: SpendingWithSpender[];
};

export default function Spendings({ spendings }: Props) {
  const convertAmount = (amount: number | null) => {
    if (!amount) return '0 €';
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount / 100);
  };

  // const convertDate(date: string) {
  //   return date.toLocaleDateString({ day: 'numeric', month: 'short' })
  // }

  return (
    <ul className="mb-2 grid grid-cols-[repeat(3,1fr)_auto] gap-x-2 gap-y-1">
      <AnimatePresence initial={false}>
        {spendings.map((spending) => (
          <motion.li
            className={`p-2 col-span-4 grid grid-cols-subgrid ${spending.spender?.name === 'Alex' ? 'bg-violet-200' : 'bg-fuchsia-200'}`}
            key={spending.id}
            exit={{ opacity: 0, scale: 0 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="truncate ">{spending.title}</span>
            <span className="flex gap-1 font-bold">
              {convertAmount(spending.amount)}
            </span>
            <span className="truncate">
              {spending.createdAt.toLocaleDateString('de-DE', {
                day: 'numeric',
                month: 'short',
              })}
            </span>
            <button
              className="ml-auto"
              onClick={async () => await remove(spending)}
            >
              <Trash2 size={18} />
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
