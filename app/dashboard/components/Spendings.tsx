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
import { getSpendingIcon } from '@/src/lib/spendingIcons';
import { SpendingWithSpender } from '@/src/db/queries';
import { toMonth } from '@/src/lib/utils';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { getSpendings } from '@/src/actions/spendings';

type Props = {
  spendings: SpendingWithSpender;
  userName: User['name'];
};

export default function App(props: Props) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Spendings {...props} />
    </QueryClientProvider>
  );
}

function Spendings({ spendings, userName }: Props) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: getSpendings,
  });
  const byMonth = Object.values(
    spendings.reduce(
      (acc, spending) => {
        const key = spending.spendingDate.toISOString().slice(0, 7); // YYYY-MM
        if (!acc[key]) {
          acc[key] = {
            month: key,
            items: [],
          };
        }
        acc[key].items.push(spending);
        return acc;
      },
      {} as Record<string, { month: string; items: typeof spendings }>,
    ),
  );

  console.log(data);

  return (
    <div className="relative">
      {byMonth.map(({ month, items }) => (
        <ul className="flex flex-col gap-2" key={month}>
          <h3 className="font-bold pb-4 sticky w-full bg-background top-33">
            {toMonth(month)}
          </h3>
          <AnimatePresence initial={false}>
            {items.map((spending) => (
              <Spending
                spending={spending}
                userName={userName}
                key={spending.id}
              />
            ))}
          </AnimatePresence>
        </ul>
      ))}
    </div>
  );
}

function Spending({
  spending,
  userName,
}: {
  spending: SpendingWithSpender[number];
  userName: User['name'];
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleClick = () => {
    setShowDeleteDialog(!showDeleteDialog);
  };

  return (
    <motion.li
      layout="position"
      className={`border-l-8 ${spending.spender?.name === 'Alex' ? 'border-l-alex' : 'border-l-selly'} flex flex-col rounded-lg last:mb-6`}
      exit={{ opacity: 0, scale: 0 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="p-2 gap-2  font-bold bg-mauve-300 flex justify-between items-center">
        <span className="inline-flex items-center gap-2">
          {getSpendingIcon(spending.spendingType, 18)}
        </span>
        <span className="mr-auto">{spending.title}</span>
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
              className="border-3 gap-4 py-3 rounded-xl mt-8 bg-rose-400 text-foreground border-foreground flex text-3xl font-bold items-center"
            >
              <ShieldAlert size={40} />
              <span>Sicher?</span>
            </Button>
          </Popup>
        </div>
      </div>
      <div className="p-2 text-foreground bg-mauve-200 text-xs flex justify-between">
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
