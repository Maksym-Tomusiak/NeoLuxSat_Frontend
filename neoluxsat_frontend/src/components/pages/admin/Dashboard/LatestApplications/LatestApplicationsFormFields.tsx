// src/components/admin/dashboard/LatestApplicationsTable/ApplicationFormFields.tsx

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
  // Type casting for simpler access to formData
  const data = formData as any;

  // Base classes for styling
  const disabledBaseClasses =
    'w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:text-gray-600';
  const editableSelectClasses =
    'focus:ring-primaryOrange focus:border-primaryOrange';
  const readOnlySelectClasses =
    'appearance-none pr-10 bg-gray-100 text-gray-600';

  // Helper function to render validation errors
  const err = (k: string) =>
    errors[k] ? <p className="text-xs text-red-600 mt-1">{errors[k]}</p> : null;

  return (
    <>
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
          required={!isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
        />
        {err('fullName')}
      </div>
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
          required={!isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
        />
        {err('email')}
      </div>
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
          required={!isReadOnly}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange resize-none disabled:bg-gray-100 disabled:text-gray-600"
        />
        {err('address')}
      </div>
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
          required={!isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
        />
        {err('phone')}
      </div>
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
          required={!isReadOnly}
          className={`${disabledBaseClasses} ${
            isReadOnly ? readOnlySelectClasses : editableSelectClasses
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
      {'id' in data && ( // Status field only available for existing entities
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
            required={!isReadOnly}
            className={`${disabledBaseClasses} ${
              isReadOnly ? readOnlySelectClasses : editableSelectClasses
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
