import React from "react";

// UI Components
import { Card, CardContent } from "@/components/ui/card";

// Utility functions
import { cn } from "@/lib/utils";

// Types
import type { URLTrackerItemsReturnType as URLTrackerItemsProps } from "../types";

export const URLTrackerCard = ({
  items,
}: {
  items: URLTrackerItemsProps[];
}): React.ReactElement => {
  return (
    <React.Fragment>
      {items.map(
        (
          { icon: IconComponent, title, data, style }: URLTrackerItemsProps,
          index: number,
        ) => (
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
                      "hidden size-4 sm:inline-block mr-1",
                    )}
                  />
                  <span className="text-xs text-muted-foreground">{title}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ),
      )}
    </React.Fragment>
  );
};
