import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { firestoreDb as db } from "@/firebase";
import { TaskSchema, FirebaseTaskSchema } from "@/schemas/task-schema";

export class TasksAPI {
  private static TASKS_COLLECTION_NAME = "tasks";

  private static taskConverter: FirestoreDataConverter<TaskSchema, FirebaseTaskSchema> = {
    toFirestore: (task: TaskSchema): FirebaseTaskSchema => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...firebaseTask } = task;
      return firebaseTask;
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<FirebaseTaskSchema>, options?: SnapshotOptions): TaskSchema => {
      const data = snapshot.data(options);
      return {
        ...data,
        id: snapshot.id,
      };
    },
  };

  private static taskCollection = collection(db, this.TASKS_COLLECTION_NAME).withConverter(this.taskConverter);

  static async getTasks(): Promise<TaskSchema[]> {
    const querySnapshot = await getDocs(this.taskCollection);
    const list = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(list);
    // console.log(list.filter(x => x.category==="anything"));
    return list;
  }

  static async createTask(task: TaskSchema): Promise<string> {
    const docRef = await addDoc(this.taskCollection, task);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  }

  static async deleteTask(id: string) {
    await deleteDoc(doc(db, this.TASKS_COLLECTION_NAME, id));
    return id;
  }
}
