'use client';

import { remove } from '@/src/actions/spendings';
import type { Spending, User } from '@/src/db/schema';
import { AnimatePresence, motion } from 'motion/react';
import { Trash2, ShieldAlert, Calendar } from 'lucide-react';
import { useState } from 'react';
import { toCurrency } from '@/src/lib/utils';
import Popup from '@/src/components/Popup';
import Button from '@/src/components/Button';

import UpdateForm from './UpdateForm';

export type SpendingWithSpender = Spending & { spender: User | null };

type Props = {
  spendings: SpendingWithSpender[];
  userName: User['name'];
};

export default function Spendings({ spendings, userName }: Props) {
  return (
    <ul className="mb-2 flex flex-col gap-2">
      <AnimatePresence initial={false}>
        {spendings.map((spending) => (
          <Spending spending={spending} userName={userName} key={spending.id} />
        ))}
      </AnimatePresence>
    </ul>
  );
}

function Spending({
  spending,
  userName,
}: {
  spending: SpendingWithSpender;
  userName: User['name'];
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleClick = () => {
    setShowDeleteDialog(!showDeleteDialog);
  };

  return (
    <motion.li
      layout="position"
      className={`border-l-8 border-l-${spending.spender?.name.toLowerCase()} border-mauve-600 flex flex-col rounded-lg`}
      exit={{ opacity: 0, scale: 0 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="p-2 font-bold bg-mauve-300 flex justify-between items-center">
        <span className="">{spending.title}</span>
        <div className="flex gap-2">
          <UpdateForm spending={spending} userName={userName} />
          <Popup
            trigger={
              <Button
                disabled={spending.spender?.name !== userName}
                className="border-none p-0!"
                onClick={handleClick}
              >
                <Trash2 size={18} />
              </Button>
            }
            onClick={handleClick}
            show={showDeleteDialog}
          >
            <Button
              onClick={async () => await remove(spending)}
              className="text-2xl py-3 bg-rose-400 border-3 font-bold flex gap-2 items-center"
            >
              <ShieldAlert size={30} />
              <span>Sicher?</span>
            </Button>
          </Popup>
        </div>
      </div>
      <div className="p-2 bg-mauve-200 text-xs flex justify-between">
        <span className="">{toCurrency(spending.amount)}</span>
        <span className="inline-flex items-center gap-1">
          <Calendar className="" size={14} />
          {spending.spendingDate.toLocaleDateString('de-DE', {
            day: 'numeric',
            month: 'short',
          })}
        </span>
      </div>
    </motion.li>
  );
}
