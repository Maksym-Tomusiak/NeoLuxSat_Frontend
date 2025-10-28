import ServicesParnerSliderSection from '@/components/common/sections/ServicesParnerSliderSection';
import ServicesPageTemplate from '@/components/common/ServicesPageTemplate';
import { getServicePageData } from '@/services/servicesPageData';
import { useMemo } from 'react';

const InternetPage = () => {
  const pageData = getServicePageData('internet');

  const description = useMemo(
    () => (
      <p className="font-noto text-primaryBlue text-[16px]/[120%} tracking-[-0.32px] max-w-[680px]">
        Ми співпрацюємо з провайдерами{' '}
        <a
          href="https://uar.net/internet-business/"
          target="_blank"
          className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange font-medium"
        >
          UARnet
        </a>{' '}
        та{' '}
        <a
          href="https://rivneisp.net/tariff"
          target="_blank"
          className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange font-medium"
        >
          Rivne ISP
        </a>{' '}
        , щоб забезпечити вам найкращі рішення.{' '}
        <a
          href="https://uar.net/internet-business/"
          target="_blank"
          className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange font-medium"
        >
          UARnet
        </a>
        {''}
        — національний провайдер для освітніх і наукових установ із власною
        оптоволоконною магістраллю та прямими з’єднаннями з європейськими
        мережами, <br className="hidden min-[700px]:block" />
        що гарантує високу швидкість і стабільність інтернету.{' '}
        <a
          href="https://rivneisp.net/tariff"
          target="_blank"
          className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange font-medium"
        >
          Rivne ISP
        </a>{' '}
        — регіональний провайдер із Рівненщини, який спеціалізується на
        оптоволоконному підключенні <br className="hidden min-[700px]:block" />
        зі швидкістю до 1000 Мбіт/с.
      </p>
    ),
    []
  );

  return (
    <ServicesPageTemplate {...pageData}>
      <ServicesParnerSliderSection
        sliderKey={'internet'}
        description={description}
      />
    </ServicesPageTemplate>
  );
};

export default InternetPage;
