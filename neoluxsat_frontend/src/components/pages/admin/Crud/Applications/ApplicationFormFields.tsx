import React from 'react';
import { useFormContext, type FieldErrors } from 'react-hook-form';
import type {
  ApplicationCreateDto,
  ApplicationUpdateDto,
  ApplicationTypeDto,
  ApplicationStatusDto,
} from '@/types/application';

type ApplicationFormType = ApplicationCreateDto | ApplicationUpdateDto;

type AllApplicationKeys =
  | keyof ApplicationCreateDto
  | keyof ApplicationUpdateDto;

interface ApplicationFormFieldsProps {
  isReadOnly: boolean;
  applicationTypes: ApplicationTypeDto[];
  applicationStatuses: ApplicationStatusDto[];
}

export const ApplicationFormFields: React.FC<ApplicationFormFieldsProps> = ({
  isReadOnly,
  applicationTypes,
  applicationStatuses,
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ApplicationFormType>();

  const rHFerrors = errors as FieldErrors<ApplicationFormType>;

  const isEditing = !!watch('id');

  // Base classes for fields
  const defaultBaseClasses =
    'w-full px-3 py-2 border rounded-lg disabled:bg-gray-100 disabled:text-gray-600';
  // Editable text classes with focus state (Orange)
  const editableTextClasses =
    'focus:outline-none focus:ring-primaryOrange focus:border-primaryOrange';
  // Editable select classes with focus state (Orange) - only used for the select tag
  const editableSelectClasses =
    'focus:ring-primaryOrange focus:border-primaryOrange';
  // Read-only select classes
  const readOnlySelectClasses =
    'appearance-none pr-10 bg-gray-100 text-gray-600';

  const getFieldClasses = (
    fieldName: keyof ApplicationFormType,
    isText: boolean = true
  ) => {
    const hasError = rHFerrors[fieldName];

    if (isReadOnly) {
      return 'border-gray-300';
    }

    if (hasError) {
      const focusClasses = isText ? editableTextClasses : editableSelectClasses;

      return `border-red-500 ${focusClasses}`;
    }

    return `border-gray-300 ${
      isText ? editableTextClasses : editableSelectClasses
    }`;
  };

  // Helper function to render validation errors
  const errorText = (k: AllApplicationKeys) =>
    rHFerrors[k as keyof ApplicationFormType] ? (
      <p className="text-xs text-red-600 mt-1">
        {rHFerrors[k as keyof ApplicationFormType]?.message as string}
      </p>
    ) : null;

  // --- Validation Rules (Unchanged) ---
  const validationRules = {
    fullName: {
      required: "Повне ім'я є обовʼязковим",
      minLength: {
        value: 3,
        message: "Повне ім'я має бути від 3 до 255 символів",
      },
      maxLength: {
        value: 255,
        message: "Повне ім'я має бути від 3 до 255 символів",
      },
    },
    email: {
      minLength: { value: 3, message: 'Email має бути від 3 до 255 символів' },
      maxLength: {
        value: 255,
        message: 'Email має бути від 3 до 255 символів',
      },
      pattern: { value: /^\S+@\S+$/i, message: 'Введіть коректний Email' },
    },
    phone: {
      required: 'Номер телефону є обовʼязковим',
      minLength: { value: 3, message: 'Телефон має бути від 3 до 20 символів' },
      maxLength: {
        value: 20,
        message: 'Телефон має бути від 3 до 20 символів',
      },
    },
    address: {
      required: 'Адреса є обовʼязковою',
      minLength: { value: 3, message: 'Адреса має бути від 3 до 500 символів' },
      maxLength: {
        value: 500,
        message: 'Адреса має бути від 3 до 500 символів',
      },
    },
    typeId: {
      required: 'Оберіть тип заявки',
      validate: (value: string) => value.length > 0 || 'Оберіть тип заявки',
    },
    statusId: {
      required: isEditing ? 'Оберіть статус заявки' : false,
      validate: (value: string) =>
        (isEditing && value.length > 0) ||
        !isEditing ||
        'Оберіть статус заявки',
    },
  };

  return (
    <>
      {/* Full Name Field */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Повне ім'я
        </label>
        <input
          id="fullName"
          type="text"
          {...register('fullName', validationRules.fullName)}
          disabled={isReadOnly}
          className={`${defaultBaseClasses} ${getFieldClasses('fullName')}`}
        />
        {errorText('fullName')}
      </div>
      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email', validationRules.email)}
          disabled={isReadOnly}
          className={`${defaultBaseClasses} ${getFieldClasses('email')}`}
        />
        {errorText('email')}
      </div>
      {/* Address Field */}
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Адреса
        </label>
        <textarea
          id="address"
          rows={3}
          {...register('address', validationRules.address)}
          disabled={isReadOnly}
          className={`${defaultBaseClasses} resize-none ${getFieldClasses(
            'address'
          )}`}
        />
        {errorText('address')}
      </div>
      {/* Phone Field */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Номер телефону
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone', validationRules.phone)}
          disabled={isReadOnly}
          className={`${defaultBaseClasses} ${getFieldClasses('phone')}`}
        />
        {errorText('phone')}
      </div>
      {/* Type ID Field (Select) */}
      <div className="relative">
        <label
          htmlFor="typeId"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Тип заявки
        </label>
        <select
          id="typeId"
          {...register('typeId', validationRules.typeId)}
          disabled={isReadOnly}
          className={`${defaultBaseClasses} ${
            isReadOnly
              ? readOnlySelectClasses
              : getFieldClasses('typeId', false)
          }`}
        >
          <option value="">Оберіть тип заявки</option>
          {applicationTypes.map((t: any) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
        {errorText('typeId')}
      </div>
      {/* Status ID Field (Select) */}
      {isEditing && (
        <div className="relative">
          <label
            htmlFor="statusId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Статус заявки
          </label>
          <select
            id="statusId"
            {...register('statusId' as 'statusId', validationRules.statusId)}
            disabled={isReadOnly}
            className={`${defaultBaseClasses} ${
              isReadOnly
                ? readOnlySelectClasses
                : getFieldClasses(
                    'statusId' as keyof ApplicationFormType,
                    false
                  )
            }`}
          >
            <option value="">Оберіть статус заявки</option>
            {applicationStatuses.map((s: any) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
          {errorText('statusId')}
        </div>
      )}
    </>
  );
};

export const getApplicationInitialData = (
  entity: any | null
): ApplicationCreateDto | ApplicationUpdateDto => {
  return entity
    ? ({
        id: entity.id,
        fullName: entity.fullName,
        email: entity.email,
        address: entity.address,
        phone: entity.phone,
        typeId: entity.typeId,
        statusId: entity.statusId,
      } as ApplicationUpdateDto)
    : ({
        fullName: '',
        email: '',
        address: '',
        phone: '',
        typeId: '',
      } as ApplicationCreateDto);
};

export default ApplicationFormFields;
