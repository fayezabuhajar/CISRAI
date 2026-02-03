export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export const getPaginationParams = (
  page?: number,
  limit?: number,
): { skip: number; limit: number; page: number } => {
  const currentPage = Math.max(1, page || 1);
  const currentLimit = Math.min(100, Math.max(1, limit || 10));
  const skip = (currentPage - 1) * currentLimit;

  return { skip, limit: currentLimit, page: currentPage };
};

export const getPaginationMeta = (
  total: number,
  page: number,
  limit: number,
): PaginationMeta => {
  return {
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
  };
};
