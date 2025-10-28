import React, { useEffect, useCallback } from 'react';
// Correct import: FieldValues is sufficient.
import { useForm, FormProvider, type FieldValues } from 'react-hook-form';

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
      className="fixed inset-0 z-2000 flex items-center justify-center bg-black/20 p-4 font-noto" // Added padding for smaller screens
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg 
                   pl-6 py-6" // Apply padding: Left/Top/Bottom=p-6 (1.5rem), Right=p-6 MINUS 10px
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pr-[10px] max-h-[90vh] overflow-y-auto ">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- EntityFormModalProps (Generics remain the same) ---
interface EntityFormModalProps<
  T extends BaseEntity,
  C extends FieldValues,
  U extends BaseEntity & FieldValues
> {
  isOpen: boolean;
  onClose: () => void;
  entity: T | null;
  title: string;
  isReadOnly?: boolean;

  service: {
    create: (data: C) => Promise<any>;
    update: (data: U) => Promise<any>;
  };
  onSuccess: () => void;

  getInitialData: (entity: T | null) => C | U;

  formFields: (isReadOnly: boolean) => React.ReactNode;
}

const EntityFormModal = <
  T extends BaseEntity,
  C extends FieldValues,
  U extends BaseEntity & FieldValues
>({
  isOpen,
  onClose,
  entity,
  title,
  service,
  onSuccess,
  getInitialData,
  formFields,
  isReadOnly = false,
}: EntityFormModalProps<T, C, U>) => {
  const isEditing = !!entity && !isReadOnly;
  type FormDataType = C | U;

  const methods = useForm<FormDataType>({
    // 🚀 FINAL FIX: Use a simple assertion to FieldValues, bypassing the union type complexity.
    defaultValues: getInitialData(entity) as any,
    mode: 'onChange',
    disabled: isReadOnly,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const memoizedGetInitialData = useCallback(
    () => getInitialData(entity),
    [entity, getInitialData]
  );

  useEffect(() => {
    // Similarly, use FieldValues for reset, which is usually safer than 'any'.
    reset(memoizedGetInitialData() as any, {
      keepDirty: false,
    });
  }, [memoizedGetInitialData, isOpen, reset, entity, isEditing]);

  const onSubmit = async (data: FormDataType) => {
    if (isReadOnly) return;

    try {
      if (isEditing) {
        // Assertion back to U for service call
        await service.update(data as U);
      } else {
        // Assertion back to C for service call
        await service.create(data as C);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const modalTitle = isReadOnly
    ? `Деталі ${title}`
    : isEditing
    ? `Редагувати ${title}`
    : `Додати новий ${title}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-2xl font-bold text-primaryBlue mb-4">{modalTitle}</h3>

      <FormProvider {...methods}>
        <form
          // Assertion to 'any' here is standard when dealing with complex generics in handleSubmit
          onSubmit={handleSubmit(onSubmit as any)}
          className="flex flex-col gap-4"
        >
          {formFields(isReadOnly)}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors cursor-pointer"
              disabled={isSubmitting}
            >
              Закрити
            </button>

            {!isReadOnly && (
              <button
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
                className="px-4 py-2 h-10 border border-primaryOrange border-[2px] text-[14px]/[120%] font-noto font-normal text-primaryWhite cursor-pointer bg-primaryOrange rounded-full hover:bg-primaryWhite hover:text-primaryBlue transition-colors disabled:bg-gray-400"
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
      </FormProvider>
    </Modal>
  );
};

export default EntityFormModal;
