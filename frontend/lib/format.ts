export function formatRubles(amount: number, showSign = false): string {
  const formatted = new Intl.NumberFormat("ru-RU").format(amount);
  return showSign && amount > 0 ? `+${formatted} ₽` : `${formatted} ₽`;
}