<script context="module">
	import { json } from '@sveltejs/kit';

	export async function GET({ params }): Promise<Response> {
		const { id } = params;

		try {
			const character = await db.query('SELECT * FROM characters WHERE id = $1', [id]);
			if (character.rows.length === 0) {
				return json({ error: 'Character not found' }, { status: 404 });
			}
			return json(character.rows[0], { status: 200 });
		} catch (error) {
			return json({ error: 'Failed to fetch character' }, { status: 500 });
		}
	}
</script>

<script>
	export let character;
</script>

<h1>{character.name}</h1>

<div class="character-details">
	<p>Race: {character.race}</p>
	<p>Profession: {character.profession}</p>
</div>
