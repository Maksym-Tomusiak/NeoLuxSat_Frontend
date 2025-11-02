import type {
  NetworkProblemCreateDto,
  NetworkProblemDto,
  NetworkProblemUpdateDto,
} from '@/types/networkProblem';
import { HttpClient } from './HttpClient';
import type { PaginationParams } from '@/types/paginationParams';
import type { PaginatedResult } from '@/types/paginatedResult';
import { TextService } from './textService';

export class NetworkProblemService {
  static async getAllNetworkProblems(signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/networkProblems`,
      signal,
    });
    return await httpClient.get('');
  }

  static async getAllNetworkProblemStatuses(signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/networkProblemStatuses`,
      signal,
    });
    return await httpClient.get('');
  }

  static async getAllNetworkProblemServices(signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/networkProblemServices`,
      signal,
    });
    return await httpClient.get('');
  }

  static async getAllNetworkProblemsPaginated(
    pagination: PaginationParams,
    signal?: AbortSignal
  ): Promise<PaginatedResult<NetworkProblemDto>> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/networkProblems`,
      signal,
    });
    return await httpClient.get(
      `paginated${TextService.paginationToText(pagination)}`
    );
  }

  /**
   * @param {object} networkproblem
   * @param {AbortSignal} signal
   */
  static async createNetworkProblem(
    networkproblem: NetworkProblemCreateDto,
    signal?: AbortSignal
  ) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/networkProblems`,
      signal,
    });
    return await httpClient.post('', networkproblem);
  }

  /**
   * @param {object} networkproblem
   * @param {AbortSignal} signal
   */
  static async updateNetworkProblem(
    networkproblem: NetworkProblemUpdateDto,
    signal?: AbortSignal
  ) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/networkProblems`,
      signal,
    });
    return await httpClient.put(`${networkproblem.id}`, networkproblem);
  }

  /**
   * @param {number} id
   * @param {AbortSignal} signal
   */
  static async deleteNetworkProblemById(id: string, signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/networkProblems`,
      signal,
    });
    return await httpClient.delete(`${id}`);
  }

  static async toggleActiveNetworkProblem(
    id: string,
    signal?: AbortSignal
  ): Promise<NetworkProblemDto> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/networkProblems`,
      signal,
    });
    return await httpClient.patch(`${id}/toggle-active`);
  }
}
