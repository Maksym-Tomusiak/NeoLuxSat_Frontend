import ServicesParnerSliderSection from '@/components/common/sections/ServicesParnerSliderSection';
import ServicesPageTemplate from '@/components/common/ServicesPageTemplate';
import { getServicePageData } from '@/services/servicesPageData';
import { useMemo } from 'react';

const SecurityPage = () => {
  const pageData = getServicePageData('security');

  const description = useMemo(
    () => (
      <p className="font-noto text-primaryBlue text-[16px]/[120%} tracking-[-0.32px] max-w-[680px]">
        <a
          href="https://support.ajax.systems/uk/"
          target="_blank"
          className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange font-medium"
        >
          AJAX
        </a>{' '}
        — це сучасна бездротова система безпеки європейського рівня, що
        забезпечує повний контроль за будинком чи офісом через мобільний
        застосунок. Вона поєднує датчики руху, відкриття дверей, відеокамери та
        сирени в єдину екосистему, миттєво сповіщає про небезпеку й надійно
        захищена від саботажу та технічних збоїв.
      </p>
    ),
    []
  );

  return (
    <>
      <title>Системи Безпеки та Відеонагляд | NeoLuxSat</title>
      <meta
        name="description"
        content="Захистіть свій дім та бізнес. Пропонуємо встановлення сучасних систем безпеки, датчиків Ajax та професійного відеонагляду з доступом 24/7."
      />

      <meta property="og:type" content="article" />
      <meta
        property="og:title"
        content="Системи Безпеки та Відеонагляд | NeoLuxSat"
      />
      <meta
        property="og:description"
        content="Захистіть свій дім та бізнес. Встановлення систем Ajax та професійного відеонагляду з доступом 24/7."
      />
      <meta
        property="og:url"
        content="https://www.google.com/search?q=https://vash-provider.ua/services/security"
      />
      <meta
        property="og:image"
        content="https://www.google.com/search?q=https://vash-provider.ua/images/og-security.jpg"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Системи Безпеки та Відеонагляд | NeoLuxSat"
      />
      <meta
        name="twitter:description"
        content="Захистіть свій дім та бізнес. Встановлення систем Ajax та професійного відеонагляду з доступом 24/7."
      />
      <meta
        name="twitter:image"
        content="https://www.google.com/search?q=https://vash-provider.ua/images/og-security.jpg"
      />

      <ServicesPageTemplate {...pageData}>
        <ServicesParnerSliderSection
          sliderKey={'security'}
          description={description}
        />
      </ServicesPageTemplate>
    </>
  );
};

export default SecurityPage;
