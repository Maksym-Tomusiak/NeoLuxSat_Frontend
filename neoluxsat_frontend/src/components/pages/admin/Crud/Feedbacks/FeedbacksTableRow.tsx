import React from 'react';
import { TableCell, TableRow } from '@/components/common/admin/crud-table';
import type { FeedbackDto } from '@/types/feedback';
import EditIcon from '@/assets/svgs/admin/dashboard/edit-icon.svg';
import DeleteIcon from '@/assets/svgs/admin/dashboard/delete-icon.svg';
import DetailsIcon from '@/assets/svgs/admin/dashboard/details-icon.svg';

interface Props {
  feedback: FeedbackDto;
  onDetails: (f: FeedbackDto) => void;
  onEdit: (f: FeedbackDto) => void;
  onDelete: (id: string, author: string) => void;
}

const FeedbacksTableRow: React.FC<Props> = ({
  feedback,
  onDetails,
  onEdit,
  onDelete,
}) => {
  return (
    <TableRow
      key={feedback.id}
      className={'bg-primaryWhite hover:bg-gray-50 border-b! border-gray-200'}
    >
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue py-3 max-w-xs truncate">
        {feedback.author}
      </TableCell>
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue truncate">
        <div className="max-w-[500px] truncate mx-auto">{feedback.content}</div>
      </TableCell>
      <TableCell className="text-right py-3 space-x-2 flex justify-end gap-[8px]">
        <button
          onClick={() => onDetails(feedback)}
          className="p-0 m-0 cursor-pointer text-primaryBlue hover:opacity-75 transition-opacity"
        >
          <DetailsIcon />
        </button>
        <button
          onClick={() => onEdit(feedback)}
          className="p-0 m-0 cursor-pointer"
        >
          <EditIcon />
        </button>
        <button
          onClick={() => onDelete(feedback.id, feedback.author)}
          className="p-0 m-0 cursor-pointer"
        >
          <DeleteIcon />
        </button>
      </TableCell>
    </TableRow>
  );
};

export default FeedbacksTableRow;
