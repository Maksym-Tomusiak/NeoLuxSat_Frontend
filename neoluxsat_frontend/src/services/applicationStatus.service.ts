import type { ApplicationStatusDto } from '@/types/application';
import { HttpClient } from './HttpClient';

export class ApplicationStatusService {
  static async getAllApplicationStatuss(
    signal?: AbortSignal
  ): Promise<ApplicationStatusDto[]> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/application-statuses`,
      signal,
    });
    return await httpClient.get('');
  }
}
