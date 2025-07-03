import dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserCredentials } from './entities/UserCredentials';
import { UserSession } from './entities/UserSession';

// Load environment variables from db.env
dotenv.config({ path: 'db.env' });

class TypeOrm {
	private static instance: Promise<DataSource> | null = null;

	private constructor() {
		// Private constructor to prevent external instantiation
	}

	public static getDb(): Promise<DataSource> {
		if (!TypeOrm.instance) {
			TypeOrm.instance = new DataSource({
				type: 'postgres',
				host: 'localhost',
				port: 5432,
				username: process.env.POSTGRES_USER,
				password: process.env.POSTGRES_PASSWORD,
				database: process.env.POSTGRES_DB_NAME,
				synchronize: true,
				entities: [UserCredentials, UserSession],
				migrations: [],
				subscribers: [],
				logging: true
			})
				.initialize()
				.then((dataSource) => {
					console.info(
						`Postgres Data Source ${process.env.POSTGRES_DB_NAME} has been initialized!`
					);
					return dataSource;
				})
				.catch((err) => {
					console.error('Error during Data Source initialization', err);
					throw err;
				});
		}
		return TypeOrm.instance;
	}
}

export default TypeOrm;
