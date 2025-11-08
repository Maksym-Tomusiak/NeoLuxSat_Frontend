// components/charts/ApplicationsChartComponent.tsx
import React, { useCallback } from 'react';
import { ApplicationService } from '@/services/application.service';
import { webSocketService } from '@/services/websocketService';
import BaseDataChart from './BaseDataChart';

// --- Specific Data Fetching ---
const fetchApplicationsData = (signal: AbortSignal) => {
  return ApplicationService.getApplicationsCountByRecentDays(
    7, // Last 7 days
    3,
    signal
  ) as Promise<Record<string, number>>; // <-- ADDED TYPE CAST
};

const subscribeToApplicationEvents = (callback: () => void) => {
  webSocketService.onApplicationCreated(callback);
  webSocketService.onApplicationUpdated(callback);
  webSocketService.onApplicationDeleted(callback);
};

const unsubscribeFromApplicationEvents = (callback: () => void) => {
  webSocketService.offApplicationCreated(callback);
  webSocketService.offApplicationUpdated(callback);
  webSocketService.offApplicationDeleted(callback);
};

const ApplicationsChart: React.FC = () => {
  return (
    <BaseDataChart
      title="Графік поданих заявок"
      dataKey="applications"
      tooltipLabel="Заявки"
      gradientId="colorApplications"
      gradientColor="#E76715"
      fetchDataFunction={fetchApplicationsData}
      subscribeEvents={useCallback(() => subscribeToApplicationEvents, [])}
      unsubscribeEvents={useCallback(
        () => unsubscribeFromApplicationEvents,
        []
      )}
    />
  );
};

export default React.memo(ApplicationsChart);
