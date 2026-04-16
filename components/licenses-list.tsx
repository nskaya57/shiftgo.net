"use client";

import { useMemo, useState } from "react";

export type LicensePackage = {
  name: string;
  version: string;
  license: string;
  repository: string | null;
  publisher: string | null;
};

type Props = {
  packages: LicensePackage[];
  generatedAt: string;
};

export function LicensesList({ packages, generatedAt }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return packages;
    return packages.filter(
      (pkg) =>
        pkg.name.toLowerCase().includes(needle) ||
        pkg.license.toLowerCase().includes(needle)
    );
  }, [query, packages]);

  const formattedDate = useMemo(() => {
    try {
      return new Date(generatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return generatedAt;
    }
  }, [generatedAt]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 text-[14px] text-[#686276]">
        <p>
          ShiftGo is built on top of {packages.length} open-source packages.
          We&apos;re grateful for the work of everyone who maintains them.
        </p>
        <p className="text-[12px] uppercase tracking-[0.12em] text-[#a49fb0]">
          Last regenerated · {formattedDate}
        </p>
      </div>

      <div>
        <label htmlFor="license-search" className="sr-only">
          Search packages
        </label>
        <input
          id="license-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by package or license…"
          className="w-full rounded-[12px] border border-[#e8e0f1] bg-white px-4 py-3 text-[15px] text-[#17131f] outline-none transition-colors placeholder:text-[#a49fb0] focus:border-[#341657] focus:ring-2 focus:ring-[#341657]/20"
        />
      </div>

      <ul className="space-y-1.5">
        {filtered.map((pkg) => (
          <li
            key={`${pkg.name}@${pkg.version}`}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-[10px] border border-[#ece7f2] bg-white px-4 py-3"
          >
            <div className="flex min-w-0 items-baseline gap-2">
              {pkg.repository ? (
                <a
                  href={pkg.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[14px] font-semibold text-[#17131f] hover:text-[#341657] hover:underline"
                >
                  {pkg.name}
                </a>
              ) : (
                <span className="font-mono text-[14px] font-semibold text-[#17131f]">
                  {pkg.name}
                </span>
              )}
              <span className="text-[12px] text-[#a49fb0]">{pkg.version}</span>
            </div>
            <span className="inline-flex items-center rounded-full bg-[#f4eeff] px-2.5 py-0.5 text-[12px] font-medium text-[#341657]">
              {pkg.license}
            </span>
          </li>
        ))}
        {filtered.length === 0 ? (
          <li className="rounded-[10px] border border-dashed border-[#e8e0f1] bg-[#fcfbff] px-4 py-6 text-center text-[14px] text-[#a49fb0]">
            No packages match &ldquo;{query}&rdquo;.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
