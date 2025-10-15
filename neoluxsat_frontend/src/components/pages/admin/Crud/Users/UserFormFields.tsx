// src/components/admin/users/UsersTable/UserFormFields.tsx

import React from 'react';
import type { UserCreateDto, UserUpdateDto } from '@/types/user';

interface UserFormFieldsProps {
  formData: UserUpdateDto | UserCreateDto;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isReadOnly: boolean;
  errors: Record<string, string>;
}

const UserFormFields: React.FC<UserFormFieldsProps> = ({
  formData,
  handleChange,
  isReadOnly,
  errors,
}) => {
  // Type assertion to access properties safely
  const userData = formData as UserUpdateDto & UserCreateDto;

  // Helper function for error display
  const err = (k: string) =>
    errors[k] ? <p className="text-xs text-red-600 mt-1">{errors[k]}</p> : null;

  // Check if we are in "Edit" mode (i.e., the entity has an ID)
  const isEditing = !!userData.id;
  const passwordPlaceholder = isEditing
    ? 'Залиште порожнім, щоб не змінювати'
    : '';
  const isPasswordRequired = !isEditing;

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
          name="username"
          type="text"
          value={userData.username}
          onChange={handleChange}
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
          name="password"
          type="password"
          value={userData.password || ''}
          onChange={handleChange}
          required={isPasswordRequired && !isReadOnly} // Required only on create (and not read-only)
          autoComplete="new-password" // Suggests browser uses a new password
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
