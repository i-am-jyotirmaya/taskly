import { DocumentData, Query, query, where } from "@firebase/firestore";
import { Filter } from "./filter";
import { FirebaseTaskSchema, TaskSchema } from "@/schemas/task-schema";

export class DateFilter<
  AppModelType = TaskSchema,
  DbModelType extends DocumentData = FirebaseTaskSchema
> extends Filter<AppModelType, DbModelType> {
  constructor(private field: string, private date: Date) {
    super(field);
  }

  apply(q: Query<AppModelType, DbModelType>): Query<AppModelType, DbModelType> {
    const startOfDay = new Date(this.date);
    startOfDay.setHours(0, 0, 0, 0); // Set to the beginning of the day

    const endOfDay = new Date(this.date);
    endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day

    // Use a range query to cover the whole day
    return query(q, where(this.field, ">=", startOfDay), where(this.field, "<=", endOfDay));
  }
}

export class BooleanFilter<
  AppModelType = TaskSchema,
  DbModelType extends DocumentData = FirebaseTaskSchema
> extends Filter<AppModelType, DbModelType> {
  constructor(private field: string, private value: boolean) {
    super(field);
  }

  apply(q: Query<AppModelType, DbModelType>): Query<AppModelType, DbModelType> {
    console.log("Applying BooleanFilter");
    return query(q, where(this.field, "==", this.value));
  }
}

export class SelectFilter<
  AppModelType = TaskSchema,
  DbModelType extends DocumentData = FirebaseTaskSchema
> extends Filter<AppModelType, DbModelType> {
  constructor(private field: string, private value: string) {
    super(field);
  }

  apply(q: Query<AppModelType, DbModelType>): Query<AppModelType, DbModelType> {
    return query(q, where(this.field, "==", this.value));
  }
}

export class MultiSelectFilter<
  AppModelType = TaskSchema,
  DbModelType extends DocumentData = FirebaseTaskSchema
> extends Filter<AppModelType, DbModelType> {
  constructor(private field: string, private values: string[]) {
    super(field);
  }

  apply(q: Query<AppModelType, DbModelType>): Query<AppModelType, DbModelType> {
    return query(q, where(this.field, "in", this.values));
  }
}

export class RangeFilter<
  T extends Date | number,
  AppModelType = TaskSchema,
  DbModelType extends DocumentData = FirebaseTaskSchema
> extends Filter<AppModelType, DbModelType> {
  constructor(private field: string, private from: T, private to: T) {
    super(field);
  }

  apply(q: Query<AppModelType, DbModelType>): Query<AppModelType, DbModelType> {
    return query(q, where(this.field, ">=", this.from), where(this.field, "<=", this.to));
  }
}
