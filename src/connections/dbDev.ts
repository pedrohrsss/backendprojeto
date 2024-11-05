import { DataSource } from "typeorm";
import { Task } from "../models/task";

export const DevDataSource = new DataSource({
    type: "postgres",
    host: "dpg-csg2a0t6l47c739lsql0-a.oregon-postgres.render.com",
    port: 5432,
    username: "tasks_db_kyd9_user",
    password: "JRBFtawPafCBCPx41mPPQO7ifpdHHv78",
    database: "tasks_db_kyd9",
    extra: {
        options: "-c statement_timeout=30000ms -c search_path=monsters"
    },
    entities: [Task]
})