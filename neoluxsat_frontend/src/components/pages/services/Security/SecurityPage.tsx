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
    <ServicesPageTemplate {...pageData}>
      <ServicesParnerSliderSection
        sliderKey={'security'}
        description={description}
      />
    </ServicesPageTemplate>
  );
};

export default SecurityPage;
