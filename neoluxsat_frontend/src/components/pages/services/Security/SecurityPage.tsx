import ServicesParnerSliderSection from '@/components/common/sections/ServicesParnerSliderSection';
import ServicesPageTemplate from '@/components/common/ServicesPageTemplate';
import { getServicePageData } from '@/services/servicesPageData';

const SecurityPage = () => {
  const pageData = getServicePageData('security');

  return (
    <ServicesPageTemplate {...pageData}>
      <ServicesParnerSliderSection sliderKey={'security'} />
    </ServicesPageTemplate>
  );
};

export default SecurityPage;
