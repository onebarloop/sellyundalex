export function convertAmount(amount: number | null) {
  if (!amount) return '0€';
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  })
    .format(amount / 100)
    .replace(/\s/g, '');
}
