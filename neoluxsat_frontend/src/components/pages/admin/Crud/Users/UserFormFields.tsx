// src/components/admin/users/UsersTable/UserFormFields.tsx

import React from 'react';
import { useFormContext, type FieldErrors } from 'react-hook-form';
import type { UserCreateDto, UserUpdateDto } from '@/types/user';

interface UserFormFieldsProps {
  isReadOnly: boolean;
}

const UserFormFields: React.FC<UserFormFieldsProps> = ({ isReadOnly }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<UserCreateDto | UserUpdateDto>();

  const rHFerrors = errors as FieldErrors<UserCreateDto | UserUpdateDto>;

  const entityId = watch('id');
  const isEditing = !!entityId;

  const passwordPlaceholder = isEditing
    ? 'Залиште порожнім, щоб не змінювати'
    : '';

  // Username validation rule logic
  const usernameRules = {
    required: "Ім'я користувача є обовʼязковим",
    minLength: {
      value: 5,
      message: "Ім'я користувача має бути 5-255 символів",
    },
    maxLength: {
      value: 255,
      message: "Ім'я користувача має бути 5-255 символів",
    },
    pattern: {
      value: /^\S+$/,
      message: "Ім'я користувача має бути без пробілів",
    },
    // 🚀 FIX: Explicitly define the function's return type as the RHF expected union.
  };

  // Password validation rule logic (Conditional)
  const passwordRules = {
    required: isEditing ? false : 'Пароль є обовʼязковим',
    minLength: {
      value: 5,
      message: 'Пароль має бути від 5 до 255 символів',
    },
    maxLength: {
      value: 255,
      message: 'Пароль має бути від 5 до 255 символів',
    },
  };

  // Helper function for error display updated for RHF
  const err = (k: keyof (UserCreateDto | UserUpdateDto)) =>
    rHFerrors[k] ? (
      <p className="text-xs text-red-600 mt-1">
        {rHFerrors[k]?.message as string}
      </p>
    ) : null;

  return (
    <>
      {/* Username Field */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Ім'я користувача
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          {...register('username', usernameRules)}
          required={!isReadOnly}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
        />
        {err('username')}
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Пароль
        </label>
        <input
          id="password"
          type="password"
          {...register('password', passwordRules)}
          autoComplete="new-password"
          disabled={isReadOnly}
          placeholder={passwordPlaceholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
        />
        {err('password')}
      </div>
    </>
  );
};

export default UserFormFields;
