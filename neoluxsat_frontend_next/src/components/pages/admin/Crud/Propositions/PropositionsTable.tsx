"use client";

import React from "react";
import { Table, TableBody } from "@/components/common/admin/crud-table";
import PropositionsTableHeader from "./PropositionsTableHeader";
import PropositionsTableRow from "./PropositionsTableRow";
import TableSearch from "@/components/common/admin/TableSearch";
import TablePagination from "@/components/common/admin/TablePagination";
import DeleteConfirmationModal from "@/components/common/admin/DeleteConfirmationModal";
import EntityFormModal from "@/components/common/admin/EntityFormModal";
import usePropositionsTableLogic from "@/hooks/admin/crud/usePropositionsTableLogic";
import PropositionFormFields from "./PropositionFormFields";
import type {
  PropositionDto,
  PropositionCreateDto,
  PropositionUpdateDto,
} from "@/types/proposition";

const PropositionsTable: React.FC = () => {
  const {
    paginatedData,
    initialLoading,
    isFetching,
    fetchError, // Get fetchError
    localSearchTerm,
    isDeleteModalOpen,
    itemToDelete,
    isFormModalOpen,
    isReadOnlyModal,
    entityToEdit,
    PropositionServiceProxy, // Use correct proxy
    formatDate,
    // formatTime, // Likely not needed
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
    getPropositionInitialData, // Use correct initial data fn
  } = usePropositionsTableLogic();

  if (initialLoading) {
    return (
      <div className="w-full bg-primaryBlue/10 rounded-[20px] p-4 text-primaryBlue min-h-[400px] flex items-center justify-center">
        Завантаження пропозицій...
      </div>
    );
  }

  if (fetchError && paginatedData.items.length === 0) {
    // Show error only if fetch failed AND there's no data
    return (
      <div className="w-full bg-red-100 border border-red-400 text-red-700 rounded-[20px] p-4 min-h-[400px] flex items-center justify-center">
        Помилка: {fetchError}
      </div>
    );
  }

  const contentOpacityClass = isFetching
    ? "opacity-50 transition-opacity duration-300"
    : "opacity-100 transition-opacity duration-300";

  return (
    <div className="w-full max-w-full mx-auto bg-primaryWhite rounded-[20px] px-[12px] pt-[24px] pb-[12px] shadow-md">
      <div className="flex justify-between items-center max-sm:flex-col gap-[24px] mb-6 pl-[24px] pr-4">
        <h2 className="text-[24px]/[90%] font-semibold font-manrope text-primaryBlue">
          Пропозиції / Акції
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handleAdd}
            className="flex items-center justify-center 
            h-10 px-4 border border-primaryOrange border-[2px]
            text-[14px]/[120%] font-noto font-normal text-primaryWhite cursor-pointer
            bg-primaryOrange rounded-full 
            hover:bg-primaryWhite hover:text-primaryBlue transition-colors"
          >
            Додати
          </button>
          <TableSearch value={localSearchTerm} onChange={handleSearchChange} />
        </div>
      </div>

      <div className="bg-primaryWhite rounded-[16px] p-4">
        <Table className={`${contentOpacityClass}`}>
          <PropositionsTableHeader />
          <TableBody>
            {paginatedData.items.length > 0 ? (
              paginatedData.items.map((proposition) => (
                <PropositionsTableRow
                  key={proposition.id}
                  proposition={proposition} // Pass proposition
                  onDetails={handleDetails}
                  onEdit={handleEdit}
                  onDelete={openDeleteModal}
                  formatDate={formatDate}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="h-24 text-center text-gray-500">
                  {" "}
                  {/* Adjust colspan */}
                  Немає пропозицій.
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

      {/* Delete Modal */}
      {itemToDelete && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteConfirm}
          itemName={`пропозицію "${itemToDelete.name}"`} // Use name (which is title)
        />
      )}

      {/* Form/Details Modal */}
      {isFormModalOpen && (
        <EntityFormModal<
          PropositionDto,
          PropositionCreateDto,
          PropositionUpdateDto
        >
          isOpen={isFormModalOpen}
          onClose={closeFormModal}
          isReadOnly={isReadOnlyModal}
          entity={entityToEdit}
          title="пропозицію" // Use correct title
          service={PropositionServiceProxy} // Use correct proxy
          onSuccess={reloadData}
          getInitialData={getPropositionInitialData} // Use correct initial data fn
          formFields={(isReadOnly) => (
            <PropositionFormFields
              isReadOnly={isReadOnly}
              // Pass current image URL for preview when editing
              currentImageUrl={entityToEdit?.imageUrl}
            />
          )}
        />
      )}
    </div>
  );
};

export default PropositionsTable;
