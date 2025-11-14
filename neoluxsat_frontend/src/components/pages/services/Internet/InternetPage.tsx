import ServicesParnerSliderSection from '@/components/common/sections/ServicesParnerSliderSection';
import ServicesPageTemplate from '@/components/common/ServicesPageTemplate';
import { getServicePageData } from '@/services/servicesPageData';
import { useMemo } from 'react';

const InternetPage = () => {
  const pageData = getServicePageData('internet');

  const description = useMemo(
    () => (
      <p className="font-noto text-primaryBlue text-[16px]/[120%} tracking-[-0.32px] max-w-[330px]">
        Ми співпрацюємо з провайдером
        <br />
        <a
          href="https://rivneisp.net/tariff"
          target="_blank"
          className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange font-medium"
        >
          Rivne ISP
        </a>{' '}
        , щоб забезпечити вам найкращі рішення.{' '}
        <a
          href="https://rivneisp.net/tariff"
          target="_blank"
          className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange font-medium"
        >
          Rivne ISP
        </a>{' '}
        — регіональний провайдер із Рівненщини, який спеціалізується на
        оптоволоконному підключенні зі швидкістю до 1000 Мбіт/с.
      </p>
    ),
    []
  );

  return (
    <>
      <title>Оптоволоконний Інтернет | Швидкісні Тарифи від NeoLuxSat</title>
      <meta
        name="description"
        content="Підключіть швидкісний оптоволоконний інтернет до 1 Гбіт/с. Пропонуємо стабільне з'єднання та вигідні тарифи для дому та офісу."
      />

      <meta property="og:type" content="article" />
      <meta property="og:title" content="Оптоволоконний Інтернет | NeoLuxSat" />
      <meta
        property="og:description"
        content="Підключіть швидкісний оптоволоконний інтернет до 1 Гбіт/с. Стабільне з'єднання та вигідні тарифи."
      />
      <meta
        property="og:url"
        content="https://www.google.com/search?q=https://vash-provider.ua/services/internet"
      />
      <meta
        property="og:image"
        content="https://www.google.com/search?q=https://vash-provider.ua/images/og-internet.jpg"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Оптоволоконний Інтернет | NeoLuxSat"
      />
      <meta
        name="twitter:description"
        content="Підключіть швидкісний оптоволоконний інтернет до 1 Гбіт/с. Стабільне з'єднання та вигідні тарифи."
      />
      <meta
        name="twitter:image"
        content="https://www.google.com/search?q=https://vash-provider.ua/images/og-internet.jpg"
      />

      <ServicesPageTemplate {...pageData}>
        <ServicesParnerSliderSection
          sliderKey={'internet'}
          description={description}
        />
      </ServicesPageTemplate>
    </>
  );
};

export default InternetPage;
