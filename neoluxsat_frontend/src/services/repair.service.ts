import type {
  RepairCreateDto,
  RepairDto,
  RepairUpdateDto,
} from '@/types/repair';
import { HttpClient } from './HttpClient';
import { TextService } from './textService';
import type { PaginatedResult } from '@/types/paginatedResult';
import type { RepairPaginationParams } from '@/types/paginationParams';

export class RepairService {
  static async getAllRepairsPaginated(
    pagination: RepairPaginationParams,
    signal?: AbortSignal
  ): Promise<PaginatedResult<RepairDto>> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/repairs`,
      signal,
    });
    return await httpClient.get(
      `paginated${TextService.repairPaginationToText(pagination)}`
    );
  }

  static async getRepairById(
    id: string,
    signal?: AbortSignal
  ): Promise<RepairDto> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/repairs`,
      signal,
    });
    return await httpClient.get(`/${id}`);
  }

  static async createRepair(repair: RepairCreateDto, signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/repairs`,
      signal,
    });
    return await httpClient.post('', repair);
  }

  static async updateRepair(
    id: string,
    repair: RepairUpdateDto,
    signal?: AbortSignal
  ) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/repairs`,
      signal,
    });
    return await httpClient.put(`/${id}`, repair);
  }

  static async deleteRepairById(id: string, signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/repairs`,
      signal,
    });
    return await httpClient.delete(`/${id}`);
  }

  static async updateRepairStatus(
    repairId: string,
    statusId: string,
    signal?: AbortSignal
  ) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/repairs`,
      signal,
    });
    return await httpClient.put(
      `/status?repairId=${repairId}&statusId=${statusId}`,
      null
    );
  }

  static async updateRepairPayment(
    repairId: string,
    paymentId: string,
    signal?: AbortSignal
  ) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/repairs`,
      signal,
    });
    return await httpClient.put(
      `/payment?repairId=${repairId}&paymentId=${paymentId}`,
      null
    );
  }
}
