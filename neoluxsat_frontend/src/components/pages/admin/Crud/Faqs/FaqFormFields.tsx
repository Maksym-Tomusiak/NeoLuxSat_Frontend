import React from 'react';
import type { FaqDto, FaqCreateDto } from '@/types/faq';
import type { FaqCategoryDto } from '@/types/faqCategory';

interface FaqFormFieldsProps {
  formData: FaqDto | FaqCreateDto;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  isReadOnly: boolean;
  errors: Record<string, string>;
  faqCategories: FaqCategoryDto[]; // Pass categories as a prop
}

const FaqFormFields: React.FC<FaqFormFieldsProps> = ({
  formData,
  handleChange,
  isReadOnly,
  errors,
  faqCategories,
}) => {
  // Type assertion to access properties safely
  const faqData = formData as FaqDto & FaqCreateDto;

  const disabledBaseClasses =
    'w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:text-gray-600';
  const editableSelectClasses =
    'focus:ring-primaryOrange focus:border-primaryOrange';
  const readOnlySelectClasses =
    'appearance-none pr-10 bg-gray-100 text-gray-600';

  // Helper function for error display
  const err = (k: string) =>
    errors[k] ? <p className="text-xs text-red-600 mt-1">{errors[k]}</p> : null;

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
          name="question"
          type="text"
          value={faqData.question}
          onChange={handleChange}
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
          name="answer"
          value={faqData.answer}
          onChange={handleChange}
          required={!isReadOnly}
          disabled={isReadOnly}
          rows={4}
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
          id="categoryId"
          name="categoryId"
          value={faqData.categoryId}
          onChange={handleChange}
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
