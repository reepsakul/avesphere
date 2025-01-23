import { Pool } from 'pg';

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	host: 'avesphere-db-1',
	database: 'avesphere',
	password: process.env.POSTGRES_PASSWORD,
	port: 5432
});

export const db = {
	query: (text: string, params?: any[]) => pool.query(text, params)
};
