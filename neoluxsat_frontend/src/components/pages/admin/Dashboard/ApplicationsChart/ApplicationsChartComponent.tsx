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
import { ApplicationService } from '@/services/application.service';
import { webSocketService } from '@/services/websocketService';

interface ChartDataItem {
  date: string;
  applications: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-primaryWhite p-2 rounded text-primaryBlue text-center font-semibold">
        <p className="text-[14px]/[120%]">Заявки: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const ApplicationsChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchChartData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await ApplicationService.getApplicationsCountByRecentDays(
          7, // Last 7 days
          3,
          controller.signal
        );

        const transformedData: ChartDataItem[] = Object.entries(data).map(
          ([date, count]) => ({
            date,
            applications: count as number,
          })
        );
        // Sort data by date
        transformedData.sort((a, b) => {
          const parseDate = (dateStr: string) => {
            const [day, month] = dateStr.split('.').map(Number);
            const year = new Date().getFullYear();
            return new Date(year, month - 1, day).getTime();
          };
          return parseDate(a.date) - parseDate(b.date);
        });

        setChartData(transformedData);
      } catch (err) {
        console.error('Failed to fetch chart data:', err);
        setError('Не вдалося завантажити дані для графіку.');
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const refetchChartData = async () => {
      try {
        setError(null);
        const controller = new AbortController();
        const data = await ApplicationService.getApplicationsCountByRecentDays(
          7, // Last 7 days
          3,
          controller.signal
        );

        const transformedData: ChartDataItem[] = Object.entries(data).map(
          ([date, count]) => ({
            date,
            applications: count as number,
          })
        );
        // Sort data by date
        transformedData.sort((a, b) => {
          const parseDate = (dateStr: string) => {
            const [day, month] = dateStr.split('.').map(Number);
            const year = new Date().getFullYear();
            return new Date(year, month - 1, day).getTime();
          };
          return parseDate(a.date) - parseDate(b.date);
        });

        setChartData(transformedData);
      } catch (err) {
        console.error('Failed to fetch chart data:', err);
        setError('Не вдалося завантажити дані для графіку.');
      }
    };

    webSocketService.start();

    const handleAppChange = () => {
      refetchChartData();
    };

    webSocketService.onApplicationCreated(handleAppChange);
    webSocketService.onApplicationUpdated(handleAppChange);
    webSocketService.onApplicationDeleted(handleAppChange);

    return () => {
      webSocketService.offApplicationCreated(handleAppChange);
      webSocketService.offApplicationUpdated(handleAppChange);
      webSocketService.offApplicationDeleted(handleAppChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center max-lg:min-w-full lg:flex-1 rounded-[20px] text-primaryBlue bg-primaryBlue/10 px-[12px] pt-[24px] pb-[12px] min-h-[380px] max-w-[680px]">
        Завантаження графіку...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-[16px]/[120%] font-semibold font-noto w-full max-sm:min-h-[120px] max-lg:min-h-[240px] max-lg:min-w-full lg:flex-1 bg-iconsRed/10 rounded-[20px] p-4 text-iconsRed/70 min-h-[380px] flex items-center justify-center max-w-[680px]">
        Помилка: {error}
      </div>
    );
  }

  const content = () => {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={chartData}
          margin={{
            top: 25,
            right: 25,
            left: -10,
            bottom: 10,
          }}
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

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="applications"
            stroke="#E76715"
            fill="url(#colorApplications)"
            strokeWidth={2}
          />

          <defs>
            <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E76715" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#E76715" stopOpacity={0.0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="w-full max-lg:min-w-full lg:flex-1 rounded-[20px] bg-primaryBlue/10 px-[12px] pt-[24px] pb-[12px] min-h-[380px] max-w-[680px]">
      <h2 className="text-[18px]/[120%] font-semibold font-noto tracking-[-0.36px] text-primaryBlue mb-[24px]">
        Графік поданих заявок
      </h2>

      <div className="bg-primaryWhite rounded-[16px] p-2 h-full">
        {content()}
      </div>
    </div>
  );
};

export default React.memo(ApplicationsChartComponent);
