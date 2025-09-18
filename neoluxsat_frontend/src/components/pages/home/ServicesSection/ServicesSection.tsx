import ServiceIcon1 from '@/assets/svgs/services/services-icon-1.svg';
import ServiceIcon2 from '@/assets/svgs/services/services-icon-2.svg';
import ServiceIcon3 from '@/assets/svgs/services/services-icon-3.svg';
import ServiceIcon4 from '@/assets/svgs/services/services-icon-4.svg';
import ServiceCard from './ServiceCard';
import { href } from 'react-router-dom';

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
    <section className="grid grid-cols-4 grid-rows-2 gap-[20px]">
      <h2 className="col-start-1 row-start-1 font-manrone text-primaryBlue/20 text-[88px]/[90%] font-semibold tracking-[-2px] ">
        Наші послуги
      </h2>

      <div className="col-start-3 row-start-1">
        <ServiceCard {...data[0]} />
      </div>
      <div className="col-start-4 row-start-1">
        <ServiceCard {...data[1]} />
      </div>
      <div className="col-start-2 row-start-2">
        <ServiceCard {...data[2]} />
      </div>
      <div className="col-start-3 row-start-2">
        <ServiceCard {...data[3]} />
      </div>
    </section>
  );
};

export default ServicesSection;
