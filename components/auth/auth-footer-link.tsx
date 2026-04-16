"use client";

import type { ReactNode } from "react";
import { useAuthQueryForward } from "./use-query-forward";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function AuthFooterLink({ href, children, className }: Props) {
  const { queryToForward } = useAuthQueryForward();
  return (
    <a href={`${href}${queryToForward}`} className={className}>
      {children}
    </a>
  );
}
