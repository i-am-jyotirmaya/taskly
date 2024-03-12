import { useForm } from "react-hook-form";
import { createTaskFormSchema } from "@/schemas/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select"; // Assuming you have a Select component
// import { DatePicker } from "@/components/ui/datepicker"; // Assuming you have a DatePicker component

export const CreateTaskForm = () => {
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
    console.log(values);
  }
  return (
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

        <Button type="submit">Create Task</Button>
      </form>
    </Form>
  );
};
