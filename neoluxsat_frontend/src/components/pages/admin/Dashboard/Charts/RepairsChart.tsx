import { RepairService } from '@/services/repair.service';
import BaseDataChart from './BaseDataChart';
import React from 'react';
import { webSocketService } from '@/services/websocketService';

const fetchRepairsData = (signal: AbortSignal) => {
  return RepairService.getRepairsCountByRecentDays(
    7, // Last 7 days
    3,
    signal
  ) as Promise<Record<string, number>>; // <-- ADDED TYPE CAST
};

const subscribeToRepairEvents = (callback: () => void) => {
  webSocketService.onRepairCreated(callback);
  webSocketService.onRepairDeleted(callback);
};

const unsubscribeFromRepairEvents = (callback: () => void) => {
  webSocketService.offRepairCreated(callback);
  webSocketService.offRepairDeleted(callback);
};

const RepairsChartComponent: React.FC = () => {
  return (
    <BaseDataChart
      title="Графік ремонтів"
      dataKey="repairs"
      tooltipLabel="Ремонти"
      gradientId="colorRepairs"
      gradientColor="#1A267C"
      fetchDataFunction={fetchRepairsData}
      subscribeEvents={subscribeToRepairEvents}
      unsubscribeEvents={unsubscribeFromRepairEvents}
    />
  );
};

export default React.memo(RepairsChartComponent);
