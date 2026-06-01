'use client';

import { remove } from '@/src/actions/spendings';
import type { Spending } from '@/src/db/schema';
import { useTransition } from 'react';

type Props = {
  spendings: Spending[];
};

export default function Spendings({ spendings }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleClick = (spending: Spending) =>
    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 200));
      await remove(spending);
    });

  return (
    <ul>
      {spendings.map((spending) => (
        <li key={spending.id}>
          <span>{spending.title}</span>
          <button onClick={() => handleClick(spending)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}
