import type {
  PropositionCreateDto,
  PropositionDto,
  PropositionUpdateDto,
} from "@/types/proposition";
import { HttpClient } from "./HttpClient";
import type { PaginationParams } from "@/types/paginationParams";
import { TextService } from "./textService";
import type { PaginatedResult } from "@/types/paginatedResult";

export class PropositionService {
  static async getAllPropositions(signal?: AbortSignal) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/propositions`,
      signal,
    });
    return await httpClient.get("");
  }

  static async getAllPropositionsPaginated(
    pagination: PaginationParams,
    signal?: AbortSignal
  ): Promise<PaginatedResult<PropositionDto>> {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/propositions`,
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
  static async getPropositionById(id: string, signal?: AbortSignal) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/propositions`,
      signal,
    });
    return await httpClient.get(`/${id}`);
  }

  /**
   * @param {object} proposition
   * @param {AbortSignal} signal
   */
  static async createProposition(
    proposition: PropositionCreateDto,
    signal?: AbortSignal
  ) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/propositions`,
      signal,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    return await httpClient.post("", proposition);
  }

  /**
   * @param {object} proposition
   * @param {AbortSignal} signal
   */
  static async updateProposition(
    proposition: PropositionUpdateDto,
    signal?: AbortSignal
  ) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/propositions`,
      signal,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    return await httpClient.put(`${proposition.id}`, proposition);
  }

  /**
   * @param {number} id
   * @param {AbortSignal} signal
   */
  static async deletePropositionById(id: string, signal?: AbortSignal) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/propositions`,
      signal,
    });
    return await httpClient.delete(`/${id}`);
  }
}
