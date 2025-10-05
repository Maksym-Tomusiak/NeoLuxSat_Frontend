import React from 'react';
import IconCommon from '@/assets/svgs/services/services-icon-common.svg';
import { cn } from '@/lib/utils';

type MaterialsCardProps = {
  icon: React.ReactNode;
  title: string;
  points: string[];
  className?: string;
};

const MaterialsCard: React.FC<MaterialsCardProps> = ({
  icon,
  title,
  points,
  className,
}) => {
  return (
    <div
      className={cn(
        `flex flex-col w-full max-w-[330px]
          sm:max-md:w-full
          rounded-[14px] sm:rounded-[16px] md:rounded-[20px]
          bg-primaryBlue
          p-[16px] sm:p-[20px] md:p-[24px]
          gap-[24px]
          min-h-[220px] sm:min-h-[280px] md:min-h-[350px]
        `,
        className
      )}
    >
      {/* Top row */}
      <div className="flex w-full justify-between items-center gap-[10px] text-primaryWhite">
        <div>{icon}</div>
        <p className="w-full text-left font-manrope text-[24px]/[90%] font-semibold">
          {title}
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[16px] text-primaryWhite">
        {points.map((point, index) => (
          <div
            key={title + index}
            className="w-full flex justify-between items-center gap-[8px] p-[12px] bg-primaryWhite/10 rounded-[10px]
          text-primaryWhite fill-primaryWhite hover:fill-primaryOrange hover:text-primaryOrange transition-colors duration-300"
          >
            <p className="font-noto text-[16px]/[120%]">{point}</p>
            <div>
              <IconCommon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialsCard;
