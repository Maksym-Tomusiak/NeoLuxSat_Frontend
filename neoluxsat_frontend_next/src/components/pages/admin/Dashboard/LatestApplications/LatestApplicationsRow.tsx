// components/admin/dashboard/LatestApplicationsRow.tsx

import React from "react";
import { TableCell, TableRow } from "@/components/common/admin/dashboard-table";
import OptionsIcon from "@/assets/svgs/admin/dashboard/options-icon.svg?component";
import DetailsIcon from "@/assets/svgs/admin/dashboard/details-icon.svg?component";
import EditIcon from "@/assets/svgs/admin/dashboard/edit-icon.svg?component";
import DeleteIcon from "@/assets/svgs/admin/dashboard/delete-icon.svg?component";
import type { ApplicationDto } from "@/types/application";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useUser } from "@/contexts/userContext";

const getStatusStyles = (status: string = "") => {
  // ... (status style function is unchanged)
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
  const { role } = useUser(); // 2. Get the user's role

  // 3. Define permissions
  const canEdit = role !== "Manager" && role !== "Master";
  const canDelete = role !== "Manager" && role !== "Master";

  return (
    <TableRow
      key={app.id}
      className="bg-primaryWhite rounded-[10px] h-[60px] transition-shadow duration-200 shadow-none hover:shadow-md border-b-0 hover:bg-muted/50 data-[state=selected]:bg-muted"
    >
      {/* ... (other cells are unchanged) ... */}
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue py-3 rounded-l-[10px] truncate max-w-[130px]">
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
            className="p-1 flex space-x-1 space-y-1 w-fit"
            align="end"
            sideOffset={8}
          >
            {/* 4. Conditionally render buttons */}
            <button
              className="p-1 cursor-pointer hover:bg-gray-100 rounded-md transition-colors flex items-center justify-center"
              onClick={() => onDetails(app)}
            >
              <DetailsIcon />
            </button>
            {canEdit && (
              <button
                className="p-1 cursor-pointer hover:bg-gray-100 rounded-md transition-colors flex items-center justify-center"
                onClick={() => onEdit(app)}
              >
                <EditIcon />
              </button>
            )}
            {canDelete && (
              <button
                className="p-1 cursor-pointer hover:bg-gray-100 rounded-md transition-colors flex items-center justify-center"
                onClick={() => onDelete(app.id, app.fullName)}
              >
                <DeleteIcon />
              </button>
            )}
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
};

export default LatestApplicationsRow;
