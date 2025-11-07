import HeroSectionTemplate from '@/components/common/sections/HeroSectionTemplate';
import LeaveApplicationButton from '@/components/common/LeaveApplicationButton';
import TrustBadgesSlider from '@/components/common/TrustBadgesSlider';

const HeroSection = () => {
  const leftPart = (
    <div className="flex flex-col gap-[16px] 2xs:gap-[24px] md:gap-[32px] lg:gap-[40px] h-full flex flex-col max-xs:justify-start justify-center">
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
      <LeaveApplicationButton
        isOrange
        className="max-w-fit max-xs:text-[16px]/[120%]"
      />
    </div>
  );

  const rightPart = (
    <div
      className="w-fit h-full flex items-end
      pb-[60px] md:max-lg:pb-[47px] lg:max-xl:pb-[68px] xl:max-[1430px]:pb-[84px] min-[1430px]:pb-[82px]
      // Add explicit max-width for the image container to ensure it doesn't push out
      max-w-full" // Ensure this wrapper doesn't exceed its parent's available space
    >
      <img
        src="/images/support-hero-image.png"
        alt="hero-image"
        className="
          // Ensure the image itself scales down within its container
          md:max-lg:max-w-[400px] lg:max-xl:max-w-[480px] xl:max-[1430px]:max-w-[500px] min-[1431px]:max-w-[600px]
          w-full h-auto object-contain // Make sure the image is responsive
        "
      />
    </div>
  );

  return (
    <section id="main-content-start">
      <HeroSectionTemplate
        leftPart={leftPart}
        rightPart={
          // Ensure the right part only appears on md and above to match the image's desktop visibility
          <div className="hidden md:block w-fit h-full">{rightPart}</div>
        }
        layoutClasses="md:pr-0"
        maskPath="/images/template-1-big-hero-bg.png"
        // --- NEW: Override layout for this specific hero ---
        leftPartClasses="md:w-1/2 xl:w-4/7" // Adjust these widths as needed
        rightPartClasses="md:w-1/2 xl:w-3/7 min-w-fit" // md:max-w-none to remove default max-w
      >
        <div className="absolute z-0 bottom-[16px] md:bottom-[24px] lg:bottom-[30px] right-0 sm:block">
          <TrustBadgesSlider />
        </div>
      </HeroSectionTemplate>
    </section>
  );
};

export default HeroSection;
