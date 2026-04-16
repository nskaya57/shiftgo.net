import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { setRequestLocale } from "next-intl/server";
import { PolicyPage } from "@/components/policy-page";
import { LicensesList, type LicensePackage } from "@/components/licenses-list";

export const metadata = {
  title: "Open source licenses · ShiftGo",
  description:
    "ShiftGo is built on top of many great open-source projects. Here's the full list.",
};

type LicensesFile = {
  generatedAt: string;
  packageCount: number;
  packages: LicensePackage[];
};

async function loadLicenses(): Promise<LicensesFile> {
  try {
    const path = resolve(process.cwd(), "public/licenses.json");
    const raw = await readFile(path, "utf8");
    return JSON.parse(raw) as LicensesFile;
  } catch {
    return { generatedAt: new Date().toISOString(), packageCount: 0, packages: [] };
  }
}

export default async function LicensesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = await loadLicenses();

  return (
    <PolicyPage title="Open source licenses">
      <LicensesList
        packages={data.packages}
        generatedAt={data.generatedAt}
      />
    </PolicyPage>
  );
}
