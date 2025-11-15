"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useForm, type FieldValues } from "react-hook-form";

import { RepairService } from "@/services/repair.service";
import { RepairStatusService } from "@/services/repairStatus.service";
import { RepairPaymentService } from "@/services/repairPayment.service";
import { UserService } from "@/services/user.service";
import type {
  RepairCreateDto,
  RepairUpdateDto,
  RepairDto,
} from "@/types/repair";
import type { RepairStatusDto } from "@/types/repairStatus";
import type { RepairPaymentDto } from "@/types/repairPayment";
import type { UserDto } from "@/types/user";

// --- HELPER to format date for <input type="date"> ---
const toInputDate = (date: Date | string | null | undefined): string => {
  if (!date) return "";
  try {
    return new Date(date).toISOString().split("T")[0];
  } catch {
    return "";
  }
};

const getInitialData = (
  entity: RepairDto | null
): RepairCreateDto | RepairUpdateDto => {
  return entity
    ? {
        id: entity.id,
        statusId: entity.statusId,
        paymentId: entity.paymentId,
        lastName: entity.lastName,
        phoneNumber: entity.phoneNumber,
        equipmentModel: entity.equipmentModel,
        issue: entity.issue,
        userId: entity.userId || "",
        firstName: entity.firstName || "",
        city: entity.city || "",
        street: entity.street || "",
        equipmentType: entity.equipmentType || "",
        serialNumber: entity.serialNumber || "",
        complection: entity.complection || "", // <-- CORRECTED
        state: entity.state || "",
        repairDate: toInputDate(entity.repairDate),
        usedMaterials: entity.usedMaterials || "", // <-- CORRECTED
        materialsCost: entity.materialsCost || 0,
        jobDone: entity.jobDone || "",
        jobCost: entity.jobCost || 0,
        masterConclusion: entity.masterConclusion || "",
        managerComment: entity.managerComment || "",
      }
    : {
        statusId: "",
        paymentId: "",
        lastName: "",
        phoneNumber: "",
        equipmentModel: "",
        issue: "",
        userId: "",
        firstName: "",
        city: "",
        street: "",
        equipmentType: "",
        serialNumber: "",
        complection: "", // <-- CORRECTED
        state: "",
        repairDate: "",
        usedMaterials: "", // <-- CORRECTED
        materialsCost: 0,
        jobDone: "",
        jobCost: 0,
        masterConclusion: "",
        managerComment: "",
      };
};

export const useRepairFormLogic = () => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const id = params.id as string;

  const isCreating = pathname.endsWith("/new");
  const isReadOnly = pathname.includes("/details/");
  const isEditing = !isCreating && !isReadOnly && !!id;

  const [isLoading, setIsLoading] = useState(true);
  const [entity, setEntity] = useState<RepairDto | null>(null);
  const [users, setUsers] = useState<UserDto[]>([]);
  const [repairStatuses, setRepairStatuses] = useState<RepairStatusDto[]>([]);
  const [repairPayments, setRepairPayments] = useState<RepairPaymentDto[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const methods = useForm<RepairCreateDto | RepairUpdateDto>({
    defaultValues: getInitialData(null),
    disabled: isReadOnly,
  });

  const { handleSubmit, reset, formState } = methods;

  const handleInvoicePrint = async () => {
    if (!id) return; // Guard clause

    setIsDownloading(true);
    try {
      // 1. Call the service to get the file blob
      // We don't need the fileName anymore, but the service returns it, which is fine.
      const { blob } = await RepairService.downloadRepairInvoice(id);

      // 2. Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // 3. Create a temporary link element to open in a new tab
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank"; // <-- This is the key change
      // We DO NOT set 'a.download', as that would force a download

      document.body.appendChild(a); // Add link to the page
      a.click(); // Simulate a click
      a.remove(); // Remove the link

      // Revoke the URL after a short delay.
      // This gives the new tab time to start loading the PDF
      // before the URL becomes invalid.
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error("Error opening invoice:", error);
      // You could show a toast notification here
    } finally {
      setIsDownloading(false);
    }
  };

  const formatDate = (date: Date | string): string => {
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return String(date);
      return d.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "Europe/Kyiv",
      });
    } catch {
      return String(date);
    }
  };

  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const [usersData, statusesData, paymentsData] = await Promise.all([
          UserService.getAllUsers(),
          RepairStatusService.getAllRepairStatuses(),
          RepairPaymentService.getAllRepairPayments(),
        ]);
        setUsers(usersData.filter((u) => !u.roles.includes("Master")));
        setRepairStatuses(statusesData);
        setRepairPayments(paymentsData);
      } catch (error) {
        console.error("Failed to load dropdown data", error);
      }
    };

    const loadEntity = async (entityId: string) => {
      try {
        const data = await RepairService.getRepairById(entityId);
        setEntity(data);
        reset(getInitialData(data));
      } catch (error) {
        console.error("Failed to load repair", error);
        router.push("/admin/repairs");
      }
    };

    const initialize = async () => {
      setIsLoading(true);
      await loadDropdowns();
      if (isEditing || isReadOnly) {
        await loadEntity(id!);
      } else {
        reset(getInitialData(null));
      }
      setIsLoading(false);
    };

    initialize();
  }, [id, isCreating, isEditing, isReadOnly, router, pathname, , reset]);

  const onSubmit = async (data: FieldValues) => {
    if (isReadOnly) return;

    const payload = {
      ...data,
      repairDate: data.repairDate ? new Date(data.repairDate) : null,
      userId: data.userId || null,
      materialsCost: Number(data.materialsCost) || 0,
      jobCost: Number(data.jobCost) || 0,
    };

    try {
      if (isCreating) {
        await RepairService.createRepair(payload as unknown as RepairCreateDto);
      } else if (isEditing) {
        await RepairService.updateRepair(
          id!,
          payload as unknown as RepairUpdateDto
        );
      }
      router.push("/admin/repairs");
    } catch (error) {
      console.error("Failed to save repair", error);
    }
  };

  const pageTitle = isCreating
    ? "Створити новий ремонт"
    : isEditing
    ? `Редагувати Ремонт #${entity?.displayId}`
    : `Деталі Ремонту #${entity?.displayId}`;

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    handleInvoicePrint,
    isLoading,
    isReadOnly,
    isDownloading, // <-- RETURN NEW STATE
    isSubmitting: formState.isSubmitting,
    pageTitle,
    users,
    repairStatuses,
    repairPayments,
    formatDate,
  };
};
