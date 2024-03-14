/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This api uses json-server.
 * Start json-server first using `json-server db.json` before calling any function in this file.
 */

type TaskMetaData = {
  category?: string; // This will create the task under a category. Used to organise
  tags: string[]; // Array of tags. Can be used to search tasks
  priority: "HIGH" | "NORMAL" | "LOW"; // High, Medium, Low
  dueDate?: Date; // Date the task is due
  reminderDate?: Date; // Date the task is due
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

const JSON_SERVER_BASE_URL = "localhost:5225";

// Return all Tasks from json-server
export async function getAllTasks() {
  const response = await fetch(`http://${JSON_SERVER_BASE_URL}/tasks`);
  const json = await response.json();
  return json as TaskMetaData[];
}

// Create a new Task in json-server
export async function createTask(task: TaskMetaData) {
  const response = await fetch(`http://${JSON_SERVER_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return await response.json();
}

// Update a Task in json-server
export async function updateTask(task: TaskMetaData) {
  const response = await fetch(`http://${JSON_SERVER_BASE_URL}/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return await response.json();
}

// Delete a Task in json-server
export async function deleteTask(taskId: string) {
  const response = await fetch(`http://${JSON_SERVER_BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });
  return await response.json();
}
