"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// UI Components
import { Toaster } from "sonner";

// Utility functions
import { generateRandomID } from "@/utils/generator";

export const Providers = ({ children }: PropsWithChildren): React.ReactNode => {
  const env = process.env.NODE_ENV;

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
          },
        },
      }),
  );

  useEffect(() => {
    const id = localStorage.getItem("jotty-id");
    if (!id) {
      const newId = generateRandomID();
      localStorage.setItem("jotty-id", newId);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {env !== "production" && <ReactQueryDevtools position="bottom-right" />}
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  );
};
