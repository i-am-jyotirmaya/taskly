import { SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ListFilterIcon, ZapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Filter } from "@/components/filters/Filter";

import { filterConfig } from "@/filters";
import { useAppDispatch } from "@/redux/hooks";
import { activateFilters, resetFilters } from "@/components/main/config-bar/filterSlice";
import { fetchAllTasks } from "@/components/main/task-list/taskListSlice";

export const FilterConfigView = () => {
  const dispatch = useAppDispatch();
  const getFilters = () => {
    const filters = filterConfig.map((filter) => {
      return <Filter key={filter.id} {...filter} className="mb-4" />;
    });

    return filters;
  };
  return (
    <>
      <SheetHeader className="text-left">
        <SheetTitle className="flex items-center gap-2">
          Filter tasks
          <ListFilterIcon className="w-4 h-4" />
        </SheetTitle>
        <SheetDescription>
          Choose filters to apply to your tasks. You can add multiple filters at the same time.
        </SheetDescription>
      </SheetHeader>
      <ScrollArea className="h-[78vh]">
        <section className="mt-4">
          <div className="flex items-center gap-2">
            <h3 className="scroll-m-20 text-md font-semibold tracking-tight">Quick Filters</h3>
            <ZapIcon fill="currentColor" className="w-4 h-4" />
          </div>
          <span className="text-muted-foreground text-sm">No quick filters selected.</span>
        </section>
        <section className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="scroll-m-20 text-md font-semibold tracking-tight">Filters</h3>
            <Button onClick={() => dispatch(resetFilters())} variant="ghost">
              Clear all filters
            </Button>
          </div>
          <Separator className="mb-2" />
          {getFilters()}
        </section>
      </ScrollArea>
      <SheetFooter>
        <Button
          onClick={() => {
            dispatch(activateFilters());
            dispatch(fetchAllTasks());
          }}
        >
          Apply filters
        </Button>
      </SheetFooter>
    </>
  );
};
