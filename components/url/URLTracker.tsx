"use client";

import React, { useEffect, useState } from "react";
import {
  Link2,
  MousePointer,
  Shield,
  ChartColumn,
  type LucideIcon,
} from "lucide-react";

// Components
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

// Utility functions
import { cn } from "@/lib/utils";

// Hooks
import { useGetShortenUrlList } from "@/hooks";

// Types
import { Url } from "@/types/url";

type UrlTrackerItemType = {
  icon: LucideIcon;
  title: string;
  description: string;
  data: number;
  style: {
    textColor: string;
  };
};

const UrlTrackerItems = (data: Url[]) => {
  const totalUrls = data.length;
  const totalProtectedUrls =
    data.filter(({ password }) => password).length || 0;
  const totalClicks = data.reduce((acc, url) => {
    return acc + (url.clicks || 0);
  }, 0);
  const avgClicks = Math.floor(totalUrls > 0 ? totalClicks / totalUrls : 0);
  return [
    {
      icon: Link2,
      title: "Total URLs",
      description: "Links created",
      data: totalUrls,
      style: {
        textColor: "text-blue-600 dark:text-blue-400",
      },
    },
    {
      icon: Shield,
      title: "Protected URLs",
      description: "Password secured",
      data: totalProtectedUrls,
      style: {
        textColor: "text-violet-600 dark:text-violet-400",
      },
    },
    {
      icon: MousePointer,
      title: "Total Clicks",
      description: "Across all links",
      data: totalClicks,
      style: {
        textColor: "text-green-600 dark:text-green-400",
      },
    },
    {
      icon: ChartColumn,
      title: "Avg Clicks",
      description: "Per link average",
      data: avgClicks,
      style: {
        textColor: "text-amber-600 dark:text-amber-400",
      },
    },
  ];
};

export const UrlTracker = () => {
  const [ownerId, setOwnerId] = useState<string | null>(null);

  useEffect(() => {
    if (!ownerId) {
      const id = localStorage.getItem("jotty-id");
      setOwnerId(id);
    }
  }, [ownerId]);

  const {
    data: shortenUrlList,
    isLoading,
    isError,
  } = useGetShortenUrlList(ownerId ?? "");

  if (isLoading || isError) {
    return (
      <React.Fragment>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full" />
        ))}
      </React.Fragment>
    );
  }

  const items = UrlTrackerItems(shortenUrlList?.urls || []);

  return (
    <React.Fragment>
      {items.map(({ icon, title, data, style }: UrlTrackerItemType, index) => {
        const IconComponent = icon;

        return (
          <Card key={index} className="py-2 rounded-md shadow-none">
            <CardContent className="px-2">
              <div className="text-center sm:text-end">
                <div className="inline-flex sm:hidden items-center justify-center size-10 rounded-full bg-muted-foreground/5 my-2">
                  <IconComponent className={cn("size-4.5", style.textColor)} />
                </div>

                <div className="text-lg font-semibold sm:text-4xl w-full overflow-hidden text-ellipsis sm:mb-1.5">
                  {data}
                </div>
                <div className="inline-flex gap-1 text-xs text-muted-foreground">
                  <IconComponent
                    className={cn("hidden sm:block size-4", style.textColor)}
                  />
                  {title}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </React.Fragment>
  );
};
