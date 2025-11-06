import React from 'react';
import { useFormContext, type FieldErrors } from 'react-hook-form';
import type { RepairCreateDto, RepairUpdateDto } from '@/types/repair';
import type { RepairStatusDto } from '@/types/repairStatus';
import type { RepairPaymentDto } from '@/types/repairPayment';
import type { UserDto } from '@/types/user';

type RepairFormType = RepairCreateDto | RepairUpdateDto;

interface RepairFormFieldsProps {
  isReadOnly: boolean;
  users: UserDto[];
  repairStatuses: RepairStatusDto[];
  repairPayments: RepairPaymentDto[];
}

const ErrorText: React.FC<{ message?: string }> = ({ message }) =>
  message ? <p className="text-xs text-red-600 mt-1">{message}</p> : null;

export const RepairFormFields: React.FC<RepairFormFieldsProps> = ({
  isReadOnly,
  users,
  repairStatuses,
  repairPayments,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RepairFormType>();

  const rHFerrors = errors as FieldErrors<RepairFormType>;

  // --- Base Styling Classes ---
  const defaultBaseClasses =
    'w-full px-3 py-2 border rounded-lg disabled:bg-gray-100 disabled:text-gray-600';
  const editableTextClasses =
    'focus:outline-none focus:ring-primaryOrange focus:border-primaryOrange';
  const readOnlySelectClasses =
    'appearance-none pr-10 bg-gray-100 text-gray-600';

  const getFieldClasses = (
    fieldName: keyof RepairFormType,
    isSelect: boolean = false
  ) => {
    const hasError = !!rHFerrors[fieldName];
    if (isReadOnly) {
      return `border-gray-300 ${isSelect ? readOnlySelectClasses : ''}`;
    }
    const focusClasses = isSelect
      ? 'focus:ring-primaryOrange focus:border-primaryOrange'
      : editableTextClasses;
    return `${hasError ? 'border-red-500' : 'border-gray-300'} ${focusClasses}`;
  };

  // --- Validation Rules ---
  const validationRules = {
    // Required
    statusId: { required: 'Статус є обовʼязковим' },
    paymentId: { required: 'Розрахунок є обовʼязковою' },
    lastName: {
      required: "Прізвище є обов'язковим",
      maxLength: { value: 255, message: 'Максимум 255 символів' },
    },
    phoneNumber: {
      required: "Телефон є обов'язковим",
      maxLength: { value: 50, message: 'Максимум 50 символів' },
    },
    equipmentModel: {
      required: "Модель є обов'язковою",
      maxLength: { value: 255, message: 'Максимум 255 символів' },
    },
    issue: {
      required: "Опис проблеми є обов'язковим",
      maxLength: { value: 4000, message: 'Максимум 4000 символів' },
    },
    // Optional
    firstName: { maxLength: { value: 255, message: 'Максимум 255 символів' } },
    city: { maxLength: { value: 255, message: 'Максимум 255 символів' } },
    street: { maxLength: { value: 255, message: 'Максимум 255 символів' } },
    equipmentType: {
      maxLength: { value: 255, message: 'Максимум 255 символів' },
    },
    serialNumber: {
      maxLength: { value: 255, message: 'Максимум 255 символів' },
    },
    complection: {
      // <-- CORRECTED
      maxLength: { value: 255, message: 'Максимум 255 символів' },
    },
    state: { maxLength: { value: 1000, message: 'Максимум 1000 символів' } },
    repairDate: {},
    usedMaterials: {
      // <-- CORRECTED
      maxLength: { value: 2000, message: 'Максимум 2000 символів' },
    },
    materialsCost: {
      valueAsNumber: true,
      min: { value: 0, message: 'Не може бути негативним' },
    },
    jobDone: { maxLength: { value: 4000, message: 'Максимум 4000 символів' } },
    jobCost: {
      valueAsNumber: true,
      min: { value: 0, message: 'Не може бути негативним' },
    },
    masterConclusion: {
      maxLength: { value: 4000, message: 'Максимум 4000 символів' },
    },
    managerComment: {
      maxLength: { value: 4000, message: 'Максимум 4000 символів' },
    },
  };

  return (
    <div className="flex flex-col gap-6">
      {/* --- Section 1: Main & Client Info --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Col 1 */}
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="statusId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Статус<span className="text-red-500 ml-1">*</span>
            </label>
            <select
              id="statusId"
              {...register('statusId', validationRules.statusId)}
              disabled={isReadOnly}
              className={`${defaultBaseClasses} ${getFieldClasses(
                'statusId',
                true
              )}`}
            >
              <option value="">Оберіть статус</option>
              {repairStatuses.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
            <ErrorText message={rHFerrors.statusId?.message} />
          </div>
          <div>
            <label
              htmlFor="paymentId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Розрахунок<span className="text-red-500 ml-1">*</span>
            </label>
            <select
              id="paymentId"
              {...register('paymentId', validationRules.paymentId)}
              disabled={isReadOnly}
              className={`${defaultBaseClasses} ${getFieldClasses(
                'paymentId',
                true
              )}`}
            >
              <option value="">Оберіть статус розрахунку</option>
              {repairPayments.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
            <ErrorText message={rHFerrors.paymentId?.message} />
          </div>
          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Виконавець
            </label>
            <select
              id="userId"
              {...register('userId')}
              disabled={isReadOnly}
              className={`${defaultBaseClasses} ${getFieldClasses(
                'userId',
                true
              )}`}
            >
              <option value="">Не прив'язано</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Col 2 */}
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Прізвище<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              {...register('lastName', validationRules.lastName)}
              disabled={isReadOnly}
              className={`${defaultBaseClasses} ${getFieldClasses('lastName')}`}
            />
            <ErrorText message={rHFerrors.lastName?.message} />
          </div>
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Ім'я
            </label>
            <input
              id="firstName"
              type="text"
              {...register('firstName', validationRules.firstName)}
              disabled={isReadOnly}
              className={`${defaultBaseClasses} ${getFieldClasses(
                'firstName'
              )}`}
            />
            <ErrorText message={rHFerrors.firstName?.message} />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Телефон<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="phoneNumber"
              type="tel"
              {...register('phoneNumber', validationRules.phoneNumber)}
              disabled={isReadOnly}
              className={`${defaultBaseClasses} ${getFieldClasses(
                'phoneNumber'
              )}`}
            />
            <ErrorText message={rHFerrors.phoneNumber?.message} />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Місто
            </label>
            <input
              id="city"
              type="text"
              {...register('city', validationRules.city)}
              disabled={isReadOnly}
              className={`${defaultBaseClasses} ${getFieldClasses('city')}`}
            />
            <ErrorText message={rHFerrors.city?.message} />
          </div>
          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Вулиця / Адреса
            </label>
            <input
              id="street"
              type="text"
              {...register('street', validationRules.street)}
              disabled={isReadOnly}
              className={`${defaultBaseClasses} ${getFieldClasses('street')}`}
            />
            <ErrorText message={rHFerrors.street?.message} />
          </div>
        </div>
      </div>

      {/* --- Section 2: Equipment & Issue --- */}
      <hr />
      <h3 className="text-lg font-semibold text-primaryBlue -mb-2">
        Деталі Обладнання та Проблеми
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="equipmentModel"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Модель<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="equipmentModel"
            type="text"
            {...register('equipmentModel', validationRules.equipmentModel)}
            disabled={isReadOnly}
            className={`${defaultBaseClasses} ${getFieldClasses(
              'equipmentModel'
            )}`}
          />
          <ErrorText message={rHFerrors.equipmentModel?.message} />
        </div>
        <div>
          <label
            htmlFor="equipmentType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Тип
          </label>
          <input
            id="equipmentType"
            type="text"
            {...register('equipmentType', validationRules.equipmentType)}
            disabled={isReadOnly}
            className={`${defaultBaseClasses} ${getFieldClasses(
              'equipmentType'
            )}`}
          />
          <ErrorText message={rHFerrors.equipmentType?.message} />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="serialNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Серійний номер
          </label>
          <input
            id="serialNumber"
            type="text"
            {...register('serialNumber', validationRules.serialNumber)}
            disabled={isReadOnly}
            className={`${defaultBaseClasses} ${getFieldClasses(
              'serialNumber'
            )}`}
          />
          <ErrorText message={rHFerrors.serialNumber?.message} />
        </div>

        {/* --- FIELD UPDATED --- */}
        <div className="md:col-span-2">
          <label
            htmlFor="complection"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Комплектація
          </label>
          <input
            id="complection"
            type="text"
            {...register('complection', validationRules.complection)}
            disabled={isReadOnly}
            className={`${defaultBaseClasses} ${getFieldClasses(
              'complection'
            )}`}
          />
          <ErrorText message={rHFerrors.complection?.message} />
        </div>
        {/* --------------------- */}

        <div className="md:col-span-2">
          <label
            htmlFor="issue"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Опис проблеми<span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            id="issue"
            rows={4}
            {...register('issue', validationRules.issue)}
            disabled={isReadOnly}
            className={`${defaultBaseClasses} resize-vertical ${getFieldClasses(
              'issue'
            )}`}
          />
          <ErrorText message={rHFerrors.issue?.message} />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Стан
          </label>
          <textarea
            id="state"
            rows={2}
            {...register('state', validationRules.state)}
            disabled={isReadOnly}
            className={`${defaultBaseClasses} resize-vertical ${getFieldClasses(
              'state'
            )}`}
          />
          <ErrorText message={rHFerrors.state?.message} />
        </div>
      </div>

      {/* --- Section 3: Work & Financials --- */}
      <hr />
      <h3 className="text-lg font-semibold text-primaryBlue -mb-2">
        Деталі Роботи та Вартість
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="repairDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Дата ремонту
          </label>
          <input
            id="repairDate"
            type="date"
            {...register('repairDate', validationRules.repairDate)}
            disabled={isReadOnly}
            className={`${defaultBaseClasses} ${getFieldClasses('repairDate')}`}
          />
          <ErrorText message={rHFerrors.repairDate?.message} />
        </div>

        {/* --- FIELD UPDATED --- */}
        <div className="md:col-span-2">
          <label
            htmlFor="usedMaterials"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Матеріали
          </label>
          <textarea
            id="usedMaterials"
            rows={2}
            {...register('usedMaterials', validationRules.usedMaterials)}
            disabled={isReadOnly}
            className={`${defaultBaseClasses} resize-vertical ${getFieldClasses(
              'usedMaterials'
            )}`}
          />
          <ErrorText message={rHFerrors.usedMaterials?.message} />
        </div>
        {/* --------------------- */}

        <div className="md:col-span-2">
          <label
            htmlFor="jobDone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Виконана робота
          </label>
          <textarea
            id="jobDone"
            rows={3}
            {...register('jobDone', validationRules.jobDone)}
            disabled={isReadOnly}
            className={`${defaultBaseClasses} resize-vertical ${getFieldClasses(
              'jobDone'
            )}`}
          />
          <ErrorText message={rHFerrors.jobDone?.message} />
        </div>
        <div>
          <label
            htmlFor="materialsCost"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Вартість матеріалів
          </label>
          <input
            id="materialsCost"
            type="number"
            step="0.01"
            {...register('materialsCost', validationRules.materialsCost)}
            disabled={isReadOnly}
            className={`${defaultBaseClasses} ${getFieldClasses(
              'materialsCost'
            )}`}
          />
          <ErrorText message={rHFerrors.materialsCost?.message} />
        </div>
        <div>
          <label
            htmlFor="jobCost"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Вартість роботи
          </label>
          <input
            id="jobCost"
            type="number"
            step="0.01"
            {...register('jobCost', validationRules.jobCost)}
            disabled={isReadOnly}
            className={`${defaultBaseClasses} ${getFieldClasses('jobCost')}`}
          />
          <ErrorText message={rHFerrors.jobCost?.message} />
        </div>
      </div>

      {/* --- Section 4: Internal Notes --- */}
      <hr />
      <h3 className="text-lg font-semibold text-primaryBlue -mb-2">
        Внутрішні нотатки
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label
            htmlFor="masterConclusion"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Висновок майстра
          </label>
          <textarea
            id="masterConclusion"
            rows={3}
            {...register('masterConclusion', validationRules.masterConclusion)}
            disabled={isReadOnly}
            className={`${defaultBaseClasses} resize-vertical ${getFieldClasses(
              'masterConclusion'
            )}`}
          />
          <ErrorText message={rHFerrors.masterConclusion?.message} />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="managerComment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Коментар менеджера
          </label>
          <textarea
            id="managerComment"
            rows={3}
            {...register('managerComment', validationRules.managerComment)}
            disabled={isReadOnly}
            className={`${defaultBaseClasses} resize-vertical ${getFieldClasses(
              'managerComment'
            )}`}
          />
          <ErrorText message={rHFerrors.managerComment?.message} />
        </div>
      </div>
    </div>
  );
};
