import ContactsSection from '@/components/common/sections/ContactsSection/ContactsSection';
import WhyUsSection from '@/components/common/sections/WhyUsSection/WhyUsSection';
import WorkAreasSection from '@/components/common/sections/WorkAreasSection';
import StatsSection from './StatsSection/StatsSection';
import AboutUsSection from './AboutUsSection/AboutUsSection';
import HeroSection from './HeroSection/HeroSection';

const AboutPage = () => {
  return (
    <>
      <title>Про Компанію NeoLuxSat | Наша Місія та Команда</title>
      <meta
        name="description"
        content="Дізнайтеся більше про NeoLuxSat. Наша місія — надавати якісні та інноваційні телеком-послуги. Знайомтеся з нашою історією, цінностями та командою."
      />

      <meta property="og:type" content="article" />
      <meta
        property="og:title"
        content="Про Компанію NeoLuxSat | Наша Місія та Команда"
      />
      <meta
        property="og:description"
        content="Дізнайтеся про нашу місію, цінності та команду, що стоїть за NeoLuxSat."
      />
      <meta
        property="og:url"
        content="https://www.google.com/url?sa=E&source=gmail&q=https://vash-provider.ua/about"
      />
      <meta
        property="og:image"
        content="https://www.google.com/search?q=https://vash-provider.ua/images/og-about.jpg"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Про Компанію NeoLuxSat | Наша Місія та Команда"
      />
      <meta
        name="twitter:description"
        content="Дізнайтеся про нашу місію, цінності та команду, що стоїть за NeoLuxSat."
      />
      <meta
        name="twitter:image"
        content="https://www.google.com/search?q=https://vash-provider.ua/images/og-about.jpg"
      />

      <HeroSection />
      <StatsSection />
      <AboutUsSection />
      <WhyUsSection />
      <WorkAreasSection />
      <ContactsSection />
    </>
  );
};

export default AboutPage;
