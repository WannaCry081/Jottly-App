"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// UI Components
import { TooltipProvider } from "../ui/tooltip";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider>{children}</TooltipProvider>
    </NextThemesProvider>
  );
}
