import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <section className="bg-[#fcfbff] py-32">
      <div className="mx-auto max-w-[60ch] px-5 text-center">
        <p className="tabular text-[13px] font-bold tracking-[0.2em] text-[#7b4ba3]">
          404
        </p>
        <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-[#17131f]">
          Page not found
        </h1>
        <p className="mt-4 text-[15px] text-[#686276]">
          The page you&apos;re looking for has moved or doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-[#341657] px-6 py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
