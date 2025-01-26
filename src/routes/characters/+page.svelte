<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let characters = [];

	async function loadCharacters() {
		try {
			const response = await fetch('/api/characters');
			if (response.ok) {
				characters = await response.json();
			} else {
				console.error('Failed to fetch characters');
			}
		} catch (error) {
			console.error('Error loading characters:', error);
		}
	}

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
