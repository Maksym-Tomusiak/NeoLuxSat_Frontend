import React from 'react';

// Assuming you have a basic Modal/Dialog component available (like from shadcn or custom)
// If not, you'll need to create a simple modal base with an overlay.
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Placeholder for a simple Modal structure (adjust based on your actual library)
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
      onClick={onClose} // Close on backdrop click
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()} // Prevent modal content from closing the modal
      >
        {children}
      </div>
    </div>
  );
};

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string; // e.g., "feedback from John Doe" or "Feedback ID 123"
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-bold text-red-600">
          Підтвердження видалення
        </h3>

        <p className="text-gray-700">
          Ви впевнені, що хочете видалити цей елемент:
          <span className="font-semibold text-primaryBlue ml-1">
            {itemName}
          </span>
          ?
        </p>

        <p className="text-sm text-gray-500">Ця дія є незворотною.</p>

        <div className="flex justify-end gap-3 mt-4">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Скасувати
          </button>

          {/* Confirm Delete Button */}
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Видалити
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
