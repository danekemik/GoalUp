export function formatRubles(amount: number, showSign = false): string {
  const formatted = new Intl.NumberFormat("ru-RU").format(amount);
  return showSign && amount > 0 ? `+${formatted} ₽` : `${formatted} ₽`;
}

export function formatEuro(amount: number, showSign = false): string {
  const formatted = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
  const sign = amount < 0 ? "−" : showSign && amount > 0 ? "+" : "";
  return `${sign}${formatted}`;
}