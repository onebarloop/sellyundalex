'use client';

import { remove } from '@/src/actions/spendings';
import type { Spending, User } from '@/src/db/schema';
import { AnimatePresence, motion } from 'motion/react';
import { Trash2, ChevronDown, ChevronUp, Settings, Skull } from 'lucide-react';
import { useState } from 'react';
import { convertAmount } from '@/src/lib/convert';
import Popup from '@/src/components/Popup';
import Button from '@/src/components/Button';

type SpendingWithSpender = Spending & { spender: User | null };

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
  const [showDialog, setShowDialog] = useState(false);

  return (
    <motion.li
      className={`p-2 col-span-4 grid grid-cols-subgrid gap-y-3 text-xs ${spending.spender?.name === 'Alex' ? 'bg-violet-200' : 'bg-fuchsia-200'}`}
      exit={{ opacity: 0, scale: 0 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {isOpen ? (
        <>
          <span className="row-span-2">{spending.title}</span>
          <span className="flex gap-1 font-bold">
            {convertAmount(spending.amount)}
          </span>
          <span className="truncate">
            {spending.createdAt.toLocaleDateString('de-DE', {
              day: 'numeric',
              month: 'short',
            })}
          </span>
          <ChevronUp size={18} onClick={() => onClick(spending.id)} />
          <div className="col-span-3 flex gap-2 items-center justify-end">
            <Settings className="opacity-40" size={18} />
            <Popup
              className="border-none p-0!"
              onShowChange={setShowDialog}
              show={showDialog}
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
            {/* <button onClick={async () => await remove(spending)}></button> */}
          </div>
        </>
      ) : (
        <>
          <span className="truncate">{spending.title}</span>
          <span className="flex gap-1 font-bold">
            {convertAmount(spending.amount)}
          </span>
          <span className="truncate">
            {spending.createdAt.toLocaleDateString('de-DE', {
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
