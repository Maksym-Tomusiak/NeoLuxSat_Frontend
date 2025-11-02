import ServicesPageTemplate from '@/components/common/ServicesPageTemplate';
import { getServicePageData } from '@/services/servicesPageData';
import IoTSection from './IoTSection';

const IoTPage = () => {
  const pageData = getServicePageData('iot');

  return (
    <ServicesPageTemplate {...pageData}>
      <IoTSection />
    </ServicesPageTemplate>
  );
};

export default IoTPage;
