import { SpendingWithSpender, SpendingPage } from '../db/queries';
import { User } from '../db/schema';

export function toCurrency(amount: number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount / 100);
}

export function toMonth(date: string) {
  const dateobj = new Date(date);
  return new Intl.DateTimeFormat('de-DE', { month: 'long' }).format(dateobj);
}

export function toCents(value: FormDataEntryValue | null) {
  const numericValue = Number.parseFloat(String(value ?? '0'));

  if (!Number.isFinite(numericValue)) {
    return 0;
  }

  return Math.round(numericValue * 100);
}

export function sortByMonth(pages: SpendingPage[]) {
  return Object.values(
    pages
      .flatMap((page) => page.items)
      .reduce(
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
        {} as Record<string, { month: string; items: SpendingWithSpender }>,
      ),
  );
}
