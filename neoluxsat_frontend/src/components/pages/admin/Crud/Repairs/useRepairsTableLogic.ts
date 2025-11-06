import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import type { PaginatedResult } from '@/types/paginatedResult';
import type { RepairDto } from '@/types/repair';
import useDebounce from '@/hooks/useDebounce';
import type { RepairPaginationParams } from '@/types/paginationParams';
import type { RepairStatusDto } from '@/types/repairStatus';
import type { RepairPaymentDto } from '@/types/repairPayment';
import { RepairService } from '@/services/repair.service';
import { RepairStatusService } from '@/services/repairStatus.service';
import { RepairPaymentService } from '@/services/repairPayment.service';

const initialPagination: RepairPaginationParams = {
  pageNumber: 1,
  pageSize: 7,
  searchTerm: null,
  sortBy: null,
  sortDescending: null,
  statusId: null,
  paymentId: null,
};

const useRepairsTableLogic = () => {
  const navigate = useNavigate();

  const [paginatedData, setPaginatedData] = useState<
    PaginatedResult<RepairDto>
  >({
    items: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 7,
    totalPages: 1,
  });

  // Data for dropdowns
  const [repairStatuses, setRepairStatuses] = useState<RepairStatusDto[]>([]);
  const [repairPayments, setRepairPayments] = useState<RepairPaymentDto[]>([]);

  const [initialLoading, setInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [pagination, setPagination] =
    useState<RepairPaginationParams>(initialPagination);
  const [localSearchTerm, setLocalSearchTerm] = useState<string>('');

  // --- MODAL STATE (Only for Delete) ---
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    name: string; // Will use displayId
  } | null>(null);
  // --- All EntityFormModal state is REMOVED ---

  // --- Utility Functions ---

  const formatDate = (date: Date | string): string => {
    // (Your existing formatDate function)
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

  // --- Data Fetching & Reload ---

  const fetchRepairs = useCallback(
    async (currentPagination: RepairPaginationParams, signal: AbortSignal) => {
      if (!initialLoading) {
        setIsFetching(true);
      }

      try {
        const data = await RepairService.getAllRepairsPaginated(
          currentPagination,
          signal
        );
        setPaginatedData(data);
      } catch (error) {
        console.error('Failed to fetch paginated repairs:', error);
      } finally {
        if (initialLoading) setInitialLoading(false);
        setIsFetching(false);
      }
    },
    [initialLoading]
  );

  const fetchRepairStatuses = useCallback(async () => {
    try {
      const statuses = await RepairStatusService.getAllRepairStatuses();
      setRepairStatuses(statuses);
    } catch (error) {
      console.error('Failed to fetch repair statuses:', error);
    }
  }, []);

  const fetchRepairPayments = useCallback(async () => {
    try {
      const payments = await RepairPaymentService.getAllRepairPayments();
      setRepairPayments(payments);
    } catch (error) {
      console.error('Failed to fetch repair payments:', error);
    }
  }, []);

  const reloadData = useCallback(() => {
    setPagination((prev) => ({ ...prev }));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchRepairs(pagination, controller.signal);
    return () => controller.abort();
  }, [pagination, fetchRepairs]);

  useEffect(() => {
    fetchRepairStatuses();
    fetchRepairPayments();
  }, [fetchRepairStatuses, fetchRepairPayments]);

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

  const handleStatusFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPagination((prev) => ({
      ...prev,
      pageNumber: 1,
      statusId: event.target.value || null,
    }));
  };

  const handlePaymentFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPagination((prev) => ({
      ...prev,
      pageNumber: 1,
      paymentId: event.target.value || null,
    }));
  };

  const handleNavigateToAdd = () => {
    navigate('/admin/repairs/new');
  };

  const handleNavigateToEdit = (entity: RepairDto) => {
    navigate(`/admin/repairs/edit/${entity.id}`);
  };

  const handleNavigateToDetails = (entity: RepairDto) => {
    navigate(`/admin/repairs/details/${entity.id}`);
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
      await RepairService.deleteRepairById(itemToDelete.id);
      reloadData();
    } catch (error) {
      console.error('Error during deletion:', error);
    } finally {
      closeDeleteModal();
    }
  }, [itemToDelete, reloadData]);

  // --- NEW: Inline Update Handlers ---
  const handleStatusChange = useCallback(
    async (repairId: string, newStatusId: string) => {
      try {
        await RepairService.updateRepairStatus(repairId, newStatusId);
        reloadData(); // Refresh data
      } catch (error) {}
    },
    [reloadData]
  );

  const handlePaymentChange = useCallback(
    async (repairId: string, newPaymentId: string) => {
      try {
        await RepairService.updateRepairPayment(repairId, newPaymentId);
        reloadData(); // Refresh data
      } catch (error) {}
    },
    [reloadData]
  );

  return {
    paginatedData,
    repairStatuses,
    repairPayments,
    initialLoading,
    isFetching,
    localSearchTerm,
    isDeleteModalOpen,
    itemToDelete,
    // No form modal state
    formatDate,
    pagination, // Expose for filter dropdowns
    handlePageChange,
    handleSearchChange,
    handleStatusFilterChange, // Expose for filters
    handlePaymentFilterChange, // Expose for filters
    handleNavigateToAdd,
    handleNavigateToEdit,
    handleNavigateToDetails,
    openDeleteModal,
    closeDeleteModal,
    handleDeleteConfirm,
    handleStatusChange, // Expose for table row
    handlePaymentChange, // Expose for table row
  };
};

export default useRepairsTableLogic;
