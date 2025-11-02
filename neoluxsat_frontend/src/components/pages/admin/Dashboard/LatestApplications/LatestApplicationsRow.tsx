import React from 'react';
import { TableCell, TableRow } from '@/components/common/admin/dashboard-table';
import OptionsIcon from '@/assets/svgs/admin/dashboard/options-icon.svg';
import DetailsIcon from '@/assets/svgs/admin/dashboard/details-icon.svg';
import EditIcon from '@/assets/svgs/admin/dashboard/edit-icon.svg';
import DeleteIcon from '@/assets/svgs/admin/dashboard/delete-icon.svg';
import type { ApplicationDto } from '@/types/application';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';

const getStatusStyles = (status: string = '') => {
  const statusLower = status?.toLowerCase();
  switch (statusLower) {
    case 'відхилена':
    case 'скасована':
      return 'bg-iconsRed/20 border border-iconsRed/80';
    case 'завершена':
      return 'bg-iconsGreen/20 border border-iconsGreen/80';
    case 'виконується':
      return 'bg-iconsBlue/20 border border-iconsBlue/80';
    case 'нова':
    default:
      return 'bg-primaryOrange/20 border border-primaryOrange/80';
  }
};

interface Props {
  app: ApplicationDto;
  openMenuId: string | null;
  onToggleMenu: (id: string) => void;
  onDetails: (app: ApplicationDto) => void;
  onEdit: (app: ApplicationDto) => void;
  onDelete: (id: string, name: string) => void;
  formatDate: (d: Date | string) => string;
}

const LatestApplicationsRow: React.FC<Props> = ({
  app,
  onDetails,
  onEdit,
  onDelete,
  formatDate,
}) => {
  return (
    <TableRow
      key={app.id}
      className="bg-primaryWhite rounded-[10px] h-[60px] transition-shadow duration-200 shadow-none hover:shadow-md border-b-0 hover:bg-muted/50 data-[state=selected]:bg-muted"
    >
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue py-3 rounded-l-[10px]">
        {app.fullName}
      </TableCell>
      <TableCell className="p-0">
        <span
          className={`inline-flex justify-start px-[10px] py-[8px] rounded-full ${getStatusStyles(
            app.status?.title
          )}`}
        >
          <p className="font-noto text-[14px]/[120%] tracking-[-0.28px] font-normal text-primaryBlue">
            {app.status?.title}
          </p>
        </span>
      </TableCell>
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue p-0">
        {formatDate(app.createdAt)}
      </TableCell>
      <TableCell className="text-right pr-[18px] rounded-r-[10px] relative">
        <Popover>
          <PopoverTrigger asChild>
            <button className="hover:cursor-pointer">
              <OptionsIcon />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="p-1 flex space-x-1 space-y-1 w-fit" // Adjusted classes for a cleaner, vertical list of icons
            align="end" // Align the popover to the end (right) of the trigger
            sideOffset={8} // Space it out a bit from the trigger
          >
            {/* Popover content with buttons */}
            <button
              className="p-1 cursor-pointer hover:bg-gray-100 rounded-md transition-colors flex items-center justify-center"
              onClick={() => onDetails(app)}
            >
              <DetailsIcon />
            </button>
            <button
              className="p-1 cursor-pointer hover:bg-gray-100 rounded-md transition-colors flex items-center justify-center"
              onClick={() => onEdit(app)}
            >
              <EditIcon />
            </button>
            <button
              className="p-1 cursor-pointer hover:bg-gray-100 rounded-md transition-colors flex items-center justify-center"
              onClick={() => onDelete(app.id, app.fullName)}
            >
              <DeleteIcon />
            </button>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
};

export default LatestApplicationsRow;
