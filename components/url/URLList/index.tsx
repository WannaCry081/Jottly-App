"use client";

import { useEffect, useState } from "react";
import { useGetShortenUrlList } from "@/hooks";
import { decrypt } from "@/utils/password";
import { Link as LinkIcon } from "lucide-react";

// UI Components
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

// Custom Components
import { URLListItem } from "./components/URLListItem";

// Hooks
import { usePagination } from "./hooks/usePagination";
import { useQRCode } from "./hooks/useQRCode";

// Types
import type { URL } from "@/types/url";

const PAGE_SIZE = 4;

const URLList = ({ limit }: { limit?: number }) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const [ownerId, setOwnerId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("jotty-id");
    if (id) setOwnerId(id);
  }, []);

  const { data, isLoading } = useGetShortenUrlList(ownerId ?? "");
  const urls = data?.data ?? [];

  const { page, totalPages, goNext, goPrevious, pagedData } = usePagination(
    urls.length,
    PAGE_SIZE
  );
  const { qrCodeUrl, selectedQR, generate, reset } = useQRCode();

  if (isLoading) {
    return (
      <ul className="space-y-2">
        {Array.from({ length: limit ?? PAGE_SIZE }).map((_, i) => (
          <li key={i}>
            <Skeleton className="rounded-md h-20 w-full mb-2" />
          </li>
        ))}
      </ul>
    );
  }

  if (!urls.length) {
    return (
      <div className="text-center space-y-6 py-20 border border-dashed rounded-md">
        <div className="mx-auto w-fit">
          <div className="bg-muted/30 w-24 h-24 rounded-2xl grid place-items-center shadow-sm">
            <LinkIcon className="size-12 text-muted-foreground/80" />
          </div>
        </div>
        <div className="leading-tight">
          <h3 className="text-lg font-medium">No shortened URLs found</h3>
          <p className="text-sm text-muted-foreground">
            Please try creating a new shortened link.
          </p>
        </div>
      </div>
    );
  }

  const sorted = urls.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const displayUrls = limit ? sorted.slice(0, limit) : pagedData(sorted);

  return (
    <>
      <ul className="space-y-2">
        {displayUrls.map(({ id, originalUrl, code, password, clicks }: URL) => (
          <li key={id}>
            <URLListItem
              baseUrl={baseUrl}
              originalUrl={originalUrl}
              code={code}
              password={password ? decrypt(password).toString() : null}
              clicks={clicks}
              qrCodeUrl={qrCodeUrl}
              selectedQR={selectedQR}
              generateQRCode={generate}
              resetQRCode={reset}
            />
          </li>
        ))}
      </ul>

      {!limit && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={goPrevious} />
            </PaginationItem>
            <PaginationItem>
              <span className="px-4 text-sm text-muted-foreground">
                Page {page + 1} of {totalPages}
              </span>
              <PaginationNext onClick={goNext} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default URLList;
