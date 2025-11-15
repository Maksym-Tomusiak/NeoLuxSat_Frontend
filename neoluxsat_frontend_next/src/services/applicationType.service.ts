import type { ApplicationTypeDto } from "@/types/application";
import { HttpClient } from "./HttpClient";

export class ApplicationTypeService {
  static async getAllApplicationTypes(
    signal?: AbortSignal
  ): Promise<ApplicationTypeDto[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/application-types`,
      signal,
    });
    return await httpClient.get("");
  }
}
