import React from "react";
import { useFormContext, type FieldErrors } from "react-hook-form";
import type { FaqCreateDto, FaqUpdateDto } from "@/types/faq";
import type { FaqCategoryDto } from "@/types/faqCategory";

// Type alias for combining DTOs
type FaqFormType = FaqCreateDto & FaqUpdateDto;

interface FaqFormFieldsProps {
  isReadOnly: boolean;
  faqCategories: FaqCategoryDto[];
}

const FaqFormFields: React.FC<FaqFormFieldsProps> = ({
  isReadOnly,
  faqCategories,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FaqFormType>();

  const rHFerrors = errors as FieldErrors<FaqFormType>;

  // --- Tailwind Class Definitions ---

  // Base classes (without border color or focus/ring)
  const defaultBaseClasses =
    "w-full px-3 py-2 border rounded-lg disabled:bg-gray-100 disabled:text-gray-600";

  // Editable classes with orange focus (includes focus:outline-none)
  const editableFocusClasses =
    "focus:outline-none focus:ring-primaryOrange focus:border-primaryOrange";

  const readOnlySelectClasses =
    "appearance-none pr-10 bg-gray-100 text-gray-600";

  // --- New Dynamic Class Helper ---

  /**
   * Generates classes to handle error state (red border when unfocused)
   * and prioritize selected state (orange border when focused).
   */
  const getFieldClasses = (
    fieldName: keyof FaqFormType,
    isTextarea: boolean = false
  ) => {
    const hasError = rHFerrors[fieldName];

    if (isReadOnly) {
      return "border-gray-300";
    }

    if (hasError) {
      // If there's an error: Set unfocused border to red, but keep orange focus handlers.
      // The `editableFocusClasses` will override the base red border when the element is focused.
      return `border-red-500 ${editableFocusClasses}`;
    }

    // No error: Set unfocused border to gray-300, and apply orange focus handlers.
    let baseClasses = "border-gray-300";

    // Add resize-none for textarea if necessary (since it was removed from defaultBaseClasses)
    if (isTextarea) {
      baseClasses += " resize-none";
    }

    return `${baseClasses} ${editableFocusClasses}`;
  };

  // RHF Validation Rules (Unchanged)
  const validationRules = {
    question: {
      required: "Питання є обовʼязковим",
      minLength: {
        value: 3,
        message: "Питання має бути від 3 до 255 символів",
      },
      maxLength: {
        value: 255,
        message: "Питання має бути від 3 до 255 символів",
      },
    },
    answer: {
      required: "Відповідь є обовʼязковою",
      minLength: {
        value: 3,
        message: "Відповідь має бути від 3 до 10000 символів",
      },
      maxLength: {
        value: 10000,
        message: "Відповідь має бути від 3 до 10000 символів",
      },
    },
    categoryId: {
      required: "Оберіть категорію",
      validate: (value: string) =>
        (value && value.length > 0) || "Оберіть категорію",
    },
  };

  const err = (k: keyof FaqFormType) =>
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
          type="text"
          {...register("question", validationRules.question)}
          disabled={isReadOnly}
          // ✅ Applied dynamic classes
          className={`${defaultBaseClasses} ${getFieldClasses("question")}`}
        />
        {err("question")}
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
          rows={4}
          {...register("answer", validationRules.answer)}
          disabled={isReadOnly}
          // ✅ Applied dynamic classes (using isTextarea = true)
          className={`${defaultBaseClasses} ${getFieldClasses("answer", true)}`}
        />
        {err("answer")}
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
          {...register("categoryId", validationRules.categoryId)}
          disabled={isReadOnly}
          className={`
            ${defaultBaseClasses}
            ${
              isReadOnly ? readOnlySelectClasses : getFieldClasses("categoryId")
            }
          `}
        >
          <option value="">Оберіть категорію</option>
          {faqCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        {err("categoryId")}
      </div>
    </>
  );
};

export default FaqFormFields;
