import { useState } from "react";

export const usePagination = (totalItems: number, pageSize: number) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(totalItems / pageSize);

  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));
  const goPrevious = () => setPage((p) => Math.max(0, p - 1));

  const pagedData = <T>(data: T[]) => {
    return data.slice(page * pageSize, (page + 1) * pageSize);
  };

  return { page, totalPages, goNext, goPrevious, pagedData };
};
