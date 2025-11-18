"use client";

import React from "react";
import { FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useRepairFormLogic } from "@/hooks/admin/crud/useRepairFormLogic";
import { RepairFormFields } from "./RepairFormFields";

const RepairFormPage: React.FC = () => {
  const router = useRouter(); // 3. Use the 'useRouter' hook
  const {
    methods,
    onSubmit,
    handleInvoicePrint,
    isLoading,
    isReadOnly,
    isDownloading,
    isSubmitting,
    pageTitle,
    users,
    repairStatuses,
    repairPayments,
  } = useRepairFormLogic();

  const handleCancel = () => {
    router.push("/admin/repairs"); // 4. Use 'router.push()' for navigation
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"></div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-primaryWhite rounded-[20px] p-6 shadow-md">
      <h2 className="text-2xl font-semibold font-manrope text-primaryBlue mb-6">
        {pageTitle}
      </h2>

      <div className="flex justify-center mb-6">
        {isReadOnly && (
          <button
            type="button"
            onClick={handleInvoicePrint}
            disabled={isDownloading}
            className="px-4 py-2 h-10 border border-primaryOrange border-[2px] text-[14px]/[120%] font-noto font-normal text-primaryWhite cursor-pointer bg-primaryOrange rounded-full hover:bg-primaryWhite hover:text-primaryBlue transition-colors disabled:bg-gray-400"
          >
            {isDownloading ? "Завантаження..." : "Друк квитанції на прийом"}
          </button>
        )}
      </div>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <RepairFormFields
            isReadOnly={isReadOnly}
            users={users}
            repairStatuses={repairStatuses}
            repairPayments={repairPayments}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors cursor-pointer action:transform active:scale-95 active:duration-75"
              disabled={isSubmitting}
            >
              {isReadOnly ? "Повернутися" : "Скасувати"}
            </button>

            {!isReadOnly && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 h-10 border border-primaryOrange border-[2px] text-[14px]/[120%] font-noto font-normal text-primaryWhite cursor-pointer bg-primaryOrange rounded-full hover:bg-primaryWhite hover:text-primaryBlue transition-colors disabled:bg-gray-400 action:transform active:scale-95 active:duration-75"
              >
                {isSubmitting ? "Збереження..." : "Зберегти"}
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RepairFormPage;
