import type { ServiceKey, ServicePageData } from '@/types/serviceData';
import ServiceIcon1 from '@/assets/svgs/services/servicesPage/services-icon-1.svg';
import ServiceIcon2 from '@/assets/svgs/services/servicesPage/services-icon-2.svg';
import ServiceIcon3 from '@/assets/svgs/services/servicesPage/services-icon-3.svg';
import ServiceIcon4 from '@/assets/svgs/services/servicesPage/services-icon-4.svg';
import ServiceIcon5 from '@/assets/svgs/services/servicesPage/services-icon-5.svg';
import ServiceIcon6 from '@/assets/svgs/services/servicesPage/services-icon-6.svg';
import ServiceIcon7 from '@/assets/svgs/services/servicesPage/services-icon-7.svg';
import ServiceIcon8 from '@/assets/svgs/services/servicesPage/services-icon-8.svg';
import ServiceIcon9 from '@/assets/svgs/services/servicesPage/services-icon-9.svg';
import ServiceIcon10 from '@/assets/svgs/services/servicesPage/services-icon-10.svg';
import ServiceIcon11 from '@/assets/svgs/services/servicesPage/services-icon-11.svg';
import ServiceIcon12 from '@/assets/svgs/services/servicesPage/services-icon-12.svg';
import ServiceIcon13 from '@/assets/svgs/services/servicesPage/services-icon-13.svg';

const SERVICE_DATA_MAP: Record<ServiceKey, ServicePageData> = {
  internet: {
    heroTitle: 'Завжди на зв’язку: стабільний інтернет для дому та бізнесу', // Fast and reliable internet
    heroTitleClasses: 'max-[1440px]:max-w-[90%] min-[1440px]:max-w-[80%]',
    heroImagePath: '/images/internet-hero-image.png', // Placeholder path
    heroImageClasses:
      'mr-[40px] md:max-h-[420px] lg:max-h-[527px] xl:max-h-[600px]',
    categoryTitle: 'інтернет', // Internet Services
    serviceCardsData: {
      cardsData: [
        {
          icon: <ServiceIcon1 />,
          title: 'Підключення інтернету',
          points: [
            'Виїзд майстра та налаштування обладнання',
            'Прокладання кабелю до квартири чи офісу',
            'Монтаж та перевірка з’єднання',
          ],
          isTarif: false,
        },
        {
          icon: <ServiceIcon2 />,
          title: 'Обладнання та Wi-Fi',
          points: [
            'Налаштування Wi-Fi роутера',
            'Оптимізація покриття Wi-Fi у квартирі/офісі',
            'Підключення додаткових точок доступу',
          ],
          isTarif: false,
        },
        {
          icon: <ServiceIcon3 />,
          title: 'Тарифи та швидкості',
          points: [
            'Швидкість: від 50 до 1000 Мбіт/с',
            'Вартість:  від 50 до 350 грн',
            'Вартість підключення від 1 грн',
          ],
          isTarif: true,
          tarifHref: 'https://rivneisp.net/tariff',
          children: (
            <p className="font-noto text-[14px]/[120%] tracking-[-0.28px] text-primaryWhite/80">
              Для уточнення інформації перейдіть{' '}
              <br className="hidden 2xs:block" />
              на сайт{' '}
              <a
                href="https://rivneisp.net/tariff"
                target="_blank"
                className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange/80"
              >
                Rivne ISP
              </a>{' '}
              або залиште заявку, <br className="hidden 2xs:block" />і ми
              зв’яжемося з вами.
            </p>
          ),
        },
        {
          icon: <ServiceIcon4 />,
          title: 'Сервіс та підтримка',
          points: [
            'Ремонт та заміна обладнання',
            'Виїзд спеціаліста у разі неполадок',
            'Онлайн-консультації',
          ],
          isTarif: false,
        },
      ],
      headerDescription: (
        <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryBlue max-w-[330px]">
          <span className="font-noto text-[18px]/[120%] tracking-[-0.36px] font-semibold text-primaryOrange">
            Зверніть увагу:
          </span>{' '}
          NeoLuxSat не є самостійним інтернет-провайдером.{' '}
          <br className="hidden 2xs:block" />
          Ми спеціалізуємося на підключенні <br className="hidden 2xs:block" />
          та обслуговуванні послуг інтернету <br className="hidden 2xs:block" />
          від провайдера{' '}
          <a
            href="https://rivneisp.net/tariff"
            target="_blank"
            className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange"
          >
            Rivne ISP
          </a>{' '}
          та{' '}
          <a
            href="https://uar.net/internet-business/"
            target="_blank"
            className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange"
          >
            UARnet
          </a>
          .
        </p>
      ),
    },
  },
  tv: {
    heroTitle: 'ТБ, фільми та серіали — завжди у найкращій якості', // High-quality television
    heroTitleClasses: 'max-[1440px]:max-w-[100%] min-[1440px]:max-w-[90%]',
    heroImagePath: '/images/tv-hero-image.png', // Placeholder path
    heroImageClasses:
      'md:mt-[70px] md:max-h-[350px] lg:mt-[30px] lg:max-h-[500px] xl:max-h-[580px] xl:mt-[20px]',
    categoryTitle: 'телебачення', // Television Services
    serviceCardsData: {
      cardsData: [
        {
          icon: <ServiceIcon5 />,
          title: 'Мультимедійна платформа',
          points: [
            'Доступ до ексклюзивних телеканалів.',
            <>
              Бібліотека фільмів і серіалів <br className="hidden 2xs:block" />
              від 1+1 media.
            </>,
            <>
              Повноцінний центр розваг <br className="hidden 2xs:block" />у
              вашому домі.
            </>,
          ],
          isTarif: false,
        },
        {
          icon: <ServiceIcon6 />,
          title: '1+1 media',
          points: [
            'Найбільший медіахолдинг України.',
            'Канали: 1+1, 2+2, ТЕТ та інші.',
            <>
              Доступ до новин, шоу, фільмів <br className="hidden 2xs:block" />
              та серіалів для всієї родини.
            </>,
          ],
          isTarif: false,
        },
        {
          icon: <ServiceIcon7 />,
          title: 'Viasat ТБ',
          points: [
            '100+ українських та світових каналів',
            <>
              Пакети для всієї родини: <br className="hidden 2xs:block" />
              новини, спорт, кіно, пізнавальні
            </>,
            'Вартість: від 99 грн/міс',
          ],
          isTarif: true,
          tarifHref: 'https://viasat.com.ua/tariffs',
          children: (
            <p className="font-noto text-[14px]/[120%] tracking-[-0.28px] text-primaryWhite/80">
              Для уточнення інформації перейдіть{' '}
              <br className="hidden 2xs:block" />
              на сайт{' '}
              <a
                href="https://viasat.com.ua/tariffs"
                target="_blank"
                className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange/80"
              >
                Viasat
              </a>{' '}
              або залиште заявку, <br className="hidden 2xs:block" />і ми
              зв’яжемося з вами.
            </p>
          ),
        },
        {
          icon: <ServiceIcon8 />,
          title: 'Налаштування телебачення',
          points: [
            'Установка та налаштування антен Т2 і супутникових систем.',
            <>
              Професійне підключення <br className="hidden 2xs:block" />
              Smart TV.
            </>,
            'Стабільний сигнал без збоїв.',
          ],
          isTarif: false,
        },
      ],
    },
  },
  iot: {
    heroTitle: (
      <>
        Підключай.
        <br />
        Керуй.
        <br />
        Автоматизуй.
        <br />
        Все з IoT та M2M
      </>
    ), // Smart home and IoT solutions
    heroTitleClasses:
      'mx-auto md:mx-0 max-[1440px]:max-w-[100%] min-[1440px]:min-w-[100%]',
    heroImagePath: '/images/iot-hero-image.png', // Placeholder path
    heroImageClasses:
      'mr-[40px] md:mt-[40px] md:max-h-[380px] lg:mt-0 lg:max-h-[525px] xl:max-h-[590px]',
    categoryTitle: 'iot', // I  oT and Smart Home
    serviceCardsData: {
      cardsData: [
        {
          icon: <ServiceIcon12 />,
          title: (
            <>
              Підключення <br className="hidden 2xs:block" />
              IoT-рішень
            </>
          ),
          points: [
            <>
              Інтеграція сенсорів <br className="hidden 2xs:block" />
              та контролерів у виробничі процеси.
            </>,
            <>
              Віддалений моніторинг <br className="hidden 2xs:block" />
              та управління обладнанням.
            </>,
            <>
              Автоматизація енергоспоживання <br className="hidden 2xs:block" />
              та оптимізація витрат.
            </>,
          ],
          isTarif: false,
        },
        {
          icon: <ServiceIcon13 />,
          title: (
            <>
              Рішення для бізнесу <br className="hidden 2xs:block" />
              та дому
            </>
          ),
          points: [
            <>
              “Розумні” системи безпеки <br className="hidden 2xs:block" />
              та відеоспостереження.
            </>,
            <>
              Контроль доступу <br className="hidden 2xs:block" />
              та автоматизація робочих процесів.
            </>,
            <>
              Інтеграція IoT у побутові пристрої для створення{' '}
              <br className="hidden 2xs:block" />
              Smart Home.
            </>,
          ],
          isTarif: false,
        },
        {
          icon: <ServiceIcon7 />,
          title: 'M2M-комунікації',
          points: [
            <>
              Надійний обмін даними <br className="hidden 2xs:block" />
              між обладнанням у режимі реального часу.
            </>,
            <>
              Впровадження систем <br className="hidden 2xs:block" />
              телеметрії для промисловості <br className="hidden 2xs:block" />
              та транспорту.
            </>,
            'Безпечні канали зв’язку для критично важливих процесів.',
          ],
          isTarif: false,
        },
        {
          icon: <ServiceIcon4 />,
          title: (
            <>
              Підтримка <br className="hidden 2xs:block" />
              та обслуговування
            </>
          ),
          points: [
            'Цілодобовий моніторинг роботи IoT та M2M-систем.',
            <>
              Оновлення програмного забезпечення та захист{' '}
              <br className="hidden 2xs:block" />
              від кібератак.
            </>,
            <>
              Консультації та адаптація <br className="hidden 2xs:block" />
              рішень під індивідуальні потреби.
            </>,
          ],
          isTarif: false,
        },
      ],
    },
  },
  security: {
    heroTitle: 'Системи безпеки: ваш дім та бізнес завжди під захистом', // Comprehensive security systems
    heroTitleClasses:
      'max-lg:max-w-[80%] min-lg:max-w-[90%] min-[1440px]:max-w-[80%]',
    heroImagePath: '/images/security-hero-image.png', // Placeholder path
    heroImageClasses:
      'md:mt-[30px] md:max-h-[400px] lg:mt-[30px] lg:max-h-[500px] xl:max-h-[580px] xl:mt-[20px] mr-[70px]',
    categoryTitle: 'безпека', // Security and Monitoring Services
    serviceCardsData: {
      cardsData: [
        {
          icon: <ServiceIcon9 />,
          title: 'Встановлення систем відеоспостереження',
          points: [
            <>
              Монтаж камер у приміщеннях <br className="hidden 2xs:block" />
              та на вулиці.
            </>,
            <>
              Підключення до <br className="hidden 2xs:block" />
              онлайн-доступу.
            </>,
            'Запис і збереження архіву.',
          ],
          isTarif: false,
        },
        {
          icon: <ServiceIcon10 />,
          title: 'Системи сигналізації AJAX',
          points: [
            'Надійний захист без прокладання кабелів.',
            <>
              Датчики руху, відкриття дверей, диму, затоплення{' '}
              <br className="hidden 2xs:block" />
              чи відеоспостереження.
            </>,
            'Стильні пристрої, що гармонійно вписуються в будь-який інтер’єр.',
          ],
          isTarif: false,
        },
        {
          icon: <ServiceIcon11 />,
          title: 'Інтеграція “розумного дому”',
          points: [
            'Автоматичне керування світлом, температурою та технікою.',
            'Сценарії “Вдома/Не вдома/Ніч” для зручності та безпеки.',
            'Повний контроль через мобільний додаток чи голосові команди.',
          ],
          isTarif: false,
        },
        {
          icon: <ServiceIcon4 />,
          title: 'Підтримка та обслуговування',
          points: [
            'Регулярна перевірка обладнання.',
            'Технічна підтримка 24/7.',
            'Консультації та оновлення систем.',
          ],
          isTarif: false,
        },
      ],
    },
  },
};

/**
 * Retrieves specific content data for a service page based on its key.
 * @param key The identifier for the service (e.g., 'internet').
 * @returns The ServicePageData object corresponding to the key.
 * @throws Error if an invalid key is provided.
 */
export const getServicePageData = (key: ServiceKey): ServicePageData => {
  const data = SERVICE_DATA_MAP[key];

  if (!data) {
    throw new Error(`Service key "${key}" is invalid or data is missing.`);
  }

  return data;
};
