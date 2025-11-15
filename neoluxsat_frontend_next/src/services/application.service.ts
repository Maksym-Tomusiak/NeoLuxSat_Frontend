import type {
  ApplicationCreateDto,
  ApplicationCreatePropositionDto,
  ApplicationDto,
  ApplicationUpdateDto,
} from "@/types/application";
import { HttpClient } from "./HttpClient";
import type { PaginationParams } from "@/types/paginationParams";
import { TextService } from "./textService";
import type { PaginatedResult } from "@/types/paginatedResult";

export class ApplicationService {
  static async getAllApplications(
    signal?: AbortSignal
  ): Promise<ApplicationDto[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/applications`,
      signal,
    });
    return await httpClient.get("");
  }

  static async getAllApplicationsPaginated(
    pagination: PaginationParams,
    signal?: AbortSignal
  ): Promise<PaginatedResult<ApplicationDto>> {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/applications`,
      signal,
    });
    return await httpClient.get(
      `paginated${TextService.paginationToText(pagination)}`
    );
  }

  static async getApplicationsCountByTypes(signal?: AbortSignal) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/applications/count-by-types`,
      signal,
    });
    return await httpClient.get("");
  }

  static async getApplicationsCountByStatuses(signal?: AbortSignal) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/applications/count-by-statuses`,
      signal,
    });
    return await httpClient.get("");
  }

  static async getLatestApplications(count: number, signal?: AbortSignal) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/applications/latest/${count}`,
      signal,
    });
    return await httpClient.get("");
  }

  static async getApplicationsCountByRecentDays(
    days: number,
    hoursOffset: number,
    signal?: AbortSignal
  ) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/applications/latest-count/${days}/${hoursOffset}`,
      signal,
    });
    return await httpClient.get("");
  }

  /**
   * @param {object} application
   * @param {AbortSignal} signal
   */
  static async createApplication(
    application: ApplicationCreateDto,
    signal?: AbortSignal
  ) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/applications`,
      signal,
    });
    return await httpClient.post("", application);
  }

  static async createApplicationProposition(
    application: ApplicationCreatePropositionDto,
    signal?: AbortSignal
  ) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/applications/proposition`,
      signal,
    });
    return await httpClient.post("", application);
  }

  /**
   * @param {string} id
   * @param {object} application
   * @param {AbortSignal} signal
   */
  static async updateApplication(
    id: string,
    application: ApplicationUpdateDto,
    signal?: AbortSignal
  ) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/applications`,
      signal,
    });
    return await httpClient.put(`/${id}`, application);
  }

  /**
   * @param {string} id
   * @param {AbortSignal} signal
   */
  static async deleteApplicationById(id: string, signal?: AbortSignal) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/applications`,
      signal,
    });
    return await httpClient.delete(`/${id}`);
  }
}
