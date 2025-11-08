// components/admin/dashboard/LatestRepairsRow.tsx
import React from 'react';
import { TableCell, TableRow } from '@/components/common/admin/dashboard-table';
import OptionsIcon from '@/assets/svgs/admin/dashboard/options-icon.svg';
import DetailsIcon from '@/assets/svgs/admin/dashboard/details-icon.svg';
import EditIcon from '@/assets/svgs/admin/dashboard/edit-icon.svg';
import DeleteIcon from '@/assets/svgs/admin/dashboard/delete-icon.svg';
import type { RepairDto } from '@/types/repair'; // Changed import
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';

// This generic function should work for repairs too
const getStatusStyles = (status: string = '') => {
  const statusLower = status?.toLowerCase();
  switch (statusLower) {
    case 'відкладена':
    case 'скасована':
      return 'bg-iconsRed/20 border border-iconsRed/80';
    case 'видано':
    case 'ремонт завершено':
      return 'bg-iconsGreen/20 border border-iconsGreen/80';
    case 'пошук майстра':
    case 'на виконанні':
    case 'повідомлено':
      return 'bg-iconsBlue/20 border border-iconsBlue/80';
    case 'нове замовлення':
    default:
      return 'bg-primaryOrange/20 border border-primaryOrange/80';
  }
};

interface Props {
  repair: RepairDto; // Changed from 'app'
  openMenuId: string | null;
  onToggleMenu: (id: string) => void;
  onDetails: (repair: RepairDto) => void; // Changed from 'app'
  onEdit: (repair: RepairDto) => void; // Changed from 'app'
  onDelete: (id: string, name: string) => void;
  formatDate: (d: Date | string) => string;
}

const LatestRepairsRow: React.FC<Props> = ({
  repair,
  onDetails,
  onEdit,
  onDelete,
  formatDate,
}) => {
  return (
    <TableRow
      key={repair.id}
      className="bg-primaryWhite rounded-[10px] h-[60px] transition-shadow duration-200 shadow-none hover:shadow-md border-b-0 hover:bg-muted/50 data-[state=selected]:bg-muted"
    >
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue py-3 rounded-l-[10px] truncate max-w-[130px]">
        {String(repair.displayId).padStart(5, '0')}
      </TableCell>
      <TableCell className="p-0">
        <span
          className={`inline-flex justify-start px-[10px] py-[8px] rounded-full ${getStatusStyles(
            repair.status?.title
          )}`}
        >
          <p className="font-noto text-[14px]/[120%] tracking-[-0.28px] font-normal text-primaryBlue">
            {repair.status?.title}
          </p>
        </span>
      </TableCell>
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue p-0">
        {formatDate(repair.createdAt)}
      </TableCell>
      <TableCell className="text-right pr-[18px] rounded-r-[10px] relative">
        <Popover>
          <PopoverTrigger asChild>
            <button className="hover:cursor-pointer">
              <OptionsIcon />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="p-1 flex space-x-1 space-y-1 w-fit"
            align="end"
            sideOffset={8}
          >
            {/* Popover content with buttons */}
            <button
              className="p-1 cursor-pointer hover:bg-gray-100 rounded-md transition-colors flex items-center justify-center"
              onClick={() => onDetails(repair)}
            >
              <DetailsIcon />
            </button>
            <button
              className="p-1 cursor-pointer hover:bg-gray-100 rounded-md transition-colors flex items-center justify-center"
              onClick={() => onEdit(repair)}
            >
              <EditIcon />
            </button>
            <button
              className="p-1 cursor-pointer hover:bg-gray-100 rounded-md transition-colors flex items-center justify-center"
              onClick={() =>
                onDelete(repair.id, String(repair.displayId).padStart(5, '0'))
              }
            >
              <DeleteIcon />
            </button>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
};

export default LatestRepairsRow;
