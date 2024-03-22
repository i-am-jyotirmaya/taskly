/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/date-utils";
import { TaskSchema } from "@/schemas/task-schema";
import clsx from "clsx";
import { CheckCheckIcon, Trash2Icon } from "lucide-react";

type TaskItemProps = {
  data: TaskSchema;
};

export const TaskItem: React.FC<TaskItemProps> = ({ data }) => {
  const getDateStatus = (createdDate: Date, updatedDate: Date) => {
    const dateTypeText = createdDate.getTime() === updatedDate.getTime() ? "Created" : "Updated";
    const date = createdDate === updatedDate ? createdDate : updatedDate;
    return (
      <span>
        {dateTypeText} {formatDate(date)}
      </span>
    );
  };
  return (
    <div className="rounded-2xl border p-4 bg-secondary/40 hover:cursor-pointer flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3>{(data as any).name || data.title}</h3>
        <Badge
          className="lowercase"
          variant={data.priority === "high" ? "destructive" : data.priority === "normal" ? "default" : "secondary"}
        >
          {data.priority}
        </Badge>
        {/* {data.completed ? <Badge className="bg-green-600">Done</Badge> : <></>} */}
        <Button
          variant="ghost"
          className="transition-colors hover:bg-destructive/80"
          size="icon"
          onClick={() => {
            console.log(`Deleting ${(data as any).name}`);
          }}
        >
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-2">
        {data.tags?.map((tag, i) => {
          return (
            <Badge key={`${tag}-${i}`} variant="outline">
              {tag}
            </Badge>
          );
        })}
      </div>
      {/* <div className="text-sm">
        <h5 className="scroll-m-20 text-sm font-semibold tracking-tight">Details</h5>
        <Separator className="mb-2" />
        <span className="line-clamp-2 active:line-clamp-none">{data.description}</span>
      </div> */}
      <Accordion type="single" collapsible>
        <AccordionItem className="border-none" value="detail">
          <AccordionTrigger className="hover:no-underline pb-0">Details</AccordionTrigger>
          <AccordionContent className="pb-0 pt-2">
            <span className="line-clamp-2 active:line-clamp-none select-none">{data.description}</span>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="text-xs text-black/30 dark:text-white/30 italic">
        {getDateStatus(new Date(data.createdDate), new Date(data.updatedDate))}
      </div>
      <div>
        <Button
          disabled={data.completed}
          className={clsx("w-full hover:bg-green-600", { "line-through": data.completed })}
          variant="secondary"
        >
          <CheckCheckIcon className="mr-2 h-4 w-4" /> {data.completed ? "Done" : "Finish"}
        </Button>
      </div>
    </div>
  );
};
