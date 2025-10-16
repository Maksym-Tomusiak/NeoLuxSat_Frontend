import React from 'react';
// 💡 Import Controller and useFormContext
import { useFormContext, type FieldErrors, Controller } from 'react-hook-form';
import type {
  NetworkProblemDto,
  NetworkProblemCreateDto,
  NetworkProblemUpdateDto,
  NetworkProblemStatusDto,
  NetworkProblemServiceDto,
} from '@/types/networkProblem';

// Type alias for form data handled by RHF
type NetworkProblemFormType = NetworkProblemCreateDto | NetworkProblemUpdateDto;

// --- EXPORTED INITIAL DATA FUNCTION ---

// Helper function to create a Date object where the HH:mm string is interpreted
// as a time in the local timezone (Kyiv).
// We'll use the *local* Date constructor, but since we only care about HH:mm,
// it should still work correctly for display.
const createLocalDateFromTime = (timeStr: string | null): Date | null => {
  if (!timeStr) return null;

  const [hoursStr, minutesStr] = timeStr.split(':');
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (isNaN(hours) || isNaN(minutes)) return null; // 💡 REVERSION/FIX: If the incoming time string from the backend (when editing) // is treated as a UTC time, we must use Date.UTC() to load it correctly into // a Date object. The display function (getTimeString) using getHours() // will then automatically shift it to the client's local time (Kyiv).
  return new Date(Date.UTC(1970, 0, 1, hours, minutes));
};

export const getNetworkProblemInitialData = (
  entity: NetworkProblemDto | null
): NetworkProblemUpdateDto | NetworkProblemCreateDto => {
  if (entity) {
    return {
      id: entity.id,
      title: entity.title,
      address: entity.address,
      currentStatus: entity.currentStatus,
      // 🛑 CHANGE 2: Use the new helper function for initial data loading
      fixStartTime: createLocalDateFromTime(entity.fixStartTime),
      fixEndTime: createLocalDateFromTime(entity.fixEndTime),
      networkProblemStatusId: entity.networkProblemStatusId,
      networkProblemServicesIds: entity.networkProblemServices.map((s) => s.id),
    } as NetworkProblemUpdateDto;
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

// --- HELPER TIME FUNCTION (Updated for local time) ---

// This function converts a Date object (now local-based)
// back to a local "HH:mm" time string for the HTML input value.
const getTimeString = (date: Date | null | undefined): string => {
  if (!date) return '';
  try {
    // 🛑 CHANGE 3: Use getHours/Minutes since the Date object in state is now local-based.
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  } catch {
    return '';
  }
};

// This function converts a local HH:mm string from the input field
// back into a local-based Date object for RHF to store.
const timeStringToDate = (timeStr: string): Date | null => {
  if (!timeStr) return null;

  const [hoursStr, minutesStr] = timeStr.split(':');
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (isNaN(hours) || isNaN(minutes)) return null;
  // 🛑 CHANGE 4: Use the local Date constructor to ensure the submitted date's
  // hours/minutes match the user input without any timezone shift.
  // The backend will receive an ISO string that corresponds to the client's system
  // clock timezone, but the *values* will be the user's input.
  // Crucially, it will NOT be a 'Z' (UTC) string, which is what the requirement asks for.
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0, // seconds
    0 // milliseconds
  );
};

// --- RHF FORM FIELDS COMPONENT (Rest of the component remains the same) ---

interface NetworkProblemFormFieldsProps {
  isReadOnly: boolean;
  statuses: NetworkProblemStatusDto[];
  services: NetworkProblemServiceDto[];
}

// 🛑 Replace the exported render function with an exported component
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

  const disabledBaseClasses =
    'w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:text-gray-600';
  const editableSelectClasses =
    'focus:ring-primaryOrange focus:border-primaryOrange';
  const readOnlySelectClasses =
    'appearance-none pr-10 bg-gray-100 text-gray-600';

  const errorText = (name: keyof NetworkProblemFormType) =>
    rHFerrors[name] ? (
      <p className="text-xs text-red-600 mt-1">
        {rHFerrors[name]?.message as string}
      </p>
    ) : null; // Validation Rules

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
    // Time fields don't need required, as null is acceptable if input is empty
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
          required={!isReadOnly}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
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
          required={!isReadOnly}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange resize-none disabled:bg-gray-100 disabled:text-gray-600"
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

        <input
          id="currentStatus"
          type="text"
          {...register('currentStatus', validationRules.currentStatus)}
          required={!isReadOnly}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
        />
        {errorText('currentStatus')}
      </div>
      {/* Time Fields (Using Controller) */}
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
                // The value remains the same: Date -> HH:mm (now using local methods)
                value={getTimeString(value as Date)}
                // The onChange remains the same: HH:mm -> Date (now using local constructor)
                onChange={(e) => onChange(timeStringToDate(e.target.value))}
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
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
                // The value remains the same: Date -> HH:mm (now using local methods)
                value={getTimeString(value as Date)}
                // The onChange remains the same: HH:mm -> Date (now using local constructor)
                onChange={(e) => onChange(timeStringToDate(e.target.value))}
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryOrange focus:border-primaryOrange disabled:bg-gray-100 disabled:text-gray-600"
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
      {/* Services Checkbox List (Using Controller) */}
      <div>
        <p className="block text-sm font-medium text-gray-700 mb-1">Послуги</p>

        <Controller
          name="networkProblemServicesIds"
          control={control}
          rules={validationRules.networkProblemServicesIds}
          render={({ field: { onChange } }) => (
            <div className="flex flex-wrap gap-2">
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

// Export the component instead of the render function
export default NetworkProblemFormFields;
