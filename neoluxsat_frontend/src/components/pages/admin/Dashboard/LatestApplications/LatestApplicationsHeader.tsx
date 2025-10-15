import React from 'react';
import {
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/admin/dashboard-table';
import UserIcon from '@/assets/svgs/admin/dashboard/person-icon.svg';
import StatusIcon from '@/assets/svgs/admin/dashboard/status-icon.svg';
import DateIcon from '@/assets/svgs/admin/dashboard/date-icon.svg';
import ActionsIcon from '@/assets/svgs/admin/dashboard/actions-icon.svg';

const LatestApplicationsHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow className="border-b-0">
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center pl-[12px]">
            <UserIcon />
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              ПІБ
            </p>
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
            <DateIcon />
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

export default LatestApplicationsHeader;
