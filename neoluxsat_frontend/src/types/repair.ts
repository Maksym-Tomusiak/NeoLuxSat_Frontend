// src/types/repair.ts

import type { RepairStatusDto } from '@/types/repairStatus';
import type { RepairPaymentDto } from '@/types/repairPayment';
import type { UserDto } from '@/types/user';

export interface RepairDto {
  id: string;
  displayId: number;
  userId: string | null;
  statusId: string;
  paymentId: string;
  firstName: string | null;
  lastName: string;
  phoneNumber: string;
  city: string | null;
  street: string | null;
  equipmentType: string | null;
  equipmentModel: string;
  serialNumber: string | null;
  complection: string | null; // <-- CORRECTED
  state: string | null;
  issue: string;
  repairDate: Date | null;
  usedMaterials: string | null; // <-- CORRECTED
  materialsCost: number;
  jobDone: string | null;
  jobCost: number;
  masterConclusion: string | null;
  managerComment: string | null;

  user: UserDto | null;
  status: RepairStatusDto | null;
  payment: RepairPaymentDto | null;
}

export interface RepairCreateDto {
  statusId: string;
  paymentId: string;
  lastName: string;
  phoneNumber: string;
  equipmentModel: string;
  issue: string;

  userId?: string;
  firstName?: string;
  city?: string;
  street?: string;
  equipmentType?: string;
  serialNumber?: string;
  complection?: string; // <-- CORRECTED
  state?: string;
  repairDate?: string; // Stays string for the form input
  usedMaterials?: string; // <-- CORRECTED
  materialsCost?: number;
  jobDone?: string;
  jobCost?: number;
  masterConclusion?: string;
  managerComment?: string;
}

export interface RepairUpdateDto {
  id: string;

  statusId: string;
  paymentId: string;
  lastName: string;
  phoneNumber: string;
  equipmentModel: string;
  issue: string;

  userId?: string;
  firstName?: string;
  city?: string;
  street?: string;
  equipmentType?: string;
  serialNumber?: string;
  complection?: string; // <-- CORRECTED
  state?: string;
  repairDate?: string; // Stays string for the form input
  usedMaterials?: string; // <-- CORRECTED
  materialsCost?: number;
  jobDone?: string;
  jobCost?: number;
  masterConclusion?: string;
  managerComment?: string;
}
