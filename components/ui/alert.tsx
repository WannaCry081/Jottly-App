import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
        warning:
          "bg-yellow-100/60 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-100 [&>svg]:text-yellow-700 dark:[&>svg]:text-yellow-200 *:data-[slot=alert-description]:text-yellow-800/80 dark:*:data-[slot=alert-description]:text-yellow-100/80 border-yellow-200 dark:border-yellow-800",
        important:
          "bg-blue-100/60 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100 [&>svg]:text-blue-700 dark:[&>svg]:text-blue-200 *:data-[slot=alert-description]:text-blue-800/80 dark:*:data-[slot=alert-description]:text-blue-100/80 border-blue-200 dark:border-blue-800",
        information:
          "bg-green-100/60 text-green-900 dark:bg-green-900/30 dark:text-green-100 [&>svg]:text-green-700 dark:[&>svg]:text-green-200 *:data-[slot=alert-description]:text-green-800/80 dark:*:data-[slot=alert-description]:text-green-100/80 border-green-200 dark:border-green-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
