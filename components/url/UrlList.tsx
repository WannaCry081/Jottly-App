"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Copy, Lock, QrCode, Link as LinkIcon } from "lucide-react";
import QRCode from "qrcode";

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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Url } from "@/types/url";

const PAGE_SIZE = 4;

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

  // QR code state
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);

  const generateQRCode = async (shortUrl: string) => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(shortUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      setQrCodeUrl(qrCodeDataUrl);
      setSelectedQR(shortUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

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

  if (data?.urls.length === 0) {
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
    const sortedData = data?.urls
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
          {sortedData?.map(
            ({ id, originalUrl, code, password, clicks }: Url) => {
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
                    qrCodeUrl={qrCodeUrl}
                    selectedQR={selectedQR}
                    generateQRCode={generateQRCode}
                    setQrCodeUrl={setQrCodeUrl}
                    setSelectedQR={setSelectedQR}
                  />
                </li>
              );
            }
          )}
        </ul>
      </React.Fragment>
    );
  }

  const sortedData = data?.urls.sort(
    (
      a: { createdAt: string | number | Date },
      b: { createdAt: string | number | Date }
    ) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const totalPages = Math.ceil((sortedData?.length ?? 0) / PAGE_SIZE);
  const pagedData = sortedData?.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <React.Fragment>
      <ul className="space-y-2">
        {pagedData?.map(({ id, originalUrl, code, password, clicks }: Url) => {
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
                qrCodeUrl={qrCodeUrl}
                selectedQR={selectedQR}
                generateQRCode={generateQRCode}
                setQrCodeUrl={setQrCodeUrl}
                setSelectedQR={setSelectedQR}
              />
            </li>
          );
        })}
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
  qrCodeUrl,
  selectedQR,
  generateQRCode,
  setQrCodeUrl,
  setSelectedQR,
}: {
  baseUrl: string;
  originalUrl: string;
  code: string;
  password?: string | null;
  clicks: number;
  qrCodeUrl: string | null;
  selectedQR: string | null;
  generateQRCode: (shortUrl: string) => Promise<void>;
  setQrCodeUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedQR: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);
  const shortUrl = `${baseUrl}/${code}`;

  // Helper to handle QR dialog close
  const handleCloseQRDialog = () => {
    setQrCodeUrl(null);
    setSelectedQR(null);
  };

  return (
    <Card className="rounded-md py-0 shadow-none">
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4">
          <CardHeader className="flex-1 p-0">
            <CardTitle className="text-sm text-ellipsis overflow-hidden w-[calc(100%-10px)]">
              <Link
                href={shortUrl}
                className="hover:underline underline-offset-2"
                target="_blank"
              >
                {shortUrl}
              </Link>
            </CardTitle>
            <p className="text-xs text-ellipsis text-muted-foreground overflow-hidden w-[calc(100%-20px)]">
              {originalUrl}
            </p>
          </CardHeader>

          <span className="inline-flex items-center gap-2">
            <Badge variant="outline">
              {clicks === 1 ? `${clicks} Click` : `${clicks} Clicks`}
            </Badge>

            <Dialog
              open={selectedQR === shortUrl}
              onOpenChange={(open) => {
                if (!open) handleCloseQRDialog();
              }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => generateQRCode(shortUrl)}
                    >
                      <Copy />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Actions</p>
                </TooltipContent>
              </Tooltip>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-left">
                    Jottly Shortened URL
                  </DialogTitle>
                  <DialogDescription className="text-left text-sm text-muted-foreground">
                    Copy to clipboard, scan, or download the QR code to access
                    your shortened URL.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-2 py-2">
                  {qrCodeUrl ? (
                    <Image
                      src={qrCodeUrl}
                      alt="QR Code"
                      width={160}
                      height={160}
                      className="size-40"
                      unoptimized
                    />
                  ) : (
                    <Skeleton className="size-56 rounded-md" />
                  )}
                  <div className="w-full p-2 text-sm font-medium text-center">
                    {shortUrl}
                  </div>
                </div>
                <DialogFooter className="flex-row">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      navigator.clipboard.writeText(shortUrl);
                      toast.success("Copied URL to clipboard!");
                    }}
                  >
                    <Copy /> Copy <span className="hidden sm:inline">URL</span>
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      if (qrCodeUrl) {
                        const link = document.createElement("a");
                        link.href = qrCodeUrl;
                        link.download = `jottly-qr-${code}.png`;
                        link.click();
                      }
                    }}
                    disabled={!qrCodeUrl}
                  >
                    <QrCode />
                    Download <span className="hidden sm:inline">QR Code</span>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
