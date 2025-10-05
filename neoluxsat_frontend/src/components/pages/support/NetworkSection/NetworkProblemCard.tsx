import React from 'react';
import NetworkTimeIcon from '@/assets/svgs/network/network-time-icon.svg';
import NetworkStatusIcon from '@/assets/svgs/network/network-status-icon.svg';
import type { NetworkProblemDto } from '@/types/networkProblem';
import { cn } from '@/lib/utils';

type NetworkProblemCardProps = {
  icon: React.ReactNode;
  problem: NetworkProblemDto;
};

const NetworkProblemCard: React.FC<NetworkProblemCardProps> = ({
  icon,
  problem,
}) => {
  const parseUtcTimeToLocal = (timeStr: string) => {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    // create a date in UTC
    const utcDate = new Date(Date.UTC(1970, 0, 1, hours, minutes, seconds));
    // return local time string
    return utcDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusTitle = problem.networkProblemStatus.title;
  const start = problem.fixStartTime
    ? parseUtcTimeToLocal(problem.fixStartTime)
    : null;
  const end = problem.fixEndTime
    ? parseUtcTimeToLocal(problem.fixEndTime)
    : null;

  // Format text
  let formattedTime = '';
  if (statusTitle === 'Вирішено' && end) {
    formattedTime = `Завершено о ${end}`;
  } else if (
    statusTitle === 'У процесі відновлення' ||
    statusTitle === 'Заплановано'
  ) {
    if (start && end) formattedTime = `${start} - ${end}`;
    else if (end) formattedTime = `до ${end}`;
  }

  // Choose color by status
  const colorMap: Record<string, string> = {
    'У процесі відновлення': 'var(--color-iconsRed)',
    Заплановано: 'var(--color-iconsBlue)',
    Вирішено: 'var(--color-iconsGreen)',
  };
  const color = colorMap[statusTitle] || 'var(--color-iconsBlue)';

  return (
    <div
      className={cn(
        `flex flex-col text-primaryBlue p-[24px] gap-[24px] rounded-[20px] border border-[1.4px] max-w-[1030px] h-fit md:h-fit lg:h-[200px]`,
        {
          'bg-iconsGreen/10': statusTitle === 'Вирішено',
          'bg-iconsRed/10': statusTitle === 'У процесі відновлення',
          'bg-iconsBlue/10': statusTitle === 'Заплановано',
        }
      )}
      style={{
        borderColor: color,
      }}
    >
      <div className="flex flex-col md:flex-row gap-[16px] justify-between items-start md:items-center">
        <div className="flex gap-[16px] items-center">
          <div className="min-w-[40px] min-h-[40px]">{icon}</div>
          <div className="flex flex-col gap-[8px]">
            <p className="font-manrope font-semibold text-[20px]/[90%] 2xs:text-[24px]/[90%]">
              {problem.title}
            </p>
            <p className="font-noto font-normal text-[16px]/[120%] tracking-[-0.32px]">
              {problem.address}
            </p>
          </div>
        </div>
        <p
          className={cn(
            `font-noto font-normal text-[14px]/[120%] tracking-[-0.28px] px-[10px] py-[8px] rounded-full text-center`,
            {
              'bg-iconsGreen/20 text-iconsGreen': statusTitle === 'Вирішено',
              'bg-iconsRed/20 text-iconsRed':
                statusTitle === 'У процесі відновлення',
              'bg-iconsBlue/20 text-iconsBlue': statusTitle === 'Заплановано',
            }
          )}
        >
          {statusTitle}
        </p>
      </div>

      <div className="min-h-[1.4px] bg-primaryBlue/20 rounded-full"></div>

      <div className="flex justify-between items-start flex-wrap gap-[24px]">
        <div className="flex gap-[24px] items-start flex-wrap">
          <div className="flex gap-[12px] items-center">
            <div className="min-w-[24px] min-h-[24px]">
              <NetworkTimeIcon />
            </div>
            <div className="flex flex-col gap-[8px]">
              <p className="font-noto text-primaryBlue/80 text-[14px]/[120%] tracking-[-0.28px]">
                Очікуваний час усунення
              </p>
              <p className="font-noto font-medium text-[16px]/[120%] tracking-[-0.32px]">
                {formattedTime || '—'}
              </p>
            </div>
          </div>

          <div className="flex gap-[12px] items-center max-w-[230px]">
            <div className="min-w-[24px] min-h-[24px]">
              <NetworkStatusIcon />
            </div>
            <div className="flex flex-col gap-[8px]">
              <p className="font-noto text-primaryBlue/80 text-[14px]/[120%] tracking-[-0.28px]">
                Статус
              </p>
              <p className="font-noto font-medium text-[16px]/[120%] tracking-[-0.32px]">
                {problem.currentStatus}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[8px]">
          <p className="font-noto text-primaryBlue/80 text-[14px]/[120%] tracking-[-0.28px]">
            Затронуті послуги
          </p>
          <div className="flex gap-[8px] flex-wrap">
            {problem.networkProblemServices.map((service) => (
              <p
                key={`${problem.id}-${service.id}`}
                className="font-noto text-[14px]/[120%] tracking-[-0.28px] p-[10px] rounded-[10px] text-primaryWhite bg-primaryBlue"
              >
                {service.title}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkProblemCard;
