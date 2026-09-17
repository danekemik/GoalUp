export function WalletSummary({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="rounded-2xl bg-grad-primary p-4 text-primary-foreground">
      <p className="text-xs opacity-90">{label}</p>
      <p className="mt-1 text-[26px] font-extrabold tracking-tight">{value}</p>
      <p className="mt-1 text-xs font-bold opacity-95">{delta}</p>
    </div>
  );
}