import { TaskListModeSelector } from "@/components/main/task-list-mode-selector/TaskListModeSelector";

import { Input } from "@/components/ui/input";
import { TaskList } from "@/components/main/task-list/TaskList";
import { ConfigBar } from "@/components/main/config-bar/ConfigBar";

export const Main = () => {
  return (
    <main className="flex-1 container">
      {/* <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DateNavbar /> */}
      <main className="relative py-6 flex flex-col gap-4">
        <div className="flex justify-between gap-4">
          <Input placeholder="Search for a task" />

          <TaskListModeSelector />
        </div>
        <ConfigBar />
        <TaskList />
      </main>
      {/* </div> */}
    </main>
  );
};
