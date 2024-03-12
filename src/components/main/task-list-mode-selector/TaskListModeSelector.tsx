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
      <ToggleGroupItem disabled={listMode === "list"} value="list" aria-label="Toggle list">
        <ListBulletIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem disabled={listMode === "grid"} value="grid" aria-label="Toggle grid">
        <DashboardIcon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
