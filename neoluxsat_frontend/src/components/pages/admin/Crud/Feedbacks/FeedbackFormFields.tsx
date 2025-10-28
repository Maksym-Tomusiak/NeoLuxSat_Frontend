import React from 'react';
import { useFormContext, type FieldErrors } from 'react-hook-form';
import type { FeedbackCreateDto, FeedbackUpdateDto } from '@/types/feedback';

// Type alias for combining DTOs
type FeedbackFormType = FeedbackCreateDto | FeedbackUpdateDto;

interface FeedbackFormFieldsProps {
  isReadOnly: boolean;
}

const FeedbackFormFields: React.FC<FeedbackFormFieldsProps> = ({
  isReadOnly,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FeedbackFormType>();

  const rHFerrors = errors as FieldErrors<FeedbackFormType>;

  // --- Tailwind Class Definitions ---

  // Base classes (without specific border color or focus/ring)
  const defaultBaseClasses =
    'w-full px-3 py-2 border rounded-lg disabled:bg-gray-100 disabled:text-gray-600';

  // Editable classes with orange focus (includes focus:outline-none)
  const editableFocusClasses =
    'focus:outline-none focus:ring-primaryOrange focus:border-primaryOrange';

  // --- New Dynamic Class Helper ---

  /**
   * Generates classes to handle error state (red border when unfocused)
   * and prioritize selected state (orange border when focused).
   */
  const getFieldClasses = (
    fieldName: keyof FeedbackFormType,
    isTextarea: boolean = false
  ) => {
    const hasError = rHFerrors[fieldName];

    if (isReadOnly) {
      // Read-only fields get the default gray border
      return 'border-gray-300';
    }

    if (hasError) {
      // If there's an error: Set unfocused border to red, but keep orange focus handlers.
      // Orange focus will override the red border when the element is active.
      let classes = `border-red-500 ${editableFocusClasses}`;
      if (isTextarea) classes += ' resize-none';
      return classes;
    }

    // No error: Set unfocused border to gray-300, and apply orange focus handlers.
    let classes = `border-gray-300 ${editableFocusClasses}`;
    if (isTextarea) classes += ' resize-none';
    return classes;
  };

  // RHF Validation Rules (Unchanged)
  const validationRules = {
    author: {
      required: 'Автор є обовʼязковим',
      minLength: {
        value: 3,
        message: 'Автор має бути від 3 до 255 символів',
      },
      maxLength: {
        value: 255,
        message: 'Автор має бути від 3 до 255 символів',
      },
    },
    content: {
      required: 'Зміст є обовʼязковим',
      minLength: {
        value: 3,
        message: 'Зміст має бути від 3 до 10000 символів',
      },
      maxLength: {
        value: 10000,
        message: 'Зміст має бути від 3 до 10000 символів',
      },
    },
  };

  return (
    <>
      {/* Author Field */}
      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Автор
        </label>

        <input
          id="author"
          type="text"
          {...register('author', validationRules.author)}
          disabled={isReadOnly}
          // ✅ Applied dynamic classes
          className={`${defaultBaseClasses} ${getFieldClasses('author')}`}
        />
        {rHFerrors.author && (
          <p className="text-xs text-red-600 mt-1">
            {rHFerrors.author.message}
          </p>
        )}
      </div>
      {/* Content Field */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Зміст
        </label>

        <textarea
          id="content"
          rows={4}
          {...register('content', validationRules.content)}
          disabled={isReadOnly}
          // ✅ Applied dynamic classes (isTextarea = true)
          className={`${defaultBaseClasses} ${getFieldClasses(
            'content',
            true
          )}`}
        />
        {rHFerrors.content && (
          <p className="text-xs text-red-600 mt-1">
            {rHFerrors.content.message}
          </p>
        )}
      </div>
    </>
  );
};

export default FeedbackFormFields;
