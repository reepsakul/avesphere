import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserCredentials } from "./entities/User"
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: "db.env" });

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    entities: [UserCredentials],
    synchronize: true,
    logging: false,
})

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))