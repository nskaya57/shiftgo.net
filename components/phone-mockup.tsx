import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";

type PhoneMockupProps = {
  src?: string;
  alt: string;
  size?: "default" | "hero";
  rotation?: number;
  className?: string;
};

export function PhoneMockup({
  src,
  alt,
  size = "default",
  rotation = 0,
  className,
}: PhoneMockupProps) {
  const dims = size === "hero" ? { w: 320, h: 680 } : { w: 240, h: 510 };
  const resolvedSrc = src && screenshotExists(src) ? src : undefined;
  const ratio = dims.h / dims.w;

  return (
    <figure
      className={`${className ?? ""} w-full`}
      style={{
        maxWidth: dims.w,
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
      }}
    >
      <div
        className="relative w-full overflow-hidden border-[10px] border-[#17131f] bg-[#17131f] elev-3"
        style={{
          aspectRatio: `${dims.w} / ${dims.h}`,
          borderRadius: size === "hero" ? 52 : 42,
        }}
      >
        <div
          aria-hidden
          className="absolute left-1/2 top-2 z-10 h-[22px] -translate-x-1/2 rounded-full bg-[#17131f]"
          style={{ width: size === "hero" ? 104 : 84 }}
        />

        {resolvedSrc ? (
          <Image
            src={resolvedSrc}
            alt={alt}
            fill
            sizes={`${dims.w}px`}
            className="object-contain"
            priority={size === "hero"}
          />
        ) : (
          <PhonePlaceholder label={alt} />
        )}
      </div>
    </figure>
  );
}

function PhonePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#f4eeff] px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white elev-1">
        <div
          aria-hidden
          className="h-6 w-6 rounded-[6px] brand-gradient"
        />
      </div>
      <p className="text-[15px] font-semibold leading-snug text-[#341657]">
        {label}
      </p>
      <p className="text-[12px] font-medium text-[#686276]">
        Screenshot coming soon
      </p>
    </div>
  );
}

function screenshotExists(src: string): boolean {
  if (!src.startsWith("/")) return true;
  try {
    return existsSync(path.join(process.cwd(), "public", src.slice(1)));
  } catch {
    return false;
  }
}
