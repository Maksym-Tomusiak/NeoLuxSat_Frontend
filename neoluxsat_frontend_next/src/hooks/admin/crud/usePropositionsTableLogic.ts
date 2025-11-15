import { useEffect, useState, useCallback, useMemo } from "react";
import type { PaginationParams } from "@/types/paginationParams";
import type { PaginatedResult } from "@/types/paginatedResult";
import type {
  PropositionDto,
  PropositionCreateDto,
  PropositionUpdateDto,
} from "@/types/proposition";
import { PropositionService } from "@/services/proposition.service"; // Use PropositionService
import useDebounce from "@/hooks/useDebounce";

const initialPagination: PaginationParams = {
  pageNumber: 1,
  pageSize: 7,
  searchTerm: null,
  sortBy: null,
  sortDescending: null,
};

const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) return ""; // Handle null or undefined input
  try {
    // Ensure we're working with a Date object
    const d = typeof date === "string" ? new Date(date) : date;
    if (isNaN(d.getTime())) return String(date); // Return original string if invalid date

    // Format to DD.MM.YYYY for display
    return d.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Europe/Kyiv", // Or 'UTC' if dates should be treated as UTC
    });
  } catch {
    // Fallback if formatting fails
    return String(date);
  }
};

const usePropositionsTableLogic = () => {
  const [paginatedData, setPaginatedData] = useState<
    PaginatedResult<PropositionDto>
  >({ items: [], totalCount: 0, pageNumber: 1, pageSize: 7, totalPages: 1 });

  const [initialLoading, setInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null); // Added fetchError state
  const [pagination, setPagination] =
    useState<PaginationParams>(initialPagination);
  const [localSearchTerm, setLocalSearchTerm] = useState<string>("");

  // Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null); // name will be title
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isReadOnlyModal, setIsReadOnlyModal] = useState(false);
  const [entityToEdit, setEntityToEdit] = useState<PropositionDto | null>(null);

  // --- Data Fetching & Reload ---

  const fetchPropositions = useCallback(
    async (currentPagination: PaginationParams, signal?: AbortSignal) => {
      if (!initialLoading) setIsFetching(true);
      setFetchError(null); // Reset error before fetch
      try {
        const data = await PropositionService.getAllPropositionsPaginated(
          currentPagination,
          signal
        );
        setPaginatedData(data);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch paginated propositions:", error);
          setFetchError("Не вдалося завантажити пропозиції."); // Set error message
        }
      } finally {
        if (initialLoading) setInitialLoading(false);
        setIsFetching(false);
      }
    },
    [initialLoading]
  );

  const reloadData = useCallback(() => {
    setPagination((prev) => ({ ...prev }));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchPropositions(pagination, controller.signal);
    return () => controller.abort();
  }, [pagination, fetchPropositions]);

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

  const handleEdit = (entity: PropositionDto) => {
    setEntityToEdit(entity);
    setIsReadOnlyModal(false);
    setIsFormModalOpen(true);
  };

  const handleDetails = (entity: PropositionDto) => {
    setEntityToEdit(entity);
    setIsReadOnlyModal(true);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setEntityToEdit(null);
    setIsReadOnlyModal(false);
  };

  const openDeleteModal = (id: string, title: string) => {
    // Use title instead of name
    setItemToDelete({ id, name: title });
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteConfirm = useCallback(async () => {
    if (!itemToDelete) return;
    try {
      await PropositionService.deletePropositionById(itemToDelete.id);
      reloadData();
    } catch (error) {
      console.error("Error during proposition deletion:", error);
      // Optionally set an error state or show a notification
    } finally {
      closeDeleteModal();
    }
  }, [itemToDelete, reloadData]);

  // --- Modal Configs for EntityFormModal ---

  const PropositionServiceProxy = useMemo(
    () => ({
      create: PropositionService.createProposition,
      update: PropositionService.updateProposition, // Assumes update takes the DTO directly
    }),
    []
  );

  // Initial data function for the form
  const getPropositionInitialData = useCallback(
    (
      entity: PropositionDto | null
    ): PropositionUpdateDto | PropositionCreateDto => {
      return entity
        ? ({
            id: entity.id,
            title: entity.title,
            content: entity.content,
            endDate: new Date(entity.endDate), // Ensure endDate is a Date object
            image: null, // Start with null for image on update, user can provide new file
          } as PropositionUpdateDto)
        : ({
            title: "",
            content: "",
            endDate: new Date(), // Default to today or null if preferred
            image: undefined as File | undefined, // Explicitly undefined for create
          } as PropositionCreateDto);
    },
    []
  );

  return {
    paginatedData,
    initialLoading,
    isFetching,
    fetchError, // Expose fetch error
    localSearchTerm,
    isDeleteModalOpen,
    itemToDelete,
    isFormModalOpen,
    isReadOnlyModal,
    entityToEdit,
    PropositionServiceProxy, // Use correct proxy name
    formatDate, // Keep formatDate for endDate display
    // formatTime is likely not needed unless you add time fields
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
    getPropositionInitialData, // Use correct initial data function name
  };
};

export default usePropositionsTableLogic;
