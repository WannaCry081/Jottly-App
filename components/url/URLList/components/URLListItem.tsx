"use client";

import Image from "next/image";
import Link from "next/link";
import { Copy, QrCode } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

// UI
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

import { PasswordOverlay } from "./PasswordOverlay";

type Props = {
  baseUrl: string;
  originalUrl: string;
  code: string;
  password?: string | null;
  clicks: number;
  qrCodeUrl: string | null;
  selectedQR: string | null;
  generateQRCode: (url: string) => void;
  resetQRCode: () => void;
};

export const UrlListItem = ({
  baseUrl,
  originalUrl,
  code,
  password,
  clicks,
  qrCodeUrl,
  selectedQR,
  generateQRCode,
  resetQRCode,
}: Props) => {
  const [visible, setVisible] = useState(true);
  const shortUrl = `${baseUrl}/${code}`;

  return (
    <Card className="rounded-md py-0 shadow-none">
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4">
          <CardHeader className="flex-1 p-0">
            <CardTitle className="text-sm w-[calc(100%-10px)] overflow-hidden text-ellipsis">
              <Link
                href={shortUrl}
                target="_blank"
                className="hover:underline underline-offset-2"
              >
                {shortUrl}
              </Link>
            </CardTitle>
            <p className="text-xs text-muted-foreground w-[calc(100%-20px)] overflow-hidden text-ellipsis">
              {originalUrl}
            </p>
          </CardHeader>

          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {clicks} Click{clicks === 1 ? "" : "s"}
            </Badge>
            <Dialog
              open={selectedQR === shortUrl}
              onOpenChange={(open) => !open && resetQRCode()}
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
                  <DialogTitle>Jottly Shortened URL</DialogTitle>
                  <DialogDescription>
                    Copy, scan, or download the QR code to access your shortened
                    URL.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-2 py-2">
                  {qrCodeUrl ? (
                    <Image
                      src={qrCodeUrl}
                      alt="QR Code"
                      width={160}
                      height={160}
                      unoptimized
                    />
                  ) : (
                    <Skeleton className="size-56 rounded-md" />
                  )}
                  <div className="w-full p-2 text-sm text-center font-medium">
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
                    <Copy /> Copy URL
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={!qrCodeUrl}
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = qrCodeUrl!;
                      link.download = `jottly-qr-${code}.png`;
                      link.click();
                    }}
                  >
                    <QrCode /> Download QR Code
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {password && (
          <CardFooter className="bg-primary/5 px-4 py-2 text-xs text-center font-medium relative">
            {password}
            <PasswordOverlay
              visible={visible}
              onToggle={() => setVisible((v) => !v)}
            />
          </CardFooter>
        )}
      </CardContent>
    </Card>
  );
};
