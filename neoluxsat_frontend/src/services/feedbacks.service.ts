import type { FeedbackCreateDto, FeedbackUpdateDto } from '@/types/feedback';
import { HttpClient } from './HttpClient';

export class FeedbackService {
  static async getAllFeedbacks(signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/feedbacks`,
      signal,
    });
    return await httpClient.get('');
  }

  /**
   * @param {number} id
   * @param {AbortSignal} signal
   */
  static async getFeedbackById(id: string, signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/feedbacks`,
      signal,
    });
    return await httpClient.get(`/${id}`);
  }

  /**
   * @param {object} feedback
   * @param {AbortSignal} signal
   */
  static async createFeedback(
    feedback: FeedbackCreateDto,
    signal?: AbortSignal
  ) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/feedbacks`,
      signal,
    });
    return await httpClient.post('/add', feedback);
  }

  /**
   * @param {object} feedback
   * @param {AbortSignal} signal
   */
  static async updateFeedback(
    feedback: FeedbackUpdateDto,
    signal?: AbortSignal
  ) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/feedbacks`,
      signal,
    });
    return await httpClient.put('/update', feedback);
  }

  /**
   * @param {number} id
   * @param {AbortSignal} signal
   */
  static async deleteFeedbackById(id: string, signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/feedbacks`,
      signal,
    });
    return await httpClient.delete(`/delete/${id}`);
  }
}
