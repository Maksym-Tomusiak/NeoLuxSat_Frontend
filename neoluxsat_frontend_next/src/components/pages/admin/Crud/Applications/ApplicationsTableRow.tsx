import React from "react";
import { TableCell, TableRow } from "@/components/common/admin/crud-table";
import type { ApplicationDto } from "@/types/application";
import DetailsIcon from "@/assets/svgs/admin/dashboard/details-icon.svg?component";
import EditIcon from "@/assets/svgs/admin/dashboard/edit-icon.svg?component";
import DeleteIcon from "@/assets/svgs/admin/dashboard/delete-icon.svg?component";

const getStatusStyles = (status: string = "") => {
  const statusLower = status?.toLowerCase();
  switch (statusLower) {
    case "відкладена":
      return "bg-iconsRed/20 border border-iconsRed/80";
    case "завершена":
      return "bg-iconsGreen/20 border border-iconsGreen/80";
    case "виконується":
    case "оформлена":
      return "bg-iconsBlue/20 border border-iconsBlue/80";
    case "нова":
    default:
      return "bg-primaryOrange/20 border border-primaryOrange/80";
  }
};

interface Props {
  application: ApplicationDto;
  role: string | null; // 1. Accept role as a prop
  onDetails: (a: ApplicationDto) => void;
  onEdit: (a: ApplicationDto) => void;
  onDelete: (id: string, fullName: string) => void;
  formatDate: (d: Date | string) => string;
}

const ApplicationsTableRow: React.FC<Props> = ({
  application,
  role, // 2. Destructure role
  onDetails,
  onEdit,
  onDelete,
  formatDate,
}) => {
  // 3. Define permissions
  const canEdit = role !== "Manager" && role !== "Master";
  const canDelete = role !== "Manager" && role !== "Master";

  return (
    <TableRow
      key={application.id}
      className={"bg-primaryWhite hover:bg-gray-50 border-b! border-gray-200"}
    >
      {/* ... (other cells are unchanged) ... */}
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue py-3 max-w-xs truncate max-width-[300px] truncate">
        {application.fullName}
      </TableCell>
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue">
        <div>
          <span
            className={`inline-flex justify-start px-[10px] py-[8px] rounded-full ${getStatusStyles(
              application.status?.title
            )}`}
          >
            <p className="font-noto text-[14px]/[120%] tracking-[-0.28px] font-normal text-primaryBlue">
              {application.status?.title}
            </p>
          </span>
        </div>
      </TableCell>
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue">
        <div>{formatDate(application.createdAt)}</div>
      </TableCell>
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue">
        <div>{application.type?.title || "N/A"}</div>
      </TableCell>
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue">
        <div className="max-w-[300px] truncate">
          {application.address || "N/A"}
        </div>
      </TableCell>
      {/* 4. Conditionally render buttons */}
      <TableCell className="text-right py-3 space-x-2 flex justify-end gap-[8px]">
        <button
          onClick={() => onDetails(application)}
          className="p-0 m-0 cursor-pointer text-primaryBlue hover:opacity-75 transition-opacity"
        >
          <DetailsIcon />
        </button>

        {canEdit && (
          <button
            onClick={() => onEdit(application)}
            className="p-0 m-0 cursor-pointer"
          >
            <EditIcon />
          </button>
        )}

        {canDelete && (
          <button
            onClick={() => onDelete(application.id, application.fullName)}
            className="p-0 m-0 cursor-pointer"
          >
            <DeleteIcon />
          </button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ApplicationsTableRow;
