// components/admin/dashboard/LatestRepairsHeader.tsx
import React from "react";
import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/admin/dashboard-table";
import StatusIcon from "@/assets/svgs/admin/dashboard/status-icon.svg?component";
import DateIcon from "@/assets/svgs/admin/dashboard/date-icon.svg?component";
import ActionsIcon from "@/assets/svgs/admin/dashboard/actions-icon.svg?component";

const HashIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="fill-primaryBlue/80"
  >
    <line x1="4" y1="9" x2="20" y2="9"></line>
    <line x1="4" y1="15" x2="20" y2="15"></line>
    <line x1="10" y1="3" x2="8" y2="21"></line>
    <line x1="16" y1="3" x2="14" y2="21"></line>
  </svg>
);

const LatestRepairsHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow className="border-b-0">
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center pl-[12px]">
            <HashIcon />
            Номер
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <StatusIcon />
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Статус
            </p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <div className="fill-primaryBlue/80">
              <DateIcon />
            </div>
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Дата створення
            </p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue text-right">
          <div className="flex gap-[6px] items-center justify-end pr-[12px]">
            <ActionsIcon />
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Дії
            </p>
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default LatestRepairsHeader;
