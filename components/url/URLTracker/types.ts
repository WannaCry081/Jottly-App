import { type LucideIcon } from "lucide-react";

export type URLTrackerItemsProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  data: number;
  style: {
    iconColor: string;
  };
};
