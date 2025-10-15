import { useEffect, useState, useCallback, useMemo } from 'react';
import type { PaginationParams } from '@/types/paginationParams';
import type { PaginatedResult } from '@/types/paginatedResult';
import type {
  ApplicationDto,
  ApplicationCreateDto,
  ApplicationUpdateDto,
  ApplicationTypeDto,
  ApplicationStatusDto,
} from '@/types/application';
import { ApplicationService } from '@/services/application.service';
import { ApplicationTypeService } from '@/services/applicationType.service';
import { ApplicationStatusService } from '@/services/applicationStatus.service';
import useDebounce from '@/hooks/useDebounce';
import { getApplicationInitialData } from './ApplicationFormFields'; // Keep utility function import here if it's external to the hook

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
  const [localSearchTerm, setLocalSearchTerm] = useState<string>('');

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
      return d.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'Europe/Kyiv',
      });
    } catch {
      return String(date);
    }
  };

  const validateApplication = useCallback(
    (
      data: ApplicationCreateDto | ApplicationUpdateDto,
      isEditing: boolean | undefined
    ): Record<string, string> => {
      const errs: Record<string, string> = {};
      const d = data as any;
      const len = (v?: string | null) => (v ?? '').trim().length;

      if (len(d.fullName) < 3 || len(d.fullName) > 255)
        errs.fullName = "Повне ім'я має бути від 3 до 255 символів";
      if (len(d.email) < 3 || len(d.email) > 255)
        errs.email = 'Email має бути від 3 до 255 символів';
      if (len(d.phone) < 3 || len(d.phone) > 20)
        errs.phone = 'Телефон має бути від 3 до 20 символів';
      if (len(d.address) < 3 || len(d.address) > 500)
        errs.address = 'Адреса має бути від 3 до 500 символів';
      if (!d.typeId) errs.typeId = 'Оберіть тип заявки';

      if (isEditing && !d.statusId) errs.statusId = 'Оберіть статус заявки';

      return errs;
    },
    []
  );

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
        console.error('Failed to fetch paginated applications:', error);
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
      console.error('Failed to fetch application types:', error);
    }
  }, []);

  const fetchApplicationStatuses = useCallback(async () => {
    try {
      const statuses =
        await ApplicationStatusService.getAllApplicationStatuss();
      setApplicationStatuses(statuses);
    } catch (error) {
      console.error('Failed to fetch application statuses:', error);
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
      console.error('Error during deletion:', error);
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
    getApplicationInitialData, // Exported from FormFields file, so we export the function itself
    validateApplication,
  };
};

export default useApplicationsTableLogic;
