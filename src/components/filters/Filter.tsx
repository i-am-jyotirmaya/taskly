/* eslint-disable @typescript-eslint/no-unused-vars */
import { FilterConfig } from "@/types/filter";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, Cross2Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ZapIcon } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BasicTooltip } from "../ui/custom/BasicTooltip";

type ExtraPropsForFilter = {
  className?: string;
};

type FilterProps = FilterConfig & ExtraPropsForFilter;

export const Filter: React.FC<FilterProps> = ({ id, label, multiple, order, type, options, className }) => {
  const [date, setDate] = React.useState<Date>();
  const getFilterControl = (type: "boolean" | "date" | "select" | "range" | "daterange") => {
    if (type === "select" && multiple) {
      console.log("Rendering Checkbox");
      return options?.map((option) => (
        <div className="inline-flex items-center gap-1" key={option.value}>
          <Checkbox id={option.value} /> <label htmlFor={option.value}>{option.label}</label>
        </div>
      ));
    }
    if (type === "select" && !multiple)
      return (
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      );
    if (type === "boolean") {
      console.log("Rendering Switch");
      return <Switch />;
    }
    if (type === "date") {
      console.log("Rendering Date");
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      );
    }
    console.log("Rendering no control");
    return <></>;
  };

  return (
    <TooltipProvider>
      <div className={cn("", className)}>
        <div className="flex justify-between items-center">
          <label>{label}</label>
          <div className="flex gap-1">
            <BasicTooltip tooltip="Add to quick fiters" side="left">
              <Button variant="ghost" size="icon">
                {/* <ZapIcon
                  fill={
                    false
                      ? `hsl(${getComputedStyle(document.documentElement).getPropertyValue("--foreground")})`
                      : "none"
                  }
                  className="w-4 h-4"
                /> */}
                <ZapIcon className="w-4 h-4" />
              </Button>
            </BasicTooltip>
            <BasicTooltip tooltip="Remove filter" side="left">
              <Button variant="ghost" size="icon">
                <Cross2Icon className="w-4 h-4" />
              </Button>
            </BasicTooltip>
          </div>
        </div>
        <div className="flex gap-4">{getFilterControl(type)}</div>
      </div>
    </TooltipProvider>
  );
};
