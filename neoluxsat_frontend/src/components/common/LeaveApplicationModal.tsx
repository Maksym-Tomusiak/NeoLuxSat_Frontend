import React, {
  useState,
  useEffect,
  useCallback,
  Fragment, // 1. Import Fragment
} from 'react';
// 2. Import Dialog and Transition
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { ApplicationService } from '@/services/application.service';
import { ApplicationTypeService } from '@/services/applicationType.service';
import type {
  ApplicationCreateDto,
  ApplicationTypeDto,
} from '@/types/application';
import CloseIcon from '@/assets/svgs/close-icon.svg';
import EmailIcon from '@/assets/svgs/contacts/email-icon.svg';
import UserIcon from '@/assets/svgs/contacts/pib-icon.svg';
import PhoneIcon from '@/assets/svgs/contacts/phone-icon.svg';
import AddressIcon from '@/assets/svgs/contacts/address-icon.svg';
import DropdownIcon from '@/assets/svgs/dropdown-icon.svg';

// ... (type ApplicationFormData remains the same)
type ApplicationFormData = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  typeId: string;
};

// ... (interface LeaveApplicationModalProps remains the same)
interface LeaveApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceTitle?: string | null;
  onShowNotification: (message: string, type: 'success' | 'error') => void;
}

const LeaveApplicationModal: React.FC<LeaveApplicationModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceTitle,
  onShowNotification,
}) => {
  const [applicationTypes, setApplicationTypes] = useState<
    ApplicationTypeDto[]
  >([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const methods = useForm<ApplicationFormData>({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      address: '',
      typeId: '',
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  // ... (Styling helpers getFieldClasses and coreInputClasses remain the same)
  const coreInputClasses =
    'w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border text-primaryBlue/40 placeholder-gray-400 focus:outline-none ';
  const focusClasses =
    'focus:ring-2 focus:ring-primaryOrange focus:border-primaryOrange'; // Orange focus
  const errorClasses = 'border-red-500'; // Red border for error
  const defaultBorderClass = 'border-gray-300';
  const getFieldClasses = (fieldName: keyof ApplicationFormData) => {
    const hasError = errors[fieldName];
    let dynamicClasses = '';
    if (hasError) {
      dynamicClasses = `${errorClasses} ${focusClasses}`;
    } else {
      dynamicClasses = `${defaultBorderClass} ${focusClasses}`;
    }
    return dynamicClasses;
  };

  // ... (getServiceByTitle hook remains the same)
  const getServiceByTitle = useCallback((title: string) => {
    const services = {
      internet: 'Підключення інтернету',
      security: 'Системи безпеки',
      tv: 'Налаштування телебачення',
      consult: 'Консультування',
      iot: 'IoT та M2M',
    };
    return services[title.toLowerCase() as keyof typeof services];
  }, []);

  // ... (All useEffect hooks remain the same)
  useEffect(() => {
    if (isOpen && applicationTypes.length === 0) {
      setIsLoadingTypes(true);
      setFetchError(null);
      const controller = new AbortController();
      ApplicationTypeService.getAllApplicationTypes(controller.signal)
        .then((data) => {
          setApplicationTypes(data);
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            setFetchError('Не вдалося завантажити типи послуг.');
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setIsLoadingTypes(false);
          }
        });
      return () => controller.abort();
    }
  }, [isOpen, applicationTypes.length]);

  useEffect(() => {
    if (isOpen && applicationTypes.length > 0) {
      let foundTypeId = '';
      if (preselectedServiceTitle) {
        const foundType = applicationTypes.find((type) =>
          type.title.includes(getServiceByTitle(preselectedServiceTitle))
        );
        if (foundType) {
          foundTypeId = foundType.id;
        }
      }
      setValue('typeId', foundTypeId, { shouldValidate: true });
    }
  }, [
    isOpen,
    preselectedServiceTitle,
    applicationTypes,
    setValue,
    getServiceByTitle,
  ]);

  useEffect(() => {
    if (!isOpen) {
      reset({ fullName: '', phone: '', email: '', address: '', typeId: '' });
      setFetchError(null);
    }
  }, [isOpen, reset]);

  // 4. Remove the manual handleClose function
  // const handleClose = useCallback(() => { ... }, [onClose]);

  // Handle form submission
  const onSubmit = async (data: ApplicationFormData) => {
    setFetchError(null);
    const createDto: ApplicationCreateDto = {
      fullName: data.fullName,
      email: data.email,
      address: data.address,
      phone: data.phone,
      typeId: data.typeId,
    };
    try {
      await ApplicationService.createApplication(createDto);
      onShowNotification('Заявку успішно відправлено!', 'success');
      // 5. Call onClose directly
      onClose();
    } catch (error) {
      console.error('Failed to submit application:', error);
      onShowNotification(
        'Не вдалося відправити заявку. Спробуйте ще раз за кілька хвилин.',
        'error'
      );
    }
  };

  // 6. Remove the manual render null check
  // if (!isOpen && !isClosing) return null;

  // 7. Replace the entire return with the Headless UI structure
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-2000 font-noto" onClose={onClose}>
        {/* Backdrop Animation */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 leave-application-modal-backdrop"
            aria-hidden="true"
          />
        </TransitionChild>

        {/* Panel Container */}
        <div className="fixed inset-0 p-[24px]">
          <div className="flex min-h-full items-center justify-center">
            {/* Panel Animation (Slide + Fade) */}
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
                className="bg-primaryOrange rounded-xl shadow-2xl w-full max-w-[656px] relative" // 'relative' is for the close button
              >
                <FormProvider {...methods}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-[24px] max-h-[90vh] overflow-y-auto relative mr-[10px]"
                  >
                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={onClose} // Use onClose directly
                      className="absolute top-[16px] xs:top-[24px] md:top-[30px] right-[16px] xs:right-[24px] hover:text-gray-200 p-1 fill-primaryWhite/80 hover:fill-primaryWhite transition-colors cursor-pointer"
                      aria-label="Закрити"
                    >
                      <CloseIcon />
                    </button>

                    {/* Header Text */}
                    <div className="text-primaryWhite font-noto flex flex-col gap-[16px] mb-[40px] md:mb-[56px]">
                      <h2 className="text-[24px]/[120%] font-medium tracking-[-0.48px] max-w-[90%]">
                        Ваш перший крок до швидкого підключення
                      </h2>
                      <p className="text-primaryWhite/80 text-[16px]/[120%] tracking-[-0.32px]">
                        Залиште заявку на обрану послугу та очікуйте зворотного
                        зв'язку
                      </p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="fullName"
                          className="text-sm font-medium text-primaryWhite mb-1 block ml-2"
                        >
                          ПІБ
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-[calc(50%-2px)] transform -translate-y-1/2 h-5 w-5 fill-primaryBlue/40 pointer-events-none">
                            <UserIcon />
                          </div>
                          <input
                            id="fullName"
                            type="text"
                            {...register('fullName', {
                              required: "ПІБ є обов'язковим",
                            })}
                            placeholder="Шевченко Іван Олександрович"
                            className={`${coreInputClasses} ${getFieldClasses(
                              'fullName'
                            )}`}
                          />
                        </div>
                        {errors.fullName && (
                          <p className="text-xs text-red-700 font-medium mt-1 ml-2">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      {/* Phone & Email (Grid) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Phone */}
                        <div>
                          <label
                            htmlFor="phone"
                            className="text-sm font-medium text-primaryWhite mb-1 block ml-2"
                          >
                            Номер телефону
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-[calc(50%-2px)] transform -translate-y-1/2 h-5 w-5 fill-primaryBlue/40 pointer-events-none">
                              <PhoneIcon />
                            </div>
                            <input
                              id="phone"
                              type="tel"
                              {...register('phone', {
                                required: "Номер телефону є обов'язковим",
                                pattern: {
                                  value: /^\+?[\d\s()-]{10,20}$/,
                                  message: 'Некоректний формат',
                                },
                              })}
                              placeholder="+380XXXXXXXXX"
                              className={`${coreInputClasses} ${getFieldClasses(
                                'phone'
                              )}`}
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-xs text-red-700 font-medium mt-1 ml-2">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                        {/* Email */}
                        <div>
                          <label
                            htmlFor="email"
                            className="text-sm font-medium text-primaryWhite mb-1 block ml-2"
                          >
                            Пошта
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-[calc(50%-2px)] transform -translate-y-1/2 h-5 w-5 fill-primaryBlue/40 pointer-events-none">
                              <EmailIcon />
                            </div>
                            <input
                              id="email"
                              type="email"
                              {...register('email', {
                                required: "Пошта є обов'язковою",
                                pattern: {
                                  value: /^\S+@\S+$/i,
                                  message: 'Некоректний формат',
                                },
                              })}
                              placeholder="example@gmail.com"
                              className={`${coreInputClasses} ${getFieldClasses(
                                'email'
                              )}`}
                            />
                          </div>
                          {errors.email && (
                            <p className="text-xs text-red-700 font-medium mt-1 ml-2">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <label
                          htmlFor="address"
                          className="text-sm font-medium text-primaryWhite mb-1 block ml-2"
                        >
                          Адреса
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-3 fill-primaryBlue/40 pointer-events-none">
                            <AddressIcon />
                          </div>
                          <input
                            id="address"
                            {...register('address', {
                              required: "Адреса є обов'язковою",
                            })}
                            placeholder="вулиця Шевченка, будинок 10, квартира 20, місто Київ"
                            className={`${coreInputClasses} ${getFieldClasses(
                              'address'
                            )} resize-none pt-2.5`}
                          />
                        </div>
                        {errors.address && (
                          <p className="text-xs text-red-700 font-medium mt-1 ml-2">
                            {errors.address.message}
                          </p>
                        )}
                      </div>

                      {/* Service Select */}
                      <div className="mb-[40px] md:mb-[56px]">
                        <label
                          htmlFor="typeId"
                          className="text-sm font-medium text-primaryWhite mb-1 block ml-2"
                        >
                          Послуга
                        </label>
                        <div className="relative">
                          <Controller
                            name="typeId"
                            control={control}
                            rules={{
                              required: 'Будь ласка, оберіть послугу',
                            }}
                            render={({ field }) => (
                              <select
                                id="typeId"
                                {...field}
                                className={`w-full pl-4 pr-10 py-2.5 rounded-lg bg-white border appearance-none text-primaryBlue/40 focus:outline-none ${getFieldClasses(
                                  'typeId'
                                )}`}
                                disabled={isLoadingTypes}
                              >
                                <option value="" disabled>
                                  {isLoadingTypes
                                    ? 'Завантаження...'
                                    : 'Оберіть послугу...'}
                                </option>
                                {applicationTypes.map((type) => (
                                  <option key={type.id} value={type.id}>
                                    {type.title}
                                  </option>
                                ))}
                              </select>
                            )}
                          />
                          <div className="absolute right-3 top-[calc(50%-2px)] transform -translate-y-1/2 h-5 w-5 fill-primaryBlue/40 pointer-events-none">
                            <DropdownIcon />
                          </div>
                        </div>
                        {errors.typeId && (
                          <p className="text-xs text-red-700 font-medium mt-1 ml-2">
                            {errors.typeId.message}
                          </p>
                        )}
                        {fetchError &&
                          !isLoadingTypes &&
                          applicationTypes.length === 0 && (
                            <p className="text-xs text-red-700 font-medium mt-1 ml-2">
                              {fetchError}
                            </p>
                          )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting || isLoadingTypes}
                        className="w-full bg-primaryBlue text-primaryWhite py-3 px-6 rounded-lg font-semibold border-primaryBlue border-[2px] hover:bg-primaryOrange transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmitting ? 'Відправка...' : 'Залишити заявку'}
                      </button>
                    </div>
                  </form>
                </FormProvider>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LeaveApplicationModal;
