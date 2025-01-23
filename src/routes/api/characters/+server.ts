// src/routes/api/characters/+server.ts
import { json } from '@sveltejs/kit';
import { db } from '$lib/database';
import type { Character } from '$lib/types';

export async function POST({ request }): Promise<Response> {
	const data: Character = await request.json();

	try {
		const newCharacter = await db.query(
			'INSERT INTO characters (name, race, profession) VALUES ($1, $2, $3) RETURNING *',
			[data.name, data.race, data.profession]
		);

		return json(newCharacter.rows[0] as Character, { status: 201 });
	} catch (error) {
		return json({ error: 'Failed to create character' }, { status: 500 });
	}
}
