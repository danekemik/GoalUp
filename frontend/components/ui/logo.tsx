export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="relative grid size-9 place-items-center rounded-[14px] bg-grad-primary shadow-[0_10px_24px_-8px_rgba(124,58,237,.7)]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 5h11l5 7-5 7H4z" />
          <path d="M7 12h10" />
          <path d="M12 8v5" />
        </svg>
        <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-lime-300 ring-2 ring-white" />
      </span>
      <span
        className={`text-xl font-extrabold tracking-tight ${
          dark ? "text-white" : "text-foreground"
        }`}
      >
        Goal<span className="text-grad-primary">Up</span>
      </span>
    </span>
  );
}