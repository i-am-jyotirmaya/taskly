import { ListFilterIcon, ZapIcon } from "lucide-react";
import { TaskListModeSelector } from "../task-list-mode-selector/TaskListModeSelector";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { filterConfig } from "@/filters";
import { Filter } from "@/components/filters/Filter";

export const ConfigBar = () => {
  const getFilters = () => {
    const filters = filterConfig.map((filter) => {
      return <Filter key={filter.id} {...filter} className="mb-4" />;
    });

    return filters;
  };

  return (
    <div className="flex justify-between">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary" size="icon">
            <ListFilterIcon className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" overlayClassName="backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SheetHeader>
            <SheetTitle>Filter tasks</SheetTitle>
            <SheetDescription>
              Choose filters to apply to your tasks. You can add multiple filters at the same time.
            </SheetDescription>
          </SheetHeader>
          <section className="mt-4">
            <div className="flex items-center gap-2">
              <h3 className="scroll-m-20 text-md font-semibold tracking-tight">Quick Filters</h3>
              <ZapIcon
                fill={`hsl(${getComputedStyle(document.documentElement).getPropertyValue("--foreground")})`}
                className="w-4 h-4"
              />
            </div>
            <span className="text-muted-foreground text-sm">No quick filters selected.</span>
          </section>
          <section className="mt-4">
            <div className="flex items-center justify-between">
              <h3 className="scroll-m-20 text-md font-semibold tracking-tight">Filters</h3>
              <Button
                onClick={() => console.log("Will clear filters in future. Now I am chilling in place.")}
                variant="ghost"
              >
                Clear all filters
              </Button>
            </div>
            <Separator className="mb-2" />
            {getFilters()}
          </section>
        </SheetContent>
      </Sheet>

      <TaskListModeSelector />
    </div>
  );
};
