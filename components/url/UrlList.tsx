"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Copy, Lock, Link as LinkIcon } from "lucide-react";

// Hooks
import { useGetShortenUrlList } from "@/hooks";

// Components
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

// Utility functions
import { decrypt } from "@/utils/password";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const PAGE_SIZE = 5;

export const UrlList = ({ limit }: { limit?: number }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const [ownerId, setOwnerId] = useState<string | null>(null);

  useEffect(() => {
    if (!ownerId) {
      const id = localStorage.getItem("jotty-id");
      setOwnerId(id);
    }
  }, [ownerId]);

  const { data, isLoading } = useGetShortenUrlList(ownerId ?? "");

  // Pagination state (only if limit is not set)
  const [page, setPage] = useState(0);

  if (isLoading) {
    // Skeleton loader for URL list using Skeleton component
    return (
      <ul className="space-y-2">
        {[...Array(limit ?? PAGE_SIZE)].map((_, i) => (
          <li key={i}>
            <Skeleton className="rounded-md h-20 w-full mb-2" />
          </li>
        ))}
      </ul>
    );
  }

  if (data.urls.length === 0) {
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

  if (limit) {
    const sortedData = data.urls
      .sort(
        (
          a: { createdAt: string | number | Date },
          b: { createdAt: string | number | Date }
        ) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
      )
      .slice(0, limit ?? PAGE_SIZE);

    return (
      <React.Fragment>
        <ul className="space-y-2">
          {sortedData.map(
            ({
              id,
              originalUrl,
              code,
              password,
              clicks,
            }: (typeof data.urls)[0]) => {
              const decryptedPassword = password
                ? decrypt(password ?? "").toString()
                : null;
              return (
                <li key={id}>
                  <UrlListItem
                    baseUrl={baseUrl}
                    originalUrl={originalUrl}
                    code={code}
                    password={decryptedPassword}
                    clicks={clicks}
                  />
                </li>
              );
            }
          )}
        </ul>
      </React.Fragment>
    );
  }

  const sortedData = data.urls.sort(
    (
      a: { createdAt: string | number | Date },
      b: { createdAt: string | number | Date }
    ) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);
  const pagedData = sortedData.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <React.Fragment>
      <ul className="space-y-2">
        {pagedData.map(
          ({
            id,
            originalUrl,
            code,
            password,
            clicks,
          }: (typeof data.urls)[0]) => {
            const decryptedPassword = password
              ? decrypt(password ?? "").toString()
              : null;
            return (
              <li key={id}>
                <UrlListItem
                  baseUrl={baseUrl}
                  originalUrl={originalUrl}
                  code={code}
                  password={decryptedPassword}
                  clicks={clicks}
                />
              </li>
            );
          }
        )}
      </ul>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (page > 0) setPage((p) => Math.max(0, p - 1));
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <span className="px-4 text-sm text-muted-foreground">
              Page {page + 1} of {totalPages}
            </span>
            <PaginationNext
              onClick={() => {
                if (page < totalPages - 1)
                  setPage((p) => Math.min(totalPages - 1, p + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </React.Fragment>
  );
};

const UrlListItem = ({
  baseUrl,
  originalUrl,
  code,
  password,
  clicks,
}: {
  baseUrl: string;
  originalUrl: string;
  code: string;
  password?: string | null;
  clicks: number;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);

  return (
    <Card className="rounded-md py-0 shadow-none">
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4">
          <CardHeader className="flex-1 p-0">
            <CardTitle className="text-sm text-ellipsis overflow-hidden w-[calc(100%-10px)]">
              <Link
                href={`${baseUrl}/${code}`}
                className="hover:underline underline-offset-2"
                target="_blank"
              >
                {baseUrl}/{code}
              </Link>
            </CardTitle>
            <p className="text-xs text-ellipsis text-muted-foreground overflow-hidden w-[calc(100%-20px)]">
              {originalUrl}
            </p>
          </CardHeader>

          <span className="inline-flex items-center gap-2">
            <Badge variant="outline" className="hidden sm:block">
              {clicks === 1 ? `${clicks} Click` : `${clicks} Clicks`}
            </Badge>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={`Copy shortened URL ${baseUrl}/${code} to clipboard`}
                  title={`Copy ${baseUrl}/${code}`}
                  onClick={() => {
                    navigator.clipboard.writeText(`${baseUrl}/${code}`);
                    toast.success("Successfully copied to clipboard", {
                      description: `${baseUrl}/${code} copied!`,
                    });
                  }}
                >
                  <Copy
                    className="size-4"
                    aria-hidden="true"
                    focusable="false"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy to Clipboard</p>
              </TooltipContent>
            </Tooltip>
          </span>
        </div>
        {password && (
          <CardFooter className="bg-primary/5 m-0 px-4 py-2 text-xs w-full block text-center font-medium relative">
            {password}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  variant="ghost"
                  aria-label={
                    isPasswordVisible ? "Hide password" : "Show password"
                  }
                  title={isPasswordVisible ? "Hide password" : "Show password"}
                  className={cn(
                    "w-full h-full absolute backdrop-blur-sm z-10 inset-0 grid place-items-center hover:bg-transparent",
                    isPasswordVisible ? "" : "backdrop-blur-none"
                  )}
                >
                  <Lock
                    className={cn(
                      "size-3.5",
                      isPasswordVisible ? "" : "hidden"
                    )}
                    aria-hidden={!isPasswordVisible}
                    focusable="false"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>URL Password</p>
              </TooltipContent>
            </Tooltip>
          </CardFooter>
        )}
      </CardContent>
    </Card>
  );
};
