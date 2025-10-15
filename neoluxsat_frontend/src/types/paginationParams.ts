export interface PaginationParams {
  pageNumber: number | null;
  pageSize: number | null;
  searchTerm: string | null;
  sortBy: string | null;
  sortDescending: boolean | null;
}
