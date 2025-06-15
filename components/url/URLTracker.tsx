"use client";

import React from "react";
import { Link2, MousePointer, Shield, ChartColumn } from "lucide-react";

// Components
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type UrlTrackerItemType = {
  icon: LucideIcon;
  title: string;
  description: string;
  data: number;
  style: {
    textColor: string;
  };
};

const UrlTrackerItems: UrlTrackerItemType[] = [
  {
    icon: Link2,
    title: "Total URLs",
    description: "Links created",
    data: 0,
    style: {
      textColor: "text-blue-600 dark:text-blue-400",
    },
  },
  {
    icon: Shield,
    title: "Protected URLs",
    description: "Password secured",
    data: 0,
    style: {
      textColor: "text-violet-600 dark:text-violet-400",
    },
  },
  {
    icon: MousePointer,
    title: "Total Clicks",
    description: "Across all links",
    data: 0,
    style: {
      textColor: "text-green-600 dark:text-green-400",
    },
  },
  {
    icon: ChartColumn,
    title: "Avg Clicks",
    description: "Per link average",
    data: 0,
    style: {
      textColor: "text-amber-600 dark:text-amber-400",
    },
  },
];

export const UrlTracker = () => {
  const items = UrlTrackerItems;

  return (
    <React.Fragment>
      {items.map(({ icon, title, data, style }, index) => {
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
