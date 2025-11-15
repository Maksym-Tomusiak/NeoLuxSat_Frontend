import React from 'react';
type WhyUsBlockProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const WhyUsBlock: React.FC<WhyUsBlockProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex items-center text-primaryBlue gap-[24px]">
      <div className="why-us-icon-container">{icon}</div>
      <div className="flex flex-col gap-[8px] xs:gap-[16px]">
        <p className="font-manrope font-semibold text-[20px]/[90%] xs:text-[24px]/[90%] ">
          {title}
        </p>
        <p className="font-noto w-full lg:max-w-[450px] font-normal text-[14px]/[120%] xs:text-[16px]/[120%] tracking-[-0.32px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default WhyUsBlock;
