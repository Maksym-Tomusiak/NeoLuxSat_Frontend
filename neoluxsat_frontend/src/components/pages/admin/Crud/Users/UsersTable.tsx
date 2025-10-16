import React from 'react';
import { Table, TableBody } from '@/components/common/admin/crud-table';

import UsersTableHeader from './UsersTableHeader';
import UsersTableRow from './UsersTableRow';
import TableSearch from '@/components/common/admin/TableSearch';
import TablePagination from '@/components/common/admin/TablePagination';
import DeleteConfirmationModal from '@/components/common/admin/DeleteConfirmationModal';
import EntityFormModal from '@/components/common/admin/EntityFormModal';

import useUsersTableLogic from './useUsersTableLogic';
import UserFormFields from './UserFormFields';
import type { UserDto, UserCreateDto, UserUpdateDto } from '@/types/user';

const UsersTable: React.FC = () => {
  const {
    paginatedData,
    initialLoading,
    isFetching,
    localSearchTerm,
    isDeleteModalOpen,
    itemToDelete,
    isFormModalOpen,
    isReadOnlyModal,
    entityToEdit,
    UserServiceProxy,
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
    getUserInitialData,
    // 🛑 validateUser is no longer destructured
  } = useUsersTableLogic();

  if (initialLoading) {
    return (
      <div className="w-full bg-primaryBlue/10 rounded-[20px] p-4 text-primaryBlue min-h-[400px] flex items-center justify-center">
        Завантаження користувачів...
      </div>
    );
  }

  const contentOpacityClass = isFetching
    ? 'opacity-50 transition-opacity duration-300'
    : 'opacity-100 transition-opacity duration-300';

  return (
    <div className="w-full max-w-[1000px] mx-auto bg-primaryWhite rounded-[20px] px-[12px] pt-[24px] pb-[12px] shadow-md">
      {/* ... (Header, Table, and Pagination unchanged) ... */}
      <div className="flex justify-between items-center mb-6 pl-[24px] pr-4">
        <h2 className="text-[24px]/[90%] font-semibold font-manrope text-primaryBlue">
          Користувачі
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
          <UsersTableHeader />
          <TableBody>
            {paginatedData.items.length > 0 ? (
              paginatedData.items.map((user) => (
                <UsersTableRow
                  key={user.id}
                  user={user}
                  onDetails={handleDetails}
                  onEdit={handleEdit}
                  onDelete={openDeleteModal}
                />
              ))
            ) : (
              <tr>
                <td colSpan={3} className="h-24 text-center text-gray-500">
                  Немає користувачів.
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
      {/* ... (Delete Modal unchanged) ... */}
      {itemToDelete && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteConfirm}
          itemName={`користувача "${itemToDelete.name}"`}
        />
      )}

      {/* Form/Details Modal */}
      {isFormModalOpen && (
        <EntityFormModal<UserDto, UserCreateDto, UserUpdateDto>
          isOpen={isFormModalOpen}
          onClose={closeFormModal}
          isReadOnly={isReadOnlyModal}
          entity={entityToEdit}
          title="користувача"
          service={UserServiceProxy}
          onSuccess={reloadData}
          getInitialData={getUserInitialData}
          // 💡 Simplified formFields signature
          formFields={(isReadOnly) => (
            <UserFormFields
              isReadOnly={isReadOnly}
              // RHF handles edit state via useFormContext
            />
          )}
          // 🛑 validate prop is removed
        />
      )}
    </div>
  );
};

export default UsersTable;
