import React from "react";
import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/admin/crud-table";
import PersonIcon from "@/assets/svgs/admin/dashboard/person-icon.svg?component";
import ContentIcon from "@/assets/svgs/admin/dashboard/status-icon.svg?component";
import DateIcon from "@/assets/svgs/admin/dashboard/date-icon.svg?component";
import ActionsIcon from "@/assets/svgs/admin/dashboard/actions-icon.svg?component";
import AddressIcon from "@/assets/svgs/admin/dashboard/address-icon.svg?component";

const ApplicationsTableHeader: React.FC = () => {
  return (
    <TableHeader className="mb-4">
      <TableRow className="border-b-0 hover:bg-transparent">
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <PersonIcon />
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              ПІБ
            </p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <ContentIcon />
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Статус
            </p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <div className="fill-primaryBlue/80">
              <DateIcon />
            </div>
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Дата створення
            </p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <ContentIcon />
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Послуга
            </p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <AddressIcon />
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Адреса
            </p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue text-right">
          <div className="flex gap-[6px] items-center justify-end mr-[8px]">
            <ActionsIcon />
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Дії
            </p>
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ApplicationsTableHeader;
