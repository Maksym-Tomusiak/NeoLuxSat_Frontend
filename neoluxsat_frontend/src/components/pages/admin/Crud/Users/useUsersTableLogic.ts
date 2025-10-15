import { useEffect, useState, useCallback, useMemo } from 'react';
import type { PaginationParams } from '@/types/paginationParams';
import type { PaginatedResult } from '@/types/paginatedResult';
import type { UserDto, UserCreateDto, UserUpdateDto } from '@/types/user';
import { UserService } from '@/services/user.service';
import useDebounce from '@/hooks/useDebounce';

const initialPagination: PaginationParams = {
  pageNumber: 1,
  pageSize: 7,
  searchTerm: null,
  sortBy: null,
  sortDescending: null,
};

const useUsersTableLogic = () => {
  const [paginatedData, setPaginatedData] = useState<PaginatedResult<UserDto>>({
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
  const [entityToEdit, setEntityToEdit] = useState<UserDto | null>(null);

  // --- Data Fetching & Reload ---

  const fetchUsers = useCallback(
    async (currentPagination: PaginationParams, signal: AbortSignal) => {
      if (!initialLoading) {
        setIsFetching(true);
      }

      try {
        const data = await UserService.getAllUsersPaginated(
          currentPagination,
          signal
        );
        setPaginatedData(data);
      } catch (error) {
        console.error('Failed to fetch paginated users:', error);
      } finally {
        if (initialLoading) setInitialLoading(false);
        setIsFetching(false);
      }
    },
    [initialLoading]
  );

  const reloadData = useCallback(() => {
    // Triggers a fetch via useEffect
    setPagination((prev) => ({ ...prev }));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchUsers(pagination, controller.signal);
    return () => controller.abort();
  }, [pagination, fetchUsers]);

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

  const handleEdit = (entity: UserDto) => {
    setEntityToEdit(entity);
    setIsReadOnlyModal(false);
    setIsFormModalOpen(true);
  };

  const handleDetails = (entity: UserDto) => {
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
      await UserService.deleteUserById(itemToDelete.id);
      reloadData();
    } catch (error) {
      console.error('Error during deletion:', error);
    } finally {
      closeDeleteModal();
    }
  }, [itemToDelete, reloadData]);

  // --- Modal Configs for EntityFormModal ---

  const UserServiceProxy = useMemo(
    () => ({
      create: UserService.createUser,
      update: (data: UserUpdateDto) => UserService.updateUser(data),
    }),
    []
  );

  const getUserInitialData = useCallback(
    (entity: UserDto | null): UserUpdateDto | UserCreateDto => {
      return entity
        ? ({
            id: entity.id,
            username: entity.username,
            password: '', // Don't pre-fill password for security
          } as UserUpdateDto)
        : ({ username: '', password: '' } as UserCreateDto);
    },
    []
  );

  const validateUser = useCallback(
    (
      data: UserCreateDto | UserUpdateDto,
      isEditing: boolean | undefined
    ): Record<string, string> => {
      const errs: Record<string, string> = {};
      const d = data as any;
      const len = (v?: string | null) => (v ?? '').trim().length;
      const hasWhitespace = (v?: string | null) => /\s/.test(v ?? '');

      // Username validation
      if (!isEditing || (isEditing && d.username)) {
        if (
          len(d.username) < 5 ||
          len(d.username) > 255 ||
          hasWhitespace(d.username)
        ) {
          errs.username = "Ім'я користувача має бути 5-255 без пробілів";
        }
      }

      // Password validation (required for create, optional for edit)
      if (!isEditing) {
        if (len(d.password) < 5 || len(d.password) > 255) {
          errs.password = 'Пароль має бути від 5 до 255 символів';
        }
      } else if (d.password && (len(d.password) < 5 || len(d.password) > 255)) {
        // Only validate if a password is provided during edit
        errs.password = 'Пароль має бути від 5 до 255 символів';
      }

      return errs;
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
    UserServiceProxy,
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
    getUserInitialData,
    validateUser,
  };
};

export default useUsersTableLogic;
