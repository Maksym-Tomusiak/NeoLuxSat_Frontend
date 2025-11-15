import type {
  RepairCreateDto,
  RepairDto,
  RepairUpdateDto,
} from "@/types/repair";
import { HttpClient } from "./HttpClient";
import { TextService } from "./textService";
import type { PaginatedResult } from "@/types/paginatedResult";
import type { RepairPaginationParams } from "@/types/paginationParams";

export type FileDownload = {
  blob: Blob;
  fileName: string;
};

export class RepairService {
  static async getAllRepairsPaginated(
    pagination: RepairPaginationParams,
    signal?: AbortSignal
  ): Promise<PaginatedResult<RepairDto>> {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
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
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/repairs`,
      signal,
    });
    return await httpClient.get(`/${id}`);
  }

  static async getLatestRepairs(count: number, signal?: AbortSignal) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/repairs/latest/${count}`,
      signal,
    });
    return await httpClient.get("");
  }

  static async getRepairsCountByRecentDays(
    days: number,
    hoursOffset: number,
    signal?: AbortSignal
  ) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/repairs/latest-count/${days}/${hoursOffset}`,
      signal,
    });
    return await httpClient.get("");
  }

  static async createRepair(repair: RepairCreateDto, signal?: AbortSignal) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/repairs`,
      signal,
    });
    return await httpClient.post("", repair);
  }

  static async updateRepair(
    id: string,
    repair: RepairUpdateDto,
    signal?: AbortSignal
  ) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/repairs`,
      signal,
    });
    return await httpClient.put(`/${id}`, repair);
  }

  static async deleteRepairById(id: string, signal?: AbortSignal) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
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
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
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
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/repairs`,
      signal,
    });
    return await httpClient.put(
      `/payment?repairId=${repairId}&paymentId=${paymentId}`,
      null
    );
  }

  // --- UPDATED METHOD ---
  static async downloadRepairInvoice(
    id: string,
    signal?: AbortSignal
  ): Promise<FileDownload> {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/repairs`,
      signal,
      // No responseType here, it's set in getBlob
    });

    const response = await httpClient.getBlob(`/${id}/invoice`, signal);

    const blob = response.data;

    const contentDisposition = response.headers["content-disposition"];
    let fileName = "invoice.pdf"; // Fallback name for PDF
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="?(.+?)"?$/);
      if (fileNameMatch && fileNameMatch[1]) {
        fileName = fileNameMatch[1];
      }
    }

    // 4. Check if the blob is a PDF (as expected)
    if (blob.type !== "application/pdf") {
      console.warn(`Downloaded file is not a PDF, but ${blob.type}`);
    }

    return { blob, fileName };
  }
}
