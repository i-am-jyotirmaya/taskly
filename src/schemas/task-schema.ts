import { z } from "zod";

export const createTaskFormSchema = z.object({
  category: z.string().optional(), //
  tags: z.array(z.string()).default([]), //
  priority: z.enum(["low", "normal", "high"]).default("normal"), //
  dueDate: z.string().optional(), //
  reminder: z.string().optional(),
  description: z.string().optional(),
  notes: z.array(z.string()).default([]),
  attachments: z.array(z.string()).default([]), //
  title: z.string().optional(), //
  type: z.string().optional(), //
});

export type CreateTaskSchema = z.infer<typeof createTaskFormSchema>;

export type FirebaseTaskSchema = {
  category?: string;
  tags: string[];
  priority: "low" | "normal" | "high";
  dueDate?: string;
  reminder?: string;
  description?: string;
  notes: string[];
  attachments: string[];
  title?: string;
  type?: string;
  createdDate: string;
  updatedDate: string;
  completedDate?: string;
  completed: boolean;
  status: "todo" | "in-progress" | "done";
  user: string;
};

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
