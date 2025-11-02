import type { FaqCreateDto, FaqDto, FaqUpdateDto } from '@/types/faq';
import { HttpClient } from './HttpClient';
import type { PaginationParams } from '@/types/paginationParams';
import { TextService } from './textService';
import type { PaginatedResult } from '@/types/paginatedResult';

export class FaqService {
  static async getAllFaqs(signal?: AbortSignal): Promise<FaqDto[]> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/faqs`,
      signal,
    });
    return await httpClient.get('');
  }

  static async getAllFaqsPaginated(
    pagination: PaginationParams,
    signal?: AbortSignal
  ): Promise<PaginatedResult<FaqDto>> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/faqs`,
      signal,
    });
    return await httpClient.get(
      `paginated${TextService.paginationToText(pagination)}`
    );
  }

  /**
   * @param {string} id
   * @param {AbortSignal} signal
   */
  static async getFaqById(id: string, signal?: AbortSignal): Promise<FaqDto> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/faqs`,
      signal,
    });
    return await httpClient.get(`/${id}`);
  }

  /**
   * @param {object} faq
   * @param {AbortSignal} signal
   */
  static async createFaq(faq: FaqCreateDto, signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/faqs`,
      signal,
    });
    return await httpClient.post('', faq);
  }

  /**
   * @param {string} id
   * @param {object} faq
   * @param {AbortSignal} signal
   */
  static async updateFaq(id: string, faq: FaqUpdateDto, signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/faqs`,
      signal,
    });
    return await httpClient.put(`/${id}`, faq);
  }

  /**
   * @param {string} id
   * @param {AbortSignal} signal
   */
  static async deleteFaqById(id: string, signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/faqs`,
      signal,
    });
    return await httpClient.delete(`/${id}`);
  }
}
