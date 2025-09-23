import ShopImage from '@/assets/images/shop/shop-image.png';
import ShopCard from './ShopCard';

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
    <section className="flex flex-col gap-[56px]">
      <div className="flex justify-between items-end">
        <h2 className="col-start-1 row-start-1 font-manrone text-primaryBlue/20 text-[88px]/[90%] font-semibold tracking-[-2px] max-w-[500px]">
          Наш магазин
        </h2>
        <div className="flex flex-col gap-[16px] w-[330px] text-primaryBlue font-noto text-[16px]/[120%] tracking-[-0.32px]">
          <p>
            Ми пропонуємо широкий асортимент сучасних гаджетів,
            інтернет-обладнання та аксесуарів.
          </p>
          <p>
            <span className="text-primaryOrange text-[18px]/[120%] font-semibold">
              Зверніть увагу:
            </span>{' '}
            придбати товари можна безпосередньо на місці, у нашому магазині.
          </p>
        </div>
      </div>
      <div className="flex gap-[20px] items-center justify-center">
        {itemsData.map((item, index) => (
          <ShopCard
            key={index}
            image={item.image}
            title={item.title}
            options={item.options}
          />
        ))}
      </div>
    </section>
  );
};

export default ShopSection;
