"use client";

import { RepairService } from "@/services/repair.service";
import BaseDataChart from "./BaseDataChart";
import React from "react";

const fetchRepairsData = (signal: AbortSignal) => {
  return RepairService.getRepairsCountByRecentDays(
    7, // Last 7 days
    3,
    signal
  ) as Promise<Record<string, number>>;
};

const RepairsChartComponent: React.FC = () => {
  // 3. Define the event subscriptions using useCallback and dynamic imports
  const subscribeToRepairEvents = React.useCallback((callback: () => void) => {
    // We use a local variable to hold the imported service for cleanup
    let service: any;

    // Connect function for useEffect
    const connect = async () => {
      try {
        // DYNAMIC IMPORT: Prevents server crash
        const websocketModule = await import("@/services/websocketService");
        service = websocketModule.webSocketService;

        await service.start();

        service.onRepairCreated(callback);
        service.onRepairDeleted(callback);
      } catch (error) {
        console.error("Failed to subscribe to repairs WS:", error);
      }
    };

    connect();

    // 4. Return the unsubscribe function immediately for cleanup logic
    return () => {
      if (service) {
        service.offRepairCreated(callback);
        service.offRepairDeleted(callback);
      }
    };
  }, []); // Dependencies are empty since callback is passed in BaseDataChart

  const unsubscribeEvents = async (callback: () => void) => {
    const websocketModule = await import("@/services/websocketService");
    const service = websocketModule.webSocketService;
    service.offRepairCreated(callback);
    service.offRepairDeleted(callback);
  };

  return (
    <BaseDataChart
      title="Графік ремонтів"
      dataKey="repairs"
      tooltipLabel="Ремонти"
      gradientId="colorRepairs"
      gradientColor="#1A267C"
      fetchDataFunction={fetchRepairsData}
      subscribeEvents={subscribeToRepairEvents}
      unsubscribeEvents={unsubscribeEvents} // This will now be an async function
    />
  );
};

export default RepairsChartComponent;
