import CtaIcon1 from '@/assets/svgs/cta-icon-1.svg';
import CtaIcon2 from '@/assets/svgs/cta-icon-2.svg';
import CtaIcon3 from '@/assets/svgs/cta-icon-3.svg';
import CtaSection from '@/components/common/CtaSection';
import WhyUsSection from './WhyUsSection/WhyUsSection';

const HomePage = () => {
  const ctaData = [
    {
      icon: <CtaIcon1 />,
      title: 'Інтернет-підключення: швидко, стабільно, надійно!',
      description: 'Не зволікай — підключай швидкісний інтернет уже сьогодні!',
    },
    {
      icon: <CtaIcon2 />,
      title: 'Захист, що працює завжди!',
      description:
        'Будь на крок попереду — підключи безперервну систему безпеки вже сьогодні!',
    },
    {
      icon: <CtaIcon3 />,
      title: 'Усі ваші “А якщо…” зникнуть',
      description: 'Залиште заявку — і ми детально пояснимо, що і як працює.',
    },
  ];

  return (
    <>
      <CtaSection {...ctaData[0]} />
      <WhyUsSection />
      <CtaSection {...ctaData[1]} />
      <CtaSection {...ctaData[2]} />
    </>
  );
};

export default HomePage;
