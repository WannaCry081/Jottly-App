"use client";

import { useEffect, useState } from "react";

// Icons
import { Copy, Lock } from "lucide-react";

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
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

// Utility functions
import { decrypt } from "@/utils/password";
import { cn } from "@/lib/utils";

export const UrlList = ({ limit }: { limit?: number }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const [ownerId, setOwnerId] = useState<string | null>(null);

  useEffect(() => {
    if (!ownerId) {
      const id = localStorage.getItem("jotty-id");
      setOwnerId(id);
    }
  }, []);

  const { data, isLoading } = useGetShortenUrlList(ownerId ?? "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
    .slice(0, limit ?? 8);

  return (
    <ul className="space-y-2">
      {sortedData.map(
        ({ id, originalUrl, code, password }: (typeof data.urls)[0]) => {
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
              />
            </li>
          );
        }
      )}
    </ul>
  );
};

const UrlListItem = ({
  baseUrl,
  originalUrl,
  code,
  password,
}: {
  baseUrl: string;
  originalUrl: string;
  code: string;
  password?: string | null;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);

  return (
    <Card className="rounded-md py-0 shadow-none">
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4">
          <CardHeader className="flex-1 p-0">
            <CardTitle className="text-sm text-ellipsis overflow-hidden w-[calc(100%-10px)]">
              {baseUrl}/{code}
            </CardTitle>
            <p className="text-xs text-ellipsis overflow-hidden w-[calc(100%-20px)]">
              {originalUrl}
            </p>
          </CardHeader>

          <span className="inline-flex items-center gap-2">
            <Badge variant="outline" className="hidden sm:block">
              23 Clicks
            </Badge>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(`${baseUrl}/${code}`);
                toast.success("Successfully copied to clipboard", {
                  description: `${baseUrl}/${code} copied!`,
                });
              }}
            >
              <Copy className="size-4" />
            </Button>
          </span>
        </div>
        {password && (
          <CardFooter className="bg-primary/5 m-0 px-4 py-2 text-xs w-full block text-center font-medium relative">
            {password}
            <Button
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              variant="ghost"
              className={cn(
                "w-full h-full absolute backdrop-blur z-10 inset-0 grid place-items-center hover:bg-transparent",
                isPasswordVisible ? "" : "backdrop-blur-none"
              )}
            >
              <Lock
                className={cn("size-3.5", isPasswordVisible ? "" : "hidden")}
              />
            </Button>
          </CardFooter>
        )}
      </CardContent>
    </Card>
  );
};
