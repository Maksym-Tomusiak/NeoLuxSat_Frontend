import React from 'react';
import {
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/admin/crud-table';
import PersonIcon from '@/assets/svgs/admin/dashboard/person-icon.svg';
import ContentIcon from '@/assets/svgs/admin/dashboard/status-icon.svg';
import ActionsIcon from '@/assets/svgs/admin/dashboard/actions-icon.svg';
import PhoneIcon from '@/assets/svgs/contacts/phone-icon.svg';
import ModelIcon from '@/assets/svgs/admin/dashboard/status-icon.svg';
import SumIcon from '@/assets/svgs/admin/dashboard/status-icon.svg';

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

const RepairsTableHeader: React.FC = () => {
  return (
    <TableHeader className="mb-4">
      <TableRow className="border-b-0 hover:bg-transparent">
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <HashIcon />
            Номер
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <ContentIcon />
            <p>Статус</p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <PersonIcon />
            <p>Прізвище</p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <PersonIcon />
            <p>Ім'я</p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] justify-start items-center fill-primaryBlue/80">
            <PhoneIcon /> {/* Assuming */}
            <p>Телефон</p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <ModelIcon /> {/* Assuming */}
            <p>Тип</p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <ModelIcon /> {/* Assuming */}
            <p>Модель</p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <SumIcon /> {/* Assuming */}
            <p>Сума</p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <ContentIcon />
            <p>Розрахунок</p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue text-right">
          <div className="flex gap-[6px] items-center justify-end mr-[8px]">
            <ActionsIcon />
            <p>Дії</p>
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default RepairsTableHeader;
