import type {
  NetworkProblemCreateDto,
  NetworkProblemUpdateDto,
} from '@/types/networkProblem';
import { HttpClient } from './HttpClient';

export class NetworkProblemService {
  static async getAllNetworkProblems(signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/networkProblems`,
      signal,
    });
    return await httpClient.get('');
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
    return await httpClient.post('/add', networkproblem);
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
    return await httpClient.put('/update', networkproblem);
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
    return await httpClient.delete(`/delete/${id}`);
  }
}
