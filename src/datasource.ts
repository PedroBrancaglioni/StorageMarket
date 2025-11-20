import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from 'dotenv'
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'HJ334ab5&', 
    database: 'StorageMarket',
    synchronize: false,
    entities: ['src/modelos/*.ts'],
    migrations: ['src/migrations/*.ts'],
});