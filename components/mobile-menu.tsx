"use client";

import { useRef, useCallback } from "react";
import { Link } from "@/i18n/navigation";

type MobileMenuProps = {
  howLabel: string;
  helpLabel: string;
  menuLabel: string;
};

export function MobileMenu({ howLabel, helpLabel, menuLabel }: MobileMenuProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const close = useCallback(() => {
    detailsRef.current?.removeAttribute("open");
  }, []);

  return (
    <details ref={detailsRef} className="group relative md:hidden">
      <summary
        className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full text-[#17131f] transition-colors hover:bg-[#f4eeff] [&::-webkit-details-marker]:hidden"
        aria-label={menuLabel}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-6 w-6 group-open:hidden"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="hidden h-6 w-6 group-open:block"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M6 6l12 12M18 6l-12 12" />
        </svg>
      </summary>

      <div className="absolute right-0 top-12 z-40 flex w-56 origin-top-right flex-col gap-1 rounded-[14px] border border-[#ece7f2] bg-white p-3 elev-2 transition-[opacity,transform] duration-200 ease-out group-open:animate-none group-[:not([open])]:pointer-events-none group-[:not([open])]:scale-95 group-[:not([open])]:opacity-0">
        <a
          href="/#how"
          onClick={close}
          className="rounded-[10px] px-4 py-3 text-[15px] font-medium text-[#17131f] transition-colors hover:bg-[#f4eeff] hover:text-[#341657]"
        >
          {howLabel}
        </a>
        <Link
          href="/help"
          onClick={close}
          className="rounded-[10px] px-4 py-3 text-[15px] font-medium text-[#17131f] transition-colors hover:bg-[#f4eeff] hover:text-[#341657]"
        >
          {helpLabel}
        </Link>
      </div>
    </details>
  );
}
