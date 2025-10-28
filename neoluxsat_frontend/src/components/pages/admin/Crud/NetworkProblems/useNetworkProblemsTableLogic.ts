import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PaginationParams } from '@/types/paginationParams';
import type { PaginatedResult } from '@/types/paginatedResult';
import type {
  NetworkProblemDto,
  NetworkProblemStatusDto,
  NetworkProblemUpdateDto,
  NetworkProblemServiceDto,
} from '@/types/networkProblem';
import { NetworkProblemService } from '@/services/networkProblem.service';
import { webSocketService } from '@/services/websocketService';
import useDebounce from '@/hooks/useDebounce';

const initialPagination: PaginationParams = {
  pageNumber: 1,
  pageSize: 7,
  searchTerm: null,
  sortBy: null,
  sortDescending: null,
};

const useNetworkProblemsTableLogic = () => {
  const [paginatedData, setPaginatedData] = useState<
    PaginatedResult<NetworkProblemDto>
  >({ items: [], totalCount: 0, pageNumber: 1, pageSize: 7, totalPages: 1 });

  const [statuses, setStatuses] = useState<NetworkProblemStatusDto[]>([]);
  const [services, setServices] = useState<NetworkProblemServiceDto[]>([]);

  const [initialLoading, setInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [pagination, setPagination] =
    useState<PaginationParams>(initialPagination);
  const [localSearchTerm, setLocalSearchTerm] = useState<string>('');

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

  const formatTime = (timeString: string | null): string => {
    if (!timeString) return '';

    try {
      // 1. Parse the hours and minutes from the "HH:mm" string
      const [hoursStr, minutesStr] = timeString.split(':');
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);

      if (isNaN(hours) || isNaN(minutes)) return ''; // 2. Create a temporary UTC Date object using the parsed time. // This date represents the provided time, in UTC. // We use Jan 1, 1970 for a guaranteed non-DST date, but the time is what matters.

      const utcDate = new Date(Date.UTC(1970, 0, 1, hours, minutes)); // 3. Format the UTC Date object to the target timezone (Europe/Kyiv) // and return the time in "HH:mm" format.

      const formatter = new Intl.DateTimeFormat('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Kyiv',
      }); // Example: if timeString is "12:12", utcDate is 12:12 UTC. // The formatter converts 12:12 UTC to 15:12 Kyiv time (UTC+3).
      return formatter.format(utcDate);
    } catch (e) {
      console.error('Error formatting time:', e);
      return '';
    }
  };

  const fetchEntities = useCallback(
    async (currentPagination: PaginationParams, signal: AbortSignal) => {
      if (!initialLoading) setIsFetching(true);
      try {
        const data = await NetworkProblemService.getAllNetworkProblemsPaginated(
          currentPagination,
          signal
        );
        setPaginatedData(data);
      } catch (error) {
        console.error('Failed to fetch network problems:', error);
      } finally {
        if (initialLoading) setInitialLoading(false);
        setIsFetching(false);
      }
    },
    [initialLoading]
  );

  const fetchStatusesAndServices = useCallback(async () => {
    try {
      const [sts, srvs] = await Promise.all([
        NetworkProblemService.getAllNetworkProblemStatuses(),
        NetworkProblemService.getAllNetworkProblemServices(),
      ]);
      setStatuses(sts);
      setServices(srvs);
    } catch (error) {
      console.error('Failed to fetch statuses/services:', error);
    }
  }, []);

  const reloadData = useCallback(() => {
    setPagination((prev) => ({ ...prev }));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchEntities(pagination, controller.signal);
    return () => controller.abort();
  }, [pagination, fetchEntities]);

  useEffect(() => {
    fetchStatusesAndServices();
  }, [fetchStatusesAndServices]);

  useEffect(() => {
    // Підключаємось до хабу
    webSocketService.start();

    // Створюємо обробник, який просто перезавантажує дані таблиці
    const handleDataChange = () => {
      console.log(
        'SignalR: Data changed by another source, reloading paginated data...'
      );
      // reloadData() - це ваша існуюча функція, яка
      // викликає refetch поточної сторінки
      reloadData();
    };

    // Підписуємось на події
    webSocketService.onNetworkProblemCreated(handleDataChange);
    webSocketService.onNetworkProblemUpdated(handleDataChange);
    webSocketService.onNetworkProblemDeleted(handleDataChange);

    // Відписуємось при виході зі сторінки
    return () => {
      webSocketService.offNetworkProblemCreated(handleDataChange);
      webSocketService.offNetworkProblemUpdated(handleDataChange);
      webSocketService.offNetworkProblemDeleted(handleDataChange);
    };
  }, [reloadData]); // Залежимо від вашої функції reloadData

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

  const handleToggleActive = useCallback(
    async (id: string, currentIsActive: boolean) => {
      // 1. Optimistic Update (UI updates immediately)
      setPaginatedData((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.id === id ? { ...item, isActive: !currentIsActive } : item
        ),
      }));

      try {
        // 2. API Request
        await NetworkProblemService.toggleActiveNetworkProblem(id); // If successful, the optimistic update is correct. No further action needed.
      } catch (error) {
        console.error('Failed to toggle active status:', error); // 3. Revert Optimistic Update (Rollback)
        setPaginatedData((prev) => ({
          ...prev,
          items: prev.items.map((item) =>
            item.id === id ? { ...item, isActive: currentIsActive } : item
          ),
        })); // Optional: Show a toast/error message here
      }
    },
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value);
    debouncedSearch(event.target.value);
  };

  const handleAdd = () => {
    setEntityToEdit(null);
    setIsReadOnlyModal(false);
    setIsFormModalOpen(true);
  };

  const handleEdit = (entity: NetworkProblemDto) => {
    setEntityToEdit(entity);
    setIsReadOnlyModal(false);
    setIsFormModalOpen(true);
  };

  const handleDetails = (entity: NetworkProblemDto) => {
    setEntityToEdit(entity);
    setIsReadOnlyModal(true);
    setIsFormModalOpen(true);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isReadOnlyModal, setIsReadOnlyModal] = useState(false);
  const [entityToEdit, setEntityToEdit] = useState<NetworkProblemDto | null>(
    null
  );

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
      await NetworkProblemService.deleteNetworkProblemById(itemToDelete.id);
      reloadData();
    } catch (error) {
      console.error('Error during deletion:', error);
    } finally {
      closeDeleteModal();
    }
  }, [itemToDelete, reloadData]);

  const ServiceProxy = useMemo(
    () => ({
      create: NetworkProblemService.createNetworkProblem,
      update: (data: NetworkProblemUpdateDto) =>
        NetworkProblemService.updateNetworkProblem(data, undefined),
    }),
    []
  );

  return {
    paginatedData,
    statuses,
    services,
    initialLoading,
    isFetching,
    localSearchTerm,
    isDeleteModalOpen,
    itemToDelete,
    isFormModalOpen,
    isReadOnlyModal,
    entityToEdit,
    ServiceProxy,
    formatDate,
    formatTime,
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
    handleToggleActive,
  };
};

export default useNetworkProblemsTableLogic;
