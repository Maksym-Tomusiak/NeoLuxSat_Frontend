"use client";

import { useCallback, useEffect, useState } from "react";
import { ApplicationService } from "@/services/application.service";
import { ApplicationTypeService } from "@/services/applicationType.service";
import type { ApplicationTypeDto } from "@/types/application";
import ApplicationTypeCard from "./ApplicationTypeCard";
import React from "react";

interface ApplicationsByTypeData {
  [typeTitle: string]: number;
}

const ApplicationsByTypeComponent = () => {
  const applicationTypes = ["інтернет", "телебачення", "безпек", "iot"];

  const [applicationsData, setApplicationsData] =
    useState<ApplicationsByTypeData>({});
  const [types, setTypes] = useState<ApplicationTypeDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchComponentData = useCallback(
    async (signal: AbortSignal, isInitialLoad: boolean) => {
      if (isInitialLoad) {
        setLoading(true);
      }

      try {
        const [countsData, typesData] = await Promise.all([
          ApplicationService.getApplicationsCountByTypes(signal),
          ApplicationTypeService.getAllApplicationTypes(signal),
        ]);

        let fitered = typesData.filter((type) =>
          applicationTypes.some((title) =>
            type.title.toLowerCase().includes(title.toLowerCase())
          )
        );
        setApplicationsData(countsData);
        setTypes(fitered);
        setError(""); // Скидаємо помилку, якщо завантаження успішне
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error(err);
          setError("Не вдалось завантажити дані для цієї секції");
        }
      } finally {
        if (isInitialLoad) {
          setLoading(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchComponentData(controller.signal, true);

    return () => {
      controller.abort();
    };
  }, [fetchComponentData]); // Залежимо від стабільної функції

  useEffect(() => {
    let service: any; // For cleanup

    // This handler must be defined here for stable reference
    const handleAppChange = () => {
      const refetchController = new AbortController();
      fetchComponentData(refetchController.signal, false);
    };

    const connect = async () => {
      try {
        // DYNAMIC IMPORT: Prevents server crash
        const websocketModule = await import("@/services/websocketService");
        service = websocketModule.webSocketService;

        await service.start();

        // Set up listeners
        service.onApplicationCreated(handleAppChange);
        service.onApplicationUpdated(handleAppChange);
        service.onApplicationDeleted(handleAppChange);
      } catch (error) {
        console.error(
          "Failed to connect websocket in ApplicationsByTypeComponent:",
          error
        );
      }
    };

    connect();

    // Cleanup function
    return () => {
      if (service) {
        service.offApplicationCreated(handleAppChange);
        service.offApplicationUpdated(handleAppChange);
        service.offApplicationDeleted(handleAppChange);
      }
    };
  }, [fetchComponentData]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center max-lg:min-w-full lg:flex-1 rounded-[20px] text-primaryBlue bg-primaryBlue/10 min-h-[260px] max-w-[680px]">
        Завантаження даних...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-[16px]/[120%] font-semibold font-noto w-full max-sm:min-h-[120px] max-lg:min-h-[240px] max-lg:min-w-full lg:flex-1 bg-iconsRed/10 rounded-[20px] text-iconsRed/70 min-h-[260px] flex items-center justify-center max-w-[680px]">
        Помилка: {error}
      </div>
    );
  }

  return (
    <div className="text-primaryWhite w-full lg:flex-1">
      <div className="flex flex-wrap gap-[20px] justify-center items-center">
        {types.map((type) => (
          <ApplicationTypeCard
            key={type.id}
            type={type}
            count={applicationsData[type.title] || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ApplicationsByTypeComponent);
