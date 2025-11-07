import SectionHeader from '@/components/common/SectionHeader';

const AboutUsSection = () => {
  return (
    <section>
      <SectionHeader isCta={false}>Про нас</SectionHeader>
      <div className="w-fit flex flex-col lg:flex-row justify-between blue-gradient-bg rounded-[20px] h-fit lg:h-[385px] mx-auto mt-[40px] md:mt-[56px] relative overflow-visible">
        <div
          className="flex flex-col gap-[32px] text-primaryWhite
          w-full lg:w-[50%]
          px-[24px] mx-auto max-lg:max-w-[600px] lg:pl-[24px] xl:pl-[40px] min-[1350px]:pl-[100px]
          py-[24px] md:py-[40px] xl:py-[56px]"
        >
          <div className="flex flex-col gap-[24px]">
            <p className="font-manrope text-[24px]/[90%] font-semibold">
              Інновації, що змінюють майбутнє
            </p>
            <div className="font-noto text-[14px]/[120%] 2xs:text-[16px]/[120%] tracking-[-0.32px] flex flex-col gap-[16px]">
              <p>
                NeoLuxSat є піонером у сфері супутникових технологій в Україні.
                З 2015 року ми розробляємо та впроваджуємо передові рішення для
                забезпечення стабільного зв'язку та доступу до цифрових послуг.
              </p>
              <p>
                Наша місія - забезпечити кожного українця надійним доступом до
                сучасних технологій, незалежно від географічного розташування.
                Ми вірим, що якісний зв'язок - це основа розвитку сучасного
                суспільства.
              </p>
            </div>
          </div>
          <div className="flex gap-[40px] 2xs:gap-[56px]">
            <div
              className="items-start flex flex-col text-center gap-[16px]
            "
            >
              <p className="font-manrope font-semibold text-primaryOrange text-[48px]/[90%] tracking-[-0.96px]">
                10+
              </p>
              <p className="font-noto text-[16px]/[120%] tracking-[-0.32px]">
                Років досвіду
              </p>
            </div>
            <div
              className="items-start flex flex-col text-center gap-[16px]
            "
            >
              <p className="font-manrope font-semibold text-primaryOrange text-[48px]/[90%] tracking-[-0.96px]">
                99.9%
              </p>
              <p className="font-noto text-[16px]/[120%] tracking-[-0.32px]">
                Надійність мережі
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-[550px] mx-auto lg:min-w-[50%] lg:max-w-[50%] h-full lg:relative">
          <img
            src="./images/about-us-image.png"
            alt="about us image"
            className="lg:absolute lg:bottom-0 lg:right-0 w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
