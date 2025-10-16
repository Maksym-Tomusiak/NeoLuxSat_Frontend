// src/components/admin/feedbacks/FeedbacksTable/useFeedbacksTableLogic.ts

import { useEffect, useState, useCallback, useMemo } from 'react';
import type { PaginationParams } from '@/types/paginationParams';
import type { PaginatedResult } from '@/types/paginatedResult';
import type {
  FeedbackDto,
  FeedbackCreateDto,
  FeedbackUpdateDto,
} from '@/types/feedback';
import { FeedbackService } from '@/services/feedbacks.service';
import useDebounce from '@/hooks/useDebounce';

const initialPagination: PaginationParams = {
  pageNumber: 1,
  pageSize: 7,
  searchTerm: null,
  sortBy: null,
  sortDescending: null,
};

const useFeedbacksTableLogic = () => {
  const [paginatedData, setPaginatedData] = useState<
    PaginatedResult<FeedbackDto>
  >({
    items: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 7,
    totalPages: 1,
  });

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
  const [entityToEdit, setEntityToEdit] = useState<FeedbackDto | null>(null);

  // --- Data Fetching & Reload ---

  const fetchFeedbacks = useCallback(
    async (currentPagination: PaginationParams, signal: AbortSignal) => {
      if (!initialLoading) {
        setIsFetching(true);
      }

      try {
        const data = await FeedbackService.getAllFeedbacksPaginated(
          currentPagination,
          signal
        );
        setPaginatedData(data);
      } catch (error) {
        console.error('Failed to fetch paginated feedbacks:', error);
      } finally {
        if (initialLoading) setInitialLoading(false);
        setIsFetching(false);
      }
    },
    [initialLoading]
  );

  const reloadData = useCallback(() => {
    // A simple way to trigger useEffect without changing pagination params
    setPagination((prev) => ({ ...prev }));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchFeedbacks(pagination, controller.signal);
    return () => controller.abort();
  }, [pagination, fetchFeedbacks]);

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

  const handleEdit = (entity: FeedbackDto) => {
    setEntityToEdit(entity);
    setIsReadOnlyModal(false);
    setIsFormModalOpen(true);
  };

  const handleDetails = (entity: FeedbackDto) => {
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
      await FeedbackService.deleteFeedbackById(itemToDelete.id);
      reloadData();
    } catch (error) {
      console.error('Error during deletion:', error);
    } finally {
      closeDeleteModal();
    }
  }, [itemToDelete, reloadData]);

  // --- Modal Configs for EntityFormModal ---

  const FeedbackServiceProxy = useMemo(
    () => ({
      create: FeedbackService.createFeedback,
      update: FeedbackService.updateFeedback,
    }),
    []
  );

  const getFeedbackInitialData = useCallback(
    (entity: FeedbackDto | null): FeedbackUpdateDto | FeedbackCreateDto => {
      return entity
        ? ({
            id: entity.id,
            author: entity.author,
            content: entity.content,
          } as FeedbackUpdateDto)
        : ({ author: '', content: '' } as FeedbackCreateDto);
    },
    []
  );

  return {
    paginatedData,
    initialLoading,
    isFetching,
    localSearchTerm,
    isDeleteModalOpen,
    itemToDelete,
    isFormModalOpen,
    isReadOnlyModal,
    entityToEdit,
    FeedbackServiceProxy,
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
    getFeedbackInitialData,
  };
};

export default useFeedbacksTableLogic;
