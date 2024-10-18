import { DataSource } from "typeorm"
import * as entities from "entities/*.ts"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./database/db.sqlite",
    entities: entities,
    synchronize: true,
})
