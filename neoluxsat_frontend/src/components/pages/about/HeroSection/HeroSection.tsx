import HeroSectionTemplate from '@/components/common/sections/HeroSectionTemplate';
import TrustBadgesSlider from '@/components/common/TrustBadgesSlider';

const HeroSection = () => {
  const leftPart = (
    <div
      className="flex flex-col
    gap-[12px] xs:gap-[24px] sm:gap-[32px] md:gap-[32px] lg:gap-[40px]
    max-sm:h-full lg:mt-[32px] max-w-full"
    >
      <h1
        className="
          font-manrope font-semibold tracking-[-1px] md:tracking-[-1.5px] lg:tracking-[-2px]
          text-primaryWhite
          text-[40px]/[90%] xs:text-[48px]/[90%] md:text-[52px]/[90%] lg:text-[64px]/[90%] xl:text-[88px]/[90%]"
      >
        NeoLuxSat - інтегрована платформа для вашого життя та бізнесу.
      </h1>
      <p
        className="
          font-noto
          text-[14px]/[120%] xs:text-[16px]/[120%]
          tracking-[-0.32px]
          w-full sm:w-[80%] md:w-[90%] lg:w-[475px]
        "
      >
        Ми створюємо єдиний простір, де ви отримуєте надшвидкісний Інтернет,
        безперебійний доступ до улюбленого контенту та надійні системи безпеки.
      </p>
    </div>
  );

  const rightPart = (
    <div className="w-fit h-fit hidden md:block">
      <img
        src="/images/about-hero-image.png"
        alt="hero-image"
        className="
          max-w-auto
          max-h-auto sm:max-h-[400px] md:max-h-[400px] lg:max-h-[550px] xl:max-h-[600px]
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
          <div className="w-fit h-fit">{rightPart}</div> // visible only on md+
        }
        maskPath="/images/template-2-big-hero-bg.png"
      >
        <p
          className="z-10 absolute
        bottom-[82px] md:bottom-[96px] lg:bottom-[116px]
        left-[50%] translate-x-[-50%] font-noto text-[16px]/[120%] text-primaryWhite/[0.8] tracking-[-0.32px] font-medium"
        >
          Наші партнери
        </p>
        <div className="absolute z-0 bottom-[8px] md:bottom-[12px] lg:bottom-[20px] left-[50%] translate-x-[-50%] sm:block">
          <TrustBadgesSlider />
        </div>
      </HeroSectionTemplate>
    </section>
  );
};

export default HeroSection;
