import React from 'react';
import {
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/admin/crud-table';
import CategoryIcon from '@/assets/svgs/admin/dashboard/category-icon.svg';
import PersonIcon from '@/assets/svgs/admin/dashboard/person-icon.svg';
import ContentIcon from '@/assets/svgs/admin/dashboard/status-icon.svg';
import ActionsIcon from '@/assets/svgs/admin/dashboard/actions-icon.svg';

const FaqsTableHeader: React.FC = () => {
  return (
    <TableHeader className="mb-4">
      <TableRow className="border-b-0 hover:bg-transparent">
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <CategoryIcon />
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Категорія
            </p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] justify-center items-center">
            <PersonIcon />
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Питання
            </p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] justify-center items-center">
            <ContentIcon />
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Відповідь
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

export default FaqsTableHeader;
