import ServicesParnerSliderSection from '@/components/common/sections/ServicesParnerSliderSection';
import ServicesPageTemplate from '@/components/common/ServicesPageTemplate';
import { getServicePageData } from '@/services/servicesPageData';
import { useMemo } from 'react';

const TVPage = () => {
  const pageData = getServicePageData('tv');

  const description = useMemo(
    () => (
      <p className="font-noto text-primaryBlue text-[16px]/[120%} tracking-[-0.32px] max-w-[680px]">
        Ми співпрацюємо лише з надійними партнерами, серед яких{' '}
        <a
          href="https://media.1plus1.ua/"
          target="_blank"
          className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange font-medium"
        >
          1+1 media
        </a>{' '}
        з провідними телеканалами та преміальним контентом,{' '}
        <a
          href="https://viasat.com.ua/"
          target="_blank"
          className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange font-medium"
        >
          Viasat
        </a>{' '}
        — міжнародний супутниковий оператор із широким вибором каналів, та{' '}
        <a
          href="/"
          target="_blank"
          className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange font-medium"
        >
          Комлайн
        </a>{' '}
        — телеком-компанія, що забезпечує інтернет, телефонію й телебачення з
        високим рівнем сервісу.
      </p>
    ),
    []
  );

  return (
    <>
      <title>Інтерактивне Телебачення (IPTV) | NeoLuxSat</title>
      <meta
        name="description"
        content="Сучасне телебачення з сотнями каналів у високій якості. Доступ до архівів, відеотеки фільмів та можливість перегляду на будь-яких пристроях."
      />

      <meta property="og:type" content="article" />
      <meta
        property="og:title"
        content="Інтерактивне Телебачення (IPTV) | NeoLuxSat"
      />
      <meta
        property="og:description"
        content="Сотні каналів у високій якості. Доступ до архівів, відеотеки фільмів та перегляд на будь-яких пристроях."
      />
      <meta
        property="og:url"
        content="https://www.google.com/search?q=https://vash-provider.ua/services/tv"
      />
      <meta
        property="og:image"
        content="https://www.google.com/search?q=https://vash-provider.ua/images/og-tv.jpg"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Інтерактивне Телебачення (IPTV) | NeoLuxSat"
      />
      <meta
        name="twitter:description"
        content="Сотні каналів у високій якості. Доступ до архівів, відеотеки фільмів та перегляд на будь-яких пристроях."
      />
      <meta
        name="twitter:image"
        content="https://www.google.com/search?q=https://vash-provider.ua/images/og-tv.jpg"
      />

      <ServicesPageTemplate {...pageData}>
        <ServicesParnerSliderSection
          sliderKey={'tv'}
          description={description}
        />
      </ServicesPageTemplate>
    </>
  );
};

export default TVPage;
