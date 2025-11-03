import React, { useEffect, useCallback, Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { useForm, FormProvider, type FieldValues } from 'react-hook-form';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface BaseEntity {
  id: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-2000 font-noto" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-primaryBlue/40" aria-hidden="true" />
        </TransitionChild>

        {/* 💡 CHANGE 1: 
          - Added `overflow-y-auto` to make this the scrolling container.
          - Combined `p-4` and `py-12` into `px-4 py-12`.
        */}
        <div className="fixed inset-0 overflow-y-auto px-4 py-12">
          <div className="flex min-h-full items-center justify-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-full"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-full"
            >
              <DialogPanel
                as="div"
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg pl-3 py-6"
              >
                {/* 💡 CHANGE 2: 
                  - Removed `max-h-[90vh]` and `overflow-y-auto`.
                  - The whole panel now scrolls, not just this inner div.
                */}
                <div className="pr-[10px]">{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

//
// --- EntityFormModalProps (NO CHANGES) ---
//
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

//
// --- EntityFormModal (NO CHANGES) ---
//
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
    reset(memoizedGetInitialData() as any, {
      keepDirty: false,
    });
  }, [memoizedGetInitialData, isOpen, reset, entity, isEditing]);

  const onSubmit = async (data: FormDataType) => {
    if (isReadOnly) return;

    try {
      if (isEditing) {
        await service.update(data as U);
      } else {
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
