"use client";

import React from "react";
import { Table, TableBody } from "@/components/common/admin/crud-table";

import NetworkProblemsTableHeader from "./NetworkProblemsTableHeader";
import NetworkProblemsTableRow from "./NetworkProblemsTableRow";
import TableSearch from "@/components/common/admin/TableSearch";
import TablePagination from "@/components/common/admin/TablePagination";
import DeleteConfirmationModal from "@/components/common/admin/DeleteConfirmationModal";
import EntityFormModal from "@/components/common/admin/EntityFormModal";

import {
  NetworkProblemFormFields,
  getNetworkProblemInitialData, // This function is used for EntityFormModal's prop
} from "./NetworkProblemFormFields";

import useNetworkProblemsTableLogic from "@/hooks/admin/crud/useNetworkProblemsTableLogic";
import type {
  NetworkProblemDto,
  NetworkProblemCreateDto,
  NetworkProblemUpdateDto,
  NetworkProblemStatusDto,
  NetworkProblemServiceDto,
} from "@/types/networkProblem";

const NetworkProblemsTable: React.FC = () => {
  const {
    paginatedData,
    statuses, // Keep these to pass to the FormFields component
    services, // Keep these to pass to the FormFields component
    initialLoading,
    isFetching,
    localSearchTerm,
    isDeleteModalOpen,
    itemToDelete,
    isFormModalOpen,
    isReadOnlyModal,
    entityToEdit,
    ServiceProxy,
    formatDate,
    formatTime,
    handlePageChange,
    handleSearchChange,
    handleAdd,
    handleEdit,
    handleDetails,
    closeFormModal,
    openDeleteModal,
    closeDeleteModal,
    handleDeleteConfirm,
    reloadData,
    // 🛑 validateEntity is removed
    handleToggleActive,
  } = useNetworkProblemsTableLogic();

  if (initialLoading) {
    return (
      <div className="w-full bg-primaryBlue/10 rounded-[20px] p-4 text-primaryBlue min-h-[400px] flex items-center justify-center">
        Завантаження мережевих проблем...
      </div>
    );
  }

  const contentOpacityClass = isFetching
    ? "opacity-50 transition-opacity duration-300"
    : "opacity-100 transition-opacity duration-300";

  return (
    <div className="w-full max-w-full mx-auto bg-primaryWhite rounded-[20px] px-[12px] pt-[24px] pb-[12px] shadow-md">
      {/* ... (Table layout and CRUD handlers unchanged) ... */}
      <div className="flex justify-between items-center max-sm:flex-col gap-[24px] mb-6 pl-[24px] pr-4">
        <h2 className="text-[24px]/[90%] font-semibold font-manrope text-primaryBlue">
          Мережеві проблеми
        </h2>

        <div className="flex items-center gap-4">
          <button
            onClick={handleAdd}
            className="flex items-center justify-center 
      h-10 px-4 border border-primaryOrange border-[2px]
      text-[14px]/[120%] font-noto font-normal text-primaryWhite cursor-pointer
      bg-primaryOrange rounded-full 
      hover:bg-primaryWhite hover:text-primaryBlue transition-colors action:transform active:scale-95 active:duration-75"
          >
            Додати
          </button>

          <TableSearch value={localSearchTerm} onChange={handleSearchChange} />
        </div>
      </div>

      <div className="bg-primaryWhite rounded-[16px] p-4">
        <Table className={`${contentOpacityClass}`}>
          <NetworkProblemsTableHeader />
          <TableBody>
            {paginatedData.items.length > 0 ? (
              paginatedData.items.map((entity: NetworkProblemDto) => (
                <NetworkProblemsTableRow
                  key={entity.id}
                  entity={entity}
                  onDetails={handleDetails}
                  onEdit={handleEdit}
                  onDelete={openDeleteModal}
                  formatDate={formatDate}
                  formatTime={formatTime}
                  onToggleActive={handleToggleActive}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="h-24 text-center text-gray-500">
                  Немає проблем.
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
          itemName={`проблему "${itemToDelete.name}"`}
        />
      )}

      {isFormModalOpen && (
        <EntityFormModal<
          NetworkProblemDto,
          NetworkProblemCreateDto,
          NetworkProblemUpdateDto
        >
          isOpen={isFormModalOpen}
          onClose={closeFormModal}
          isReadOnly={isReadOnlyModal}
          entity={entityToEdit}
          title="проблему мережі"
          service={ServiceProxy}
          onSuccess={reloadData}
          getInitialData={getNetworkProblemInitialData}
          // 💡 Simplified formFields signature
          formFields={(isReadOnly) => (
            // We create an inline component wrapper to pass the dependencies
            <NetworkProblemFormFieldsWrapper
              isReadOnly={isReadOnly}
              statuses={statuses}
              services={services}
            />
          )}
          // 🛑 validate prop is removed
        />
      )}
    </div>
  );
};

// We define a wrapper component that encapsulates the original render function's logic
// but uses RHF hooks internally. We'll define the content of this wrapper in the FormFields section.
const NetworkProblemFormFieldsWrapper: React.FC<{
  isReadOnly: boolean;
  statuses: NetworkProblemStatusDto[];
  services: NetworkProblemServiceDto[];
}> = (props) => {
  return NetworkProblemFormFields(props);
};

export default NetworkProblemsTable;
