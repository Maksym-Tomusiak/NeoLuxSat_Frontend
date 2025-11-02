import React from 'react';
import type {
  ApplicationCreateDto,
  ApplicationUpdateDto,
} from '@/types/application';

interface ApplicationFormFieldsProps {
  formData: ApplicationCreateDto | ApplicationUpdateDto;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  isReadOnly: boolean;
  errors: Record<string, string>;
  applicationTypes: any[];
  applicationStatuses: any[];
}

const ApplicationFormFields: React.FC<ApplicationFormFieldsProps> = ({
  formData,
  handleChange,
  isReadOnly,
  errors,
  applicationTypes,
  applicationStatuses,
}) => {
  const data = formData as any;

  // --- Tailwind Class Definitions ---

  // Base classes (w/o border color, w/o focus/ring, w/o resize-none)
  const coreBaseClasses =
    'w-full px-3 py-2 border rounded-lg disabled:bg-gray-100 disabled:text-gray-600';

  // Editable classes with orange focus (includes focus:outline-none)
  const editableFocusClasses =
    'focus:outline-none focus:ring-primaryOrange focus:border-primaryOrange';

  const readOnlySelectClasses =
    'appearance-none pr-10 bg-gray-100 text-gray-600';

  // --- Dynamic Class Helper ---

  /**
   * Generates classes for inputs/selects: red border when unfocused error, orange focus.
   * @param fieldName The string key used to check the errors prop.
   * @param isTextarea Flag to add resize-none utility.
   */
  const getFieldClasses = (fieldName: string, isTextarea: boolean = false) => {
    const hasError = errors[fieldName];

    if (isReadOnly) {
      return 'border-gray-300';
    }

    let dynamicClasses;
    if (hasError) {
      // Error: Red border when unfocused, Orange focus overrides red on focus.
      dynamicClasses = `border-red-500 ${editableFocusClasses}`;
    } else {
      // No error: Gray border when unfocused, Orange focus on focus.
      dynamicClasses = `border-gray-300 ${editableFocusClasses}`;
    }

    if (isTextarea) {
      dynamicClasses += ' resize-none';
    }

    return dynamicClasses;
  };

  const err = (k: string) =>
    errors[k] ? <p className="text-xs text-red-600 mt-1">{errors[k]}</p> : null;

  return (
    <>
      {/* Full Name Field */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Повне ім'я
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={data.fullName}
          onChange={handleChange}
          disabled={isReadOnly}
          className={`${coreBaseClasses} ${getFieldClasses('fullName')}`}
        />
        {err('fullName')}
      </div>
      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          disabled={isReadOnly}
          className={`${coreBaseClasses} ${getFieldClasses('email')}`}
        />
        {err('email')}
      </div>
      {/* Address Field */}
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Адреса
        </label>
        <textarea
          id="address"
          name="address"
          value={data.address}
          onChange={handleChange}
          disabled={isReadOnly}
          rows={3}
          className={`${coreBaseClasses} ${getFieldClasses('address', true)}`}
        />
        {err('address')}
      </div>
      {/* Phone Field */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Номер телефону
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={data.phone}
          onChange={handleChange}
          disabled={isReadOnly}
          className={`${coreBaseClasses} ${getFieldClasses('phone')}`}
        />
        {err('phone')}
      </div>
      {/* Type ID Field (Select) */}
      <div className="relative">
        <label
          htmlFor="typeId"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Тип заявки
        </label>
        <select
          id="typeId"
          name="typeId"
          value={data.typeId}
          onChange={handleChange}
          disabled={isReadOnly}
          className={`${coreBaseClasses} ${
            isReadOnly ? readOnlySelectClasses : getFieldClasses('typeId')
          }`}
        >
          <option value="">Оберіть тип заявки</option>
          {applicationTypes.map((t: any) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
        {err('typeId')}
      </div>
      {/* Status ID Field (Select) */}
      {'id' in data && (
        <div className="relative">
          <label
            htmlFor="statusId"
            className="block text sm font-medium text-gray-700 mb-1"
          >
            Статус заявки
          </label>
          <select
            id="statusId"
            name="statusId"
            value={data.statusId}
            onChange={handleChange}
            disabled={isReadOnly}
            className={`${coreBaseClasses} ${
              isReadOnly ? readOnlySelectClasses : getFieldClasses('statusId')
            }`}
          >
            <option value="">Оберіть статус заявки</option>
            {applicationStatuses.map((s: any) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
          {err('statusId')}
        </div>
      )}
    </>
  );
};

export default ApplicationFormFields;
