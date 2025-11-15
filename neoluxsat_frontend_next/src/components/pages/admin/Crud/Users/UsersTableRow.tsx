import React from "react";
import { TableCell, TableRow } from "@/components/common/admin/crud-table";
import type { UserDto } from "@/types/user";
import EditIcon from "@/assets/svgs/admin/dashboard/edit-icon.svg?component";
import DeleteIcon from "@/assets/svgs/admin/dashboard/delete-icon.svg?component";
import DetailsIcon from "@/assets/svgs/admin/dashboard/details-icon.svg?component";

interface Props {
  user: UserDto;
  onDetails: (u: UserDto) => void;
  onEdit: (u: UserDto) => void;
  onDelete: (id: string, username: string) => void;
}

const UsersTableRow: React.FC<Props> = ({
  user,
  onDetails,
  onEdit,
  onDelete,
}) => {
  return (
    <TableRow
      key={user.id}
      className={"bg-primaryWhite hover:bg-gray-50 border-b! border-gray-200"}
    >
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue py-3 max-w-xs truncate">
        {user.username}
      </TableCell>
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue truncate">
        <div className="max-w-[500px] truncate mx-auto">
          {user.roles.join(", ")}
        </div>
      </TableCell>
      <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue py-3 max-w-xs truncate">
        {user.email || "N/A"}
      </TableCell>
      <TableCell className="text-right py-3 space-x-2 flex justify-end gap-[8px]">
        <button
          onClick={() => onDetails(user)}
          className="p-0 m-0 cursor-pointer text-primaryBlue hover:opacity-75 transition-opacity"
        >
          <DetailsIcon />
        </button>
        <button onClick={() => onEdit(user)} className="p-0 m-0 cursor-pointer">
          <EditIcon />
        </button>
        {!user.roles.includes("Admin") && (
          <button
            onClick={() => onDelete(user.id, user.username)}
            className="p-0 m-0 cursor-pointer"
          >
            <DeleteIcon />
          </button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UsersTableRow;
