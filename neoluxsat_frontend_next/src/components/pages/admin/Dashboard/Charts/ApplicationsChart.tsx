"use client";

import React, { useCallback } from "react";
import { ApplicationService } from "@/services/application.service";
import BaseDataChart from "./BaseDataChart";

// --- Specific Data Fetching ---
const fetchApplicationsData = (signal: AbortSignal) => {
  return ApplicationService.getApplicationsCountByRecentDays(
    7,
    3,
    signal
  ) as Promise<Record<string, number>>;
};

const ApplicationsChart: React.FC = () => {
  const subscribeEvents = useCallback(async (callback: () => void) => {
    const websocketModule = await import("@/services/websocketService");
    const service = websocketModule.webSocketService;

    await service.start();

    service.onApplicationCreated(callback);
    service.onApplicationUpdated(callback);
    service.onApplicationDeleted(callback);
  }, []); // Dependencies are correct

  const unsubscribeEvents = useCallback(async (callback: () => void) => {
    const websocketModule = await import("@/services/websocketService");
    const service = websocketModule.webSocketService;

    service.offApplicationCreated(callback);
    service.offApplicationUpdated(callback);
    service.offApplicationDeleted(callback);
  }, []); // Dependencies are correct

  return (
    <BaseDataChart
      title="Графік поданих заявок"
      dataKey="applications"
      tooltipLabel="Заявки"
      gradientId="colorApplications"
      gradientColor="#E76715"
      fetchDataFunction={fetchApplicationsData}
      subscribeEvents={subscribeEvents}
      unsubscribeEvents={unsubscribeEvents}
    />
  );
};

export default ApplicationsChart;
