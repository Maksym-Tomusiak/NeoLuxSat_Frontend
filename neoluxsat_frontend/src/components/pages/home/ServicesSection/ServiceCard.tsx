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
    <a href={href} className="w-full">
      <div
        className="
          group flex flex-col
          w-full max-w-full
          sm:max-md:w-full
          rounded-[14px] sm:rounded-[16px] md:rounded-[20px]
          bg-primaryBlue
          p-[16px] sm:p-[20px] md:p-[24px]
          gap-[32px] sm:gap-[62px] lg:gap-[48px]  xl:gap-[86px]
          min-h-[220px] sm:min-h-[280px] md:min-h-[330px]
          min-[711px]:min-w-full 2xs:min-w-[330px] max-w-[330px]
          duration-300 ease-in-out hover:bg-primaryOrange
        "
      >
        {/* Top row */}
        <div className="flex w-full justify-between">
          {icon}
          <div className="fill-primaryOrange group-hover:fill-primaryWhite transition-colors duration-300">
            <IconCommon />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[10px] sm:gap-[14px] md:gap-[16px] text-primaryWhite">
          <p
            className="
              font-manrope font-semibold
              text-[24px]/[90%]
            "
          >
            {title}
          </p>
          <p
            className="
              font-noto font-normal text-primaryWhite/80
              tracking-[-0.32px]
              text-[16px]/[120%]
            "
          >
            {description}
          </p>
        </div>
      </div>
    </a>
  );
};

export default ServiceCard;
