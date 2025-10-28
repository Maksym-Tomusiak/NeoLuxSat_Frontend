import React from 'react';

export type NetworkStatusData = {
  title: string;
  message: React.ReactNode;
  status: string;
  updated: string;
  icon: React.ReactNode; // Icon component (CheckmarkIcon or ErrorIcon)
  iconBgColorClass: string; // Tailwind class for icon background (e.g., 'bg-iconsGreen' or 'bg-primaryOrange')
  statusColorClass: string; // Tailwind class for status text color (e.g., 'text-iconsGreen' or 'text-primaryOrange')
};

const NetworkStatusCard: React.FC<{ data: NetworkStatusData }> = ({ data }) => (
  <div className="w-full max-w-[680px] rounded-[20px] p-[24px] bg-primaryBlue/10 flex flex-col gap-[24px]">
    <div className="flex items-start gap-[24px]">
      <div
        className={`rounded-[20px] flex items-center justify-center p-[10px] max-xs:p-[8px] max-xs:rounded-[10px] max-xs:max-w-[40px] max-xs:max-h-[40px] ${data.iconBgColorClass}`}
      >
        {data.icon}
      </div>

      <div className="flex flex-col gap-[16px]">
        <h3 className="font-manrope font-semibold text-[20px]/[90%] 2xs:text-[24px]/[90%] text-primaryBlue">
          {data.title}
        </h3>
        <p className="font-noto font-normal text-[16px]/[120%] tracking-[-0.32px] text-primaryBlue/80">
          {data.message}
        </p>
      </div>
    </div>

    <div className="min-h-[1.4px] bg-primaryBlue/20 rounded-full"></div>

    <div className="flex justify-between">
      <div className="flex flex-col gap-[8px]">
        <p className="font-noto text-primaryBlue/80 text-[14px]/[120%] tracking-[-0.28px]">
          Статус
        </p>
        <p
          className={`font-noto text-[18px]/[120%] tracking-[-2%] font-medium ${data.statusColorClass}`}
        >
          {data.status}
        </p>
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="font-noto text-primaryBlue/80 text-[14px]/[120%] tracking-[-0.28px]">
          Оновлено
        </p>
        <p className="font-noto text-[18px]/[120%] text-primaryBlue tracking-[-2%] font-medium">
          {data.updated}
        </p>
      </div>
    </div>
  </div>
);

export default NetworkStatusCard;
