"use client";

import CtaIcon from "@/assets/svgs/ctas/cta-icon-3.svg?component";
import CtaSectionTemplate from "@/components/common/sections/CtaSectionTemplate";
import ContactsSection from "@/components/common/sections/ContactsSection/ContactsSection";
import HeroSection from "./HeroSection/HeroSection";
import MaterialsSection from "./MaterialsSection/MaterialsSection";
import NetworkSection from "./NetworkSection/NetworkSection";
import FadeInFromDirection from "@/components/common/animations/FadeInFromDirection";

const SupportPage = () => {
  const ctaData = {
    icon: <CtaIcon />,
    title: (
      <>
        Усі ваші <br className="hidden max-[500px]:block" />
        “А якщо…” <br className="hidden min-[500px]:block" />
        зникнуть
      </>
    ),
    description: (
      <>
        Залиште заявку — і ми детально пояснимо,{" "}
        <br className="hidden min-[670px]:block" />
        що і як працює.
      </>
    ),
  };
  return (
    <>
      <HeroSection />
      <MaterialsSection />
      <NetworkSection />
      <ContactsSection />
      <FadeInFromDirection direction="bottom">
        <CtaSectionTemplate {...ctaData} />
      </FadeInFromDirection>
    </>
  );
};

export default SupportPage;
