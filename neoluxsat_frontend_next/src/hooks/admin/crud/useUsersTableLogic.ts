import { useEffect, useState, useCallback, useMemo } from "react";
import type { PaginationParams } from "@/types/paginationParams";
import type { PaginatedResult } from "@/types/paginatedResult";
import type { UserDto, UserCreateDto, UserUpdateDto } from "@/types/user";
import { UserService } from "@/services/user.service";
import { RoleService } from "@/services/role.service"; // Припускаємо, що у вас є цей сервіс
import useDebounce from "@/hooks/useDebounce";
import type { RoleDto } from "@/types/role";

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

  const [roles, setRoles] = useState<RoleDto[]>([]); // Стан для списку ролей (не включає Admin, для вибору)
  const [allRolesForLookup, setAllRolesForLookup] = useState<RoleDto[]>([]); // Стан для ВСІХ ролей (включаючи Admin, для пошуку ID)

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
        console.error("Failed to fetch paginated users:", error);
      } finally {
        if (initialLoading && allRolesForLookup.length > 0)
          setInitialLoading(false);
        setIsFetching(false);
      }
    },
    [initialLoading, allRolesForLookup.length]
  );

  const fetchRoles = useCallback(
    async (signal: AbortSignal) => {
      try {
        const data = await RoleService.getAllRoles(signal);
        setAllRolesForLookup(data); // ЗБЕРІГАЄМО ВСІ ролі для пошуку ID Admin
        setRoles(data.filter((role) => role.name !== "Admin")); // ЗБЕРІГАЄМО ТІЛЬКИ НЕ-ADMIN для вибору у формі
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      } finally {
        if (initialLoading && paginatedData.items.length > 0) {
          setInitialLoading(false);
        }
      }
    },
    [initialLoading, paginatedData.items.length]
  );

  const reloadData = useCallback(() => {
    setPagination((prev) => ({ ...prev }));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchUsers(pagination, controller.signal);
    return () => controller.abort();
  }, [pagination, fetchUsers]);

  useEffect(() => {
    const controller = new AbortController();
    fetchRoles(controller.signal);
    // Якщо користувачі завантажилися першими, а ролі ще ні,
    // initialLoading не вимкнеться, поки не завантажаться ролі.
    // Якщо ролі вже завантажились (але users ще ні),
    // fetchUsers вимкне initialLoading.
    if (paginatedData.totalCount > 0) {
      setInitialLoading(false);
    }
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Викликаємо лише один раз при монтуванні

  // --- Handlers ---
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
      console.error("Error during deletion:", error);
    } finally {
      closeDeleteModal();
    }
  }, [itemToDelete, reloadData]);

  // --- Modal Configs ---

  const UserServiceProxy = useMemo(
    () => ({
      create: UserService.createUser,
      update: (data: UserUpdateDto) => UserService.updateUser(data),
    }),
    []
  );

  /**
   * Повертає початкові дані для форми редагування/створення.
   * У режимі редагування Admin-користувача, його roleId буде коректно встановлено,
   * використовуючи allRolesForLookup.
   */
  const getUserInitialData = useCallback(
    (entity: UserDto | null): UserUpdateDto | UserCreateDto => {
      // Для РЕДАГУВАННЯ (використовуємо UserUpdateDto)
      if (entity) {
        // 1. Отримуємо назву ролі з DTO (напр., "Admin" або "User")
        const roleName = entity.roles[0];

        // 2. Знаходимо повний об'єкт ролі (з ID) у СПИСКУ ВСІХ РОЛЕЙ (allRolesForLookup)
        const matchingRole = allRolesForLookup.find((r) => r.name === roleName);

        // 3. Використовуємо ID, якщо знайшли
        const roleId = matchingRole ? matchingRole.id : "";

        return {
          id: entity.id,
          username: entity.username,
          password: "", // Завжди порожній для безпеки
          email: entity.email || "",
          roleId: roleId, // 4. Встановлюємо ID ролі (навіть Admin) для форми
        };
      }

      // Для СТВОРЕННЯ (використовуємо UserCreateDto)
      return {
        username: "",
        password: "",
        email: "",
        roleId: "", // Порожнє, щоб RHF вимагав вибір
      };
    },
    [allRolesForLookup] // 5. 'allRolesForLookup' тепер є залежністю
  );

  // Розраховуємо, чи є користувач, що редагується, Admin'ом
  const isEditingAdmin = useMemo(() => {
    return (
      !!entityToEdit &&
      entityToEdit.roles.includes("Admin") &&
      allRolesForLookup.length > 0
    );
  }, [entityToEdit, allRolesForLookup.length]);

  return {
    paginatedData,
    roles, // Повертаємо ролі (ТІЛЬКИ не-Admin) для UserFormFields Select
    isEditingAdmin, // <-- НОВИЙ прапорець
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
    getUserInitialData, // Повертаємо оновлену функцію
  };
};

export default useUsersTableLogic;
