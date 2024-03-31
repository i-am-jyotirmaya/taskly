import { TaskListModeSelector } from "@/components/main/task-list-mode-selector/TaskListModeSelector";

import { Input } from "@/components/ui/input";
import { TaskList } from "@/features/taskList/TaskList";
import { Separator } from "../ui/separator";
import { SideBar } from "@/features/sideBar/SideBar";
import { useAppSelector } from "@/redux/hooks";

export const Main = () => {
  const { taskList } = useAppSelector((state) => state.taskList);
  return (
    <main className="flex-1">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <div className="py-6 hidden md:block">
          <SideBar />
          <Separator className="my-4" />
        </div>
        <main className="relative py-6 flex flex-col gap-4">
          {!taskList.length ? (
            <></>
          ) : (
            <div className="flex justify-between gap-4">
              <Input placeholder="Search for a task" />
              <TaskListModeSelector />
            </div>
          )}
          {/* // TODO: Move logic from tasklist to here */}
          <TaskList />
        </main>
      </div>
    </main>
  );
};
