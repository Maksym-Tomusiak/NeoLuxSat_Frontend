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
      href: '#',
      title: 'Підключення інтернету',
      description:
        'Ми підключаємо інтернет у квартирах, приватних будинках та офісах.',
    },
    {
      icon: <ServiceIcon2 />,
      href: '#',
      title: 'IoT та M2M',
      description:
        'Підключаємо розумні рішення для автоматизації процесів, контролю та безперервного зв’язку.',
    },
    {
      icon: <ServiceIcon3 />,
      href: '#',
      title: 'Системи безпеки',
      description:
        'Проєктуємо та встановлюємо охоронні системи для квартир, будинків та бізнесу.',
    },
    {
      icon: <ServiceIcon4 />,
      href: '#',
      title: 'Налаштування телебачення',
      description:
        'Ми швидко й професійно налаштуємо супутникове, кабельне або Smart TV.',
    },
  ];

  return (
    <section
      id="services"
      className="
        grid gap-[16px] sm:gap-[20px]
        grid-cols-1
        md:grid-cols-2 md:justify-items-center
        lg:grid-cols-4 lg:grid-rows-2
      "
    >
      {/* Header */}
      <SectionHeader
        isCta={false}
        className="
          w-full
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
      <div className="lg:col-start-3 lg:row-start-1">
        <ServiceCard {...data[0]} />
      </div>
      <div className="lg:col-start-4 lg:row-start-1">
        <ServiceCard {...data[1]} />
      </div>
      <div className="lg:col-start-2 lg:row-start-2">
        <ServiceCard {...data[2]} />
      </div>
      <div className="lg:col-start-3 lg:row-start-2">
        <ServiceCard {...data[3]} />
      </div>
    </section>
  );
};

export default ServicesSection;
