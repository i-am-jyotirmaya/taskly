import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TaskItem } from "@/components/main/task-item/TaskItem";
import clsx from "clsx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useMemo } from "react";
import { fetchAllTasks } from "./taskListSlice";
import { LoaderIcon } from "lucide-react";

type TaskMetaData = {
  category?: string; // This will create the task under a category. Used to organise
  tags: string[]; // Array of tags. Can be used to search tasks
  priority: "HIGH" | "NORMAL" | "LOW"; // High, Medium, Low
  dueDate?: Date; // Date the task is due
  reminder?: Date; // Date the task is due
  description?: string; // Description of the task
  notes?: string; // Notes about the task
  attachments?: string[]; // Array of attachments. Can be used to download attachments
  completed: boolean; // Whether the task is completed or not
  completedDate?: Date; // Date the task was completed
  createdDate: Date; // Date the task was created
  updatedDate: Date; // Date the task was last updated
  id: string; // Unique ID of the task
  name: string; // Name of the task
  status?: string; // Status of the task. Can be used to filter tasks
  type?: string; // Type of the task. Can be used to filter tasks
  user: string; // User who created the task
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertTaskDates = (tasks: any[]) =>
  tasks.map((task) => ({
    ...task,
    createdDate: new Date(task.createdDate),
    updatedDate: new Date(task.updatedDate),
    dueDate: new Date(task.dueDate!),
    reminder: task.reminder ? new Date(task.reminder) : null,
    completedDate: task.completedDate ? new Date(task.completedDate) : null,
  }));

const separateTasksBasedOnCategory = (taskList: TaskMetaData[]) => {
  const categories: { [key: string]: TaskMetaData[] } = {};
  taskList.forEach((task) => {
    const category = task.category || "Uncategorised";
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(task);
  });
  return categories;
};

export const TaskList = () => {
  const dispatch = useAppDispatch();

  const listMode = useAppSelector((state) => state.taskListChangeSelector.listMode);
  const { taskList, listLoading } = useAppSelector((state) => state.taskList);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  const categories = useMemo(() => {
    if (taskList.length > 0) {
      const tasksByCategory = separateTasksBasedOnCategory(convertTaskDates(taskList));
      return Object.keys(tasksByCategory);
    }
    return [];
  }, [taskList]); // Recompute categories only when taskList changes

  const getTestTasks = () => {
    const tasksByCategory = separateTasksBasedOnCategory(convertTaskDates(taskList));
    return Object.keys(tasksByCategory).map((category) => (
      <AccordionItem key={category} value={category}>
        <AccordionTrigger className="capitalize">{category}</AccordionTrigger>
        <AccordionContent>
          <div className={taskListClassNames}>
            {tasksByCategory[category].map((task) => (
              <TaskItem key={task.id} data={task} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    ));
  };

  const taskListClassNames = clsx({
    "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2": listMode === "grid",
    // "flex flex-wrap gap-2": listMode === "grid",
    "flex flex-col gap-2": listMode === "list",
  });

  // defaultValue={Object.keys(tasksByCategory)} in return =>
  // Here we are passing all the categories as the default value. This will open all the categories at once.
  // return <>{listLoading ? <div>Loading...</div> : <Accordion type="multiple">{getTestTasks()}</Accordion>}</>;
  return (
    <>
      {listLoading ? (
        <div>
          <LoaderIcon className="h-10 w-10 animate-spin mx-auto" />
        </div>
      ) : (
        <Accordion type="multiple" defaultValue={categories}>
          {getTestTasks()}
        </Accordion>
      )}
    </>
  );
};
