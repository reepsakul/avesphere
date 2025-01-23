import { json } from '@sveltejs/kit';
import { db } from '$lib/database';

export async function GET(): Promise<Response> {
	try {
		const characters = await db.query('SELECT * FROM characters');
		return json(characters.rows, { status: 200 });
	} catch (error) {
		return json({ error: 'Failed to fetch characters' }, { status: 500 });
	}
}
