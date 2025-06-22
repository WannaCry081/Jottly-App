import { Link2, MousePointer, Shield, ChartColumn } from "lucide-react";

// Types
import type { URL } from "@/types/url";
import type { URLTrackerItemsReturnType } from "../types";

export const URLTrackerItems = (data: URL[]): URLTrackerItemsReturnType[] => {
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
