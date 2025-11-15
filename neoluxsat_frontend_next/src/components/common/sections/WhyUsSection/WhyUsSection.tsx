import WhyUsIcon1 from "@/assets/svgs/why-us/why-us-icon-1.svg?component";
import WhyUsIcon2 from "@/assets/svgs/why-us/why-us-icon-2.svg?component";
import WhyUsIcon3 from "@/assets/svgs/why-us/why-us-icon-3.svg?component";
import WhyUsIcon4 from "@/assets/svgs/why-us/why-us-icon-4.svg?component";
import WhyUsBlock from "./WhyUsBlock";
import SectionHeader from "@/components/common/SectionHeader";

const WhyUsSection = () => {
  const blocksData = [
    {
      icon: <WhyUsIcon1 />,
      title: "Індивідуальний підхід",
      description:
        "Ми враховуємо потреби кожного клієнта, пропонуючи оптимальні рішення для вашого дому чи офісу.",
    },
    {
      icon: <WhyUsIcon2 />,
      title: "Професійна команда",
      description:
        "Наші фахівці надають кваліфіковані консультації та допомагають обрати найкращі технічні рішення.",
    },
    {
      icon: <WhyUsIcon3 />,
      title: "Надійність і якість",
      description:
        "Ми дбаємо про безперебійне функціонування ваших технологічних систем, забезпечуючи комфорт і безпеку",
    },
    {
      icon: <WhyUsIcon4 />,
      title: "Інноваційність",
      description:
        "Ми постійно досліджуємо нові технології та шукаємо нестандартні рішення, щоб наші клієнти завжди отримували найкраще.",
    },
  ];

  return (
    <>
      <section className="flex flex-col gap-[32px] sm:gap-[40px] md:gap-[56px]">
        <SectionHeader isCta={false}>
          Чому <br className="hidden sm:inline" />
          саме ми
        </SectionHeader>
        <div className="flex flex-col items-center gap-[24px] lg:flex-row md:justify-evenly md:gap-[32px]">
          <img
            src={"/images/why-us-image.png"}
            alt="why us"
            className="h-auto w-[300px] sm:w-[400px] md:h-[525px] md:w-[525px]"
          />
          <div className="flex w-full max-w-[700px] xl:max-w-[620px] flex-col gap-[24px] md:gap-[40px] lg:gap-[56px]">
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
