import CtaIcon1 from '@/assets/svgs/ctas/cta-icon-1.svg';
import CtaIcon2 from '@/assets/svgs/ctas/cta-icon-2.svg';
import CtaIcon3 from '@/assets/svgs/ctas/cta-icon-3.svg';
import WhyUsSection from '@/components/common/sections/WhyUsSection/WhyUsSection';
import FeedbacksSection from './FeedbacksSection/FeedbacksSection';
import ServicesSection from './ServicesSection/ServicesSection';
import HeroSection from './HeroSection/HeroSection';
import ShopSection from './ShopSection/ShopSection';
import ContactsSection from '@/components/common/sections/ContactsSection/ContactsSection';
import FaqSection from './FaqSection/FaqSection';
import CtaSectionTemplate from '@/components/common/sections/CtaSectionTemplate';

const HomePage = () => {
  const ctaData = [
    {
      icon: <CtaIcon1 />,
      title: 'Інтернет-підключення: швидко, стабільно, надійно!',
      description: (
        <>
          Не зволікай — підключай швидкісний <br className="hidden xs:block" />
          інтернет уже сьогодні!
        </>
      ),
    },
    {
      icon: <CtaIcon2 />,
      title: 'Захист, що працює завжди!',
      description: (
        <>
          Будь на крок попереду — підключи <br className="hidden xs:block" />
          безперервну систему безпеки вже сьогодні!
        </>
      ),
    },
    {
      icon: <CtaIcon3 />,
      title: 'Усі ваші “А якщо…” зникнуть',
      description: (
        <>
          Залиште заявку — і ми детально пояснимо,{' '}
          <br className="hidden min-[670px]:block" />
          що і як працює.
        </>
      ),
    },
  ];

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ShopSection />
      <CtaSectionTemplate {...ctaData[0]} />
      <WhyUsSection />
      <FeedbacksSection />
      <CtaSectionTemplate {...ctaData[1]} />
      <ContactsSection />
      <FaqSection />
      <CtaSectionTemplate {...ctaData[2]} />
    </>
  );
};

export default HomePage;
