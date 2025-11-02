export interface ApplicationTypeDto {
  id: string;
  title: string;
}

export interface ApplicationStatusDto {
  id: string;
  title: string;
}

export interface ApplicationDto {
  id: string;
  fullName: string;
  email: string;
  address: string;
  phone: string;
  typeId: string;
  statusId: string;
  type: ApplicationTypeDto | null;
  status: ApplicationStatusDto | null;
  createdAt: Date;
}

export interface ApplicationCreateDto {
  fullName: string;
  email: string;
  address: string;
  phone: string;
  typeId: string;
}

export interface ApplicationUpdateDto {
  id: string;
  fullName: string;
  email: string;
  address: string;
  phone: string;
  typeId: string;
  statusId: string;
}

export interface ApplicationCreatePropositionDto {
  phone: string;
}
