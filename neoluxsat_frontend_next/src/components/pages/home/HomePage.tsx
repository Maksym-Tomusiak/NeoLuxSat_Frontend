"use client";

import CtaIcon1 from "@/assets/svgs/ctas/cta-icon-1.svg?component";
import CtaIcon2 from "@/assets/svgs/ctas/cta-icon-2.svg?component";
import CtaIcon3 from "@/assets/svgs/ctas/cta-icon-3.svg?component";
import WhyUsSection from "@/components/common/sections/WhyUsSection/WhyUsSection";
import FeedbacksSection from "./FeedbacksSection/FeedbacksSection";
import ServicesSection from "./ServicesSection/ServicesSection";
import HeroSection from "./HeroSection/HeroSection";
import ShopSection from "./ShopSection/ShopSection";
import ContactsSection from "@/components/common/sections/ContactsSection/ContactsSection";
import FaqSection from "./FaqSection/FaqSection";
import CtaSectionTemplate from "@/components/common/sections/CtaSectionTemplate";
import PropositionsSection from "./PropositionsSection/PropositionsSection";

import FadeInFromDirection from "@/components/common/animations/FadeInFromDirection";
import { motion } from "framer-motion";

const HomePage = () => {
  const ctaData = [
    {
      icon: <CtaIcon1 />,
      title: (
        <>
          Інтернет-підключення: <br />
          швидко, стабільно, <br />
          надійно!
        </>
      ),
      description: (
        <>
          Не зволікай — підключай швидкісний <br className="hidden xs:block" />
          інтернет уже сьогодні!
        </>
      ),
    },
    {
      icon: <CtaIcon2 />,
      title: (
        <>
          Захист, що працює <br className="hidden min-[500px]:block" />
          завжди!
        </>
      ),
      description: (
        <>
          Будь на крок попереду — підключи <br className="hidden xs:block" />
          безперервну систему безпеки вже сьогодні!
        </>
      ),
    },
    {
      icon: <CtaIcon3 />,
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
    },
  ];

  return (
    <>
      <HeroSection />
      <ServicesSection />
      {/* ServicesSection handles its own internal animations */}
      <FadeInFromDirection direction="bottom">
        <PropositionsSection />
      </FadeInFromDirection>
      <ShopSection /> {/* ShopSection handles its own internal animations */}
      <FadeInFromDirection direction="bottom">
        <CtaSectionTemplate {...ctaData[0]} />
      </FadeInFromDirection>
      <WhyUsSection /> {/* WhyUsSection handles its own internal animations */}
      <FeedbacksSection />
      <FadeInFromDirection direction="bottom">
        <CtaSectionTemplate {...ctaData[1]} />
      </FadeInFromDirection>
      <ContactsSection />
      <FaqSection /> {/* FaqSection handles its own internal animations */}
      <FadeInFromDirection direction="bottom">
        <CtaSectionTemplate {...ctaData[2]} />
      </FadeInFromDirection>
    </>
  );
};

export default HomePage;
