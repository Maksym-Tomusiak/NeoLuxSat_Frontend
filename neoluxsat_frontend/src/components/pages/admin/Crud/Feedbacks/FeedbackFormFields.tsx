// src/components/admin/feedbacks/FeedbacksTable/FeedbackFormFields.tsx

import React from 'react';
import type { FeedbackCreateDto, FeedbackUpdateDto } from '@/types/feedback';

interface FeedbackFormFieldsProps {
  formData: FeedbackUpdateDto | FeedbackCreateDto;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isReadOnly: boolean;
  errors: Record<string, string>;
}

const FeedbackFormFields: React.FC<FeedbackFormFieldsProps> = ({
  formData,
  handleChange,
  isReadOnly,
  errors,
}) => {
  // Type assertion to access properties safely
  const feedbackData = formData as FeedbackUpdateDto & FeedbackCreateDto;

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
          name="author"
          type="text"
          value={feedbackData.author}
          onChange={handleChange}
          required={!isReadOnly}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
        />
        {errors.author && (
          <p className="text-xs text-red-600 mt-1">{errors.author}</p>
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
          name="content"
          value={feedbackData.content}
          onChange={handleChange}
          required={!isReadOnly}
          disabled={isReadOnly}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange resize-none disabled:bg-gray-100 disabled:text-gray-600"
        />
        {errors.content && (
          <p className="text-xs text-red-600 mt-1">{errors.content}</p>
        )}
      </div>
    </>
  );
};

export default FeedbackFormFields;
