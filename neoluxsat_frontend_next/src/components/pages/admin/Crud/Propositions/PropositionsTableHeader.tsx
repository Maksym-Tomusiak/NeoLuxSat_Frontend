import React from "react";
import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/admin/crud-table";

import DateIcon from "@/assets/svgs/admin/dashboard/date-icon.svg?component";
import TitleIcon from "@/assets/svgs/admin/dashboard/person-icon.svg?component"; // Example icon
import ContentIcon from "@/assets/svgs/admin/dashboard/status-icon.svg?component";
import ImageIcon from "@/assets/svgs/admin/dashboard/status-icon.svg?component"; // Example icon
import ActionsIcon from "@/assets/svgs/admin/dashboard/actions-icon.svg?component";

const PropositionsTableHeader: React.FC = () => {
  return (
    <TableHeader className="mb-4">
      <TableRow className="border-b-0 hover:bg-transparent">
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <ImageIcon /> {/* Example */}
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Зображення
            </p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <TitleIcon /> {/* Example */}
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Заголовок
            </p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <ContentIcon />
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Зміст
            </p>
          </div>
        </TableHead>
        <TableHead className="text-primaryBlue">
          <div className="flex gap-[6px] items-center">
            <div className="fill-primaryBlue/80">
              <DateIcon />
            </div>
            <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
              Дата завершення
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

export default PropositionsTableHeader;
