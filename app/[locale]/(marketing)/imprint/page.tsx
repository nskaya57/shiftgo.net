import { setRequestLocale } from "next-intl/server";
import { PolicyPage } from "@/components/policy-page";

export const metadata = {
  title: "Imprint · ShiftGo",
  description: "Legal information about ShiftGo and the company behind it.",
};

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PolicyPage title="Imprint">
      <h2 className="pt-4 text-[22px] font-bold text-[#17131f]">
        Company information
      </h2>

      <div className="space-y-1">
        <p className="font-semibold text-[#17131f]">
          BE ADS Yazılım Teknoloji Sanayi ve Ticaret Limited Şirketi
        </p>
        <p>Antalya, Türkiye</p>
      </div>

      <h3 className="pt-6 text-[17px] font-semibold text-[#17131f]">
        Represented by
      </h3>
      <p>Enes Kaya, Managing Director</p>

      <h3 className="pt-6 text-[17px] font-semibold text-[#17131f]">
        Contact
      </h3>
      <p>
        Email:{" "}
        <a
          href="mailto:support@shiftgo.net"
          className="font-semibold text-[#341657] underline decoration-[#e8e0f1] underline-offset-2 hover:decoration-[#341657]"
        >
          support@shiftgo.net
        </a>
      </p>

      <h3 className="pt-6 text-[17px] font-semibold text-[#17131f]">
        Trade register
      </h3>
      <p>Registered in Antalya, Türkiye</p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">
        Liability for content
      </h2>
      <p>
        The contents of this website have been created with the utmost care.
        However, we cannot guarantee the contents&apos; accuracy, completeness,
        or topicality. As a service provider, we are responsible for our own
        content on these pages. However, we are not obligated to monitor
        transmitted or stored third-party information or to investigate
        circumstances that indicate illegal activity.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">
        Liability for links
      </h2>
      <p>
        Our website contains links to external third-party websites over
        whose content we have no influence. We therefore cannot accept any
        liability for this third-party content. The respective provider or
        operator of the linked pages is always responsible for their content.
      </p>

      <h2 className="pt-8 text-[22px] font-bold text-[#17131f]">
        Copyright
      </h2>
      <p>
        The content and works created on this website by the operator are
        subject to copyright law. Duplication, processing, distribution, or
        any form of commercialization beyond the scope of copyright law
        requires the written consent of the respective author or creator.
      </p>
    </PolicyPage>
  );
}
