import React from 'react';
import { TableCell, TableRow } from '@/components/common/admin/crud-table';
import type { FaqDto } from '@/types/faq';
import EditIcon from '@/assets/svgs/admin/dashboard/edit-icon.svg';
import DeleteIcon from '@/assets/svgs/admin/dashboard/delete-icon.svg';
import DetailsIcon from '@/assets/svgs/admin/dashboard/details-icon.svg';

interface Props {
  faq: FaqDto;
  onDetails: (faq: FaqDto) => void;
  onEdit: (faq: FaqDto) => void;
  onDelete: (id: string, title: string) => void;
}

const FaqsTableRow: React.FC<Props> = ({
  faq,
  onDetails,
  onEdit,
  onDelete,
}) => {
  return (
    <TableRow
      key={faq.id}
      className={'bg-primaryWhite hover:bg-gray-50 border-b! border-gray-200'}
    >
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue py-3 max-w-xs truncate">
        {faq.category?.title}
      </TableCell>
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue py-3 max-w-xs truncate">
        {faq.question}
      </TableCell>
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue truncate">
        <div className="max-w-[500px] truncate mx-auto">{faq.answer}</div>
      </TableCell>
      <TableCell className="text-right py-3 space-x-2 flex justify-end gap-[8px]">
        <button
          onClick={() => onDetails(faq)}
          className="p-0 m-0 cursor-pointer text-primaryBlue hover:opacity-75 transition-opacity"
        >
          <DetailsIcon />
        </button>
        <button onClick={() => onEdit(faq)} className="p-0 m-0 cursor-pointer">
          <EditIcon />
        </button>
        <button
          onClick={() => onDelete(faq.id, faq.question)}
          className="p-0 m-0 cursor-pointer"
        >
          <DeleteIcon />
        </button>
      </TableCell>
    </TableRow>
  );
};

export default FaqsTableRow;
