<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let characters = [];
</script>

<h1>Characters</h1>

<ul>
	{#each characters as character}
		<li>
			<a href="/characters/{character.id}">{character.name}</a>
		</li>
	{/each}
</ul>
