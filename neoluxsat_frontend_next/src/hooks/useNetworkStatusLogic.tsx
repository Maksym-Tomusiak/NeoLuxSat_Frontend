"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { NetworkProblemService } from "@/services/networkProblem.service";
import { webSocketService } from "@/services/websocketService";
import type { NetworkProblemDto } from "@/types/networkProblem";
import type { NetworkStatusData } from "@/components/pages/support/NetworkSection/NetworkStatusCard";
import SuccessIcon from "@/assets/svgs/network/checkmark-icon.svg?component";
import ErrorIcon from "@/assets/svgs/network/error-icon.svg?component";

const useNetworkStatusLogic = () => {
  const [problems, setProblems] = useState<NetworkProblemDto[]>([]);
  const [fetchError, setFetchError] = useState(false);
  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(Date.now());
  const [lastUpdatedMinutes, setLastUpdatedMinutes] = useState(0);

  // 2. Виносимо логіку завантаження в useCallback
  const fetchStatus = useCallback(async () => {
    try {
      const data = await NetworkProblemService.getAllNetworkProblems();
      setProblems(data);
      setFetchError(false); // Скидаємо помилку, якщо завантаження успішне
      setLastUpdateTimestamp(Date.now()); // Скидаємо час оновлення
    } catch (error) {
      console.error("Failed to fetch network status:", error);
      setFetchError(true);
      setProblems([]);
    }
  }, []);

  // 3. Ефект для початкового завантаження
  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // 4. Ефект для підключення до WebSockets
  useEffect(() => {
    webSocketService.start();

    // Обробник, який просто перезавантажує дані
    const handleDataChange = () => {
      fetchStatus();
    };

    // Підписуємось на всі три події
    webSocketService.onNetworkProblemCreated(handleDataChange);
    webSocketService.onNetworkProblemUpdated(handleDataChange);
    webSocketService.onNetworkProblemDeleted(handleDataChange);

    // Відписка при виході
    return () => {
      webSocketService.offNetworkProblemCreated(handleDataChange);
      webSocketService.offNetworkProblemUpdated(handleDataChange);
      webSocketService.offNetworkProblemDeleted(handleDataChange);
    };
  }, [fetchStatus]); // Залежимо від fetchStatus

  // 5. Оновлений ефект для таймера "востаннє оновлено"
  useEffect(() => {
    const updateMinutes = () => {
      const minutes = Math.floor((Date.now() - lastUpdateTimestamp) / 60000);
      setLastUpdatedMinutes(minutes);
    };

    updateMinutes(); // Запускаємо одразу
    const intervalId = setInterval(updateMinutes, 60000); // і кожну хвилину

    return () => clearInterval(intervalId);
  }, [lastUpdateTimestamp]); // Перезапускаємо інтервал при зміні lastUpdateTimestamp

  // 6. Використовуємо useMemo для getCardData та виправляємо логіку
  const getCardData = useMemo((): NetworkStatusData => {
    // Помилка завантаження АБО є активні проблеми
    if (fetchError || (problems && problems.length > 0)) {
      return {
        title: "Тимчасові технічні роботи",
        message: (
          <>
            Наш сервер тимчасово недоступний або фіксуються проблеми.{" "}
            <br className="hidden min-[600px]:block" />
            Дані оновлюються. Дякуємо за розуміння!
          </>
        ),
        status: "Технічні проблеми",
        updated: `${lastUpdatedMinutes} хв тому`,
        icon: <ErrorIcon />,
        iconBgColorClass: "bg-primaryOrange",
        statusColorClass: "text-primaryOrange",
      };
    }

    // Все добре
    return {
      title: "З'єднання стабільне",
      message: (
        <>
          Жодних технічних проблем не виявлено.{" "}
          <br className="hidden min-[600px]:block" />
          Дякуємо, що користуєтесь нашими послугами!
        </>
      ),
      status: "Активний",
      updated: `${lastUpdatedMinutes} хв тому`,
      icon: <SuccessIcon />,
      iconBgColorClass: "bg-iconsGreen",
      statusColorClass: "text-iconsGreen",
    };
  }, [problems, fetchError, lastUpdatedMinutes]);

  return { problems, fetchError, getCardData };
};

export default useNetworkStatusLogic;
