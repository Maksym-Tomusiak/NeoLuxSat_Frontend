import React from 'react';
// 💡 Import useFormContext and FieldErrors
import { useFormContext, type FieldErrors } from 'react-hook-form';
import type { FaqCreateDto, FaqUpdateDto } from '@/types/faq';
import type { FaqCategoryDto } from '@/types/faqCategory';

interface FaqFormFieldsProps {
  // 🛑 Removed formData, handleChange, errors
  isReadOnly: boolean;
  faqCategories: FaqCategoryDto[];
}

const FaqFormFields: React.FC<FaqFormFieldsProps> = ({
  isReadOnly,
  faqCategories,
}) => {
  // 💡 Use useFormContext to access register and formState.errors
  const {
    register,
    formState: { errors },
  } = useFormContext<FaqCreateDto & FaqUpdateDto>(); // Type assertion for safer error access

  const rHFerrors = errors as FieldErrors<FaqCreateDto & FaqUpdateDto>; // RHF Validation Rules

  const validationRules = {
    question: {
      required: 'Питання є обовʼязковим',
      minLength: {
        value: 3,
        message: 'Питання має бути від 3 до 255 символів',
      },
      maxLength: {
        value: 255,
        message: 'Питання має бути від 3 до 255 символів',
      },
    },
    answer: {
      required: 'Відповідь є обовʼязковою',
      minLength: {
        value: 3,
        message: 'Відповідь має бути від 3 до 10000 символів',
      },
      maxLength: {
        value: 10000,
        message: 'Відповідь має бути від 3 до 10000 символів',
      },
    },
    categoryId: {
      required: 'Оберіть категорію',
      validate: (value: string) =>
        (value && value.length > 0) || 'Оберіть категорію',
    },
  };

  const disabledBaseClasses =
    'w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:text-gray-600';
  const editableSelectClasses =
    'focus:ring-primaryOrange focus:border-primaryOrange';
  const readOnlySelectClasses =
    'appearance-none pr-10 bg-gray-100 text-gray-600'; // Helper function for error display updated for RHF

  const err = (k: keyof (FaqCreateDto & FaqUpdateDto)) =>
    rHFerrors[k] ? (
      <p className="text-xs text-red-600 mt-1">
        {rHFerrors[k]?.message as string}
      </p>
    ) : null;

  return (
    <>
      {/* Question Field */}
      <div>
        <label
          htmlFor="question"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Питання
        </label>

        <input
          id="question"
          type="text" // 💡 Use RHF register
          {...register('question', validationRules.question)}
          required={!isReadOnly}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
        />
        {err('question')}
      </div>
      {/* Answer Field */}
      <div>
        <label
          htmlFor="answer"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Відповідь
        </label>

        <textarea
          id="answer"
          rows={4} // 💡 Use RHF register
          {...register('answer', validationRules.answer)}
          required={!isReadOnly}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange resize-none disabled:bg-gray-100 disabled:text-gray-600"
        />
        {err('answer')}
      </div>
      {/* Category Field */}
      <div className="relative">
        <label
          htmlFor="categoryId"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Категорія
        </label>

        <select
          id="categoryId" // 💡 Use RHF register
          {...register('categoryId', validationRules.categoryId)}
          required={!isReadOnly}
          disabled={isReadOnly}
          className={`
     ${disabledBaseClasses}
     ${isReadOnly ? readOnlySelectClasses : editableSelectClasses}
    `}
        >
          <option value="">Оберіть категорію</option>
          {faqCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        {err('categoryId')}
      </div>
    </>
  );
};

export default FaqFormFields;
