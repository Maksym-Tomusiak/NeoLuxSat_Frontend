import type { PaginationParams } from '@/types/paginationParams';

export class TextService {
  public static truncate(text: string, length: number): string {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  }

  public static paginationToText(pagination: PaginationParams): string {
    const queryParams = new URLSearchParams();
    if (pagination.pageNumber != null)
      queryParams.append('pageNumber', pagination.pageNumber.toString());
    if (pagination.pageSize != null)
      queryParams.append('pageSize', pagination.pageSize.toString());
    if (pagination.searchTerm)
      queryParams.append('searchTerm', pagination.searchTerm);
    if (pagination.sortBy) queryParams.append('sortBy', pagination.sortBy);
    if (pagination.sortDescending != null)
      queryParams.append(
        'sortDescending',
        pagination.sortDescending.toString()
      );
    return `?${queryParams.toString()}`;
  }
}
