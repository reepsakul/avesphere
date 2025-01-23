<script>
	// Fetch character data from your database or API
	let characters = [
		{ id: 1, name: 'Aella', race: 'Elf', profession: 'Warrior' },
		{ id: 2, name: 'Brander', race: 'Human', profession: 'Mage' }
	];
</script>

<h1>Characters</h1>

<ul>
	{#each characters as character}
		<li>
			<a href="/characters/{character.id}">{character.name}</a>
		</li>
	{/each}
</ul>
