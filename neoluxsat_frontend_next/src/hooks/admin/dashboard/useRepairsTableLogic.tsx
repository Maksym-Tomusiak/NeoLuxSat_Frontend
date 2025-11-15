import { useEffect, useState, useCallback } from "react";
import type { RepairDto } from "@/types/repair";
import { webSocketService } from "@/services/websocketService";
import { RepairService } from "@/services/repair.service";
import { useRouter } from "next/navigation";

const useRepairsTableLogic = () => {
  const router = useRouter();

  const [repairs, setRepairs] = useState<RepairDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [initialLoading, setInitialLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string>("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const fetchRepairs = useCallback(async (limit: number = 4) => {
    try {
      setLoading(true);
      const data: RepairDto[] = await RepairService.getLatestRepairs(limit);
      setRepairs(data);
    } catch (error) {
      console.error("Failed to fetch latest repairs:", error);
      setFetchError("Не вдалось завантажити дані для цієї таблиці");
    } finally {
      setLoading(false);
    }
  }, []);

  const refetchRepairs = useCallback(async (limit: number = 4) => {
    try {
      const data: RepairDto[] = await RepairService.getLatestRepairs(limit);
      setRepairs(data);
    } catch (error) {
      console.error("Failed to fetch latest repairs:", error);
      setFetchError("Не вдалось завантажити дані для цієї таблиці");
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    RepairService.getLatestRepairs(4, controller.signal)
      .then(setRepairs)
      .catch((error: any) => {
        console.error("Failed to fetch latest repairs:", error);
        setFetchError("Не вдалось завантажити дані для цієї таблиці");
      })
      .finally(() => {
        setLoading(false);
        setInitialLoading(false);
      });

    return () => controller.abort();
  }, []);

  // Example: Fetch related data if needed
  // useEffect(() => {
  //   RepairStatusService.getAllRepairStatuss()
  //     .then(setRepairStatuses)
  //     .catch(() => {});
  // }, []);

  useEffect(() => {
    webSocketService.start();

    const handleRepairChange = () => {
      refetchRepairs();
    };

    webSocketService.onRepairCreated(handleRepairChange);
    webSocketService.onRepairUpdated(handleRepairChange);
    webSocketService.onRepairDeleted(handleRepairChange);

    return () => {
      webSocketService.offRepairCreated(handleRepairChange);
      webSocketService.offRepairUpdated(handleRepairChange);
      webSocketService.offRepairDeleted(handleRepairChange);
    };
  });

  // --- Utility Functions ---

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

  // --- Handlers ---

  const toggleMenu = (id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const openDeleteModal = (id: string, name: string) => {
    setItemToDelete({ id, name });
    setIsDeleteModalOpen(true);
    setOpenMenuId(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    try {
      await RepairService.deleteRepairById(itemToDelete.id);
      fetchRepairs();
    } catch (e) {
      console.error("Failed to delete repair", e);
    } finally {
      closeDeleteModal();
    }
  };

  // --- NAVIGATION HANDLERS ---
  // (Replaced modal handlers)

  const handleDetails = (entity: RepairDto) => {
    router.push(`/admin/repairs/details/${entity.id}`);
    setOpenMenuId(null);
  };

  const handleEdit = (entity: RepairDto) => {
    router.push(`/admin/repairs/edit/${entity.id}`);
    setOpenMenuId(null);
  };

  return {
    repairs,
    loading,
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
  };
};

export default useRepairsTableLogic;
