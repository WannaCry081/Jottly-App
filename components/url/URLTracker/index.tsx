"use client";

import React, { useEffect, useState } from "react";

// Hooks
import { useGetShortenUrlList } from "@/hooks";

// UI Components
import { Skeleton } from "../../ui/skeleton";

// Utility functions
import { URLTrackerItems } from "./utils/URLTrackerItems.util";

// Types
import { URLTrackerCard } from "./components/URLTrackerCard";

const URLTracker = (): React.ReactElement => {
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

  const items = URLTrackerItems(urlsData);

  return (
    <React.Fragment>
      <URLTrackerCard items={items} />
    </React.Fragment>
  );
};

export default URLTracker;
