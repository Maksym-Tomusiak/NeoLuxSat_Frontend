"use client";

import React, { useState, useEffect } from "react"; // 💡 --- NEW: Added hooks
import NetworkTimeIcon from "@/assets/svgs/network/network-time-icon.svg?component";
import NetworkStatusIcon from "@/assets/svgs/network/network-status-icon.svg?component";
import type { NetworkProblemDto } from "@/types/networkProblem";
import { cn } from "@/lib/utils";

type NetworkProblemCardProps = {
  icon: React.ReactNode;
  problem: NetworkProblemDto;
};

const statusStyles: Record<
  string,
  { cardBg: string; badgeBg: string; border: string }
> = {
  // ... (your existing styles object)
  "У процесі відновлення": {
    cardBg: "bg-iconsRed/10",
    badgeBg: "bg-iconsRed/20",
    border: "border-iconsRed",
  },
  Заплановано: {
    cardBg: "bg-iconsBlue/10",
    badgeBg: "bg-iconsBlue/20",
    border: "border-iconsBlue",
  },
  Вирішено: {
    cardBg: "bg-iconsGreen/10",
    badgeBg: "bg-iconsGreen/20",
    border: "border-iconsGreen",
  },
};

// 💡 --- NEW: Helper function to format the time difference ---
// This function is placed outside the component because it's pure
// and doesn't need to be recreated on every render.
const formatTimeAgo = (createdAtValue: string | Date): string => {
  // Create a new Date object from the string (or Date)
  const createdAtDate = new Date(createdAtValue);

  // Add a check for "Invalid Date" in case the string is empty or corrupt
  if (isNaN(createdAtDate.getTime())) {
    console.error("Invalid createdAt date provided:", createdAtValue);
    return "—"; // Fallback for invalid date
  }

  const now = new Date();

  // Get the difference in milliseconds
  const diffMs = now.getTime() - createdAtDate.getTime();

  // Convert milliseconds to minutes, hours, and days
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  // Apply your specific formatting rules
  if (diffMinutes < 1) {
    return "щойно"; // "just now"
  }
  if (diffMinutes < 60) {
    // < 1 hour
    return `${diffMinutes} хв тому`;
  }
  if (diffHours < 24) {
    // < 1 day
    return `${diffHours} год тому`;
  }
  // > 1 day
  return `${diffDays} дн тому`;
};

const NetworkProblemCard: React.FC<NetworkProblemCardProps> = ({
  icon,
  problem,
}) => {
  // 💡 --- NEW: State for the "time ago" string ---
  // We initialize the state by calling the helper function once
  const [timeAgo, setTimeAgo] = useState(() =>
    formatTimeAgo(problem.createdAt)
  );

  // 💡 --- NEW: Effect to update the time every minute ---
  useEffect(() => {
    // Set up an interval that runs every 60 seconds
    const interval = setInterval(() => {
      // Recalculate and update the state
      setTimeAgo(formatTimeAgo(problem.createdAt));
    }, 60000); // 60000ms = 1 minute

    // Cleanup function: This runs when the component unmounts
    // or if `problem.createdAt` changes, preventing memory leaks.
    return () => clearInterval(interval);
  }, [problem.createdAt]); // Dependency array: re-run if the problem changes

  const parseUtcTimeToLocal = (timeStr: string) => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    const utcDate = new Date(Date.UTC(1970, 0, 1, hours, minutes, seconds));
    return utcDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusTitle = problem.networkProblemStatus.title;
  const styles = statusStyles[statusTitle] || statusStyles["Заплановано"];

  const start = problem.fixStartTime
    ? parseUtcTimeToLocal(problem.fixStartTime)
    : null;
  const end = problem.fixEndTime
    ? parseUtcTimeToLocal(problem.fixEndTime)
    : null;

  // Format text
  let formattedTime = "";
  if (statusTitle === "Вирішено" && end) {
    formattedTime = `Завершено о ${end}`;
  } else if (
    statusTitle === "У процесі відновлення" ||
    statusTitle === "Заплановано"
  ) {
    if (start && end) formattedTime = `${start} - ${end}`;
    else if (end) formattedTime = `до ${end}`;
    else if (start) formattedTime = `після ${start}`;
  }

  return (
    <div
      className={cn(
        // The main card container is a flex-col, so the new div will
        // automatically appear at the bottom.
        `flex flex-col flex-shrink-0 text-primaryBlue p-[24px] gap-[24px] rounded-[20px] border border-[1.4px] max-w-[1030px] lg:min-h-[200px]`,
        styles.cardBg,
        styles.border
      )}
    >
      <div className="flex flex-col md:flex-row gap-[16px] justify-between items-start md:items-center">
        {/* ... (existing header content) ... */}
        <div className="flex gap-[16px] items-center">
          <div className="min-w-[40px] min-h-[40px]">{icon}</div>
          <div className="flex flex-col gap-[8px]">
            <p className="font-manrope font-semibold text-[20px]/[90%] 2xs:text-[24px]/[90%]">
              {problem.title}
            </p>
            <p className="font-noto font-normal text-[16px]/[120%] tracking-[-0.32px]">
              {problem.address}
            </p>
          </div>
        </div>
        <p
          className={cn(
            `font-noto font-normal text-[14px]/[120%] tracking-[-0.28px] px-[10px] py-[8px] rounded-full text-center`,
            styles.badgeBg
          )}
        >
          {statusTitle}
        </p>
      </div>

      <div className="min-h-[1.4px] bg-primaryBlue/20 rounded-full"></div>

      <div className="flex justify-between items-start max-md:flex-col max-md:flex-wrap gap-[24px]">
        {/* ... (existing time/status/services content) ... */}
        <div className="flex gap-[24px] md:items-start max-sm:flex-col max-md:flex-wrap">
          <div className="flex gap-[12px] md:items-start items-center">
            <div className="min-w-[24px] min-h-[24px] md:mt-[3px]">
              <NetworkTimeIcon />
            </div>
            <div className="flex flex-col gap-[8px]">
              <p className="font-noto text-primaryBlue/80 text-[14px]/[120%] tracking-[-0.28px]">
                Очікуваний час усунення
              </p>
              <p className="font-noto font-medium text-[16px]/[120%] tracking-[-0.32px]">
                {formattedTime || "—"}
              </p>
            </div>
          </div>

          <div className="flex gap-[12px] items-center md:items-start max-w-[600px]">
            <div className="min-w-[24px] min-h-[24px] md:mt-[3px]">
              <NetworkStatusIcon />
            </div>
            <div className="flex flex-col gap-[8px]">
              <p className="font-noto text-primaryBlue/80 text-[14px]/[120%] tracking-[-0.28px]">
                Статус
              </p>
              <p className="font-noto font-medium text-[16px]/[120%] tracking-[-0.32px]">
                {problem.currentStatus}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[8px]">
          <p className="font-noto text-primaryBlue/80 text-[14px]/[120%] tracking-[-0.28px]">
            Затронуті послуги
          </p>
          <div className="flex gap-[8px] flex-wrap">
            {problem.networkProblemServices.map((service) => (
              <p
                key={`${problem.id}-${service.id}`}
                className="font-noto text-[14px]/[120%] tracking-[-0.28px] p-[10px] rounded-[10px] text-primaryWhite bg-primaryBlue"
              >
                {service.title}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* 💡 --- NEW: Time Since Created (Bottom Right) --- */}
      <div className="flex justify-end">
        <p className="font-noto text-primaryBlue/80 text-[14px]/[120%] tracking-[-0.32px]">
          {timeAgo}
        </p>
      </div>
    </div>
  );
};

export default NetworkProblemCard;
