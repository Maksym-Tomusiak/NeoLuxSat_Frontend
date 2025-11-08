import type {
  PaginationParams,
  RepairPaginationParams,
} from '@/types/paginationParams';

export class TextService {
  public static truncate(text: string, length: number): string {
    return text.length > length ? text.substring(0, length) + '...' : text;
  }

  private static basePaginationToText(
    pagination: PaginationParams
  ): URLSearchParams {
    const queryParams = new URLSearchParams();

    const { pageNumber, pageSize, searchTerm, sortBy, sortDescending } =
      pagination;

    if (pageNumber != null)
      queryParams.append('pageNumber', pageNumber.toString());
    if (pageSize != null) queryParams.append('pageSize', pageSize.toString());
    if (searchTerm) queryParams.append('searchTerm', searchTerm);
    if (sortBy) queryParams.append('sortBy', sortBy);
    if (sortDescending != null)
      queryParams.append('sortDescending', sortDescending.toString());

    return queryParams;
  }

  public static paginationToText(pagination: PaginationParams): string {
    const queryParams = this.basePaginationToText(pagination);
    return `?${queryParams.toString()}`;
  }

  public static repairPaginationToText(
    pagination: RepairPaginationParams
  ): string {
    const queryParams = this.basePaginationToText(pagination);

    if (pagination.statusId)
      queryParams.append('statusId', pagination.statusId);
    if (pagination.paymentId)
      queryParams.append('paymentId', pagination.paymentId);

    return `?${queryParams.toString()}`;
  }
}
