"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import type { PaginationParams } from "@/types/paginationParams";
import type { PaginatedResult } from "@/types/paginatedResult";
import type {
  ApplicationDto,
  ApplicationUpdateDto,
  ApplicationTypeDto,
  ApplicationStatusDto,
} from "@/types/application";
import { ApplicationService } from "@/services/application.service";
import { ApplicationTypeService } from "@/services/applicationType.service";
import { ApplicationStatusService } from "@/services/applicationStatus.service";
import { webSocketService } from "@/services/websocketService";
import useDebounce from "@/hooks/useDebounce";

const initialPagination: PaginationParams = {
  pageNumber: 1,
  pageSize: 7,
  searchTerm: null,
  sortBy: null,
  sortDescending: null,
};

const useApplicationsTableLogic = () => {
  const [paginatedData, setPaginatedData] = useState<
    PaginatedResult<ApplicationDto>
  >({
    items: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 7,
    totalPages: 1,
  });

  const [applicationTypes, setApplicationTypes] = useState<
    ApplicationTypeDto[]
  >([]);
  const [applicationStatuses, setApplicationStatuses] = useState<
    ApplicationStatusDto[]
  >([]);

  const [initialLoading, setInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [pagination, setPagination] =
    useState<PaginationParams>(initialPagination);
  const [localSearchTerm, setLocalSearchTerm] = useState<string>("");

  // Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isReadOnlyModal, setIsReadOnlyModal] = useState(false);
  const [entityToEdit, setEntityToEdit] = useState<ApplicationDto | null>(null);

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

  // --- Data Fetching & Reload ---

  const fetchApplications = useCallback(
    async (currentPagination: PaginationParams, signal: AbortSignal) => {
      if (!initialLoading) {
        setIsFetching(true);
      }

      try {
        const data = await ApplicationService.getAllApplicationsPaginated(
          currentPagination,
          signal
        );
        setPaginatedData(data);
      } catch (error) {
        console.error("Failed to fetch paginated applications:", error);
      } finally {
        if (initialLoading) setInitialLoading(false);
        setIsFetching(false);
      }
    },
    [initialLoading]
  );

  const fetchApplicationTypes = useCallback(async () => {
    try {
      const types = await ApplicationTypeService.getAllApplicationTypes();
      setApplicationTypes(types);
    } catch (error) {
      console.error("Failed to fetch application types:", error);
    }
  }, []);

  const fetchApplicationStatuses = useCallback(async () => {
    try {
      const statuses =
        await ApplicationStatusService.getAllApplicationStatuss();
      setApplicationStatuses(statuses);
    } catch (error) {
      console.error("Failed to fetch application statuses:", error);
    }
  }, []);

  const reloadData = useCallback(() => {
    setPagination((prev) => ({ ...prev }));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchApplications(pagination, controller.signal);
    return () => controller.abort();
  }, [pagination, fetchApplications]);

  useEffect(() => {
    fetchApplicationTypes();
    fetchApplicationStatuses();
  }, [fetchApplicationTypes, fetchApplicationStatuses]);

  useEffect(() => {
    webSocketService.start();

    const handleDataChange = () => {
      const controller = new AbortController();
      fetchApplications(pagination, controller.signal);
    };

    webSocketService.onApplicationCreated(handleDataChange);
    webSocketService.onApplicationUpdated(handleDataChange);
    webSocketService.onApplicationDeleted(handleDataChange);

    return () => {
      webSocketService.offApplicationCreated(handleDataChange);
      webSocketService.offApplicationUpdated(handleDataChange);
      webSocketService.offApplicationDeleted(handleDataChange);
    };
  }, [fetchApplications]);

  // --- Pagination & Search Handlers ---

  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, pageNumber: page }));
  }, []);

  const runSearch = useCallback((term: string) => {
    setPagination((prev) => ({
      ...prev,
      pageNumber: 1,
      searchTerm: term || null,
    }));
  }, []);

  const debouncedSearch = useDebounce(runSearch, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value);
    debouncedSearch(event.target.value);
  };

  // --- CRUD/Modal Handlers ---
  const handleAdd = () => {
    setEntityToEdit(null);
    setIsReadOnlyModal(false);
    setIsFormModalOpen(true);
  };

  const handleEdit = (entity: ApplicationDto) => {
    setEntityToEdit(entity);
    setIsReadOnlyModal(false);
    setIsFormModalOpen(true);
  };

  const handleDetails = (entity: ApplicationDto) => {
    setEntityToEdit(entity);
    setIsReadOnlyModal(true);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setEntityToEdit(null);
    setIsReadOnlyModal(false);
  };

  const openDeleteModal = (id: string, name: string) => {
    setItemToDelete({ id, name });
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteConfirm = useCallback(async () => {
    if (!itemToDelete) return;

    try {
      await ApplicationService.deleteApplicationById(itemToDelete.id);
      reloadData();
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      closeDeleteModal();
    }
  }, [itemToDelete, reloadData]);

  // --- Service Proxy for EntityFormModal (memoized) ---
  const ApplicationServiceProxy = useMemo(
    () => ({
      create: ApplicationService.createApplication,
      update: (data: ApplicationUpdateDto) =>
        ApplicationService.updateApplication(data.id, data),
    }),
    []
  );

  return {
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
  };
};

export default useApplicationsTableLogic;
