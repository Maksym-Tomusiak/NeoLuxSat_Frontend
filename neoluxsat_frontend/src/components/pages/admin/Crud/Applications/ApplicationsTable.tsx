// src/components/admin/applications/ApplicationsTable/ApplicationsTable.tsx

import React from 'react';
import { Table, TableBody } from '@/components/common/admin/crud-table';

import ApplicationsTableHeader from './ApplicationsTableHeader';
import ApplicationsTableRow from './ApplicationsTableRow';
import TableSearch from '@/components/common/admin/TableSearch';
import TablePagination from '@/components/common/admin/TablePagination';
import DeleteConfirmationModal from '@/components/common/admin/DeleteConfirmationModal';
import EntityFormModal from '@/components/common/admin/EntityFormModal';
import {
  ApplicationFormFields,
  getApplicationInitialData,
} from './ApplicationFormFields';

import useApplicationsTableLogic from './useApplicationTableLogic';
import type {
  ApplicationDto,
  ApplicationCreateDto,
  ApplicationUpdateDto,
} from '@/types/application';
import { useUser } from '@/contexts/userContext';

const ApplicationsTable: React.FC = () => {
  const { role } = useUser(); // 2. Get the user's role
  const {
    paginatedData,
    applicationTypes,
    applicationStatuses,
    initialLoading,
    isFetching,
    localSearchTerm,
    isDeleteModalOpen,
    itemToDelete,
    isFormModalOpen,
    isReadOnlyModal,
    entityToEdit,
    ApplicationServiceProxy,
    formatDate,
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
  } = useApplicationsTableLogic();

  if (initialLoading) {
    return (
      <div className="w-full bg-primaryBlue/10 rounded-[20px] p-4 text-primaryBlue min-h-[400px] flex items-center justify-center">
        Завантаження заявок...
      </div>
    );
  }

  const contentOpacityClass = isFetching
    ? 'opacity-50 transition-opacity duration-300'
    : 'opacity-100 transition-opacity duration-300';

  return (
    <div className="w-full max-w-full mx-auto bg-primaryWhite rounded-[20px] px-[12px] pt-[24px] pb-[12px] shadow-md">
      <div className="flex justify-between items-center max-sm:flex-col gap-[24px] mb-6 pl-[24px] pr-4">
        <h2 className="text-[24px]/[90%] font-semibold font-manrope text-primaryBlue">
          Заявки
        </h2>

        <div className="flex items-center gap-4">
          {/* 3. Conditionally render Add button (Only Master cannot add) */}
          {role !== 'Master' && (
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
          )}

          <TableSearch value={localSearchTerm} onChange={handleSearchChange} />
        </div>
      </div>

      <div className="bg-primaryWhite rounded-[16px] p-4">
        <Table className={`${contentOpacityClass}`}>
          <ApplicationsTableHeader />
          <TableBody>
            {paginatedData.items.length > 0 ? (
              paginatedData.items.map((application) => (
                <ApplicationsTableRow
                  key={application.id}
                  application={application}
                  role={role} // 4. Pass role as a prop
                  onDetails={handleDetails}
                  onEdit={handleEdit}
                  onDelete={openDeleteModal}
                  formatDate={formatDate}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="h-24 text-center text-gray-500">
                  Немає заявок.
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>
      {/* ... (rest of the file is unchanged) ... */}
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
          itemName={`заявку від "${itemToDelete.name}"`}
        />
      )}
      {isFormModalOpen && (
        <EntityFormModal<
          ApplicationDto,
          ApplicationCreateDto,
          ApplicationUpdateDto
        >
          isOpen={isFormModalOpen}
          onClose={closeFormModal}
          isReadOnly={isReadOnlyModal}
          entity={entityToEdit}
          title="заявку"
          service={ApplicationServiceProxy}
          onSuccess={reloadData}
          getInitialData={getApplicationInitialData}
          formFields={(isReadOnly) => (
            <ApplicationFormFields
              isReadOnly={isReadOnly}
              applicationTypes={applicationTypes}
              applicationStatuses={applicationStatuses}
            />
          )}
        />
      )}
    </div>
  );
};

export default ApplicationsTable;
