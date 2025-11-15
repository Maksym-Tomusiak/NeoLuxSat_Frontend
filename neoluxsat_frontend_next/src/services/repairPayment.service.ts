import type { RepairPaymentDto } from "@/types/repairPayment";
import { HttpClient } from "./HttpClient";

export class RepairPaymentService {
  static async getAllRepairPayments(
    signal?: AbortSignal
  ): Promise<RepairPaymentDto[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/repair-payments`,
      signal,
    });
    return await httpClient.get("");
  }
}
