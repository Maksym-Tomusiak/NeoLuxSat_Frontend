import ServiceIcon1 from '@/assets/svgs/services/services-icon-1.svg';
import ServiceIcon2 from '@/assets/svgs/services/services-icon-2.svg';
import ServiceIcon3 from '@/assets/svgs/services/services-icon-3.svg';
import ServiceIcon4 from '@/assets/svgs/services/services-icon-4.svg';
import ServiceCard from './ServiceCard';
import SectionHeader from '@/components/common/SectionHeader';

const ServicesSection = () => {
  const data = [
    {
      icon: <ServiceIcon1 />,
      href: '/services/internet',
      title: 'Підключення інтернету',
      description:
        'Ми підключаємо інтернет у квартирах, приватних будинках та офісах.',
    },
    {
      icon: <ServiceIcon2 />,
      href: '/services/iot',
      title: 'IoT та M2M',
      description:
        'Підключаємо розумні рішення для автоматизації процесів, контролю та безперервного зв’язку.',
    },
    {
      icon: <ServiceIcon3 />,
      href: '/services/security',
      title: 'Системи безпеки',
      description:
        'Проєктуємо та встановлюємо охоронні системи для квартир, будинків та бізнесу.',
    },
    {
      icon: <ServiceIcon4 />,
      href: '/services/tv',
      title: 'Налаштування телебачення',
      description:
        'Ми швидко й професійно налаштуємо супутникове, кабельне або Smart TV.',
    },
  ];

  return (
    <section id="services">
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col lg:flex-row gap-[40px] lg:items-start justify-between flex-wrap">
          <SectionHeader
            isCta={false}
            className="
          w-fit
          row-start-1
          md:col-span-2 md:justify-self-center
          lg:col-span-1 lg:row-start-1 lg:col-start-1 lg:justify-self-start
        "
          >
            Наші <br className="hidden md:inline" />
            послуги
          </SectionHeader>

          {/* Cards */}
          {/* Phone → stacked 1 col
          Tablet → 2x2 grid centered
          Desktop → manual placement */}
          <div className="flex gap-[20px] w-full lg:w-fit justify-center flex-wrap">
            <div className="max-[712px]:w-full min-[712px]:max-w-[330px]">
              <ServiceCard {...data[0]} />
            </div>
            <div className="max-[712px]:w-full min-[712px]:max-w-[330px]">
              <ServiceCard {...data[1]} />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-[20px] mx-auto flex-wrap">
          <div className="max-[712px]:w-full min-[712px]:max-w-[330px]">
            <ServiceCard {...data[2]} />
          </div>
          <div className="max-[712px]:w-full min-[712px]:max-w-[330px]">
            <ServiceCard {...data[3]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
