// src/components/admin/Crud/Propositions/PropositionsTableRow.tsx
import React from "react";
import { TableCell, TableRow } from "@/components/common/admin/crud-table";
import type { PropositionDto } from "@/types/proposition";
import EditIcon from "@/assets/svgs/admin/dashboard/edit-icon.svg?component";
import DeleteIcon from "@/assets/svgs/admin/dashboard/delete-icon.svg?component";
import DetailsIcon from "@/assets/svgs/admin/dashboard/details-icon.svg?component";

interface Props {
  proposition: PropositionDto;
  onDetails: (p: PropositionDto) => void;
  onEdit: (p: PropositionDto) => void;
  onDelete: (id: string, title: string) => void; // Use title
  formatDate: (date: Date | string) => string;
}

const PropositionsTableRow: React.FC<Props> = ({
  proposition,
  onDetails,
  onEdit,
  onDelete,
  formatDate,
}) => {
  let apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  apiUrl = apiUrl.slice(0, apiUrl.length - 4);

  return (
    <TableRow
      key={proposition.id}
      className={"bg-primaryWhite hover:bg-gray-50 border-b! border-gray-200"}
    >
      {/* Image Thumbnail */}
      <TableCell className="py-3 w-20">
        {proposition.imageUrl && (
          <img
            src={apiUrl + proposition.imageUrl}
            alt={proposition.title}
            className="h-10 w-10 object-cover rounded" // Adjust size as needed
            loading="lazy" // Add lazy loading for images
          />
        )}
      </TableCell>

      {/* Title */}
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue py-3 max-w-xs truncate">
        {proposition.title}
      </TableCell>

      {/* Content */}
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue truncate">
        <div className="max-w-md truncate">{proposition.content}</div>
      </TableCell>

      {/* End Date */}
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue py-3">
        {formatDate(proposition.endDate)}
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right py-3 align-middle">
        <div className="flex justify-end items-center gap-[8px]">
          <button
            onClick={() => onDetails(proposition)}
            className="p-0 m-0 cursor-pointer text-primaryBlue hover:opacity-75 transition-opacity"
          >
            <DetailsIcon />
          </button>
          <button
            onClick={() => onEdit(proposition)}
            className="p-0 m-0 cursor-pointer"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => onDelete(proposition.id, proposition.title)}
            className="p-0 m-0 cursor-pointer"
          >
            <DeleteIcon />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PropositionsTableRow;
