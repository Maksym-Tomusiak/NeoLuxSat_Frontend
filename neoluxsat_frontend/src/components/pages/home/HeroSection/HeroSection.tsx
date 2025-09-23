import HeroSectionTemlpate from '@/components/common/HeroSectionTemlpate';
import LeaveApplicationButton from '@/components/common/LeaveApplicationButton';
import TrustBadgesSlider from '@/components/common/TrustBadgesSlider';

const HeroSection = () => {
  const leftPart = (
    <div className="flex flex-col gap-[40px] mt-[62px]">
      <h1 className="font-manrope text-primaryWhite text-[88px]/[90%] font-semibold tracking-[-2px]">
        Все для вашого комфорту, зв’язку та безпеки
      </h1>
      <p className="font-noto text-[16px] tracking-[-0.32px] w-[475px]">
        Від надшвидкісного інтернету до мультимедійних платформ і розумних
        систем безпеки. Обирайте технології, що працюють на вас 24/7.
      </p>
      <div className="flex gap-[24px]">
        <LeaveApplicationButton isOrange onApplicationClick={() => {}} />
        <a
          href="#services"
          className="font-noto text-[16px]/[120%] tracking-[-0.32px] 
        border border-[1.4px] border-primaryWhite rounded-[10px] py-[14px] px-[18px] h-[40px] flex items-center hover:border-primaryOrange transition duration-300 ease-in-out cursor-pointer"
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
        className="min-w-[484px] h-[474px]"
      />
    </div>
  );

  return (
    <section>
      <HeroSectionTemlpate
        leftPart={leftPart}
        rightPart={rightPart}
        maskPath="/images/home-hero-bg.png"
      >
        <div className="absolute z-0 bottom-[30px] right-[0px]">
          <TrustBadgesSlider />
        </div>
      </HeroSectionTemlpate>
    </section>
  );
};

export default HeroSection;
