// src/components/admin/repairs/RepairsTable/RepairsTable.tsx

import React from 'react';
import { Table, TableBody } from '@/components/common/admin/crud-table';

import RepairsTableHeader from './RepairsTableHeader';
import RepairsTableRow from './RepairsTableRow';
import TableSearch from '@/components/common/admin/TableSearch';
import TablePagination from '@/components/common/admin/TablePagination';
import DeleteConfirmationModal from '@/components/common/admin/DeleteConfirmationModal';
import useRepairsTableLogic from './useRepairsTableLogic';

const RepairsTable: React.FC = () => {
  const {
    paginatedData,
    repairStatuses, // For dropdowns
    repairPayments, // For dropdowns
    initialLoading,
    isFetching,
    localSearchTerm,
    isDeleteModalOpen,
    itemToDelete,
    pagination,
    handlePageChange,
    handleSearchChange,
    handleStatusFilterChange, // For filters
    handlePaymentFilterChange, // For filters
    handleNavigateToAdd, // Renamed
    handleNavigateToEdit, // Renamed
    handleNavigateToDetails, // Renamed
    openDeleteModal,
    closeDeleteModal,
    handleDeleteConfirm,
    handleStatusChange, // For table row
    handlePaymentChange, // For table row
  } = useRepairsTableLogic();

  if (initialLoading) {
    return (
      <div className="w-full bg-primaryBlue/10 rounded-[20px] p-4 text-primaryBlue min-h-[400px] flex items-center justify-center">
        Завантаження ремонтів...
      </div>
    );
  }

  const contentOpacityClass = isFetching
    ? 'opacity-50 transition-opacity duration-300'
    : 'opacity-100 transition-opacity duration-300';

  return (
    <div className="w-full max-w-full mx-auto bg-primaryWhite rounded-[20px] px-[12px] pt-[24px] pb-[12px] shadow-md">
      <div className="flex justify-between max-[900px]:flex-col items-center mb-6 pl-[24px] pr-4 gap-[24px]">
        <h2 className="text-[24px]/[90%] font-semibold font-manrope text-primaryBlue">
          Ремонти
        </h2>

        <div className="flex items-center gap-4 max-md:flex-wrap">
          <button
            onClick={handleNavigateToAdd} // Use navigation handler
            className="flex items-center justify-center 
            h-10 px-4 border border-primaryOrange border-[2px]
            text-[14px]/[120%] font-noto font-normal text-primaryWhite cursor-pointer
            bg-primaryOrange rounded-full 
            hover:bg-primaryWhite hover:text-primaryBlue transition-colors"
          >
            Додати
          </button>

          {/* --- NEW FILTERS --- */}
          <select
            value={pagination.statusId || ''}
            onChange={handleStatusFilterChange}
            className="p-2 h-10 border rounded-lg bg-white focus:outline-none focus:ring-primaryOrange focus:border-primaryOrange text-sm"
          >
            <option value="">Всі статуси</option>
            {repairStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.title}
              </option>
            ))}
          </select>

          <select
            value={pagination.paymentId || ''}
            onChange={handlePaymentFilterChange}
            className="p-2 h-10 border rounded-lg bg-white focus:outline-none focus:ring-primaryOrange focus:border-primaryOrange text-sm"
          >
            <option value="">Всі розрахунки</option>
            {repairPayments.map((payment) => (
              <option key={payment.id} value={payment.id}>
                {payment.title}
              </option>
            ))}
          </select>
          {/* -------------------- */}

          <TableSearch value={localSearchTerm} onChange={handleSearchChange} />
        </div>
      </div>

      <div className="bg-primaryWhite rounded-[16px] p-4">
        <Table className={`${contentOpacityClass}`}>
          <RepairsTableHeader />
          <TableBody>
            {paginatedData.items.length > 0 ? (
              paginatedData.items.map((repair) => (
                <RepairsTableRow
                  key={repair.id}
                  repair={repair}
                  repairStatuses={repairStatuses}
                  repairPayments={repairPayments}
                  onDetails={handleNavigateToDetails}
                  onEdit={handleNavigateToEdit}
                  onDelete={openDeleteModal}
                  onStatusChange={handleStatusChange}
                  onPaymentChange={handlePaymentChange}
                />
              ))
            ) : (
              <tr>
                <td colSpan={9} className="h-24 text-center text-gray-500">
                  Немає ремонтів.
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end px-4">
        <TablePagination
          totalPages={paginatedData.totalPages}
          currentPage={paginatedData.pageNumber}
          onPageChange={handlePageChange}
        />
      </div>

      {itemToDelete && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteConfirm}
          itemName={`ремонт #${itemToDelete.name}`}
        />
      )}
    </div>
  );
};

export default RepairsTable;
