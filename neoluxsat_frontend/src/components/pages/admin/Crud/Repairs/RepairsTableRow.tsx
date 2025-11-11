// src/components/admin/repairs/RepairsTable/RepairsTableRow.tsx

import React, { useState } from 'react';
import { TableCell, TableRow } from '@/components/common/admin/crud-table';
import type { RepairDto } from '@/types/repair';
import DetailsIcon from '@/assets/svgs/admin/dashboard/details-icon.svg';
import EditIcon from '@/assets/svgs/admin/dashboard/edit-icon.svg';
import DeleteIcon from '@/assets/svgs/admin/dashboard/delete-icon.svg';
import type { RepairStatusDto } from '@/types/repairStatus';
import type { RepairPaymentDto } from '@/types/repairPayment';

interface Props {
  repair: RepairDto;
  role: string | null; // 1. Accept role as a prop
  repairStatuses: RepairStatusDto[];
  repairPayments: RepairPaymentDto[];
  onDetails: (r: RepairDto) => void;
  onEdit: (r: RepairDto) => void;
  onDelete: (id: string, displayId: string) => void;
  onStatusChange: (repairId: string, newStatusId: string) => Promise<void>;
  onPaymentChange: (repairId: string, newPaymentId: string) => Promise<void>;
}

const RepairsTableRow: React.FC<Props> = ({
  repair,
  role, // 2. Destructure role
  repairStatuses,
  repairPayments,
  onDetails,
  onEdit,
  onDelete,
  onStatusChange,
  onPaymentChange,
}) => {
  const [isStatusChanging, setIsStatusChanging] = useState(false);
  const [isPaymentChanging, setIsPaymentChanging] = useState(false);

  const totalSum = (repair.materialsCost + repair.jobCost).toFixed(2);

  const handleStatusSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsStatusChanging(true);
    await onStatusChange(repair.id, e.target.value);
    setIsStatusChanging(false);
  };

  const handlePaymentSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsPaymentChanging(true);
    await onPaymentChange(repair.id, e.target.value);
    setIsPaymentChanging(false);
  };

  return (
    <TableRow
      key={repair.id}
      className={'bg-primaryWhite hover:bg-gray-50 border-b! border-gray-200'}
    >
      {/* ... (other cells are unchanged) ... */}
      <TableCell className="px-3 font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue truncate">
        {String(repair.displayId).padStart(5, '0')}
      </TableCell>
      <TableCell>
        <select
          value={repair.statusId}
          onChange={handleStatusSelectChange}
          disabled={isStatusChanging}
          className="p-2 px-3 border rounded-lg bg-white focus:outline-none focus:ring-primaryOrange focus:border-primaryOrange disabled:opacity-70"
        >
          {repairStatuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.title}
            </option>
          ))}
        </select>
      </TableCell>
      <TableCell className="px-3 font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue truncate">
        {repair.lastName}
      </TableCell>
      <TableCell className="px-3 font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue truncate">
        {repair.firstName || '–'}
      </TableCell>
      <TableCell className="px-3 font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue truncate">
        {repair.phoneNumber}
      </TableCell>
      <TableCell className="px-3 font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue truncate">
        {repair.equipmentType || '–'}
      </TableCell>
      <TableCell className="px-3 font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue truncate">
        {repair.equipmentModel || '–'}
      </TableCell>
      <TableCell className="px-3 font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue truncate">
        {totalSum}
      </TableCell>
      <TableCell>
        <select
          value={repair.paymentId}
          onChange={handlePaymentSelectChange}
          disabled={isPaymentChanging}
          className="p-2 border rounded-lg bg-white focus:outline-none focus:ring-primaryOrange focus:border-primaryOrange disabled:opacity-70"
        >
          {repairPayments.map((payment) => (
            <option key={payment.id} value={payment.id}>
              {payment.title}
            </option>
          ))}
        </select>
      </TableCell>

      {/* 3. Conditionally render buttons */}
      <TableCell className="px-3 align-middle">
        <div className="flex justify-center items-center gap-[8px]">
          <button
            onClick={() => onDetails(repair)}
            className="p-0 m-0 cursor-pointer text-primaryBlue hover:opacity-75 transition-opacity"
          >
            <DetailsIcon />
          </button>

          {role !== 'Master' && (
            <button
              onClick={() => onEdit(repair)}
              className="p-0 m-0 cursor-pointer"
            >
              <EditIcon />
            </button>
          )}

          {role !== 'Master' && (
            <button
              onClick={() => onDelete(repair.id, repair.displayId.toString())}
              className="p-0 m-0 cursor-pointer"
            >
              <DeleteIcon />
            </button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RepairsTableRow;
