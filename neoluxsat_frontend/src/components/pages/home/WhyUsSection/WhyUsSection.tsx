import WhyUsIcon1 from '@/assets/svgs/why-us/why-us-icon-1.svg';
import WhyUsIcon2 from '@/assets/svgs/why-us/why-us-icon-2.svg';
import WhyUsIcon3 from '@/assets/svgs/why-us/why-us-icon-3.svg';
import WhyUsIcon4 from '@/assets/svgs/why-us/why-us-icon-4.svg';
import WhyUsBlock from './WhyUsBlock';

const WhyUsSection = () => {
  const blocksData = [
    {
      icon: <WhyUsIcon1 />,
      title: 'Індивідуальний підхід',
      description:
        'Ми враховуємо потреби кожного клієнта, пропонуючи оптимальні рішення для вашого дому чи офісу.',
    },
    {
      icon: <WhyUsIcon2 />,
      title: 'Професійна команда',
      description:
        'Наші фахівці надають кваліфіковані консультації та допомагають обрати найкращі технічні рішення.',
    },
    {
      icon: <WhyUsIcon3 />,
      title: 'Надійність і якість',
      description:
        'Ми дбаємо про безперебійне функціонування ваших технологічних систем, забезпечуючи комфорт і безпеку',
    },
    {
      icon: <WhyUsIcon4 />,
      title: 'Інноваційність',
      description:
        'Ми постійно досліджуємо нові технології та шукаємо нестандартні рішення, щоб наші клієнти завжди отримували найкраще.',
    },
  ];

  return (
    <>
      <section className="flex flex-col gap-[56px]">
        <h2 className="font-manrone text-primaryBlue/20 text-[88px]/[90%] font-semibold tracking-[-2px]">
          Чому <br />
          саме ми
        </h2>
        <div className="flex mr-[250px] justify-between items-center">
          <img
            src={'/images/why-us-image.png'}
            alt="why us"
            className="aspect-square w-[525px] h-[525px]"
          />
          <div className="flex flex-col gap-[56px]">
            {blocksData.map((block, index) => (
              <WhyUsBlock key={index} {...block} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyUsSection;
