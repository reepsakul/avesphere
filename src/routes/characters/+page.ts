/*import type { RequestHandler } from './$types';
// import { Pool } from 'pg';

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	host: 'db', // 'db' refers to your Docker service name for the database
	database: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	port: 5432
});

export const GET: RequestHandler = async () => {
	try {
		const client = await pool.connect();
		const result = await client.query('SELECT * FROM character');
		client.release();

		return new Response(JSON.stringify(result.rows), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (err) {
		console.error('Error querying the database', err);
		return new Response(JSON.stringify({ error: 'Failed to fetch characters' }), { status: 500 });
	}
};
*/
