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
      <title>NeoLuxSat | Інтернет, ТБ та Системи Безпеки</title>
      <meta
        name="description"
        content="Підключіть надійний оптоволоконний інтернет, інтерактивне телебачення та сучасні системи безпеки від NeoLuxSat. Найкращі рішення для вашого дому та бізнесу."
      />

      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="NeoLuxSat | Інтернет, ТБ та Системи Безпеки"
      />
      <meta
        property="og:description"
        content="Надійний інтернет, ТБ та системи безпеки. Найкращі рішення для вашого дому та бізнесу."
      />
      <meta
        property="og:url"
        content="https://www.google.com/url?sa=E&source=gmail&q=https://vash-provider.ua/"
      />
      <meta
        property="og:image"
        content="https://www.google.com/search?q=https://vash-provider.ua/images/og-home.jpg"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="NeoLuxSat | Інтернет, ТБ та Системи Безпеки"
      />
      <meta
        name="twitter:description"
        content="Надійний інтернет, ТБ та системи безпеки. Найкращі рішення для вашого дому та бізнесу."
      />
      <meta
        name="twitter:image"
        content="https://www.google.com/search?q=https://vash-provider.ua/images/og-home.jpg"
      />

      <HeroSection />
      <ServicesSection />
      <PropositionsSection />
      <ShopSection />
      <CtaSectionTemplate {...ctaData[0]} />
      <WhyUsSection />
      <FeedbacksSection />
      <CtaSectionTemplate {...ctaData[1]} />
      <ContactsSection />
      <FaqSection />
      <CtaSectionTemplate {...ctaData[2]} />
    </>
  );
};

export default HomePage;
