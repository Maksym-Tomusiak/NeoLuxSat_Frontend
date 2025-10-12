import { useEffect, useState } from 'react';
import { ApplicationService } from '@/services/application.service';
import { ApplicationStatusService } from '@/services/applicationStatus.service';
import type { ApplicationStatusDto } from '@/types/application';

import ApplicationStatusCard from './ApplicationStatusCard';

interface ApplicationsByStatusData {
  [statusTitle: string]: number;
}

const ApplicationsByStatusComponent = () => {
  const displayedStatuses = ['нова', 'виконується', 'завершена'];
  const [applicationsData, setApplicationsData] =
    useState<ApplicationsByStatusData>({});
  const [statuses, setStatuses] = useState<ApplicationStatusDto[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    ApplicationService.getApplicationsCountByStatuses(controller.signal)
      .then(setApplicationsData)
      .catch(console.error);

    ApplicationStatusService.getAllApplicationStatuss(controller.signal)
      .then((data) => {
        const filtered = data.filter((status) =>
          displayedStatuses.includes(status.title.toLowerCase())
        );
        setStatuses(filtered);
      })
      .catch(console.error);

    return () => controller.abort();
  }, []);

  const total = Object.values(applicationsData).reduce(
    (sum, value) => sum + value,
    0
  );

  let totalApplicationsDto = {
    id: 'total',
    title: 'Всього заявок',
    applications: total,
  };

  return (
    <div className="bg-primaryBlue rounded-[20px] text-primaryWhite w-full lg:flex-1">
      <div className="p-[24px] flex flex-col gap-[24px]">
        <h2 className="text-[18px]/[120%] font-semibold font-noto tracking-[-0.36px]">
          Статистика заявок за статусом
        </h2>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          <ApplicationStatusCard status={totalApplicationsDto} count={total} />

          {statuses.map((status) => (
            <ApplicationStatusCard
              key={status.id}
              status={status}
              count={applicationsData[status.title] || 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationsByStatusComponent;
