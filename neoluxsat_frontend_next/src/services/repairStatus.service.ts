import { HttpClient } from "./HttpClient";
import type { RepairStatusDto } from "@/types/repairStatus";

export class RepairStatusService {
  static async getAllRepairStatuses(
    signal?: AbortSignal
  ): Promise<RepairStatusDto[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/repair-statuses`,
      signal,
    });
    return await httpClient.get("");
  }
}
