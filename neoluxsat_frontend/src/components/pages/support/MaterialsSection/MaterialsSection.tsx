import ServiceIcon1 from '@/assets/svgs/services/services-icon-1.svg';
import ServiceIcon2 from '@/assets/svgs/services/services-icon-2.svg';
import ServiceIcon3 from '@/assets/svgs/services/services-icon-3.svg';
import ServiceIcon4 from '@/assets/svgs/services/services-icon-4.svg';
import MaterialsCard from './MaterialsSectionCard';
import SectionHeader from '@/components/common/SectionHeader';

const MaterialsSection = () => {
  const data = [
    {
      icon: <ServiceIcon1 />,
      title: 'Інтернет',
      points: [
        'Як налаштувати роутер самостійно',
        'Що робити, якщо зник інтернет',
        'Поради для стабільного Wi-Fi у квартирі',
      ],
      marginTop: '56px',
    },
    {
      icon: <ServiceIcon4 />,
      title: 'Tелебачення',
      points: [
        'Як підключити Smart TV до нашого сервісу',
        'Налаштування інтерактивного телебачення',
        'Що робити, якщо пропав сигнал',
      ],
      marginTop: '220px',
    },
    {
      icon: <ServiceIcon3 />,
      title: 'Системи безпеки',
      points: [
        'Як обрати відеокамеру для дому чи офісу',
        'Інструкція з підключення сигналізації',
        'Поради для безпечного зберігання записів',
      ],
      marginTop: '0px',
    },
    {
      icon: <ServiceIcon2 />,
      title: 'IoT та M2M',
      points: [
        'Приклади використання IoT у побуті',
        'Як працює M2M для бізнесу',
        'Керування розумними пристроями через додаток',
      ],
      marginTop: '220px',
    },
  ];
  return (
    <section>
      <div className="flex flex-col gap-[24px] min-[900px]:flex-row justify-between items-start max-[1440px]:mb-[40px]">
        <SectionHeader isCta={false}>
          Корисні <br className="hidden lg:inline" />
          матеріали
        </SectionHeader>
        <p className="font-noto max-w-[330px] text-primaryBlue text-[16px]/[120%] tracking-[-0.32px]">
          Тут ви знайдете практичні рішення, покрокові інструкції та
          рекомендації від наших спеціалістів.
        </p>
      </div>
      <div className="flex flex-wrap justify-center min-[1440px]:justify-between max-[1440px]:items-center min-[1440px]:items-start gap-[20px]">
        {data.map((item, index) => (
          <div
            key={index}
            className={`
        w-fit min-md:max-[1440px]:min-w-[40%] flex justify-center items-center
        min-[1440px]:h-fit
        ${item.marginTop === '56px' ? 'min-[1440px]:mt-[56px]' : ''}
        ${item.marginTop === '220px' ? 'min-[1440px]:mt-[220px]' : ''}
    `}
          >
            <MaterialsCard
              icon={item.icon}
              title={item.title}
              points={item.points}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MaterialsSection;
