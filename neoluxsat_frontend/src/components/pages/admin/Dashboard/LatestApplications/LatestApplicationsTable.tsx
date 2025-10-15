import React from 'react';

import { Table, TableBody } from '@/components/common/admin/dashboard-table';
import DeleteConfirmationModal from '@/components/common/admin/DeleteConfirmationModal';
import EntityFormModal from '@/components/common/admin/EntityFormModal';

import LatestApplicationsHeader from './LatestApplicationsHeader';
import LatestApplicationsRow from './LatestApplicationsRow';
import type {
  ApplicationCreateDto,
  ApplicationDto,
  ApplicationUpdateDto,
} from '@/types/application';
import ApplicationFormFields from './LatestApplicationsFormFields';
import useApplicationsTableLogic from './useApplicationsTableLogic';

const LatestApplicationsTable: React.FC = () => {
  const {
    applications,
    loading,
    openMenuId,
    isDeleteModalOpen,
    itemToDelete,
    isFormModalOpen,
    isReadOnlyModal,
    entityToEdit,
    ApplicationServiceProxy,
    formatDate,
    toggleMenu,
    openDeleteModal,
    closeDeleteModal,
    handleDeleteConfirm,
    handleDetails,
    handleEdit,
    closeFormModal,
    getApplicationInitialData,
    applicationTypes,
    applicationStatuses,
    validateApplication, // New from hook
    handleSuccess, // New from hook
  } = useApplicationsTableLogic();

  if (loading) {
    return (
      <div className="w-full lg:flex-1 bg-primaryBlue/10 rounded-[20px] p-4 text-primaryBlue min-h-[380px] flex items-center justify-center shadow-sm">
        Завантаження останніх заявок...
      </div>
    );
  }

  return (
    <div className="w-full max-lg:min-w-full lg:flex-1 max-w-[680px] bg-primaryBlue/10 rounded-[20px] px-[12px] pt-[24px] pb-[12px] min-h-[380px]">
      <h2 className="text-[18px]/[120%] font-semibold font-noto tracking-[-0.36px] text-primaryBlue mb-[24px] pl-[12px]">
        Останні заявки
      </h2>
      <div>
        <Table>
          <LatestApplicationsHeader />
          <TableBody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <LatestApplicationsRow
                  key={app.id}
                  app={app}
                  openMenuId={openMenuId}
                  onToggleMenu={toggleMenu}
                  onDetails={handleDetails}
                  onEdit={handleEdit}
                  onDelete={openDeleteModal}
                  formatDate={formatDate}
                />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="h-24 text-center text-gray-500">
                  Немає останніх заявок.
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Delete Modal */}
      {itemToDelete && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteConfirm}
          itemName={`заявку від "${itemToDelete.name}"`}
        />
      )}

      {/* Form/Details Modal */}
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
          onSuccess={handleSuccess}
          getInitialData={getApplicationInitialData}
          formFields={(formData, handleChange, isReadOnly, errors) => (
            <ApplicationFormFields
              formData={formData}
              handleChange={handleChange}
              isReadOnly={isReadOnly}
              errors={errors}
              applicationTypes={applicationTypes}
              applicationStatuses={applicationStatuses}
            />
          )}
          validate={validateApplication}
        />
      )}
    </div>
  );
};

export default LatestApplicationsTable;
