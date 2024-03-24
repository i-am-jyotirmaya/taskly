import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import React from "react";

type Props = {
  children: React.ReactNode;
  tooltip: string;
  side?: "top" | "right" | "bottom" | "left";
};

export const BasicTooltip: React.FC<Props> = ({ children, tooltip, side }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
