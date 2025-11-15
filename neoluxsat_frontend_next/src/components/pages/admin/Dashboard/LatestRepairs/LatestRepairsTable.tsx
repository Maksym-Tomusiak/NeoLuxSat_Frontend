"use client";

import React from "react";
import { Table, TableBody } from "@/components/common/admin/dashboard-table";
import DeleteConfirmationModal from "@/components/common/admin/DeleteConfirmationModal";
import useRepairsTableLogic from "@/hooks/admin/dashboard/useRepairsTableLogic";
import LatestRepairsHeader from "./LatestRepairsHeader";
import LatestRepairsRow from "./LatestRepairsRow";

const LatestRepairsTable: React.FC = () => {
  const {
    repairs,
    initialLoading,
    fetchError,
    openMenuId,
    isDeleteModalOpen,
    itemToDelete,
    formatDate,
    toggleMenu,
    openDeleteModal,
    closeDeleteModal,
    handleDeleteConfirm,
    handleDetails,
    handleEdit,
  } = useRepairsTableLogic();

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center w-full max-lg:min-w-full lg:flex-1 max-w-[680px] text-primaryBlue bg-primaryBlue/10 rounded-[20px] px-[12px] pt-[24px] pb-[12px] min-h-[380px]">
        Завантаження останніх ремонтів...
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-[16px]/[120%] font-semibold font-noto flex items-center max-sm:min-h-[120px] max-lg:min-h-[240px] justify-center w-full max-lg:min-w-full lg:flex-1 max-w-[680px] text-iconsRed/70 bg-iconsRed/10 rounded-[20px] min-h-[380px]">
        Помилка: {fetchError}
      </div>
    );
  }

  return (
    <div className="w-full max-lg:min-w-full lg:flex-1 max-w-[680px] bg-primaryBlue/10 rounded-[20px] px-[12px] pt-[24px] pb-[12px] min-h-[380px]">
      <h2 className="text-[18px]/[120%] font-semibold font-noto tracking-[-0.36px] text-primaryBlue mb-[24px] pl-[12px]">
        Останні ремонти
      </h2>
      <div>
        <Table>
          <LatestRepairsHeader />
          <TableBody>
            {repairs.length > 0 ? (
              repairs.map((repair) => (
                <LatestRepairsRow
                  key={repair.id}
                  repair={repair}
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
                  Немає останніх ремонтів.
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
          itemName={`ремонт від "${itemToDelete.name}"`}
        />
      )}

      {/* EntityFormModal is removed */}
    </div>
  );
};

export default React.memo(LatestRepairsTable);
