import type { FaqCategoryDto } from '@/types/faqCategory';
import { HttpClient } from './HttpClient';

export class FaqCategoryService {
  static async getAllFaqCategorys(
    signal?: AbortSignal
  ): Promise<FaqCategoryDto[]> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/faqCategories`,
      signal,
    });
    return await httpClient.get('');
  }
}
