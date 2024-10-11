/* eslint-disable @typescript-eslint/no-explicit-any */

export interface PaginationOptions {
  page: number;
  perPage: number;
  where?: Record<string, any>;
  include?: Array<any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
}
