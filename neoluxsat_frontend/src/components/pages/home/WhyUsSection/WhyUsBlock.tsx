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
    <div className="flex gap-[24px] items-center text-primaryBlue">
      <div>{icon}</div>
      <div className="flex flex-col gap-[16px]">
        <p className="font-manrope text-[24px]/[90%] font-semibold ">{title}</p>
        <p className="font-noto text-[16px]/[120%] font-normal tracking-[-0.32px] w-[350px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default WhyUsBlock;
