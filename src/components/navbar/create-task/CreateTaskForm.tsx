import { useForm } from "react-hook-form";
import { TaskSchema, createTaskFormSchema } from "@/schemas/task-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoaderIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createTask } from "./createTaskSlice";
// Assuming you have a Select component
// import { DatePicker } from "@/components/ui/datepicker"; // Assuming you have a DatePicker component

export const CreateTaskForm = () => {
  const dispatch = useAppDispatch();
  const { submitting } = useAppSelector((state) => state.createTask);

  const form = useForm<z.infer<typeof createTaskFormSchema>>({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: {
      priority: "normal", // Default value as per schema
      tags: [], // Assuming empty array for optional array fields
      notes: [],
      attachments: [],
    },
  });

  function onSubmit(values: z.infer<typeof createTaskFormSchema>) {
    console.log(form);
    console.log(values);
    const now = new Date().toISOString();
    const newTask: TaskSchema = {
      ...values,
      createdDate: now,
      updatedDate: now,
      completed: false,
      status: "todo",
      user: "me",
      id: "",
    };
    dispatch(createTask(newTask));
  }
  return (
    <ScrollArea className="h-[70vh]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>This is the task title.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select your task priority.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Category" {...field} />
                </FormControl>
                <FormDescription>This is the task Category.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="Type" {...field} />
                </FormControl>
                <FormDescription>This is the task Type.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="tags"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tags" // "A,B,C" .split(",") -> [A,B,C] .join("#") -> "A#B#C"
                    value={field.value ? field.value.join(",") : ""} // Join array elements with a comma and space
                    onChange={(e) => {
                      const tags = e.target.value.split(","); // Split input value into an array
                      field.onChange(tags);
                    }}
                  />
                </FormControl>
                <FormDescription>Enter comma-separated tags.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
          name="dueDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Due Date"
                  value={
                    field.value ? field.value.toISOString().split("T")[0] : ""
                  } // Format date as YYYY-MM-DD
                  onChange={(e) => {
                    const dueDate = new Date(e.target.value); // Convert input value to a Date object
                    field.onChange(dueDate);
                  }}
                />
              </FormControl>
              <FormDescription>
                Enter due date in DD-MM-YYYY format.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Due Date to complete the task.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* for multiple files */}
          {/* <FormField
          name="attachments"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attachments</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple // Allow multiple file selection
                  onChange={(e) => {
                    const files = Array.from(e.target.files); // Convert FileList to array
                    const attachments = files.map((file) => file.name); // Extract file names
                    field.onChange(attachments);
                  }}
                />
              </FormControl>
              <FormDescription>Upload attachments.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
          {/* for single file upload */}
          <FormField
            name="attachments"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Attachment</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null; // Get the first selected file
                      const attachment = file ? file.name : null; // Extract the file name
                      field.onChange(attachment);
                    }}
                  />
                </FormControl>
                <FormDescription>Upload attachment.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormControl>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input id="description" placeholder="Describe your task"  />
        {errors.description && <FormMessage>{errors.description.message}</FormMessage>}
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="category">Category</FormLabel>
        <Input id="category" placeholder="Optional"  />
        {errors.category && <FormMessage>{errors.category.message}</FormMessage>}
      </FormControl> */}

          {/* <FormControl>
        <FormLabel htmlFor="priority">Priority</FormLabel>
        <Select id="priority" >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </Select>
      </FormControl> */}

          {/* <FormControl>
        <FormLabel htmlFor="dueDate">Due Date</FormLabel>
        <DatePicker id="dueDate"  />
        {errors.dueDate && <FormMessage>{errors.dueDate.message}</FormMessage>}
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="reminder">Reminder</FormLabel>
        <DatePicker id="reminder"  />
        {errors.reminder && <FormMessage>{errors.reminder.message}</FormMessage>}
      </FormControl> */}

          {/* Additional fields like tags, notes, and attachments can follow a similar pattern. */}
          {/* For arrays like tags, notes, and attachments, you might need a more complex setup or custom components to handle multiple values. */}

          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <div>
                <LoaderIcon className="h-4 w-4 animate-spin mx-auto" />
              </div>
            ) : (
              <>Create Task</>
            )}
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};
