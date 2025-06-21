"use client";

import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// UI Components
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export const Providers = ({ children }: PropsWithChildren) => {
  const env = process.env.NODE_ENV;

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {env !== "production" && <ReactQueryDevtools position="bottom-right" />}
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  );
};
