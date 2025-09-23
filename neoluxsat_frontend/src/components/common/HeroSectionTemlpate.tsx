import React from 'react';

interface HeroSectionTemlpateProps {
  leftPart: React.ReactNode;
  rightPart: React.ReactNode;
  maskPath?: string;
  children: React.ReactNode;
}

const HeroSectionTemlpate: React.FC<HeroSectionTemlpateProps> = ({
  leftPart,
  rightPart,
  maskPath,
  children,
}) => {
  return (
    <>
      <div
        className={`hero-section relative overflow-hidden text-primaryWhite flex items-start h-[694px] gap-[30px] px-[24px] py-[45px] rounded-[20px]`}
      >
        {maskPath && (
          <img
            src={maskPath}
            alt="hero background"
            className="absolute inset-0 w-full h-full object-contain z-1 pointer-events-none select-none"
          />
        )}
        <div className="hero-content z-2">{leftPart}</div>
        <div className="hero-image z-2">{rightPart}</div>
        {children}
      </div>
    </>
  );
};

export default HeroSectionTemlpate;
