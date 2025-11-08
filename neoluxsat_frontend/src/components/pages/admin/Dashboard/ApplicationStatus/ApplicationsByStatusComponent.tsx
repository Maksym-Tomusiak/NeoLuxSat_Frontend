import { useCallback, useEffect, useState } from 'react';
import { ApplicationService } from '@/services/application.service';
import { ApplicationStatusService } from '@/services/applicationStatus.service';
import type { ApplicationStatusDto } from '@/types/application';

import ApplicationStatusCard from './ApplicationStatusCard';
import React from 'react';
import { webSocketService } from '@/services/websocketService';

interface ApplicationsByStatusData {
  [statusTitle: string]: number;
}

const ApplicationsByStatusComponent = () => {
  const displayedStatuses = ['нова', 'виконується', 'завершена'];
  const [applicationsData, setApplicationsData] =
    useState<ApplicationsByStatusData>({});
  const [statuses, setStatuses] = useState<ApplicationStatusDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchComponentData = useCallback(
    async (signal: AbortSignal, isInitialLoad: boolean) => {
      if (isInitialLoad) {
        setLoading(true);
      }

      try {
        const [countsData, statusesData] = await Promise.all([
          ApplicationService.getApplicationsCountByStatuses(signal),
          ApplicationStatusService.getAllApplicationStatuss(signal),
        ]);

        const filtered = statusesData.filter((status) =>
          displayedStatuses.includes(status.title.toLowerCase())
        );
        setApplicationsData(countsData);
        setStatuses(filtered);
        setError(''); // Скидаємо помилку, якщо завантаження успішне
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error(err);
          setError('Не вдалось завантажити дані для цієї секції');
        }
      } finally {
        if (isInitialLoad) {
          setLoading(false);
        }
      }
    },
    []
  ); // Пустий масив залежностей робить цю функцію стабільною

  useEffect(() => {
    const controller = new AbortController();
    fetchComponentData(controller.signal, true);

    return () => {
      controller.abort();
    };
  }, [fetchComponentData]); // Залежимо від стабільної функції

  useEffect(() => {
    webSocketService.start();

    const handleAppChange = () => {
      const refetchController = new AbortController();
      fetchComponentData(refetchController.signal, false);
    };

    webSocketService.onApplicationCreated(handleAppChange);
    webSocketService.onApplicationUpdated(handleAppChange);
    webSocketService.onApplicationDeleted(handleAppChange);

    return () => {
      webSocketService.offApplicationCreated(handleAppChange);
      webSocketService.offApplicationUpdated(handleAppChange);
      webSocketService.offApplicationDeleted(handleAppChange);
    };
  }, [fetchComponentData]);

  const total = Object.values(applicationsData).reduce(
    (sum, value) => sum + value,
    0
  );

  let totalApplicationsDto = {
    id: 'total',
    title: 'Всього заявок',
    applications: total,
  };

  if (loading) {
    return (
      <div className=" w-full lg:flex-1 flex justify-center items-center max-lg:min-w-full rounded-[20px] text-primaryBlue bg-primaryBlue/10 px-[12px] pt-[24px] pb-[12px] min-h-[260px] max-w-[680px]">
        Завантаження даних...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:flex-1 text-[16px]/[120%] font-semibold font-noto  max-sm:min-h-[120px] max-lg:min-h-[240px] max-lg:min-w-full  bg-iconsRed/10 rounded-[20px] text-iconsRed/70 min-h-[260px] flex items-center justify-center max-w-[680px]">
        Помилка: {error}
      </div>
    );
  }

  return (
    <div className="bg-primaryBlue rounded-[20px] text-primaryWhite w-full lg:flex-1">
      <div className="p-[24px] flex flex-col gap-[24px] h-full">
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

export default React.memo(ApplicationsByStatusComponent);
