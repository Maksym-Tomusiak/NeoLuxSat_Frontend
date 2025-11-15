"use client";

import LeaveApplicationModal from "@/components/common/LeaveApplicationModal";
import Notification from "@/components/common/Notification";
import React, {
  useState,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from "react";

interface ModalContextValue {
  openModal: (preselectedServiceTitle?: string | null) => void;
  closeModal: () => void;
  // --- ADDED ---
  showNotification: (message: string, type: "success" | "error") => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | null>(
    null
  );
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showNotification = useCallback(
    (message: string, type: "success" | "error") => {
      setNotification({ message, type });
    },
    []
  );

  const openModal = useCallback((preselectedServiceTitle?: string | null) => {
    setPreselectedService(preselectedServiceTitle || null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const value = useMemo(
    // --- UPDATED (added showNotification) ---
    () => ({ openModal, closeModal, showNotification }),
    [openModal, closeModal, showNotification] // <-- Dependency added
  );

  return (
    <ModalContext.Provider value={value}>
      {children}

      <LeaveApplicationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        preselectedServiceTitle={preselectedService}
        onShowNotification={showNotification}
      />
      <Notification
        message={notification?.message || ""}
        type={notification?.type || null}
        onClose={() => setNotification(null)}
      />
    </ModalContext.Provider>
  );
};
