import React from 'react';
import {
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/admin/crud-table';
import ContentIcon from '@/assets/svgs/admin/dashboard/status-icon.svg';
import DateIcon from '@/assets/svgs/admin/dashboard/date-icon.svg';
import ActionsIcon from '@/assets/svgs/admin/dashboard/actions-icon.svg';
import AddressIcon from '@/assets/svgs/admin/dashboard/address-icon.svg';
import ActiveIcon from '@/assets/svgs/admin/dashboard/finished-icon.svg';

const NetworkProblemsTableHeader: React.FC = () => {
  return (
    <TableHeader className="mb-4">
      <TableRow className="border-b-0 hover:bg-transparent">
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <div className="fill-primaryBlue/80">
              <ActiveIcon />
            </div>
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Активна
            </p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <ContentIcon />
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Заголовок
            </p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <AddressIcon />
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Адреса
            </p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <ContentIcon />
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
              Час від/до
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
          <div className="flex gap-[6px] items-center justify-end mr-[8px]">
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

export default NetworkProblemsTableHeader;
