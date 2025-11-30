"use client";

import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- Generic Types ---
interface ChartDataItem {
  date: string;
  [key: string]: number | string; // Allows for dynamic keys like 'applications' or 'repairs'
}

type PeriodType = "7days" | "1month" | "3months";

type FetchDataFunction = (
  days: number,
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
  // Handle date range format like "20.11-25.11"
  const firstDate = dateStr.includes("-") ? dateStr.split("-")[0] : dateStr;
  const [day, month] = firstDate.split(".").map(Number);
  const year = new Date().getFullYear();
  return new Date(year, month - 1, day).getTime();
};

// --- Date Grouping Helper ---
const groupDataBySpan = (
  data: Record<string, number>,
  spanDays: number
): Record<string, number> => {
  const entries = Object.entries(data).map(([date, count]) => ({
    date,
    count,
    timestamp: parseDate(date),
  }));

  entries.sort((a, b) => a.timestamp - b.timestamp);

  if (entries.length === 0) return {};

  const grouped: Record<string, number> = {};

  // Group entries into chunks of spanDays
  let currentGroup: typeof entries = [];
  let groupStartIndex = 0;

  entries.forEach((entry, index) => {
    currentGroup.push(entry);

    // Check if we should close this group (every spanDays entries or at the end)
    const shouldCloseGroup =
      currentGroup.length >= spanDays || index === entries.length - 1;

    if (shouldCloseGroup) {
      const firstDateInSpan = currentGroup[0].date;
      const lastDateInSpan = currentGroup[currentGroup.length - 1].date;
      const sum = currentGroup.reduce((acc, e) => acc + e.count, 0);

      // Create date range label
      const dateLabel =
        firstDateInSpan === lastDateInSpan || currentGroup.length === 1
          ? firstDateInSpan
          : `${firstDateInSpan}-${lastDateInSpan}`;

      grouped[dateLabel] = sum;
      currentGroup = [];
    }
  });

  return grouped;
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
  const [period, setPeriod] = useState<PeriodType>("7days");

  const getPeriodConfig = (periodType: PeriodType) => {
    switch (periodType) {
      case "7days":
        return { days: 7, spanDays: 1 };
      case "1month":
        return { days: 30, spanDays: 5 };
      case "3months":
        return { days: 90, spanDays: 15 };
    }
  };

  // --- Data Transformation Logic ---
  const transformAndSortData = (
    data: Record<string, number>,
    spanDays: number
  ): ChartDataItem[] => {
    const processedData = spanDays > 1 ? groupDataBySpan(data, spanDays) : data;

    const transformedData: ChartDataItem[] = Object.entries(processedData).map(
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
        const config = getPeriodConfig(period);
        const data = await fetchDataFunction(config.days, controller.signal);
        setChartData(transformAndSortData(data, config.spanDays));
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch chart data:", err);
          setError("Не вдалося завантажити дані для графіку.");
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
  }, [fetchDataFunction, dataKey, period]); // Dependencies are stable functions/values

  // --- WebSocket Refetch Logic ---
  useEffect(() => {
    const refetchChartData = async () => {
      try {
        setError(null); // Clear previous errors on refetch
        const controller = new AbortController();
        const config = getPeriodConfig(period);
        const data = await fetchDataFunction(config.days, controller.signal);
        setChartData(transformAndSortData(data, config.spanDays));
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Failed to refetch chart data:", err);
          setError("Не вдалося оновити дані для графіку.");
        }
      }
    };

    const handleDataChange = () => {
      refetchChartData();
    };

    subscribeEvents(handleDataChange);

    return () => {
      unsubscribeEvents(handleDataChange);
    };
  }, [fetchDataFunction, dataKey, subscribeEvents, unsubscribeEvents, period]);

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
              fill: "#616161",
              fontSize: 14,
              fontFamily: "Noto Sans",
              letterSpacing: -0.28,
              dy: 10,
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="#1A267C99"
            tick={{
              fill: "#616161",
              fontSize: 14,
              fontFamily: "Noto Sans",
              letterSpacing: -0.28,
              dy: -4,
            }}
            axisLine={false}
            allowDecimals={false}
            tickLine={false}
            domain={[0, "auto"]}
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
      <div className="flex justify-between items-center mb-[16px] gap-[24px] flex-wrap">
        <h2 className="text-[18px]/[120%] font-semibold font-noto tracking-[-0.36px] text-primaryBlue">
          {title} {/* Use prop */}
        </h2>
        <div className="flex gap-[12px] font-noto">
          <button
            onClick={() => setPeriod("7days")}
            className={`px-3 py-2 rounded-lg text-[14px]/[120%] font-medium transition-colors cursor-pointer ${
              period === "7days"
                ? "bg-primaryBlue text-white"
                : "bg-white text-primaryBlue hover:bg-primaryBlue/10"
            }`}
          >
            7 днів
          </button>
          <button
            onClick={() => setPeriod("1month")}
            className={`px-3 py-2 rounded-lg text-[14px]/[120%] font-medium transition-colors cursor-pointer ${
              period === "1month"
                ? "bg-primaryBlue text-white"
                : "bg-white text-primaryBlue hover:bg-primaryBlue/10"
            }`}
          >
            1 місяць
          </button>
          <button
            onClick={() => setPeriod("3months")}
            className={`px-3 py-2 rounded-lg text-[14px]/[120%] font-medium transition-colors cursor-pointer ${
              period === "3months"
                ? "bg-primaryBlue text-white"
                : "bg-white text-primaryBlue hover:bg-primaryBlue/10"
            }`}
          >
            3 місяці
          </button>
        </div>
      </div>
      <div className="bg-primaryWhite rounded-[16px] p-2 h-full max-sm:overflow-x-auto lg:max-[1380px]:overflow-x-auto">
        <div className="max-sm:min-w-[600px] lg:max-[1380px]:min-w-[600px]">
          {content()}
        </div>
      </div>
    </div>
  );
};

export default BaseDataChart;
