import ServicesPageTemplate from '@/components/common/ServicesPageTemplate';
import { getServicePageData } from '@/services/servicesPageData';
import IoTSection from './IoTSection';

const IoTPage = () => {
  const pageData = getServicePageData('iot');

  return (
    <>
      <title>Рішення "Розумний Дім" (IoT) | NeoLuxSat</title>
      <meta
        name="description"
        content="Керуйте вашим будинком зі смартфона. Інтеграція розумних пристроїв (IoT) для автоматизації освітлення, клімату та безпеки вашого житла."
      />

      <meta property="og:type" content="article" />
      <meta
        property="og:title"
        content="Рішення 'Розумний Дім' (IoT) | NeoLuxSat"
      />
      <meta
        property="og:description"
        content="Керуйте вашим будинком зі смартфона. Автоматизація освітлення, клімату та безпеки вашого житла."
      />
      <meta
        property="og:url"
        content="https://www.google.com/search?q=https://vash-provider.ua/services/iot"
      />
      <meta
        property="og:image"
        content="https://www.google.com/search?q=https://vash-provider.ua/images/og-iot.jpg"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Рішення 'Розумний Дім' (IoT) | NeoLuxSat"
      />
      <meta
        name="twitter:description"
        content="Керуйте вашим будинком зі смартфона. Автоматизація освітлення, клімату та безпеки вашого житла."
      />
      <meta
        name="twitter:image"
        content="https://www.google.com/search?q=https://vash-provider.ua/images/og-iot.jpg"
      />

      <ServicesPageTemplate {...pageData}>
        <IoTSection />
      </ServicesPageTemplate>
    </>
  );
};

export default IoTPage;
