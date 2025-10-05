import CtaIcon from '@/assets/svgs/ctas/cta-icon-3.svg';
import CtaSectionTemplate from '@/components/common/sections/CtaSectionTemplate';
import ContactsSection from '@/components/common/sections/ContactsSection';
import HeroSection from './HeroSection/HeroSection';
import MaterialsSection from './MaterialsSection/MaterialsSection';
import NetworkSection from './NetworkSection/NetworkSection';

const SupportPage = () => {
  const ctaData = {
    icon: <CtaIcon />,
    title: 'Усі ваші “А якщо…” зникнуть',
    description: 'Залиште заявку — і ми детально пояснимо, що і як працює.',
  };
  return (
    <>
      <HeroSection />
      <MaterialsSection />
      <NetworkSection />
      <ContactsSection />
      <CtaSectionTemplate {...ctaData} />
    </>
  );
};

export default SupportPage;
