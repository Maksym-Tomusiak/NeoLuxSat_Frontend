"use client";

import React from "react";
import { Table, TableBody } from "@/components/common/admin/crud-table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import ApplicationsTableHeader from "./ApplicationsTableHeader";
import ApplicationsTableRow from "./ApplicationsTableRow";
import TableSearch from "@/components/common/admin/TableSearch";
import TablePagination from "@/components/common/admin/TablePagination";
import DeleteConfirmationModal from "@/components/common/admin/DeleteConfirmationModal";
import EntityFormModal from "@/components/common/admin/EntityFormModal";
import {
  ApplicationFormFields,
  getApplicationInitialData,
} from "./ApplicationFormFields";

import useApplicationsTableLogic from "@/hooks/admin/crud/useApplicationTableLogic";
import type {
  ApplicationDto,
  ApplicationCreateDto,
  ApplicationUpdateDto,
} from "@/types/application";
import { useUser } from "@/contexts/userContext";

const ApplicationsTable: React.FC = () => {
  const { role } = useUser();
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

  // --- ПОЧАТОК ЗМІН: Оновлена функція експорту ---
  const handleExportPDF = async () => {
    try {
      const doc = new jsPDF();

      // 1. Завантажуємо шрифт Roboto (або будь-який інший з кирилицею)
      // Примітка: Для продакшну краще зберегти цей файл у public/fonts і робити fetch("/fonts/Roboto-Regular.ttf")
      const fontUrl =
        "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf";

      const response = await fetch(fontUrl);
      if (!response.ok) throw new Error("Не вдалося завантажити шрифт");

      const blob = await response.blob();
      const reader = new FileReader();

      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result?.toString().split(",")[1];

        if (base64data) {
          // 2. Додаємо шрифт у PDF
          doc.addFileToVFS("Roboto-Regular.ttf", base64data);
          doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
          doc.setFont("Roboto"); // Встановлюємо активний шрифт

          // Заголовок
          doc.setFontSize(16);
          doc.text("Заявки", 14, 15);

          // Підготовка даних
          const tableData = paginatedData.items.map((app) => [
            formatDate(app.createdAt),
            app.type?.title || "N/A",
            app.address || "N/A",
            app.fullName,
            app.phone || "N/A",
            app.status?.title || "N/A",
            app.comment || "-",
          ]);

          // Генерація таблиці
          autoTable(doc, {
            head: [
              [
                "Дата",
                "Послуга",
                "Адреса",
                "ПІБ",
                "Телефон",
                "Статус",
                "Коментар",
              ],
            ],
            body: tableData,
            startY: 25,
            styles: {
              font: "Roboto", // ВАЖЛИВО: вказуємо шрифт для тіла таблиці
              fontSize: 9,
              fontStyle: "normal",
              lineColor: [200, 200, 200],
              lineWidth: 0.1,
            },
            headStyles: {
              fillColor: [41, 128, 185],
              textColor: 255,
              font: "Roboto", // ВАЖЛИВО: вказуємо шрифт для заголовка
              fontStyle: "normal", // Roboto Regular зазвичай не має Bold гліфів у тому ж файлі
              fontSize: 10,
            },
            alternateRowStyles: { fillColor: [245, 245, 245] },
            margin: { top: 25 },
          });

          // Збереження PDF
          doc.save(`заявки_${new Date().toLocaleDateString("uk-UA")}.pdf`);
        }
      };
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Помилка при генерації PDF. Перевірте підключення до інтернету.");
    }
  };
  // --- КІНЕЦЬ ЗМІН ---

  const contentOpacityClass = isFetching
    ? "opacity-50 transition-opacity duration-300"
    : "opacity-100 transition-opacity duration-300";

  return (
    <div className="w-full max-w-full mx-auto bg-primaryWhite rounded-[20px] px-[12px] pt-[24px] pb-[12px] shadow-md">
      <div className="flex justify-between items-center max-sm:flex-col gap-[24px] mb-6 pl-[24px] pr-4">
        <h2 className="text-[24px]/[90%] font-semibold font-manrope text-primaryBlue">
          Заявки
        </h2>

        <div className="flex items-center gap-4">
          {role !== "Master" && (
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
          )}

          <button
            onClick={handleExportPDF}
            className="flex items-center justify-center 
            h-10 px-4 border border-primaryBlue border-[2px]
            text-[14px]/[120%] font-noto font-normal text-primaryWhite cursor-pointer
            bg-primaryBlue rounded-full 
            hover:bg-primaryWhite hover:text-primaryBlue transition-colors action:transform active:scale-95 active:duration-75"
          >
            Експорт
          </button>

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
                  role={role}
                  onDetails={handleDetails}
                  onEdit={handleEdit}
                  onDelete={openDeleteModal}
                  formatDate={formatDate}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="h-24 text-center text-gray-500">
                  Немає заявок.
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
