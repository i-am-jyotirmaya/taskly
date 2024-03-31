import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TaskItem } from "@/components/main/task-item/TaskItem";
import clsx from "clsx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ReactNode, useEffect, useMemo } from "react";
import { fetchAllTasks, setGroupBy } from "./taskListSlice";
import { LoaderIcon } from "lucide-react";
import { TaskSchema } from "@/schemas/task-schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const groupTasks = (taskList: TaskSchema[], property: "category" | "priority" = "category") => {
  const groups: { [key: string]: TaskSchema[] } = {};
  taskList.forEach((task) => {
    const propValue = (property === "category" ? task.category || "Uncategorised" : task[property])?.toLowerCase();
    if (!groups[propValue]) {
      groups[propValue] = [];
    }
    groups[propValue].push(task);
  });
  return groups;
};

export const TaskList = () => {
  const dispatch = useAppDispatch();

  const listMode = useAppSelector((state) => state.taskListChangeSelector.listMode);
  const { taskList, listLoading, groupBy, message } = useAppSelector((state) => state.taskList);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  const { completedTasks, incompleteTasks } = useMemo(() => {
    return taskList.reduce(
      (acc: { completedTasks: TaskSchema[]; incompleteTasks: TaskSchema[] }, task) => {
        if (task.completed) {
          acc.completedTasks.push(task);
        } else {
          acc.incompleteTasks.push(task);
        }
        return acc;
      },
      { completedTasks: [], incompleteTasks: [] }
    );
  }, [taskList]);

  const groupedTasks = useMemo(() => {
    let completedTasksGrouped: { [key: string]: TaskSchema[] } = {},
      incompleteTasksGrouped: { [key: string]: TaskSchema[] } = {};
    if (completedTasks.length > 0) {
      completedTasksGrouped = groupTasks(completedTasks, groupBy as "category" | "priority");
    }
    if (incompleteTasks.length > 0) {
      incompleteTasksGrouped = groupTasks(incompleteTasks, groupBy as "category" | "priority");
    }
    return { completedTasksGrouped, incompleteTasksGrouped };
  }, [completedTasks, incompleteTasks, groupBy]);

  const getTaskListGrouped = (completed: boolean) => {
    console.log("Getting grouped");
    const tasksToRender = completed ? groupedTasks.completedTasksGrouped : groupedTasks.incompleteTasksGrouped;

    return Object.keys(tasksToRender).map((group) => (
      <AccordionItem key={group} value={group}>
        <AccordionTrigger className="capitalize">{group}</AccordionTrigger>
        <AccordionContent>
          <div className={taskListClassNames}>
            {tasksToRender[group].map((task) => (
              <TaskItem key={task.id} data={task} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    ));
  };

  const getTaskListUngrouped = (completed: boolean) => {
    console.log("Getting ungrouped");
    let tasksToRender: ReactNode = [];
    if (completed) tasksToRender = completedTasks.map((task) => <TaskItem key={task.id} data={task} />);
    else tasksToRender = incompleteTasks.map((task) => <TaskItem key={task.id} data={task} />);

    return <div className={taskListClassNames}>{tasksToRender}</div>;
  };

  const taskListClassNames = clsx({
    "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2": listMode === "grid",
    // "flex flex-wrap gap-2": listMode === "grid",
    "flex flex-col gap-2": listMode === "list",
  });

  // defaultValue={Object.keys(tasksByCategory)} in return =>
  // Here we are passing all the categories as the default value. This will open all the categories at once.
  // return <>{listLoading ? <div>Loading...</div> : <Accordion type="multiple">{getTestTasks()}</Accordion>}</>;
  type MessagePart = {
    text: string;
    emoticon?: string; // Emoticon is optional
  };
  const renderMessageParts = (messageParts: MessagePart[]): JSX.Element => {
    return (
      <div className="text-center text-2xl px-8 flex flex-col gap-4 select-none">
        {messageParts.map((part, index) => (
          <p key={index} className="text-foreground/20 font-bold italic">
            {part.text} {part.emoticon && <span className="text-foreground/100">{part.emoticon}</span>}
          </p>
        ))}
      </div>
    );
  };

  return (
    <>
      {listLoading && taskList.length === 0 ? (
        <div>
          <LoaderIcon className="h-10 w-10 animate-spin mx-auto" />
        </div>
      ) : taskList.length === 0 ? (
        // <div className="text-center text-2xl px-8 text-foreground/80">{message}</div>
        <>
          {renderMessageParts(message)}
          <span className="text-foreground/20 text-xs text-center md:hidden">Try changing view from the menu</span>
        </>
      ) : (
        <Tabs defaultValue="in-complete">
          <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
            <TabsList>
              <TabsTrigger value="in-complete">In-Complete</TabsTrigger>
              <TabsTrigger value="complete">Complete</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 order-first md:order-none">
              Group by:
              <ToggleGroup
                type="single"
                defaultValue={groupBy}
                onValueChange={(value) => {
                  dispatch(setGroupBy(value));
                }}
              >
                <ToggleGroupItem value="category">Category</ToggleGroupItem>
                <ToggleGroupItem value="priority">Priority</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          <TabsContent value="in-complete">
            {groupBy === "" ? (
              getTaskListUngrouped(false)
            ) : (
              <Accordion type="multiple" value={Object.keys(groupedTasks.incompleteTasksGrouped)}>
                {getTaskListGrouped(false)}
              </Accordion>
            )}
          </TabsContent>
          <TabsContent value="complete">
            {groupBy === "" ? (
              getTaskListUngrouped(true)
            ) : (
              <Accordion type="multiple" value={Object.keys(groupedTasks.completedTasksGrouped)}>
                {getTaskListGrouped(true)}
              </Accordion>
            )}
          </TabsContent>
        </Tabs>
      )}
    </>
  );
};
