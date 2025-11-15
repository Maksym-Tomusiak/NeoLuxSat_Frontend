import type { RoleDto } from "@/types/role";
import { HttpClient } from "./HttpClient";

export class RoleService {
  static async getAllRoles(signal?: AbortSignal): Promise<RoleDto[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/roles`,
      signal,
    });
    return await httpClient.get("");
  }
}
