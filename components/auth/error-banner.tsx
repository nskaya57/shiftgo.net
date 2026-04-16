export function ErrorBanner({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="mb-4 flex items-start gap-3 rounded-[12px] border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-[14px] text-[#991b1b]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        className="mt-0.5 shrink-0"
      >
        <circle cx="12" cy="12" r="10" stroke="#dc2626" strokeWidth="2" />
        <path
          d="M12 7v5"
          stroke="#dc2626"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16" r="1.2" fill="#dc2626" />
      </svg>
      <span>{message}</span>
    </div>
  );
}
