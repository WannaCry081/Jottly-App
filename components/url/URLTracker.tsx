"use client";

import React, { useEffect, useState } from "react";
import {
  Link2,
  MousePointer,
  Shield,
  ChartColumn,
  type LucideIcon,
} from "lucide-react";

// Hooks
import { useGetShortenUrlList } from "@/hooks";

// UI Components
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

// Utility functions
import { cn } from "@/lib/utils";

// Types
import { Url } from "@/types/url";

type UrlTrackerItemType = {
  icon: LucideIcon;
  title: string;
  description: string;
  data: number;
  style: {
    iconColor: string;
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
        iconColor: "text-blue-600 dark:text-blue-400",
      },
    },
    {
      icon: Shield,
      title: "Protected URLs",
      description: "Password secured",
      data: totalProtectedUrls,
      style: {
        iconColor: "text-violet-600 dark:text-violet-400 ",
      },
    },
    {
      icon: MousePointer,
      title: "Total Clicks",
      description: "Across all links",
      data: totalClicks,
      style: {
        iconColor: "text-green-600 dark:text-green-400",
      },
    },
    {
      icon: ChartColumn,
      title: "Avg Clicks",
      description: "Per link average",
      data: avgClicks,
      style: {
        iconColor: "text-amber-600 dark:text-amber-400",
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

  const { data, isLoading, isError } = useGetShortenUrlList(ownerId ?? "");
  const urlsData = data?.data || [];

  if (isLoading || isError) {
    return (
      <React.Fragment>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full" />
        ))}
      </React.Fragment>
    );
  }

  const items = UrlTrackerItems(urlsData);

  return (
    <React.Fragment>
      {items.map(({ icon, title, data, style }: UrlTrackerItemType, index) => {
        const IconComponent = icon;

        return (
          <Card
            key={index}
            className="py-3.5 rounded-md shadow-none overflow-hidden"
          >
            <CardContent className="px-2 flex-1 grid place-items-center">
              <div className="w-full space-y-1 sm:space-y-2">
                <div className="flex items-start justify-between sm:justify-end ">
                  <div className="relative sm:hidden">
                    <div className="grid place-items-center size-38 bg-muted-foreground/5 rounded-full absolute -top-7 -left-14">
                      <div className="grid place-items-center size-24 bg-muted-foreground/5 rounded-full">
                        <div className="grid place-items-center size-12 bg-muted-foreground/5 rounded-full">
                          <IconComponent
                            className={cn(style.iconColor, "size-4")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="font-semibold text-3xl text-ellipsis overflow-hidden w-20 text-end sm:flex-1">
                    {data}
                  </span>
                </div>
                <div className="text-end flex items-center justify-end">
                  <IconComponent
                    className={cn(
                      style.iconColor,
                      "hidden size-4 sm:inline-block mr-1"
                    )}
                  />
                  <span className="text-xs text-muted-foreground">{title}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </React.Fragment>
  );
};
