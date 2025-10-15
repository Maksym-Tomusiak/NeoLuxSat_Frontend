import React, { useState, useEffect, type FormEvent, useCallback } from 'react';

// Placeholder for the simple Modal structure (unchanged)
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface BaseEntity {
  id: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-2000 flex items-center justify-center bg-black/20 font-noto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// --- EntityFormModalProps updated with isReadOnly ---

interface EntityFormModalProps<T extends BaseEntity, C, U extends BaseEntity> {
  isOpen: boolean;
  onClose: () => void;
  entity: T | null; // Null for Add, T for Edit/Details
  title: string;

  // NEW: Flag for read-only mode (Details view)
  isReadOnly?: boolean;

  service: {
    create: (data: C) => Promise<any>;
    update: (data: U) => Promise<any>;
  };
  onSuccess: () => void;

  // Initial data is typically T or C, but for details view we need T's data.
  // We will use T for the entity prop in Details mode.
  getInitialData: (entity: T | null) => C | U;

  // The change handler passed to formFields is a no-op when read-only
  formFields: (
    formData: C | U,
    handleChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => void,
    isReadOnly: boolean, // Pass readOnly state to the form field renderer
    errors: Record<string, string>
  ) => React.ReactNode;

  // Optional validator; return an object mapping fieldName -> error message
  validate?: (
    data: C | U,
    isEditing: boolean | undefined
  ) => Record<string, string>;
}

const EntityFormModal = <T extends BaseEntity, C, U extends BaseEntity>({
  isOpen,
  onClose,
  entity,
  title,
  service,
  onSuccess,
  getInitialData,
  formFields,
  isReadOnly = false, // Default to false (editable)
  validate,
}: EntityFormModalProps<T, C, U>) => {
  const isEditing = !!entity && !isReadOnly;

  // When in read-only mode, we still need initial data, so we base state on entity
  const [formData, setFormData] = useState<C | U>(() => getInitialData(entity));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const memoizedGetInitialData = useCallback(
    () => getInitialData(entity),
    [entity, getInitialData]
  );

  useEffect(() => {
    setFormData(memoizedGetInitialData());
  }, [memoizedGetInitialData, isOpen]);

  // Use a no-op handler for read-only mode, or the real handler otherwise
  const handleChange = isReadOnly
    ? () => {}
    : (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
        setFormData(
          (prev) =>
            ({
              ...prev,
              [e.target.name]: e.target.value,
            } as C | U)
        );
        if (validate) {
          const next = {
            ...(formData as any),
            [e.target.name]: e.target.value,
          } as C | U;
          const v = validate(next, isEditing);
          setErrors(v);
        }
      };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return; // Prevent submission in details mode

    if (validate) {
      const v = validate(formData, isEditing);
      setErrors(v);
      if (Object.keys(v).length > 0) {
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (isEditing) {
        await service.update(formData as U);
      } else {
        await service.create(formData as C);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalTitle = isReadOnly
    ? `Деталі` // New title for read-only mode
    : isEditing
    ? `Редагувати ${title}`
    : `Додати новий ${title}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-2xl font-bold text-primaryBlue mb-4">{modalTitle}</h3>

      {/* Pass the appropriate handleChange and isReadOnly flag to the render prop */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {formFields(formData, handleChange, isReadOnly, errors)}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors cursor-pointer"
            disabled={isSubmitting}
          >
            Закрити
          </button>

          {/* Only render the submit button if NOT in read-only mode */}
          {!isReadOnly && (
            <button
              type="submit"
              className="px-4 py-2 h-10 border border-primaryOrange border-[2px] text-[14px]/[120%] font-noto font-normal text-primaryWhite cursor-pointer bg-primaryOrange rounded-full hover:bg-primaryWhite hover:text-primaryBlue transition-colors disabled:bg-gray-400"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Збереження...'
                : isEditing
                ? 'Зберегти зміни'
                : 'Додати'}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default EntityFormModal;
