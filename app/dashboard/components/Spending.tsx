'use client';

import { remove } from '@/src/actions/spendings';
import type { Spending } from '@/src/db/schema';

type Props = {
  spending: Spending;
};

export default function Spending({ spending }: Props) {
  return (
    <li className="flex gap-4">
      <span>{spending.title}</span>
      <button onClick={async () => await remove(spending)}>Remove</button>
    </li>
  );
}
