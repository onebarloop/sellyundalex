'use client';

import { remove } from '@/src/actions/spendings';
import type { Spending, User } from '@/src/db/schema';
import { AnimatePresence, motion } from 'motion/react';
import { Trash2, ChevronDown, ChevronUp, Skull } from 'lucide-react';
import { useState } from 'react';
import { convertAmount } from '@/src/lib/convert';
import Popup from '@/src/components/Popup';
import Button from '@/src/components/Button';

import UpdateForm from './UpdateForm';

export type SpendingWithSpender = Spending & { spender: User | null };

type Props = {
  spendings: SpendingWithSpender[];
  userName: User['name'];
};

export default function Spendings({ spendings, userName }: Props) {
  const [openItem, setOpenItem] = useState<null | number>(null);

  const handleClick = (id: number) => {
    if (id === openItem) {
      setOpenItem(null);
    } else {
      setOpenItem(id);
    }
  };

  return (
    <ul className="mb-2 grid grid-cols-[repeat(3,1fr)_auto] gap-x-2 gap-y-1">
      <AnimatePresence initial={false}>
        {spendings.map((spending) => (
          <Spending
            spending={spending}
            userName={userName}
            openItem={openItem}
            key={spending.id}
            onClick={handleClick}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}

function Spending({
  spending,
  userName,
  openItem,
  onClick,
}: {
  spending: SpendingWithSpender;
  userName: User['name'];
  openItem: null | number;
  onClick: (id: number) => void;
}) {
  const isOpen = spending.id === openItem;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const variants = {
    active: { height: '4rem', opacity: 1, scale: 1 },
    inactive: { height: '2rem', opacity: 1, scale: 1 },
  };

  return (
    <motion.li
      layout="position"
      className={`p-2 border-l-8 ${spending.spender?.name === 'Alex' ? 'border-l-rose-300' : 'border-l-purple-300'} border-mauve-600 col-span-4 grid grid-cols-subgrid gap-y-3 text-xs bg-mauve-200`}
      exit={{ opacity: 0, scale: 0 }}
      variants={variants}
      initial={{ opacity: 0, scale: 0 }}
      animate={isOpen ? 'active' : 'inactive'}
    >
      {isOpen ? (
        <>
          <span className="row-span-2">{spending.title}</span>
          <span className="flex gap-1 font-bold">
            {convertAmount(spending.amount)}
          </span>
          <span className="truncate">
            {spending.spendingDate.toLocaleDateString('de-DE', {
              day: 'numeric',
              month: 'short',
            })}
          </span>
          <ChevronUp size={18} onClick={() => onClick(spending.id)} />
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="col-span-3 flex gap-2 items-center justify-end"
            >
              <UpdateForm spending={spending} userName={userName} />
              <Popup
                className="border-none p-0!"
                onShowChange={setShowDeleteDialog}
                show={showDeleteDialog}
                disabled={spending.spender?.name !== userName}
                icon={<Trash2 size={18} />}
              >
                <Button
                  onClick={async () => await remove(spending)}
                  className="text-2xl py-3 bg-rose-400 border-3 font-bold flex gap-2 items-center"
                >
                  <Skull size={30} />
                  <span>Sicher?</span>
                </Button>
              </Popup>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <>
          <span className="truncate">{spending.title}</span>
          <span className="flex gap-1 font-bold">
            {convertAmount(spending.amount)}
          </span>
          <span className="truncate">
            {spending.spendingDate.toLocaleDateString('de-DE', {
              day: 'numeric',
              month: 'short',
            })}
          </span>
          <ChevronDown size={18} onClick={() => onClick(spending.id)} />
        </>
      )}
    </motion.li>
  );
}
