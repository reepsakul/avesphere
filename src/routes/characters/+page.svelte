<script>
	// Fetch character data from your database or API
	let characters = [];

	async function loadCharacters() {
		const response = await fetch('/api/characters');
		if (response.ok) {
			characters = await response.json();
		} else {
			console.error('Failed to fetch characters');
		}
	}

	// Call the function to load the characters when the component is mounted
	loadCharacters();
</script>

<h1>Characters</h1>

<ul>
	{#each characters as character}
		<li>
			<a href="/characters/{character.id}">{character.name}</a>
		</li>
	{/each}
</ul>
