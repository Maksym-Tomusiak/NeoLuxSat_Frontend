import React from 'react';
import { useFormContext, type FieldErrors } from 'react-hook-form';
import type { UserCreateDto, UserUpdateDto } from '@/types/user';

// Type alias for combining DTOs
type UserFormType = UserCreateDto | UserUpdateDto;

interface UserFormFieldsProps {
  isReadOnly: boolean;
}

const UserFormFields: React.FC<UserFormFieldsProps> = ({ isReadOnly }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<UserFormType>();

  const rHFerrors = errors as FieldErrors<UserFormType>;

  const entityId = watch('id');
  const isEditing = !!entityId;

  const passwordPlaceholder = isEditing
    ? 'Залиште порожнім, щоб не змінювати'
    : '';

  // --- Tailwind Class Definitions ---

  // Base classes (w/o border color, w/o focus/ring)
  const coreBaseClasses =
    'w-full px-3 py-2 border rounded-lg disabled:bg-gray-100 disabled:text-gray-600';

  // Editable classes with orange focus (includes focus:outline-none)
  const editableFocusClasses =
    'focus:outline-none focus:ring-primaryOrange focus:border-primaryOrange';

  // --- New Dynamic Class Helper ---

  /**
   * Generates classes to handle error state (red border when unfocused)
   * and prioritize selected state (orange border when focused).
   */
  const getFieldClasses = (fieldName: keyof UserFormType) => {
    const hasError = rHFerrors[fieldName];

    if (isReadOnly) {
      // Read-only fields get the default gray border
      return 'border-gray-300';
    }

    if (hasError) {
      // If error: Set unfocused border to red, but keep orange focus handlers.
      // Orange focus will override the red border when the element is active.
      return `border-red-500 ${editableFocusClasses}`;
    }

    // No error: Set unfocused border to gray-300, and apply orange focus handlers.
    return `border-gray-300 ${editableFocusClasses}`;
  };

  // --- Validation Rules (Unchanged) ---
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
    minLength: {
      value: 5,
      message: 'Пароль має бути від 5 до 255 символів',
    },
    maxLength: {
      value: 255,
      message: 'Пароль має бути від 5 до 255 символів',
    },
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
          // ✅ Applied dynamic classes
          className={`${coreBaseClasses} ${getFieldClasses('username')}`}
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
          // ✅ Applied dynamic classes
          className={`${coreBaseClasses} ${getFieldClasses('password')}`}
        />
        {err('password')}
      </div>
    </>
  );
};

export default UserFormFields;
