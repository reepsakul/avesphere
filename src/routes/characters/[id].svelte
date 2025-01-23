<script context="module">
	// Load character data based on the ID in the URL
	export async function load({ params }) {
		const { id } = params;
		const character = await fetch(`/api/characters/${id}`).then((res) => res.json());
		return { props: { character } };
	}

	async function createCharacter(data) {
		const response = await fetch('/api/characters', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});

		if (response.ok) {
			// Character created successfully
		} else {
			// Handle error
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
