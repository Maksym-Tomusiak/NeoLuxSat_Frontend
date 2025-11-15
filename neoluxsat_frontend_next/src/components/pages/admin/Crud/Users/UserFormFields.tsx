// src/components/admin/Crud/Users/UserFormFields.tsx

import React from 'react';
import { useFormContext, type FieldErrors } from 'react-hook-form';
// 1. Імпортуємо RoleDto та оновлені DTO
import type { UserCreateDto, UserUpdateDto } from '@/types/user';
import type { RoleDto } from '@/types/role';

// Type alias для поєднання DTOs
type UserFormType = UserCreateDto | UserUpdateDto;

interface UserFormFieldsProps {
  isReadOnly: boolean;
  roles: RoleDto[]; // 2. Приймаємо ролі як пропс
}

const UserFormFields: React.FC<UserFormFieldsProps> = ({
  isReadOnly,
  roles, // 2. Отримуємо ролі
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<UserFormType>();

  const rHFerrors = errors as FieldErrors<UserFormType>;

  // @ts-ignore - 'id' існує тільки в UserUpdateDto, але це нормально для watch
  const entityId = watch('id');
  const isEditing = !!entityId;

  const passwordPlaceholder = isEditing
    ? 'Залиште порожнім, щоб не змінювати'
    : '';

  // --- Tailwind Class Definitions ---

  // Базові класи для <input>
  const coreInputClasses =
    'w-full px-3 py-2 border rounded-lg disabled:bg-gray-100 disabled:text-gray-600';

  // Базові класи для <select> (трохи відрізняються)
  const coreSelectClasses =
    'w-full px-3 py-2 border rounded-lg disabled:bg-gray-100 disabled:text-gray-600 bg-white';

  // Класи фокусу
  const editableFocusClasses =
    'focus:outline-none focus:ring-primaryOrange focus:border-primaryOrange';

  /**
   * Генерує класи для полів (включаючи <select>)
   */
  const getFieldClasses = (fieldName: keyof UserFormType, isSelect = false) => {
    const hasError = rHFerrors[fieldName];
    const baseClasses = isSelect ? coreSelectClasses : coreInputClasses;

    if (isReadOnly) {
      return `${baseClasses} border-gray-300`;
    }
    if (hasError) {
      return `${baseClasses} border-red-500 ${editableFocusClasses}`;
    }
    return `${baseClasses} border-gray-300 ${editableFocusClasses}`;
  };

  // --- Validation Rules ---
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
  };

  const passwordRules = {
    required: isEditing ? false : 'Пароль є обовʼязковим',
    // Дозволяємо порожнє поле при редагуванні, АЛЕ якщо воно заповнене, валідуємо
    validate: (value: string | null) => {
      if (isEditing && (!value || value.length === 0)) {
        return true; // Дозволено (не змінюємо пароль)
      }
      // Для створення АБО якщо пароль введено при редагуванні
      if (!value || value.length < 5)
        return 'Пароль має бути від 5 до 255 символів';
      if (value.length > 255) return 'Пароль має бути від 5 до 255 символів';
      return true;
    },
  };

  // 3. Нові правила валідації
  const emailRules = {
    // Email не є обов'язковим (згідно DTO `string | null`)
    required: false,
    // Але якщо він введений, він має бути валідним
    validate: (value: string | null) => {
      if (!value || value.length === 0) {
        return true; // Дозволено
      }
      // Проста перевірка email
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(value) || 'Невірний формат email';
    },
  };

  const roleRules = {
    required: 'Роль є обовʼязковою',
  };
  // --- END Validation Rules ---

  const err = (k: keyof UserFormType) =>
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
          disabled={isReadOnly}
          className={getFieldClasses('username')}
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
          className={getFieldClasses('password')}
        />
        {err('password')}
      </div>

      {/* 4. Нове поле Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email (необов'язково)
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email', emailRules)}
          disabled={isReadOnly}
          className={getFieldClasses('email')}
        />
        {err('email')}
      </div>

      {/* 5. Нове поле Role (Select) */}
      <div>
        <label
          htmlFor="roleId"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Роль
        </label>
        <select
          id="roleId"
          {...register('roleId', roleRules)}
          disabled={isReadOnly}
          className={getFieldClasses('roleId', true)}
          defaultValue=""
        >
          <option value="" disabled>
            -- Оберіть роль --
          </option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        {err('roleId')}
      </div>
    </>
  );
};

export default UserFormFields;
