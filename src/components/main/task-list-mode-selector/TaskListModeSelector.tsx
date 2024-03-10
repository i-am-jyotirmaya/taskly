import { DashboardIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeListMode } from "./taskListModeSelectorSlice";

export const TaskListModeSelector = () => {
  const dispatch = useAppDispatch();
  const listMode = useAppSelector((state) => state.taskListChangeSelector.listMode);
  const handleListModeChange = (value: "list" | "grid") => {
    dispatch(changeListMode(value));
  };

  return (
    <ToggleGroup
      defaultValue={listMode}
      onValueChange={handleListModeChange}
      className="self-end hidden lg:flex"
      type="single"
    >
      <ToggleGroupItem value="list" aria-label="Toggle bold">
        <ListBulletIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="Toggle italic">
        <DashboardIcon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
