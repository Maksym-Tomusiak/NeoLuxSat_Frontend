// src/components/admin/dashboard/LatestApplicationsTable/useApplicationTableLogic.ts

import { useEffect, useMemo, useState, useCallback } from 'react';
import { ApplicationService } from '@/services/application.service';
import type { ApplicationDto, ApplicationUpdateDto } from '@/types/application';
import { ApplicationTypeService } from '@/services/applicationType.service';
import { ApplicationStatusService } from '@/services/applicationStatus.service';

const useApplicationsTableLogic = () => {
  const [applications, setApplications] = useState<ApplicationDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isReadOnlyModal, setIsReadOnlyModal] = useState(false);
  const [entityToEdit, setEntityToEdit] = useState<ApplicationDto | null>(null);

  const [initialLoading, setInitialLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [applicationTypes, setApplicationTypes] = useState<any[]>([]);
  const [applicationStatuses, setApplicationStatuses] = useState<any[]>([]);

  // --- Data Fetching Effects ---

  const fetchApplications = useCallback(async (limit: number = 4) => {
    try {
      setLoading(true);
      const data: ApplicationDto[] =
        await ApplicationService.getLatestApplications(limit);
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch latest applications:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch, includes cleanup for race conditions/unmount
    const controller = new AbortController();
    ApplicationService.getLatestApplications(4, controller.signal)
      .then(setApplications)
      .catch((error: any) => {
        console.error('Failed to fetch latest applications:', error);
      })
      .finally(() => {
        setLoading(false);
        setInitialLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    ApplicationTypeService.getAllApplicationTypes()
      .then(setApplicationTypes)
      .catch(() => {});
    ApplicationStatusService.getAllApplicationStatuss()
      .then(setApplicationStatuses)
      .catch(() => {});
  }, []);

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
      await ApplicationService.deleteApplicationById(itemToDelete.id);
      fetchApplications();
    } catch (e) {
      console.error('Failed to delete application', e);
    } finally {
      closeDeleteModal();
    }
  };

  const handleDetails = (entity: ApplicationDto) => {
    setEntityToEdit(entity);
    setIsReadOnlyModal(true);
    setIsFormModalOpen(true);
    setOpenMenuId(null);
  };

  const handleEdit = (entity: ApplicationDto) => {
    setEntityToEdit(entity);
    setIsReadOnlyModal(false);
    setIsFormModalOpen(true);
    setOpenMenuId(null);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setEntityToEdit(null);
    setIsReadOnlyModal(false);
  };

  const handleSuccess = () => {
    fetchApplications();
  };

  // --- Service Proxy for EntityFormModal ---

  const ApplicationServiceProxy = useMemo(
    () => ({
      create: ApplicationService.createApplication,
      update: (data: ApplicationUpdateDto) =>
        ApplicationService.updateApplication(data.id, data),
    }),
    []
  );

  return {
    applications,
    loading,
    initialLoading,
    openMenuId,
    isFormModalOpen,
    isReadOnlyModal,
    entityToEdit,
    isDeleteModalOpen,
    itemToDelete,
    applicationTypes,
    applicationStatuses,
    ApplicationServiceProxy,
    formatDate,
    toggleMenu,
    openDeleteModal,
    closeDeleteModal,
    handleDeleteConfirm,
    handleDetails,
    handleEdit,
    closeFormModal,
    handleSuccess,
  };
};

export default useApplicationsTableLogic;
