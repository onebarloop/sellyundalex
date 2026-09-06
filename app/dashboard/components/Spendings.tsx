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
  useQueryClient,
  useInfiniteQuery,
  type InfiniteData,
} from '@tanstack/react-query';

type Props = {
  spendings: SpendingWithSpender;
  userName: User['name'];
};

export default function Spendings({ spendings, userName }: Props) {
  const getSpendings = async ({
    pageParam,
  }: {
    pageParam: number;
  }): Promise<SpendingWithSpender> => {
    const res = await fetch(`/api?page=${pageParam}`);
    const data = await res.json();
    return data;
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery<
      SpendingWithSpender,
      Error,
      InfiniteData<SpendingWithSpender, number>,
      ['spendings'],
      number
    >({
      queryKey: ['spendings'],
      queryFn: getSpendings,
      initialPageParam: 1,
      initialData: {
        pages: [spendings],
        pageParams: [1],
      },
      getNextPageParam: (lastPage, _, lastPageParam) =>
        lastPage.length === 0 ? undefined : lastPageParam + 1,
    });

  const byMonth = Object.values(
    data.pages.flat().reduce(
      (acc, spending) => {
        const date = new Date(spending.spendingDate);
        const key = date.toISOString().slice(0, 7);

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
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
      </button>
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
  const queryClient = useQueryClient();

  const handleClick = () => {
    setShowDeleteDialog(!showDeleteDialog);
  };

  const handleDelete = async () => {
    await remove(spending);
    await queryClient.invalidateQueries({
      queryKey: ['spendings'],
    });
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
              onClick={handleDelete}
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
          {new Date(spending.spendingDate).toLocaleDateString('de-DE', {
            day: 'numeric',
            month: 'short',
          })}
        </span>
      </div>
    </motion.li>
  );
}
