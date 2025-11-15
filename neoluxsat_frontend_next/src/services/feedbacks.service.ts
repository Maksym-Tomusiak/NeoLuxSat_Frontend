import type {
  FeedbackCreateDto,
  FeedbackDto,
  FeedbackUpdateDto,
} from "@/types/feedback";
import { HttpClient } from "./HttpClient";
import type { PaginationParams } from "@/types/paginationParams";
import { TextService } from "./textService";
import type { PaginatedResult } from "@/types/paginatedResult";

export class FeedbackService {
  static async getAllFeedbacks(signal?: AbortSignal) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/feedbacks`,
      signal,
    });
    return await httpClient.get("");
  }

  static async getAllFeedbacksPaginated(
    pagination: PaginationParams,
    signal?: AbortSignal
  ): Promise<PaginatedResult<FeedbackDto>> {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/feedbacks`,
      signal,
    });
    return await httpClient.get(
      `paginated${TextService.paginationToText(pagination)}`
    );
  }

  /**
   * @param {number} id
   * @param {AbortSignal} signal
   */
  static async getFeedbackById(id: string, signal?: AbortSignal) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
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
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/feedbacks`,
      signal,
    });
    return await httpClient.post("", feedback);
  }

  /**
   * @param {object} feedback
   * @param {AbortSignal} signal
   */
  static async updateFeedback(
    feedback: FeedbackUpdateDto,
    signal?: AbortSignal
  ) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/feedbacks`,
      signal,
    });
    return await httpClient.put(`${feedback.id}`, feedback);
  }

  /**
   * @param {number} id
   * @param {AbortSignal} signal
   */
  static async deleteFeedbackById(id: string, signal?: AbortSignal) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/feedbacks`,
      signal,
    });
    return await httpClient.delete(`/${id}`);
  }
}
