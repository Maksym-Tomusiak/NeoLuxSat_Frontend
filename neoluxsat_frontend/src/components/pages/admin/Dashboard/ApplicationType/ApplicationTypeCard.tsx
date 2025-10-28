import type { ApplicationTypeDto } from '@/types/application';
import React from 'react';

interface ApplicationTypeCardProps {
  type: ApplicationTypeDto;
  count: number;
}

const ApplicationTypeCard: React.FC<ApplicationTypeCardProps> = ({
  type,
  count,
}) => {
  return (
    <div
      key={type.id}
      className="w-full sm:w-[calc(50%-10px)] min-[1440px]:w-[320px] h-[120px] bg-primaryOrange rounded-[20px] flex flex-col justify-between p-[12px] relative"
    >
      <div className="flex flex-col gap-[8px]">
        <p className="font-noto text-[14px]/[120%] tracking-[-0.28px] text-primaryWhite/80">
          К-сть заявок на послугу
        </p>
        <p className="font-medium text-[18px]/[120%] tracking-[-0.36px] font-semibold lg:max-w-[225px]">
          {type.title}
        </p>
      </div>
      <p
        className="font-manrope text-[64px]/[90%] tracking-[-2px] font-semibold text-right
        absolute bottom-[12px] right-[12px]"
      >
        {count}
      </p>
    </div>
  );
};

export default React.memo(ApplicationTypeCard);
