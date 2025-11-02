import ServicesParnerSliderSection from '@/components/common/sections/ServicesParnerSliderSection';
import ServicesPageTemplate from '@/components/common/ServicesPageTemplate';
import { getServicePageData } from '@/services/servicesPageData';

const TVPage = () => {
  const pageData = getServicePageData('tv');

  return (
    <ServicesPageTemplate {...pageData}>
      <ServicesParnerSliderSection sliderKey={'tv'} />
    </ServicesPageTemplate>
  );
};

export default TVPage;
