// src/components/admin/Crud/NetworkProblems/NetworkProblemFormFields.tsx

import React from 'react';
import { useFormContext, type FieldErrors, Controller } from 'react-hook-form';
import type {
  NetworkProblemDto,
  NetworkProblemCreateDto,
  NetworkProblemUpdateDto,
  NetworkProblemStatusDto,
  NetworkProblemServiceDto,
} from '@/types/networkProblem';

type NetworkProblemFormType = NetworkProblemCreateDto | NetworkProblemUpdateDto;

// --- Helper Functions ---

/**
 * Parses a TimeSpan string ("dd.hh:mm:ss" or "hh:mm:ss") into days and hours.
 * Returns { days: number | '', hours: number | '' }. Defaults to empty strings if null/invalid.
 */
const parseTimeSpan = (
  timeSpanString: string | null
): { days: number | ''; hours: number | '' } => {
  if (!timeSpanString) {
    return { days: '', hours: '' };
  }
  try {
    const parts = timeSpanString.split('.');
    let days = 0;
    let timePart = '';

    if (parts.length === 2) {
      days = parseInt(parts[0], 10);
      timePart = parts[1];
    } else if (parts.length === 1) {
      timePart = parts[0]; // Assuming "hh:mm:ss" format if no '.'
    } else {
      return { days: '', hours: '' }; // Invalid format
    }

    const timeParts = timePart.split(':');
    if (timeParts.length < 2) return { days: '', hours: '' }; // Need at least hours:minutes

    const hours = parseInt(timeParts[0], 10);

    // Validate parsed numbers (allow 0)
    if (isNaN(days) || days < 0 || isNaN(hours) || hours < 0 || hours > 23) {
      // If one is valid, return that part, otherwise return empty
      if (
        !isNaN(days) &&
        days >= 0 &&
        (isNaN(hours) || hours < 0 || hours > 23)
      ) {
        return { days: days, hours: '' };
      }
      if (
        !isNaN(hours) &&
        hours >= 0 &&
        hours <= 23 &&
        (isNaN(days) || days < 0)
      ) {
        return { days: '', hours: hours };
      }
      return { days: '', hours: '' };
    }

    return { days: days, hours: hours };
  } catch (e) {
    console.error('Error parsing TimeSpan:', e);
    return { days: '', hours: '' };
  }
};

/**
 * Formats days and hours into a TimeSpan string ("dd.hh:00:00").
 * Returns null if both days and hours are invalid, zero, or empty strings/undefined.
 */
const formatTimeSpan = (
  days: number | string | undefined,
  hours: number | string | undefined
): string | null => {
  const dayVal =
    days === '' || days === undefined ? undefined : parseInt(String(days), 10);
  const hourVal =
    hours === '' || hours === undefined
      ? undefined
      : parseInt(String(hours), 10);

  // Check if both are considered "empty" or invalid non-negative numbers
  const daysIsInvalid = dayVal === undefined || isNaN(dayVal) || dayVal < 0;
  const hoursIsInvalid =
    hourVal === undefined || isNaN(hourVal) || hourVal < 0 || hourVal > 23;

  // If both inputs are effectively empty/invalid, return null
  if (daysIsInvalid && hoursIsInvalid) {
    return null;
  }

  // If both are valid and zero, also return null
  if (dayVal === 0 && hourVal === 0) {
    return null;
  }

  // Sanitize values for formatting, defaulting invalid ones to 0
  const finalDays = daysIsInvalid || dayVal === undefined ? 0 : dayVal;
  const finalHours = hoursIsInvalid || hourVal === undefined ? 0 : hourVal;

  const dayString = String(finalDays).padStart(2, '0');
  const hourString = String(finalHours).padStart(2, '0');

  // Always include days part for consistency with backend TimeSpan format
  return `${dayString}.${hourString}:00:00`;
};

// Time conversion helpers
const createLocalDateFromTime = (timeStr: string | null): Date | null => {
  if (!timeStr) return null;
  const [hoursStr, minutesStr] = timeStr.split(':');
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  if (isNaN(hours) || isNaN(minutes)) return null;
  // Assuming backend time is UTC, create Date object in UTC
  return new Date(Date.UTC(1970, 0, 1, hours, minutes));
};

const getTimeString = (date: Date | null | undefined): string => {
  if (!date || !(date instanceof Date)) return '';
  try {
    // Use local hours/minutes for display as intended
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  } catch {
    return '';
  }
};

const timeStringToDate = (timeStr: string): Date | null => {
  if (!timeStr) return null;
  const [hoursStr, minutesStr] = timeStr.split(':');
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  if (isNaN(hours) || isNaN(minutes)) return null;
  // Create a Date object using local time components
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0,
    0
  );
};

// --- Initial Data Function ---

export const getNetworkProblemInitialData = (
  entity: NetworkProblemDto | null
): NetworkProblemUpdateDto | NetworkProblemCreateDto => {
  if (entity) {
    return {
      id: entity.id,
      title: entity.title,
      address: entity.address,
      currentStatus: entity.currentStatus,
      lifeTime: entity.lifeTime, // Pass raw string
      fixStartTime: createLocalDateFromTime(entity.fixStartTime),
      fixEndTime: createLocalDateFromTime(entity.fixEndTime),
      networkProblemStatusId: entity.networkProblemStatusId,
      networkProblemServicesIds: entity.networkProblemServices.map((s) => s.id),
    } as NetworkProblemUpdateDto;
  }
  // Initial data for creation form
  return {
    title: '',
    address: '',
    currentStatus: '',
    lifeTime: null, // Default lifeTime to null
    fixStartTime: null,
    fixEndTime: null,
    networkProblemStatusId: '',
    networkProblemServicesIds: [],
  } as NetworkProblemCreateDto;
};

// --- Form Fields Component ---

interface NetworkProblemFormFieldsProps {
  isReadOnly: boolean;
  statuses: NetworkProblemStatusDto[];
  services: NetworkProblemServiceDto[];
}

export const NetworkProblemFormFields: React.FC<
  NetworkProblemFormFieldsProps
> = ({ isReadOnly, statuses, services }) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<NetworkProblemFormType>();

  const rHFerrors = errors as FieldErrors<NetworkProblemFormType>;

  // --- Tailwind Classes ---
  const coreBaseClasses =
    'w-full px-3 py-2 border rounded-lg disabled:bg-gray-100 disabled:text-gray-600';
  const editableFocusClasses =
    'focus:outline-none focus:ring-primaryOrange focus:border-primaryOrange';
  const readOnlySelectClasses =
    'appearance-none pr-10 bg-gray-100 text-gray-600';

  // --- Dynamic Class Helper ---
  const getFieldClasses = (
    fieldName: keyof NetworkProblemFormType,
    isTextarea: boolean = false
  ) => {
    const hasError = rHFerrors[fieldName];
    if (isReadOnly) return 'border-gray-300';
    let dynamicClasses = hasError
      ? `border-red-500 ${editableFocusClasses}`
      : `border-gray-300 ${editableFocusClasses}`;
    if (isTextarea) dynamicClasses += ' resize-none';
    return dynamicClasses;
  };

  // --- Error Text Helper ---
  const errorText = (
    name: keyof NetworkProblemFormType | 'lifeTimeDays' | 'lifeTimeHours'
  ) => {
    const error = rHFerrors[name as keyof NetworkProblemFormType]; // Check main field error if needed
    // You might add specific error checks for days/hours if complex validation is done client-side
    return error ? (
      <p className="text-xs text-red-600 mt-1">{error.message as string}</p>
    ) : null;
  };

  // --- Validation Rules ---
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
    address: {
      required: 'Адреса є обовʼязковою',
      minLength: { value: 3, message: 'Адреса має бути від 3 до 255 символів' },
      maxLength: {
        value: 255,
        message: 'Адреса має бути від 3 до 255 символів',
      },
    },
    currentStatus: {
      required: 'Коментар статусу є обовʼязковим',
      minLength: {
        value: 3,
        message: 'Коментар статусу має бути від 3 до 255 символів',
      },
      maxLength: {
        value: 255,
        message: 'Коментар статусу має бути від 3 до 255 символів',
      },
    },
    networkProblemStatusId: {
      required: 'Оберіть статус',
      validate: (value: string) => value.length > 0 || 'Оберіть статус',
    },
    networkProblemServicesIds: {
      required: 'Оберіть хоча б одну послугу',
      validate: (value: string[] | undefined) =>
        (Array.isArray(value) && value.length > 0) ||
        'Оберіть хоча б одну послугу',
    },
    // Basic validation for days/hours inputs (more complex validation likely server-side)
    lifeTimeDays: {
      min: { value: 0, message: "Дні не можуть бути від'ємними" },
      pattern: { value: /^\d*$/, message: 'Введіть ціле число' },
    },
    lifeTimeHours: {
      min: { value: 0, message: "Години не можуть бути від'ємними" },
      max: { value: 23, message: 'Години мають бути від 0 до 23' },
      pattern: { value: /^\d*$/, message: 'Введіть ціле число' },
    },
  };

  const selectedServices = watch('networkProblemServicesIds') || [];

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
          className={`${coreBaseClasses} ${getFieldClasses('title')}`}
        />
        {errorText('title')}
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
          rows={3}
          {...register('address', validationRules.address)}
          disabled={isReadOnly}
          className={`${coreBaseClasses} ${getFieldClasses('address', true)}`}
        />
        {errorText('address')}
      </div>

      {/* Current Status Comment Field */}
      <div>
        <label
          htmlFor="currentStatus"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Коментар статусу
        </label>
        <textarea
          id="currentStatus"
          rows={3}
          {...register('currentStatus', validationRules.currentStatus)}
          disabled={isReadOnly}
          className={`${coreBaseClasses} ${getFieldClasses('currentStatus')}`}
        />
        {errorText('currentStatus')}
      </div>

      {/* NEW: LifeTime Fields (Days and Hours) using Controller */}
      <Controller
        name="lifeTime"
        control={control}
        render={({ field: { onChange, value } }) => {
          // Destructure only needed field props
          const [internalDays, setInternalDays] = React.useState<number | ''>(
            ''
          );
          const [internalHours, setInternalHours] = React.useState<number | ''>(
            ''
          );

          React.useEffect(() => {
            const { days, hours } = parseTimeSpan(value);
            setInternalDays(days);
            setInternalHours(hours);
          }, [value]);

          const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newDays = e.target.value;
            setInternalDays(newDays === '' ? '' : parseInt(newDays, 10));
            onChange(formatTimeSpan(newDays, internalHours)); // Update RHF state
          };

          const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newHours = e.target.value;
            setInternalHours(newHours === '' ? '' : parseInt(newHours, 10));
            onChange(formatTimeSpan(internalDays, newHours)); // Update RHF state
          };

          // Basic validation check (client-side)
          const dayError =
            parseInt(String(internalDays), 10) < 0
              ? 'Cannot be negative'
              : null;
          const hourError =
            parseInt(String(internalHours), 10) < 0 ||
            parseInt(String(internalHours), 10) > 23
              ? 'Must be 0-23'
              : null;

          return (
            <div className="grid grid-cols-2 gap-4">
              {/* Days Input */}
              <div>
                <label
                  htmlFor="lifeTimeDays"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Тривалість (Дні)
                </label>
                <input
                  id="lifeTimeDays"
                  type="number"
                  value={internalDays}
                  onChange={handleDayChange}
                  placeholder="Необов'язково"
                  min="0"
                  step="1"
                  disabled={isReadOnly}
                  // 🛑 REMOVED REGISTER CALL
                  // Apply error styling based on Controller's field state or internal validation
                  className={`${coreBaseClasses} ${
                    dayError || rHFerrors.lifeTime
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : getFieldClasses('lifeTime')
                  }`}
                />
                {/* Show validation message */}
                {dayError && (
                  <p className="text-xs text-red-600 mt-1">{dayError}</p>
                )}
                {errorText('lifeTime')} {/* Show general lifeTime error */}
              </div>

              {/* Hours Input */}
              <div>
                <label
                  htmlFor="lifeTimeHours"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Тривалість (Години)
                </label>
                <input
                  id="lifeTimeHours"
                  type="number"
                  value={internalHours}
                  onChange={handleHourChange}
                  placeholder="Необов'язково"
                  min="0"
                  max="23"
                  step="1"
                  disabled={isReadOnly}
                  // 🛑 REMOVED REGISTER CALL
                  className={`${coreBaseClasses} ${
                    hourError || rHFerrors.lifeTime
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : getFieldClasses('lifeTime')
                  }`}
                />
                {/* Show validation message */}
                {hourError && (
                  <p className="text-xs text-red-600 mt-1">{hourError}</p>
                )}
              </div>
            </div>
          );
        }}
      />

      {/* Time Fields (Controller) */}
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="fixStartTime"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <div>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Початок виправлення (час)
              </label>
              <input
                id={name}
                type="time"
                value={getTimeString(value as Date)}
                onChange={(e) => onChange(timeStringToDate(e.target.value))}
                disabled={isReadOnly}
                className={`${coreBaseClasses} ${getFieldClasses(
                  'fixStartTime'
                )}`}
              />
              {errorText(name)}
            </div>
          )}
        />
        <Controller
          name="fixEndTime"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <div>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Кінець виправлення (час)
              </label>
              <input
                id={name}
                type="time"
                value={getTimeString(value as Date)}
                onChange={(e) => onChange(timeStringToDate(e.target.value))}
                disabled={isReadOnly}
                className={`${coreBaseClasses} ${getFieldClasses(
                  'fixEndTime'
                )}`}
              />
              {errorText(name)}
            </div>
          )}
        />
      </div>

      {/* Status Select Field */}
      <div className="relative">
        <label
          htmlFor="networkProblemStatusId"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Статус
        </label>
        <select
          id="networkProblemStatusId"
          {...register(
            'networkProblemStatusId',
            validationRules.networkProblemStatusId
          )}
          disabled={isReadOnly}
          className={`${coreBaseClasses} ${
            isReadOnly
              ? readOnlySelectClasses
              : getFieldClasses('networkProblemStatusId')
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

      {/* Services Checkbox List */}
      <div>
        <p className={`block text-sm font-medium mb-1 text-gray-700`}>
          Послуги
        </p>
        <Controller
          name="networkProblemServicesIds"
          control={control}
          rules={validationRules.networkProblemServicesIds}
          render={({ field: { onChange } }) => (
            <div
              className={`flex flex-wrap gap-2 p-2 rounded-lg ${
                rHFerrors.networkProblemServicesIds
                  ? 'border border-red-500'
                  : ''
              }`}
            >
              {services.map((srv) => {
                const checked = selectedServices.includes(srv.id);
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
                      onChange={() => {
                        if (isReadOnly) return;
                        const set = new Set(selectedServices);
                        if (set.has(srv.id)) set.delete(srv.id);
                        else set.add(srv.id);
                        onChange(Array.from(set));
                      }}
                    />
                    <span className="text-sm text-primaryBlue">
                      {srv.title}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        />
        {errorText('networkProblemServicesIds')}
      </div>
    </>
  );
};

export default NetworkProblemFormFields;
