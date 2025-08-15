// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  int,
  text,
  index,
  singlestoreTableCreator,
  bigint,
  timestamp,
  double,
} from "drizzle-orm/singlestore-core";
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = singlestoreTableCreator((name) => `gainplusone_${name}`);

export const routine_table = createTable(
  "routine_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),

    ownerId: text("owner_id").notNull(),
    name: text("name").notNull(),
    exerciseId: text("exercise_id").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => {
    return [
      index("exercise_id_index").on(t.exerciseId),
      index("owner_id_index").on(t.ownerId),
    ];
  },
);

export const muscle_groups_table = createTable(
  "muscle_groups_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  }
);

export const cetegory_table = createTable(
  "category_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  }
);


export const excercise_table = createTable(
  "excercise_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),

    ownerId: text("owner_id").notNull(),
    name: text("name").notNull(),
    categoryId: int("category").notNull(),
    equipment: text("equipment").notNull(),
    difficulty: text("difficulty").notNull(),
    muscleGroupsId: int("muscle_groups").notNull(),
    instructions: text("instructions").notNull(),
    sets: int("sets").notNull(),
    reps: int("reps").notNull(),
    weight: double("weight",{ precision: 4, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => {
    return [
      index("category_id_index").on(t.categoryId),
      index("muscle_groups_id_index").on(t.muscleGroupsId),
      index("owner_id_index").on(t.ownerId),
    ];
  },
);
