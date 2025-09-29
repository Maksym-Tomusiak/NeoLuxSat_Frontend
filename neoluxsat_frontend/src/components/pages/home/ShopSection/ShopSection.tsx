import ShopImage from '@/assets/images/shop/shop-image.png';
import ShopCard from './ShopCard';
import SectionHeader from '@/components/common/SectionHeader';

const ShopSection = () => {
  const itemsData = [
    {
      image: <img src={ShopImage} alt="shop-image" />,
      title: 'Техніка для дому та офісу',
      options: ['Телевізори', 'Оргтехніка', 'Інтернет-обладнання'],
    },
    {
      image: <img src={ShopImage} alt="shop-image" />,
      title: 'Гаджети та аксесуари',
      options: ['Різноманітні гаджети', 'Авто та велоаксесуари', 'Ліхтарики'],
    },
    {
      image: <img src={ShopImage} alt="shop-image" />,
      title: 'Безпека та контроль',
      options: ['Охоронні системи', 'Системи відеонагляду'],
    },
  ];

  return (
    <section className="flex flex-col gap-[32px] sm:gap-[40px] md:gap-[56px]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-[16px]">
        <SectionHeader isCta={false}>
          Наш <br className="hidden sm:inline" />
          магазин
        </SectionHeader>
        <div className="flex w-full max-w-[360px] flex-col gap-[12px] font-noto text-primaryBlue sm:gap-[16px] md:w-[330px] text-[16px]/[120%] tracking-[-0.32px]">
          <p>
            Ми пропонуємо широкий асортимент сучасних гаджетів,
            інтернет-обладнання та аксесуарів.
          </p>
          <p>
            <span className="font-semibold text-primaryOrange text-[18px]/[120%]">
              Зверніть увагу:
            </span>{' '}
            придбати товари можна безпосередньо на місці, у нашому магазині.
          </p>
        </div>
      </div>
      <div className="flex snap-x snap-mandatory items-stretch gap-[12px] overflow-x-auto sm:-mx-[10px] sm:px-[10px] min-[1090px]:justify-center md:gap-[20px]">
        {itemsData.map((item, index) => (
          <div key={index} className="snap-center shrink-0">
            <ShopCard
              image={item.image}
              title={item.title}
              options={item.options}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopSection;
