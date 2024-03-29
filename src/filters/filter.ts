import { FirebaseTaskSchema, TaskSchema } from "@/schemas/task-schema";
import { DocumentData, Query } from "@firebase/firestore";

export abstract class Filter<AppModelType = TaskSchema, DbModelType extends DocumentData = FirebaseTaskSchema> {
  public filterField: string;

  constructor(filterField: string) {
    this.filterField = filterField;
  }

  abstract apply(query: Query<AppModelType, DbModelType>): Query<AppModelType, DbModelType>;
}
