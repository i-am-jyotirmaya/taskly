import { ListFilterIcon } from "lucide-react";
import { TaskListModeSelector } from "../task-list-mode-selector/TaskListModeSelector";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { FilterConfigView } from "@/components/filters/filterConfigView/FilterConfigView";
import { useAppDispatch } from "@/redux/hooks";
import { removeTempChanges } from "./filterSlice";

export const ConfigBar = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-between">
      <Sheet
        onOpenChange={(open) => {
          if (!open) dispatch(removeTempChanges());
        }}
      >
        <SheetTrigger asChild>
          <Button variant="secondary" size="icon">
            <ListFilterIcon className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          overlayClassName="backdrop-blur supports-[backdrop-filter]:bg-background/60"
          className="sm:w-3/4 w-full"
        >
          <FilterConfigView />
        </SheetContent>
      </Sheet>

      <TaskListModeSelector />
    </div>
  );
};
