import { useState } from "react";

type PaginationReturnType<T> = {
  page: number;
  totalPages: number;
  goNext: () => void;
  goPrevious: () => void;
  pagedData: (data: T[]) => T[];
};

export const usePagination = <T>(
  totalItems: number,
  pageSize: number,
): PaginationReturnType<T> => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(totalItems / pageSize);

  const goNext = (): void => setPage((p) => Math.min(totalPages - 1, p + 1));
  const goPrevious = (): void => setPage((p) => Math.max(0, p - 1));

  const pagedData = <T>(data: T[]): T[] => {
    return data.slice(page * pageSize, (page + 1) * pageSize);
  };

  return { page, totalPages, goNext, goPrevious, pagedData };
};
