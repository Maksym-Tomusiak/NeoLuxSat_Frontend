import HeroSectionTemplate from '@/components/common/HeroSectionTemplate';
import LeaveApplicationButton from '@/components/common/LeaveApplicationButton';
import TrustBadgesSlider from '@/components/common/TrustBadgesSlider';

const HeroSection = () => {
  const leftPart = (
    <div className="flex flex-col gap-[12px] xs:gap-[24px] sm:gap-[32px] md:gap-[32px] lg:gap-[40px] max-sm:h-full 2xs:max-sm:justify-between  lg:mt-[62px]">
      <h1
        className="
          font-manrope font-semibold tracking-[-1px] md:tracking-[-1.5px] lg:tracking-[-2px]
          text-primaryWhite
          text-[40px]/[90%] xs:text-[48px]/[90%] md:text-[52px]/[90%] lg:text-[64px]/[90%] xl:text-[88px]/[90%]
          sm:w-[70%]
      
        "
      >
        Все для вашого комфорту, зв’язку та безпеки
      </h1>
      <p
        className="
          font-noto
          text-[14px]/[120%] xs:text-[16px]/[120%]
          tracking-[-0.32px]
          w-full sm:w-[80%] md:w-[90%] lg:w-[475px]
        "
      >
        Від надшвидкісного інтернету до мультимедійних платформ і розумних
        систем безпеки. Обирайте технології, що працюють на вас 24/7.
      </p>
      <div className="flex flex-col sm:flex-row gap-[16px] sm:gap-[20px] lg:gap-[24px]">
        <LeaveApplicationButton
          isOrange
          onApplicationClick={() => {}}
          className="max-w-fit"
        />
        <a
          href="#services"
          className="
          max-h-[40px] max-w-fit
            font-noto text-[16px]/[120%] tracking-[-0.32px]
            border border-[1.4px] border-primaryWhite rounded-[10px]
            py-[14px] px-[18px]
            flex items-center justify-center
            hover:border-primaryOrange transition duration-300 ease-in-out cursor-pointer
          "
        >
          Послуги
        </a>
      </div>
    </div>
  );

  const rightPart = (
    <div className="w-fit h-fit">
      <img
        src="/images/home-hero-image.png"
        alt="hero-image"
        className="
          max-w-full sm:max-w-[400px] md:max-w-[250px] lg:max-w-[420px] xl:max-w-[484px]
          max-h-auto sm:max-h-[400px] md:max-h-[250px]  lg:max-h-[420px] xl:max-h-[484px]
          h-auto
        "
      />
    </div>
  );

  return (
    <section>
      {/* Desktop layout → phone on the right */}
      <HeroSectionTemplate
        leftPart={leftPart}
        rightPart={
          <div className="hidden md:block w-fit h-fit">{rightPart}</div> // visible only on md+
        }
        maskPath="/images/home-hero-bg.png"
      >
        <div className="absolute z-0 bottom-[16px] md:bottom-[24px] lg:bottom-[30px] right-0 sm:block">
          <TrustBadgesSlider />
        </div>
      </HeroSectionTemplate>

      {/* Mobile layout → phone below */}
      <div className="block md:hidden flex justify-center mt-[50px]">
        {rightPart}
      </div>
    </section>
  );
};

export default HeroSection;
