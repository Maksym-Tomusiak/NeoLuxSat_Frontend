import React from 'react';
import type {
  ApplicationDto,
  ApplicationCreateDto,
  ApplicationUpdateDto,
  ApplicationTypeDto,
  ApplicationStatusDto,
} from '@/types/application';

export const getApplicationInitialData = (
  entity: ApplicationDto | null
): ApplicationDto | ApplicationCreateDto => {
  return entity
    ? ({
        id: entity.id,
        fullName: entity.fullName,
        email: entity.email,
        address: entity.address,
        phone: entity.phone,
        typeId: entity.typeId,
        statusId: entity.statusId,
      } as ApplicationDto)
    : ({
        fullName: '',
        email: '',
        address: '',
        phone: '',
        typeId: '',
      } as ApplicationCreateDto);
};

export const renderApplicationFormFields = (
  formData: ApplicationDto | ApplicationCreateDto | ApplicationUpdateDto,
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void,
  isReadOnly: boolean,
  applicationTypes: ApplicationTypeDto[] = [],
  applicationStatuses: ApplicationStatusDto[] = [],
  errors: Record<string, string> = {}
) => {
  const applicationData = formData as ApplicationDto & ApplicationCreateDto;

  const disabledBaseClasses =
    'w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:text-gray-600';

  const editableSelectClasses =
    'focus:ring-primaryOrange focus:border-primaryOrange';

  const readOnlySelectClasses =
    'appearance-none pr-10 bg-gray-100 text-gray-600';

  const errorText = (name: string) =>
    errors[name] ? (
      <p className="text-xs text-red-600 mt-1">{errors[name]}</p>
    ) : null;

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
          value={applicationData.fullName}
          onChange={handleChange}
          required={!isReadOnly}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
        />
        {errorText('fullName')}
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
          value={applicationData.email}
          onChange={handleChange}
          required={!isReadOnly}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
        />
        {errorText('email')}
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
          value={applicationData.address}
          onChange={handleChange}
          required={!isReadOnly}
          disabled={isReadOnly}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange resize-none disabled:bg-gray-100 disabled:text-gray-600"
        />
        {errorText('address')}
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
          value={applicationData.phone}
          onChange={handleChange}
          required={!isReadOnly}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
        />
        {errorText('phone')}
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
          value={applicationData.typeId}
          onChange={handleChange}
          required={!isReadOnly}
          disabled={isReadOnly}
          className={`${disabledBaseClasses} ${
            isReadOnly ? readOnlySelectClasses : editableSelectClasses
          }`}
        >
          <option value="">Оберіть тип заявки</option>
          {applicationTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.title}
            </option>
          ))}
        </select>
        {errorText('typeId')}
      </div>

      {(applicationData as any).id && (
        <div className="relative">
          <label
            htmlFor="statusId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Статус заявки
          </label>
          <select
            id="statusId"
            name="statusId"
            value={(applicationData as any).statusId}
            onChange={handleChange}
            required={!isReadOnly}
            disabled={isReadOnly}
            className={`${disabledBaseClasses} ${
              isReadOnly ? readOnlySelectClasses : editableSelectClasses
            }`}
          >
            <option value="">Оберіть статус заявки</option>
            {applicationStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.title}
              </option>
            ))}
          </select>
          {errorText('statusId')}
        </div>
      )}
    </>
  );
};
