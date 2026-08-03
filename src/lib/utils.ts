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
