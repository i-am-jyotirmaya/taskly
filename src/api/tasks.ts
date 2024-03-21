/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This api uses json-server.
 * Start json-server first using `json-server db.json` before calling any function in this file.
 */

import { FirestoreDataConverter, addDoc, collection, getDocs } from "firebase/firestore";
import { firestoreDb as db } from "@/firebase";

export class TasksAPI {
  private static TASKS_COLLECTION_NAME = "tasks";

  // private taskConverter: FirestoreDataConverter<TaskMetaData> = {
  //   toFirestore: (task: any) => {
  //     return task;
  //   },
  //   fromFirestore: (snapshot: any, options: any) => {
  //     const data = snapshot.data(options);
  //     return {
  //       ...data,
  //       createdDate: new Date(data.createdDate),
  //       updatedDate: new Date(data.updatedDate),
  //       dueDate: new Date(data.dueDate!),
  //       reminder: data.reminder ? new Date(data.reminder) : null,
  //       completedDate: data.completedDate ? new Date(data.completedDate) : null,
  //     };
  //   }
  // }

  private static taskCollection = collection(db, this.TASKS_COLLECTION_NAME);

  static async getTasks() {
    const querySnapshot = await getDocs(this.taskCollection);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as TaskMetaData[];
  }

  static async createTask(task: any) {
    const docRef = await addDoc(this.taskCollection, task);
    console.log("Document written with ID: ", docRef.id);
  }
}

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
