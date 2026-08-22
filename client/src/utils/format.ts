const moneyFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  useGrouping: true,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export function formatMoney(value: number): string {
  return moneyFormatter.format(value);
}

export function formatDate(isoString: string): string {
  return dateFormatter.format(new Date(isoString));
}
