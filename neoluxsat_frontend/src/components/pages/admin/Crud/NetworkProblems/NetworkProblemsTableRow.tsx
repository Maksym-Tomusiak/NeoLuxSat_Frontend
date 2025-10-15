import React from 'react';
import { TableCell, TableRow } from '@/components/common/admin/crud-table';
import type { NetworkProblemDto } from '@/types/networkProblem';
import DetailsIcon from '@/assets/svgs/admin/dashboard/details-icon.svg';
import EditIcon from '@/assets/svgs/admin/dashboard/edit-icon.svg';
import DeleteIcon from '@/assets/svgs/admin/dashboard/delete-icon.svg';

const getStatusStyles = (status: string = '') => {
  const statusLower = status?.toLowerCase();
  switch (statusLower) {
    case 'критичний':
    case 'критична':
      return 'bg-iconsRed/20 border border-iconsRed/80';
    case 'вирішено':
      return 'bg-iconsGreen/20 border border-iconsGreen/80';
    case 'у процесі':
    case 'виконується':
      return 'bg-iconsBlue/20 border border-iconsBlue/80';
    default:
      return 'bg-primaryOrange/20 border border-primaryOrange/80';
  }
};

interface Props {
  entity: NetworkProblemDto;
  onDetails: (e: NetworkProblemDto) => void;
  onEdit: (e: NetworkProblemDto) => void;
  onDelete: (id: string, title: string) => void;
  formatDate: (d: Date | string) => string;
  formatTime: (d: string | null) => string;
}

const formatProblemTime = (
  entity: NetworkProblemDto,
  formatTime: (d: string | null) => string
) => {
  const start = formatTime(entity.fixStartTime);
  const end = formatTime(entity.fixEndTime);

  if (entity.networkProblemStatus.title === 'Вирішено') {
    return `Завершено ${'o' + end || 'N/A'}`;
  }

  if (start && end) {
    return `${start} - ${end}`;
  }

  if (start) {
    return `Після ${start}`;
  }

  if (end) {
    return `До ${end}`;
  }

  return 'N/A';
};

const NetworkProblemsTableRow: React.FC<Props> = ({
  entity,
  onDetails,
  onEdit,
  onDelete,
  formatDate,
  formatTime,
}) => {
  return (
    <TableRow
      key={entity.id}
      className={'bg-primaryWhite hover:bg-gray-50 border-b! border-gray-200'}
    >
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue py-3 max-w-xs truncate">
        {entity.title}
      </TableCell>
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue">
        <div>{entity.address || 'N/A'}</div>
      </TableCell>
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue">
        <div>
          <span
            className={`inline-flex justify-start px-[10px] py-[8px] rounded-full ${getStatusStyles(
              entity.networkProblemStatus?.title
            )}`}
          >
            <p className="font-noto text-[14px]/[120%] tracking-[-0.28px] font-normal text-primaryBlue">
              {entity.networkProblemStatus?.title}
            </p>
          </span>
        </div>
      </TableCell>
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue">
        <div>{formatProblemTime(entity, formatTime)}</div>
      </TableCell>
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue">
        <div>{formatDate(entity.createdAt)}</div>
      </TableCell>
      <TableCell className="text-right py-3 space-x-2 flex justify-end gap-[8px]">
        <button
          onClick={() => onDetails(entity)}
          className="p-0 m-0 cursor-pointer text-primaryBlue hover:opacity-75 transition-opacity"
        >
          <DetailsIcon />
        </button>
        <button
          onClick={() => onEdit(entity)}
          className="p-0 m-0 cursor-pointer"
        >
          <EditIcon />
        </button>
        <button
          onClick={() => onDelete(entity.id, entity.title)}
          className="p-0 m-0 cursor-pointer"
        >
          <DeleteIcon />
        </button>
      </TableCell>
    </TableRow>
  );
};

export default NetworkProblemsTableRow;
