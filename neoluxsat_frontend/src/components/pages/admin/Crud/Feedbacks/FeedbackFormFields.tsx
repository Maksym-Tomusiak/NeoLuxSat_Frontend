// src/components/admin/feedbacks/FeedbacksTable/FeedbackFormFields.tsx
import React from 'react';
// 💡 Import useFormContext to access register and formState.errors
import { useFormContext, type FieldErrors } from 'react-hook-form';
import type { FeedbackCreateDto, FeedbackUpdateDto } from '@/types/feedback';

// 🛑 The component signature changes drastically to use RHF context.
// We only need isReadOnly and a type-safe errors object if not using useFormContext.
// Since EntityFormModal uses render props, we'll keep the signature simple and
// expect RHF's context to be set up by EntityFormModal.

// We change the props to be simple, relying on useFormContext
interface FeedbackFormFieldsProps {
  // We'll keep this for type clarity, but the component should use RHF methods
  // formData: FeedbackUpdateDto | FeedbackCreateDto; // 🛑 Removed
  // handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // 🛑 Removed
  isReadOnly: boolean;
  // errors: Record<string, string>; // 🛑 Removed - use RHF formState.errors
}

const FeedbackFormFields: React.FC<FeedbackFormFieldsProps> = ({
  isReadOnly,
}) => {
  // 💡 Use useFormContext to access register and errors
  // Assumes EntityFormModal wraps this component with <FormProvider>
  const {
    register,
    formState: { errors },
  } = useFormContext<FeedbackCreateDto | FeedbackUpdateDto>();

  // Use the error types from RHF
  const rHFerrors = errors as FieldErrors<
    FeedbackCreateDto | FeedbackUpdateDto
  >;

  // RHF Validation Rules
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
          // 💡 Connect with RHF register and add validation rules
          {...register('author', validationRules.author)}
          required={!isReadOnly} // Required attribute is primarily for semantics/browser
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
        />
        {/* 💡 Display error from RHF errors object */}
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
          // 💡 Connect with RHF register and add validation rules
          {...register('content', validationRules.content)}
          required={!isReadOnly}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange resize-none disabled:bg-gray-100 disabled:text-gray-600"
        />
        {/* 💡 Display error from RHF errors object */}
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
