import CtaIcon from '@/assets/svgs/ctas/cta-icon-3.svg';
import CtaSectionTemplate from '@/components/common/sections/CtaSectionTemplate';
import ContactsSection from '@/components/common/sections/ContactsSection/ContactsSection';
import HeroSection from './HeroSection/HeroSection';
import MaterialsSection from './MaterialsSection/MaterialsSection';
import NetworkSection from './NetworkSection/NetworkSection';

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
        Залиште заявку — і ми детально пояснимо,{' '}
        <br className="hidden min-[670px]:block" />
        що і як працює.
      </>
    ),
  };
  return (
    <>
      <title>Підтримка Клієнтів | Допомога, Статус Мережі | NeoLuxSat</title>
      <meta
        name="description"
        content="Потрібна допомога? Знайдіть корисні матеріали, перевірте статус мережі або зв'яжіться з нашою технічною підтримкою. Ми завжди на зв'язку."
      />

      <meta property="og:type" content="article" />
      <meta property="og:title" content="Підтримка Клієнтів | NeoLuxSat" />
      <meta
        property="og:description"
        content="Потрібна допомога? Знайдіть корисні матеріали, перевірте статус мережі або зв'яжіться з нашою технічною підтримкою."
      />
      <meta
        property="og:url"
        content="https://www.google.com/search?q=https://vash-provider.ua/support"
      />
      <meta
        property="og:image"
        content="https://www.google.com/search?q=https://vash-provider.ua/images/og-support.jpg"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Підтримка Клієнтів | NeoLuxSat" />
      <meta
        name="twitter:description"
        content="Потрібна допомога? Знайдіть корисні матеріали, перевірте статус мережі або зв'яжіться з нашою технічною підтримкою."
      />
      <meta
        name="twitter:image"
        content="https://www.google.com/search?q=https://vash-provider.ua/images/og-support.jpg"
      />

      <HeroSection />
      <MaterialsSection />
      <NetworkSection />
      <ContactsSection />
      <CtaSectionTemplate {...ctaData} />
    </>
  );
};

export default SupportPage;
