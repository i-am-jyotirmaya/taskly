import { z } from "zod";

export const createTaskFormSchema = z.object({
  category: z.string().optional(), //
  tags: z.array(z.string()).optional(), //
  priority: z.enum(["low", "normal", "high"]).default("normal"), //
  dueDate: z.date().optional(), //
  reminder: z.date().optional(),
  description: z.string().optional(),
  notes: z.array(z.string()).optional(), 
  attachments: z.array(z.string()).optional(), //
  title: z.string().optional(), // 
  type: z.string().optional(), //
});
type ExtraPropsForTask = {
  id: string;
  createdDate: string;
  updatedDate: string;
  completedDate?: string;
  completed: boolean;
  status: "todo" | "in-progress" | "done";
  user: string;
};
export type TaskSchema = z.infer<typeof createTaskFormSchema> & ExtraPropsForTask;
