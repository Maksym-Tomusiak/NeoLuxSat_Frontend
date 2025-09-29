import React from 'react';

interface HeroSectionTemplateProps {
  leftPart: React.ReactNode;
  rightPart: React.ReactNode;
  maskPath?: string;
  children: React.ReactNode;
}

const HeroSectionTemplate: React.FC<HeroSectionTemplateProps> = ({
  leftPart,
  rightPart,
  maskPath,
  children,
}) => {
  return (
    <div
      className={`
        hero-section relative flex flex-col md:flex-row
        items-start
        gap-[8px] md:gap-[12px]
        overflow-hidden
        rounded-[16px] md:rounded-[20px]
        px-[16px] md:px-[24px]
        py-[20px] md:py-[45px]
        text-primaryWhite
        h-[420px] md:h-[500px] lg:h-[620px] xl:h-[694px]
      `}
    >
      {maskPath && (
        <img
          src={maskPath}
          alt="hero background"
          className="absolute inset-0 w-full h-full object-fill z-1 pointer-events-none select-none"
        />
      )}

      {/* Left Part */}
      <div className="max-sm:h-full hero-content z-2 flex-1">{leftPart}</div>

      {/* Right Part (now visible on all screens) */}
      <div
        className="
          hero-image z-2
          flex justify-center lg:block
          w-full md:w-auto
          mt-[20px] md:mt-0
          md:max-w-[40%] lg:max-w-[45%] xl:max-w-[50%]
          md:h-full items-center
        "
      >
        {rightPart}
      </div>

      {children}
    </div>
  );
};

export default HeroSectionTemplate;
