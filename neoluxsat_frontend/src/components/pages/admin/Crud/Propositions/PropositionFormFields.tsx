// src/components/admin/Crud/Propositions/PropositionFormFields.tsx
import React, { useState, useEffect } from 'react';
import { useFormContext, type FieldErrors, Controller } from 'react-hook-form';
import type {
  PropositionCreateDto,
  PropositionUpdateDto,
} from '@/types/proposition';
// Import the new Dropzone components
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/common/admin/dropzone'; // Adjust path as needed
import { cn } from '@/lib/utils';
import { UploadIcon } from 'lucide-react'; // Import icon for custom empty state

// Type alias
type PropositionFormType = PropositionCreateDto | PropositionUpdateDto;

interface PropositionFormFieldsProps {
  isReadOnly: boolean;
  currentImageUrl?: string | null;
}

const PropositionFormFields: React.FC<PropositionFormFieldsProps> = ({
  isReadOnly,
  currentImageUrl,
}) => {
  const {
    register,
    control,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<PropositionFormType>();

  const rHFerrors = errors as FieldErrors<PropositionFormType>;
  const [imagePreview, setImagePreview] = useState<string | null>(
    currentImageUrl ?? null
  );
  const selectedFileObject = watch('image');

  // Effect for image preview
  useEffect(() => {
    let objectUrl: string | null = null;
    if (selectedFileObject instanceof File) {
      objectUrl = URL.createObjectURL(selectedFileObject);
      setImagePreview(objectUrl);
    } else if (selectedFileObject === null && watch('id') && !isReadOnly) {
      setImagePreview(null);
    } else if (currentImageUrl) {
      setImagePreview(currentImageUrl);
    } else {
      setImagePreview(null);
    }
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFileObject, currentImageUrl, watch('id'), isReadOnly]);

  // --- Styling Helpers (Unchanged) ---
  const defaultBaseClasses =
    'w-full px-3 py-2 border rounded-lg disabled:bg-gray-100 disabled:text-gray-600';
  const editableFocusClasses =
    'focus:outline-none focus:ring-primaryOrange focus:border-primaryOrange';
  const getFieldClasses = (
    fieldName: keyof PropositionFormType,
    isTextarea: boolean = false
  ) => {
    const hasError = rHFerrors[fieldName];
    if (isReadOnly) return 'border-gray-300';
    let classes = hasError
      ? `border-red-500 ${editableFocusClasses}`
      : `border-gray-300 ${editableFocusClasses}`;
    if (isTextarea) classes += ' resize-none';
    return classes;
  };
  // --- End Styling Helpers ---

  // RHF Validation Rules
  const validationRules = {
    title: {
      required: 'Заголовок є обовʼязковим',
      minLength: {
        value: 3,
        message: 'Заголовок має бути від 3 до 255 символів',
      },
      maxLength: {
        value: 255,
        message: 'Заголовок має бути від 3 до 255 символів',
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
    endDate: {
      required: 'Дата завершення є обовʼязковою',
      validate: (value: Date | string | null) => {
        if (!value) return 'Дата завершення є обовʼязковою';
        try {
          if (isNaN(new Date(value).getTime())) return 'Невірний формат дати';
          return true;
        } catch {
          return 'Невірний формат дати';
        }
      },
    },
    image: {
      required: (watch('id') ? false : 'Зображення є обовʼязковим') as
        | string
        | false,
      // 💡 REMOVED: Async dimension validation
      validate: (value: File | null | undefined) => {
        // 1. Handle "no change" on edit
        if (watch('id') && (value === null || value === undefined)) return true;

        const file = value instanceof File ? value : null;

        // 2. Handle "required" check
        if (!file) return watch('id') ? true : 'Зображення є обовʼязковим';

        // 3. Standard file type check
        const allowedTypes = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
        ];
        if (!allowedTypes.includes(file.type))
          return 'Невірний тип файлу (дозволено: JPG, PNG, GIF, WEBP)';

        // 4. Standard file size check (25MB from your previous code)
        const maxSize = 25 * 1024 * 1024;
        if (file.size > maxSize) return 'Файл занадто великий (максимум 25MB)';

        // 5. Dimension checks removed
        return true;
      },
    },
  };

  // Date Formatting/Parsing (Unchanged)
  const formatDateForInput = (date: Date | null): string => {
    if (!date || !(date instanceof Date)) return '';
    try {
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };
  const parseDateFromInput = (dateString: string): Date | null => {
    if (!dateString) return null;
    try {
      const [year, month, day] = dateString.split('-').map(Number);
      if (
        !year ||
        !month ||
        !day ||
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31
      )
        return null;
      const utcDate = new Date(Date.UTC(year, month - 1, day));
      if (isNaN(utcDate.getTime())) return null;
      return utcDate;
    } catch {
      return null;
    }
  };

  return (
    <>
      {/* Title Field */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Заголовок
        </label>
        <input
          id="title"
          type="text"
          {...register('title', validationRules.title)}
          disabled={isReadOnly}
          className={`${defaultBaseClasses} ${getFieldClasses('title')}`}
        />
        {rHFerrors.title && (
          <p className="text-xs text-red-600 mt-1">{rHFerrors.title.message}</p>
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

      {/* End Date Field */}
      <Controller
        name="endDate"
        control={control}
        rules={validationRules.endDate}
        render={({ field: { onChange, value, name } }) => (
          <div>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Дата завершення
            </label>
            <input
              id={name}
              type="date"
              value={formatDateForInput(value as Date)}
              onChange={(e) => onChange(parseDateFromInput(e.target.value))}
              disabled={isReadOnly}
              className={`${defaultBaseClasses} ${getFieldClasses('endDate')}`}
            />
            {rHFerrors.endDate && (
              <p className="text-xs text-red-600 mt-1">
                {rHFerrors.endDate.message}
              </p>
            )}
          </div>
        )}
      />

      {/* Image Field */}
      <div>
        <label
          htmlFor="image-dropzone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Зображення
        </label>

        {/* Show Dropzone only if NOT in read-only mode */}
        {!isReadOnly && (
          <Controller
            name="image"
            control={control}
            rules={validationRules.image}
            render={({ field: { onChange, value } }) => {
              const dropzoneSrc = value instanceof File ? [value] : undefined;
              return (
                <Dropzone
                  src={dropzoneSrc}
                  disabled={isReadOnly}
                  accept={{
                    'image/jpeg': [],
                    'image/png': [],
                    'image/gif': [],
                    'image/webp': [],
                  }}
                  maxSize={25 * 1024 * 1024} // 25MB
                  maxFiles={1}
                  onDrop={(acceptedFiles) => {
                    onChange(acceptedFiles[0] || null);
                    if (acceptedFiles.length > 0) {
                      clearErrors('image');
                    }
                  }}
                  onError={(error) => {
                    setError('image', {
                      type: 'manual',
                      message: error.message || 'File is invalid',
                    });
                    onChange(null);
                  }}
                  className={cn(
                    'bg-white hover:bg-gray-50',
                    rHFerrors.image
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-primaryOrange focus:border-primaryOrange'
                  )}
                >
                  <DropzoneContent />

                  {/* CUSTOM EMPTY STATE with new requirements text */}
                  <DropzoneEmptyState>
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <UploadIcon size={16} />
                      </div>
                      <p className="py-2 w-full truncate text-wrap font-medium text-sm h-auto">
                        Upload a file
                      </p>
                      <p className="w-full truncate text-wrap text-muted-foreground text-xs py-1">
                        Drag and drop or click to upload
                      </p>
                      {/* 💡 Information text as requested */}
                      <p className="w-full truncate text-wrap text-muted-foreground text-xs font-semibold py-1">
                        Зображення має бути квадратним, мін. 680x680px.
                      </p>
                    </div>
                  </DropzoneEmptyState>
                </Dropzone>
              );
            }}
          />
        )}

        {/* Image Preview - Always show if imagePreview exists */}
        {imagePreview && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-1">
              {isReadOnly ? 'Зображення:' : 'Попередній перегляд / Поточне:'}
            </p>
            <img
              src={imagePreview}
              alt="Попередній перегляд"
              className="max-h-32 rounded border border-gray-300 object-contain"
            />
          </div>
        )}

        {/* Display validation error (now correctly populated by RHF) */}
        {rHFerrors.image && (
          <p className="text-xs text-red-600 mt-1">{rHFerrors.image.message}</p>
        )}

        {/* Button to clear image selection (Unchanged) */}
        {watch('id') &&
          !isReadOnly &&
          (selectedFileObject !== null || currentImageUrl) && (
            <button
              type="button"
              onClick={() => {
                setValue('image', null, { shouldValidate: true });
              }}
              className="mt-2 text-[12px]/[120%] text-red-600 hover:text-red-800 disabled:text-gray-400"
              disabled={isReadOnly}
            >
              Видалити завантажене зображення
            </button>
          )}
      </div>
    </>
  );
};

export default PropositionFormFields;
