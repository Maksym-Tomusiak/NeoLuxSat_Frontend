import HeroSectionTemplate from '@/components/common/sections/HeroSectionTemplate';
import LeaveApplicationButton from '@/components/common/LeaveApplicationButton';
import TrustBadgesSlider from '@/components/common/TrustBadgesSlider';

const HeroSection = () => {
  const leftPart = (
    <div className="flex flex-col gap-[24px] xs:gap-[60px] sm:gap-[60px] md:gap-[32px] lg:gap-[40px] max-sm:h-full sm:mt-[32px] md:mt-[32px] lg:mt-[62px]">
      <h1
        className="
          font-manrope font-semibold tracking-[-1px] md:tracking-[-1.5px] lg:tracking-[-2px]
          text-primaryWhite
          text-[48px]/[90%] md:text-[52px]/[90%] lg:text-[64px]/[90%] xl:text-[88px]/[90%]
          max-2xs:text-[40px]/[90%]
        "
      >
        Потрібна допомога? Ми завжди на зв’язку
      </h1>
      <p
        className="
          font-noto
          max-2xs:text-[14px]/[120%] text-[16px]/[120%]
          tracking-[-0.32px]
          w-full sm:w-[80%] md:w-[90%] lg:w-[475px]
        "
      >
        Отримайте швидку підтримку та відповіді на всі питання щодо підключення,
        тарифів чи налаштувань. <br />
        Залиште заявку — наш спеціаліст зв’яжеться з вами найближчим часом.
      </p>
      <LeaveApplicationButton isOrange className="max-w-fit" />
    </div>
  );

  const rightPart = (
    <div
      className="w-fit h-full flex items-end
      mr-[16px] min-[1431px]:mr-[8px]
    pb-[60px] md:max-lg:pb-[47px] lg:max-xl:pb-[68px] xl:max-[1430px]:pb-[84px] min-[1430px]:pb-[82px]"
    >
      <img
        src="/images/support-hero-image.png"
        alt="hero-image"
        className="
          md:max-lg::max-w-[300px] lg:max-xl:max-w-[420px] xl:max-[1430px]:max-w-[500px] min-[1431px]:max-w-[600px]
          md:max-lg:max-h-[300px]  lg:max-xl:max-h-[420px] xl:max-[1430px]:max-h-[500px] min-[1431px]:max-h-[445px]
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
          <div className="hidden md:block w-fit h-full">{rightPart}</div> // visible only on md+
        }
        maskPath="/images/template-1-big-hero-bg.png"
      >
        <div className="absolute z-0 bottom-[16px] md:bottom-[24px] lg:bottom-[30px] right-0 sm:block">
          <TrustBadgesSlider />
        </div>
      </HeroSectionTemplate>
    </section>
  );
};

export default HeroSection;
