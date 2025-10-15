import React from 'react';
import { TableCell, TableRow } from '@/components/common/admin/dashboard-table';
import OptionsIcon from '@/assets/svgs/admin/dashboard/options-icon.svg';
import type { ApplicationDto } from '@/types/application';

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
  openMenuId,
  onToggleMenu,
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
        <button
          className="hover:cursor-pointer"
          onClick={() => onToggleMenu(app.id)}
        >
          <OptionsIcon />
        </button>
        {openMenuId === app.id && (
          <div className="absolute right-2 top-8 z-10 bg-white border border-gray-200 rounded-md shadow-lg w-40">
            <button
              className="w-full text-left px-3 py-2 hover:bg-gray-50"
              onClick={() => onDetails(app)}
            >
              Деталі
            </button>
            <button
              className="w-full text-left px-3 py-2 hover:bg-gray-50"
              onClick={() => onEdit(app)}
            >
              Редагувати
            </button>
            <button
              className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50"
              onClick={() => onDelete(app.id, app.fullName)}
            >
              Видалити
            </button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default LatestApplicationsRow;
