import type { ApplicationStatusDto } from '@/types/application';
import PendingApplicationsIcon from '@/assets/svgs/admin/dashboard/in-progress-icon.svg';
import NewApplicationsIcon from '@/assets/svgs/admin/dashboard/new-icon.svg';
import FinishedApplicationsIcon from '@/assets/svgs/admin/dashboard/finished-icon.svg';
import AllApplicationsIcon from '@/assets/svgs/admin/dashboard/all-icon.svg';
import React from 'react';

interface ApplicationStatusCardProps {
  status: ApplicationStatusDto;
  count: number;
}

const getStatusIcon = (title: string) => {
  switch (title.toLowerCase()) {
    case 'всього заявок':
      return <AllApplicationsIcon />;
    case 'нова':
      return <NewApplicationsIcon />;
    case 'виконується':
      return <PendingApplicationsIcon />;
    case 'завершена':
      return (
        <div className="fill-iconsGreen">
          <FinishedApplicationsIcon />
        </div>
      );
    default:
      return null;
  }
};

const ApplicationStatusCard: React.FC<ApplicationStatusCardProps> = ({
  status,
  count,
}) => {
  return (
    <div
      key={status.id}
      className="w-full sm:w-[calc(50%-8px)] min-[1440px]:w-[300px] lg:min-h-[80px] bg-primaryWhite/10 rounded-lg flex justify-start items-center py-[16px] px-[12px] gap-[12px]"
    >
      {getStatusIcon(status.title)}
      <div className="flex flex-col gap-[8px]">
        <p className="font-noto text-primaryWhite/80 text-[14px]/[120%] tracking-[-0.28px]">
          {status.title}
        </p>
        <p className="font-manrope text-[24px]/[90%] font-semibold">{count}</p>
      </div>
    </div>
  );
};

export default React.memo(ApplicationStatusCard);
