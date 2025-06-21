import React from "react";
import { Lock } from "lucide-react";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export const PasswordOverlay = ({
  visible,
  onToggle,
}: {
  visible: boolean;
  onToggle: () => void;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        aria-label={visible ? "Hide password" : "Show password"}
        className={cn(
          "w-full h-full absolute backdrop-blur-sm z-10 inset-0 grid place-items-center hover:bg-transparent",
          visible ? "" : "backdrop-blur-none"
        )}
      >
        <Lock className={cn("size-3.5", visible ? "" : "hidden")} />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>URL Password</p>
    </TooltipContent>
  </Tooltip>
);
