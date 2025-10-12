import type {
  ApplicationCreateDto,
  ApplicationDto,
  ApplicationUpdateDto,
} from '@/types/application';
import { HttpClient } from './HttpClient';

export class ApplicationService {
  static async getAllApplications(
    signal?: AbortSignal
  ): Promise<ApplicationDto[]> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/applications`,
      signal,
    });
    return await httpClient.get('');
  }

  static async getApplicationsCountByTypes(signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/applications/count-by-types`,
      signal,
    });
    return await httpClient.get('');
  }

  static async getApplicationsCountByStatuses(signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/applications/count-by-statuses`,
      signal,
    });
    return await httpClient.get('');
  }

  static async getLatestApplications(count: number, signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/applications/latest/${count}`,
      signal,
    });
    return await httpClient.get('');
  }

  static async getApplicationsCountByRecentDays(
    days: number,
    hoursOffset: number,
    signal?: AbortSignal
  ) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/applications/latest-count/${days}/${hoursOffset}`,
      signal,
    });
    return await httpClient.get('');
  }

  /**
   * @param {object} application
   * @param {AbortSignal} signal
   */
  static async createApplication(
    application: ApplicationCreateDto,
    signal?: AbortSignal
  ) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/applications`,
      signal,
    });
    return await httpClient.post('', application);
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
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
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
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/applications`,
      signal,
    });
    return await httpClient.delete(`/${id}`);
  }
}
