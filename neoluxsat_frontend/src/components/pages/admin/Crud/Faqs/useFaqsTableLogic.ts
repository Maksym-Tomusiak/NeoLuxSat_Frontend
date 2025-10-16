import { useEffect, useState, useCallback, useMemo } from 'react';
import type { PaginationParams } from '@/types/paginationParams';
import type { PaginatedResult } from '@/types/paginatedResult';
import type { FaqDto, FaqCreateDto, FaqUpdateDto } from '@/types/faq';
import type { FaqCategoryDto } from '@/types/faqCategory';
import { FaqService } from '@/services/faq.service';
import { FaqCategoryService } from '@/services/faqCategory.service';
import useDebounce from '@/hooks/useDebounce';

const initialPagination: PaginationParams = {
  pageNumber: 1,
  pageSize: 7,
  searchTerm: null,
  sortBy: null,
  sortDescending: null,
};

const useFaqsTableLogic = () => {
  const [paginatedData, setPaginatedData] = useState<PaginatedResult<FaqDto>>({
    items: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 7,
    totalPages: 1,
  });

  const [faqCategories, setFaqCategories] = useState<FaqCategoryDto[]>([]);

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
  const [entityToEdit, setEntityToEdit] = useState<FaqDto | null>(null);

  // --- Data Fetching & Reload ---

  const fetchFaqs = useCallback(
    async (currentPagination: PaginationParams, signal: AbortSignal) => {
      if (!initialLoading) {
        setIsFetching(true);
      }

      try {
        const data = await FaqService.getAllFaqsPaginated(
          currentPagination,
          signal
        );
        setPaginatedData(data);
      } catch (error) {
        console.error('Failed to fetch paginated FAQs:', error);
      } finally {
        if (initialLoading) setInitialLoading(false);
        setIsFetching(false);
      }
    },
    [initialLoading]
  );

  const fetchFaqCategories = useCallback(async () => {
    try {
      const categories = await FaqCategoryService.getAllFaqCategorys();
      setFaqCategories(categories);
    } catch (error) {
      console.error('Failed to fetch FAQ categories:', error);
    }
  }, []);

  const reloadData = useCallback(() => {
    setPagination((prev) => ({ ...prev }));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchFaqs(pagination, controller.signal);
    return () => controller.abort();
  }, [pagination, fetchFaqs]);

  useEffect(() => {
    fetchFaqCategories();
  }, [fetchFaqCategories]);

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

  const handleEdit = (entity: FaqDto) => {
    setEntityToEdit(entity);
    setIsReadOnlyModal(false);
    setIsFormModalOpen(true);
  };

  const handleDetails = (entity: FaqDto) => {
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
      await FaqService.deleteFaqById(itemToDelete.id);
      reloadData();
    } catch (error) {
      console.error('Error during deletion:', error);
    } finally {
      closeDeleteModal();
    }
  }, [itemToDelete, reloadData]);

  // --- Modal Configs for EntityFormModal ---

  const FaqServiceProxy = useMemo(
    () => ({
      create: FaqService.createFaq,
      update: (data: FaqUpdateDto) => FaqService.updateFaq(data.id, data),
    }),
    []
  );

  const getFaqInitialData = useCallback(
    (entity: FaqDto | null): FaqDto | FaqCreateDto => {
      return entity
        ? ({
            id: entity.id,
            question: entity.question,
            answer: entity.answer,
            categoryId: entity.categoryId,
          } as FaqDto)
        : ({ question: '', answer: '', categoryId: '' } as FaqCreateDto);
    },
    []
  );

  return {
    paginatedData,
    faqCategories,
    initialLoading,
    isFetching,
    localSearchTerm,
    isDeleteModalOpen,
    itemToDelete,
    isFormModalOpen,
    isReadOnlyModal,
    entityToEdit,
    FaqServiceProxy,
    handlePageChange,
    handleSearchChange,
    handleAdd,
    handleEdit,
    handleDetails,
    closeFormModal,
    openDeleteModal,
    handleDeleteConfirm,
    reloadData,
    getFaqInitialData,
    closeDeleteModal,
  };
};

export default useFaqsTableLogic;
