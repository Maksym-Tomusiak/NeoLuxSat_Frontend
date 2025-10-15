import React from 'react';
import type {
  NetworkProblemDto,
  NetworkProblemCreateDto,
  NetworkProblemUpdateDto,
  NetworkProblemStatusDto,
  NetworkProblemServiceDto,
} from '@/types/networkProblem';

export const getNetworkProblemInitialData = (
  entity: NetworkProblemDto | null
): NetworkProblemUpdateDto | NetworkProblemCreateDto => {
  // This function takes an 'HH:mm' string (which is UTC time) and creates a Date object
  // that correctly represents that time *in UTC*.
  const createUtcDateFromTime = (timeStr: string | null): Date | null => {
    if (!timeStr) return null;

    const [hoursStr, minutesStr] = timeStr.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (isNaN(hours) || isNaN(minutes)) return null; // Use Date.UTC to construct a date where the hours/minutes are interpreted as UTC. // We use an arbitrary date (Jan 1, 1970) as only the time component matters.

    return new Date(Date.UTC(1970, 0, 1, hours, minutes));
  };
  if (entity) {
    return {
      id: entity.id,
      title: entity.title,
      address: entity.address,
      currentStatus: entity.currentStatus, // *** FIX: Use the new helper to create a UTC-based Date object ***
      fixStartTime: createUtcDateFromTime(entity.fixStartTime),
      fixEndTime: createUtcDateFromTime(entity.fixEndTime), // *******************************************************************
      networkProblemStatusId: entity.networkProblemStatusId,
      networkProblemServicesIds: entity.networkProblemServices.map((s) => s.id),
    } as unknown as NetworkProblemUpdateDto;
  }

  return {
    title: '',
    address: '',
    currentStatus: '',
    fixStartTime: null,
    fixEndTime: null,
    networkProblemStatusId: '',
    networkProblemServicesIds: [],
  } as NetworkProblemCreateDto;
};

const buildTodayTime = (time: string): Date => {
  const [hours, minutes] = time.split(':').map((v) => parseInt(v, 10));
  const now = new Date();
  const d = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    isNaN(hours) ? 0 : hours,
    isNaN(minutes) ? 0 : minutes,
    0,
    0
  );
  return d;
};

export const renderNetworkProblemFormFields = (
  formData:
    | NetworkProblemDto
    | NetworkProblemCreateDto
    | NetworkProblemUpdateDto,
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void,
  isReadOnly: boolean,
  statuses: NetworkProblemStatusDto[] = [],
  services: NetworkProblemServiceDto[] = [],
  errors: Record<string, string> = {}
) => {
  const data = formData as NetworkProblemCreateDto &
    NetworkProblemUpdateDto & {
      id?: string;
    };

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

  const getTimeString = (date: Date | null | undefined): string => {
    if (!date) return '';
    try {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    } catch {
      return '';
    }
  };

  const fixStartValue = getTimeString(data.fixStartTime);
  const fixEndValue = getTimeString(data.fixEndTime);

  const onTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'fixStartTime' | 'fixEndTime'
  ) => {
    if (isReadOnly) return;
    const value = e.target.value; // HH:mm
    const asDate = value ? buildTodayTime(value) : null;
    // construct a fake event to reuse handleChange
    const syntheticEvent = {
      target: { name: field, value: asDate } as any,
    } as React.ChangeEvent<HTMLInputElement> as any;
    handleChange(syntheticEvent);
  };

  const toggleService = (serviceId: string) => {
    if (isReadOnly) return;
    const set = new Set(data.networkProblemServicesIds);
    if (set.has(serviceId)) set.delete(serviceId);
    else set.add(serviceId);
    const syntheticEvent = {
      target: {
        name: 'networkProblemServicesIds',
        value: Array.from(set),
      } as any,
    } as React.ChangeEvent<HTMLInputElement> as any;
    handleChange(syntheticEvent);
  };

  return (
    <>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Заголовок
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={data.title}
          onChange={handleChange}
          required={!isReadOnly}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
        />
        {errorText('title')}
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
          required={!isReadOnly}
          disabled={isReadOnly}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange resize-none disabled:bg-gray-100 disabled:text-gray-600"
        />
        {errorText('address')}
      </div>

      <div>
        <label
          htmlFor="currentStatus"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Коментар статусу
        </label>
        <input
          id="currentStatus"
          name="currentStatus"
          type="text"
          value={data.currentStatus}
          onChange={handleChange}
          required={!isReadOnly}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
        />
        {errorText('currentStatus')}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="fixStartTime"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Початок виправлення (час)
          </label>
          <input
            id="fixStartTime"
            name="fixStartTime"
            type="time"
            value={fixStartValue}
            onChange={(e) => onTimeChange(e, 'fixStartTime')}
            disabled={isReadOnly}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
          />
          {errorText('fixStartTime')}
        </div>
        <div>
          <label
            htmlFor="fixEndTime"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Кінець виправлення (час)
          </label>
          <input
            id="fixEndTime"
            name="fixEndTime"
            type="time"
            value={fixEndValue}
            onChange={(e) => onTimeChange(e, 'fixEndTime')}
            disabled={isReadOnly}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
          />
          {errorText('fixEndTime')}
        </div>
      </div>

      <div className="relative">
        <label
          htmlFor="networkProblemStatusId"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Статус
        </label>
        <select
          id="networkProblemStatusId"
          name="networkProblemStatusId"
          value={data.networkProblemStatusId}
          onChange={handleChange}
          required={!isReadOnly}
          disabled={isReadOnly}
          className={`${disabledBaseClasses} ${
            isReadOnly ? readOnlySelectClasses : editableSelectClasses
          }`}
        >
          <option value="">Оберіть статус</option>
          {statuses.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
        {errorText('networkProblemStatusId')}
      </div>

      <div>
        <p className="block text-sm font-medium text-gray-700 mb-1">Послуги</p>
        <div className="flex flex-wrap gap-2">
          {services.map((srv) => {
            const checked = (data.networkProblemServicesIds || []).includes(
              srv.id
            );
            return (
              <label
                key={srv.id}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border ${
                  checked
                    ? 'border-primaryOrange bg-primaryOrange/10'
                    : 'border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  className="accent-primaryOrange"
                  checked={checked}
                  disabled={isReadOnly}
                  onChange={() => toggleService(srv.id)}
                />
                <span className="text-sm text-primaryBlue">{srv.title}</span>
              </label>
            );
          })}
        </div>
        {errorText('networkProblemServices')}
      </div>
    </>
  );
};

export default renderNetworkProblemFormFields;
