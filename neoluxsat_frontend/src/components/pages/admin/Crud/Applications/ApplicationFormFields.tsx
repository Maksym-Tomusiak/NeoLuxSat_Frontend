// src/components/admin/applications/common/ApplicationFormFields.tsx

import React from 'react';
import { useFormContext, type FieldErrors } from 'react-hook-form';
import type {
  ApplicationCreateDto,
  ApplicationUpdateDto,
  ApplicationTypeDto,
  ApplicationStatusDto,
} from '@/types/application';

// We need a common type for the form fields
type ApplicationFormType = ApplicationCreateDto | ApplicationUpdateDto;

// Create a type that represents the union of all keys from both DTOs
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

  const isEditing = !!watch('id'); // Base classes for styling (omitted for brevity)

  const disabledBaseClasses =
    'w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:text-gray-600';
  const editableSelectClasses =
    'focus:ring-primaryOrange focus:border-primaryOrange';
  const readOnlySelectClasses =
    'appearance-none pr-10 bg-gray-100 text-gray-600'; // Helper function to render validation errors // 💡 FIX: Cast the key 'k' to AllApplicationKeys to satisfy the error object access.

  const errorText = (k: AllApplicationKeys) =>
    rHFerrors[k as keyof ApplicationFormType] ? (
      <p className="text-xs text-red-600 mt-1">
        {rHFerrors[k as keyof ApplicationFormType]?.message as string}{' '}
      </p>
    ) : null; // --- RHF Validation Rules ---

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
      required: 'Email є обовʼязковим',
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
      // This rule will only apply if register('statusId', ...) is called
      required: isEditing ? 'Оберіть статус заявки' : false,
      validate: (value: string) =>
        (isEditing && value.length > 0) ||
        !isEditing ||
        'Оберіть статус заявки',
    },
  };

  return (
    <>
      {/* Full Name Field (Unchanged RHF usage) */}{' '}
      <div>
        {' '}
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Повне ім'я
        </label>{' '}
        <input
          id="fullName"
          type="text"
          {...register('fullName', validationRules.fullName)}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
        />
        {errorText('fullName')}{' '}
      </div>{' '}
      {/* ... other fields (email, address, phone, typeId) remain the same ... */}
      {/* Email Field */}{' '}
      <div>
        {' '}
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>{' '}
        <input
          id="email"
          type="email"
          {...register('email', validationRules.email)}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
        />
        {errorText('email')}{' '}
      </div>
      {/* Address Field */}{' '}
      <div>
        {' '}
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Адреса
        </label>{' '}
        <textarea
          id="address"
          rows={3}
          {...register('address', validationRules.address)}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange resize-none disabled:bg-gray-100 disabled:text-gray-600"
        />
        {errorText('address')}{' '}
      </div>
      {/* Phone Field */}{' '}
      <div>
        {' '}
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Номер телефону
        </label>{' '}
        <input
          id="phone"
          type="tel"
          {...register('phone', validationRules.phone)}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
        />
        {errorText('phone')}{' '}
      </div>
      {/* Application Type Field */}{' '}
      <div className="relative">
        {' '}
        <label
          htmlFor="typeId"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Тип заявки
        </label>{' '}
        <select
          id="typeId"
          {...register('typeId', validationRules.typeId)}
          disabled={isReadOnly}
          className={`${disabledBaseClasses} ${
            isReadOnly ? readOnlySelectClasses : editableSelectClasses
          }`}
        >
          <option value="">Оберіть тип заявки</option>{' '}
          {applicationTypes.map((t: any) => (
            <option key={t.id} value={t.id}>
              {t.title}{' '}
            </option>
          ))}{' '}
        </select>
        {errorText('typeId')}{' '}
      </div>
      {/* Status Field (Only visible in Edit/Details mode) */}{' '}
      {isEditing && (
        <div className="relative">
          {' '}
          <label
            htmlFor="statusId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Статус заявки
          </label>{' '}
          <select
            id="statusId" // 💡 FIX: Type assertion here to satisfy TS, since we know 'id' is present
            {...register('statusId' as 'statusId', validationRules.statusId)}
            disabled={isReadOnly}
            className={`${disabledBaseClasses} ${
              isReadOnly ? readOnlySelectClasses : editableSelectClasses
            }`}
          >
            <option value="">Оберіть статус заявки</option>{' '}
            {applicationStatuses.map((s: any) => (
              <option key={s.id} value={s.id}>
                {s.title}{' '}
              </option>
            ))}{' '}
          </select>
          {/* 💡 FIX: Cast the key to the broader union type */}
          {errorText('statusId')}{' '}
        </div>
      )}{' '}
    </>
  );
};

export const getApplicationInitialData = (
  entity: any | null // Use 'any' here to avoid complex union mapping if types differ slightly
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
