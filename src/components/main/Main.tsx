import { DateNavbar } from "@/components/main/date-nav-bar/DateNavbar";

import clsx from "clsx";
import { TaskListModeSelector } from "@/components/main/task-list-mode-selector/TaskListModeSelector";
import { useAppSelector } from "@/redux/hooks";
import { TaskItem } from "./task-item/TaskItem";
import { Input } from "../ui/input";

const generateDummyListOfTasks = (numberOfTasks = 5, prefix = "", name = "Task") => {
  const list = [];
  for (let i = 0; i < numberOfTasks; ) {
    list.push(`${prefix}-${name}-${++i}`);
  }
  return list;
};

const generateRandomPriorities = () => {
  const priorities = ["LOW", "NORMAL", "HIGH"];
  return priorities[Math.floor(Math.random() * priorities.length)];
};

export const Main = () => {
  const getDummyTasks = () => {
    const tasks = generateDummyListOfTasks(20, "Dummy", "Task");
    const createdDate = new Date();
    return tasks.map((task, i) => (
      <TaskItem
        key={`${task}-${i}`}
        data={{
          name: task,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          tags: ["task", "daily"],
          completed: [true, false].at(Math.floor(Math.random() * 2))!,
          createdDate,
          updatedDate: createdDate,
          id: `${task}-${i}`,
          priority: generateRandomPriorities() as "HIGH" | "NORMAL" | "LOW",
          user: "me",
        }}
      />
    ));
  };

  const listMode = useAppSelector((state) => state.taskListChangeSelector.listMode);

  const taskListClassNames = clsx({
    "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2": listMode === "grid",
    // "flex flex-wrap gap-2": listMode === "grid",
    "flex flex-col gap-2": listMode === "list",
  });
  return (
    <main className="flex-1">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DateNavbar />
        <main className="relative py-6 flex flex-col gap-4">
          <div className="flex justify-between gap-4">
            <Input placeholder="Search for a task" />
            <TaskListModeSelector />
          </div>
          <div className={taskListClassNames}>
            {/* <div className="rounded-2xl border p-4 transition-colors bg-secondary/40 hover:bg-secondary hover:cursor-pointer">
              Task1
            </div> */}
            {getDummyTasks()}
          </div>
        </main>
      </div>
    </main>
  );
};
