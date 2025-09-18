import React from 'react';
import IconCommon from '@/assets/svgs/services/services-icon-common.svg';

type ServiceCardProps = {
  icon: React.ReactNode;
  href: string;
  title: string;
  description: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  href,
  title,
  description,
}) => {
  return (
    <a href={href}>
      <div className="group flex flex-col gap-[86px] bg-primaryBlue hover:bg-primaryOrange duration-300 ease-in-out w-[330px] h-[330px] p-[24px] rounded-[20px]">
        <div className="flex w-full justify-between">
          {icon}
          <div className="fill-primaryOrange group-hover:fill-primaryWhite transition-colors duration-300">
            <IconCommon />
          </div>
        </div>
        <div className="flex flex-col gap-[16px] text-primaryWhite">
          <p className="font-manrope text-[24px]/[90%] font-semibold">
            {title}
          </p>
          <p className="font-noto text-[16px]/[120%] text-primaryWhite/80 font-normal tracking-[-0.32px]">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
};

export default ServiceCard;
