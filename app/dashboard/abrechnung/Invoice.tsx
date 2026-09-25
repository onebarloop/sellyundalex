import { TotalsAndUsersPerMonth } from '@/src/db/queries';
import { toCurrency, toMonth } from '@/src/lib/utils';

export default function Invoice({
  month,
}: {
  month: TotalsAndUsersPerMonth[number];
}) {
  const [debtor, creditor] = month.users.sort((a, b) => a.total - b.total);
  const debt = month.total / 2 - debtor.total;

  if (!creditor) {
    return;
  }

  return (
    <li>
      <h2 className="mb-2 font-bold">{toMonth(month.month)}</h2>
      <div
        className={`grid grid-cols-3 border-b-8 p-3 ${debtor.name === 'Alex' ? 'border-alex' : 'border-selly'} items-center rounded-md bg-mauve-300`}
      >
        <span>{debtor.name}</span>
        <span className="justify-self-center underline">
          {toCurrency(debt)}
        </span>
        <span className="justify-self-end">{creditor.name}</span>
      </div>
    </li>
  );
}
