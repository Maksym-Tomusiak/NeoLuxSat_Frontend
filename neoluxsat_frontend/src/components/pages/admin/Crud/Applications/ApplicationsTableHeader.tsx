import React from 'react';
import {
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/admin/crud-table';
import PersonIcon from '@/assets/svgs/admin/dashboard/person-icon.svg';
import ContentIcon from '@/assets/svgs/admin/dashboard/status-icon.svg';
import DateIcon from '@/assets/svgs/admin/dashboard/date-icon.svg';
import ActionsIcon from '@/assets/svgs/admin/dashboard/actions-icon.svg';
import AddressIcon from '@/assets/svgs/admin/dashboard/address-icon.svg';

const ApplicationsTableHeader: React.FC = () => {
  return (
    <TableHeader className="mb-4">
      <TableRow className="border-b-0 hover:bg-transparent">
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <PersonIcon />
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              ПІБ
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
            <DateIcon />
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Дата створення
            </p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <ContentIcon />
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Послуга
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

export default ApplicationsTableHeader;
