import { useAppSelector } from "@/redux/hooks";
import { TaskItem } from "@/components/main/task-item/TaskItem";
import clsx from "clsx";

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

export const TaskList = () => {
  const listMode = useAppSelector((state) => state.taskListChangeSelector.listMode);
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
  const taskListClassNames = clsx({
    "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2": listMode === "grid",
    // "flex flex-wrap gap-2": listMode === "grid",
    "flex flex-col gap-2": listMode === "list",
  });
  return <div className={taskListClassNames}>{getDummyTasks()}</div>;
};
