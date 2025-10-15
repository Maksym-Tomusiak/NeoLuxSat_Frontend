import React from 'react';
import { Table, TableBody } from '@/components/common/admin/crud-table';

import NetworkProblemsTableHeader from './NetworkProblemsTableHeader';
import NetworkProblemsTableRow from './NetworkProblemsTableRow';
import TableSearch from '@/components/common/admin/TableSearch';
import TablePagination from '@/components/common/admin/TablePagination';
import DeleteConfirmationModal from '@/components/common/admin/DeleteConfirmationModal';
import EntityFormModal from '@/components/common/admin/EntityFormModal';

import {
  renderNetworkProblemFormFields,
  getNetworkProblemInitialData,
} from './NetworkProblemFormFields';

import useNetworkProblemsTableLogic from './useNetworkProblemsTableLogic';
import type {
  NetworkProblemDto,
  NetworkProblemCreateDto,
  NetworkProblemUpdateDto,
} from '@/types/networkProblem';

const NetworkProblemsTable: React.FC = () => {
  const {
    paginatedData,
    statuses,
    services,
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
    validateEntity,
  } = useNetworkProblemsTableLogic();

  if (initialLoading) {
    return (
      <div className="w-full bg-primaryBlue/10 rounded-[20px] p-4 text-primaryBlue min-h-[400px] flex items-center justify-center">
        Завантаження мережевих проблем...
      </div>
    );
  }

  const contentOpacityClass = isFetching
    ? 'opacity-50 transition-opacity duration-300'
    : 'opacity-100 transition-opacity duration-300';

  return (
    <div className="w-full max-w-full mx-auto bg-primaryWhite rounded-[20px] px-[12px] pt-[24px] pb-[12px] shadow-md">
      <div className="flex justify-between items-center mb-6 pl-[24px] pr-4">
        <h2 className="text-[24px]/[90%] font-semibold font-manrope text-primaryBlue">
          Проблеми мережі
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
          formFields={(formData, handleChange, isReadOnly, errors) =>
            renderNetworkProblemFormFields(
              formData,
              handleChange,
              isReadOnly,
              statuses,
              services,
              errors
            )
          }
          validate={validateEntity}
        />
      )}
    </div>
  );
};

export default NetworkProblemsTable;
