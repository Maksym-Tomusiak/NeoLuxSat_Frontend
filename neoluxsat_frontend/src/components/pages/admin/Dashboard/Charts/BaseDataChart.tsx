import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { webSocketService } from '@/services/websocketService';

// --- Generic Types ---
interface ChartDataItem {
  date: string;
  [key: string]: number | string; // Allows for dynamic keys like 'applications' or 'repairs'
}

type FetchDataFunction = (
  signal: AbortSignal
) => Promise<Record<string, number>>;

type SubscribeFunction = (callback: () => void) => void;
type UnsubscribeFunction = (callback: () => void) => void;

// --- Component Props ---
interface BaseDataChartProps {
  title: string;
  dataKey: string;
  tooltipLabel: string;
  gradientId: string;
  gradientColor: string;
  fetchDataFunction: FetchDataFunction;
  subscribeEvents: SubscribeFunction;
  unsubscribeEvents: UnsubscribeFunction;
}

// --- Generic Tooltip ---
const CustomTooltip = ({ active, payload, tooltipLabel }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-primaryWhite p-2 rounded text-primaryBlue text-center font-semibold">
        <p className="text-[14px]/[120%]">
          {tooltipLabel}: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

// --- Date Sorting Helper ---
const parseDate = (dateStr: string) => {
  const [day, month] = dateStr.split('.').map(Number);
  const year = new Date().getFullYear();
  return new Date(year, month - 1, day).getTime();
};

const BaseDataChart: React.FC<BaseDataChartProps> = ({
  title,
  dataKey,
  tooltipLabel,
  gradientId,
  gradientColor,
  fetchDataFunction,
  subscribeEvents,
  unsubscribeEvents,
}) => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Data Transformation Logic ---
  const transformAndSortData = (
    data: Record<string, number>
  ): ChartDataItem[] => {
    const transformedData: ChartDataItem[] = Object.entries(data).map(
      ([date, count]) => ({
        date,
        [dataKey]: count as number, // Use the dynamic dataKey
      })
    );

    transformedData.sort((a, b) => parseDate(a.date) - parseDate(b.date));
    return transformedData;
  };

  // --- Initial Data Fetch ---
  useEffect(() => {
    const controller = new AbortController();
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDataFunction(controller.signal);
        setChartData(transformAndSortData(data));
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Failed to fetch chart data:', err);
          setError('Не вдалося завантажити дані для графіку.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchDataFunction, dataKey]); // Dependencies are stable functions/values

  // --- WebSocket Refetch Logic ---
  useEffect(() => {
    const refetchChartData = async () => {
      try {
        setError(null); // Clear previous errors on refetch
        const controller = new AbortController();
        const data = await fetchDataFunction(controller.signal);
        setChartData(transformAndSortData(data));
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Failed to refetch chart data:', err);
          setError('Не вдалося оновити дані для графіку.');
        }
      }
    };

    webSocketService.start();

    const handleDataChange = () => {
      refetchChartData();
    };

    subscribeEvents(handleDataChange);

    return () => {
      unsubscribeEvents(handleDataChange);
    };
  }, [fetchDataFunction, dataKey, subscribeEvents, unsubscribeEvents]);

  // --- Loading State ---
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center max-lg:min-w-full lg:flex-1 rounded-[20px] text-primaryBlue bg-primaryBlue/10 px-[12px] pt-[24px] pb-[12px] min-h-[380px] max-w-[680px]">
        Завантаження графіку...
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="text-[16px]/[120%] font-semibold font-noto w-full max-sm:min-h-[120px] max-lg:min-h-[240px] max-lg:min-w-full lg:flex-1 bg-iconsRed/10 rounded-[20px] p-4 text-iconsRed/70 min-h-[380px] flex items-center justify-center max-w-[680px]">
        Помилка: {error}
      </div>
    );
  }

  // --- Chart Content ---
  const content = () => {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={chartData}
          margin={{ top: 25, right: 25, left: -10, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="7 7"
            stroke="#e0e0e0"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="#1A267C99"
            padding={{ left: 20, right: 0 }}
            tick={{
              fill: '#616161',
              fontSize: 14,
              fontFamily: 'Noto Sans',
              letterSpacing: -0.28,
              dy: 10,
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="#1A267C99"
            tick={{
              fill: '#616161',
              fontSize: 14,
              fontFamily: 'Noto Sans',
              letterSpacing: -0.28,
              dy: -4,
            }}
            axisLine={false}
            allowDecimals={false}
            tickLine={false}
            domain={[0, 'auto']}
          />
          <Tooltip content={<CustomTooltip tooltipLabel={tooltipLabel} />} />
          <Area
            type="monotone"
            dataKey={dataKey} // Use prop
            stroke={gradientColor} // Use prop
            fill={`url(#${gradientId})`} // Use prop
            strokeWidth={2}
          />
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={gradientColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={gradientColor} stopOpacity={0.0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  // --- Component Render ---
  return (
    <div className="w-full max-lg:min-w-full lg:flex-1 rounded-[20px] bg-primaryBlue/10 px-[12px] pt-[24px] pb-[12px] min-h-[380px] max-w-[680px]">
      <h2 className="text-[18px]/[120%] font-semibold font-noto tracking-[-0.36px] text-primaryBlue mb-[24px]">
        {title} {/* Use prop */}
      </h2>
      <div className="bg-primaryWhite rounded-[16px] p-2 h-full">
        {content()}
      </div>
    </div>
  );
};

export default React.memo(BaseDataChart);
