import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TaskItem } from "@/components/main/task-item/TaskItem";
import clsx from "clsx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useMemo } from "react";
import { fetchAllTasks } from "./taskListSlice";
import { LoaderIcon } from "lucide-react";
import { TaskSchema } from "@/schemas/task-schema";

const separateTasksBasedOnCategory = (taskList: TaskSchema[]) => {
  const categories: { [key: string]: TaskSchema[] } = {};
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
      const tasksByCategory = separateTasksBasedOnCategory(taskList);
      return Object.keys(tasksByCategory);
    }
    return [];
  }, [taskList]); // Recompute categories only when taskList changes

  const getTestTasks = () => {
    const tasksByCategory = separateTasksBasedOnCategory(taskList);
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
      {listLoading && taskList.length === 0 ? (
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
