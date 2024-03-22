import { z } from "zod";

export const createTaskFormSchema = z.object({
  category: z.string().optional(), //
  tags: z.array(z.string()).optional(), //
  priority: z.enum(["low", "normal", "high"]).default("normal"), //
  dueDate: z.date(), //
  reminder: z.date().optional(),
  description: z.string().optional(),
  notes: z.array(z.string()).optional(),
  attachments: z.array(z.string()).optional(), //
  title: z.string(), //
  type: z.string().optional(), //
});

type ExtraPropsForFirebaseTask = {
  createdDate: string;
  updatedDate: string;
  completedDate?: string;
  completed: boolean;
  status: "todo" | "in-progress" | "done";
  user: string;
};

export type FirebaseTaskSchema = z.infer<typeof createTaskFormSchema> & ExtraPropsForFirebaseTask;

type ExtraPropsForTask = {
  id: string;
};

export type TaskSchema = FirebaseTaskSchema & ExtraPropsForTask;
