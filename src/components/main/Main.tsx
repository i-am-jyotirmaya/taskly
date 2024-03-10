import { DateNavbar } from "@/components/main/date-nav-bar/DateNavbar";

import clsx from "clsx";
import { TaskListModeSelector } from "@/components/main/task-list-mode-selector/TaskListModeSelector";
import { useAppSelector } from "@/redux/hooks";

const generateDummyListOfTasks = (numberOfTasks = 5, prefix = "", name = "Task") => {
  const list = [];
  for (let i = 0; i < numberOfTasks; ) {
    list.push(`${prefix}-${name}-${++i}`);
  }
  return list;
};

// This is a type that can be used to define the properties of a task. Not finalised yet
type TaskMetaData = {
  category: string; // This will create the task under a category. Used to organise
  tags: string[]; // Array of tags. Can be used to search tasks
  priority: string; // High, Medium, Low
  dueDate: Date; // Date the task is due
  reminder: Date; // Date the task is due
  description: string; // Description of the task
  notes: string; // Notes about the task
  attachments: string[]; // Array of attachments. Can be used to download attachments
  completed: boolean; // Whether the task is completed or not
  completedDate: Date; // Date the task was completed
  createdDate: Date; // Date the task was created
  updatedDate: Date; // Date the task was last updated
  id: string; // Unique ID of the task
  name: string; // Name of the task
  status: string; // Status of the task. Can be used to filter tasks
  type: string; // Type of the task. Can be used to filter tasks
  user: string; // User who created the task
};

export const Main = () => {
  const getDummyTasks = () => {
    const tasks = generateDummyListOfTasks(20, "Dummy", "Task");
    return tasks.map((task) => (
      <div className="rounded-2xl border p-4 transition-colors bg-secondary/40 hover:bg-secondary hover:cursor-pointer">
        {task}
      </div>
    ));
  };

  const listMode = useAppSelector((state) => state.taskListChangeSelector.listMode);

  const taskListClassNames = clsx({
    "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2": listMode === "grid",
    "flex flex-col gap-2": listMode === "list",
  });
  return (
    <main className="flex-1">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DateNavbar />
        <main className="relative py-6 flex flex-col gap-4">
          <TaskListModeSelector />
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
