export interface NetworkProblemServiceDto {
  id: string;
  title: string;
}

export interface NetworkProblemStatusDto {
  id: string;
  title: string;
}

export interface NetworkProblemDto {
  id: string;
  title: string;
  address: string;
  currentStatus: string;
  fixStartTime: string | null;
  fixEndTime: string | null;
  createdAt: Date;
  isActive: boolean;
  networkProblemStatusId: string;
  networkProblemStatus: NetworkProblemStatusDto;
  networkProblemServices: NetworkProblemServiceDto[];
}

export interface NetworkProblemCreateDto {
  title: string;
  address: string;
  currentStatus: string;
  fixStartTime: Date | null;
  fixEndTime: Date | null;
  networkProblemStatusId: string;
  networkProblemServicesIds: string[];
}

export interface NetworkProblemUpdateDto {
  id: string;
  title: string;
  address: string;
  currentStatus: string;
  fixStartTime: Date | null;
  fixEndTime: Date | null;
  networkProblemStatusId: string;
  networkProblemServicesIds: string[];
}
