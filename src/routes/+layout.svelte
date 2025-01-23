<script lang="ts">
	import '../app.css';
	import { slide } from 'svelte/transition';

	let { children } = $props();

	let currentNavItem = 'home';
	let navOpen = true;

	function handleClick(item: string) {
		currentNavItem = item;
	}

	function toggleNav() {
		navOpen = !navOpen;
	}
</script>

<div class="app-container">
	<nav class="sidenav" transition:slide={{ duration: 200 }}>
		{#if navOpen}
			<ul>
				<li class:active={currentNavItem === 'home'} on:click={() => handleClick('home')}>
					<a href="/">Home</a>
				</li>
				<li
					class:active={currentNavItem === 'characters'}
					on:click={() => handleClick('characters')}
				>
					<a href="/characters">Characters</a>
				</li>
				<li class:active={currentNavItem === 'campaigns'} on:click={() => handleClick('campaigns')}>
					<a href="/campaigns">Campaigns</a>
				</li>
			</ul>
		{/if}
	</nav>

	<div class="app-container">
		<button class="toggle-btn" on:click={toggleNav}>
			{#if navOpen}
				&laquo;
			{:else}
				&raquo;
			{/if}
		</button>

		<main class="main-content">
			{@render children()}
		</main>
	</div>
</div>

<style>
	.app-container {
		display: flex;
	}
	.toggle-btn {
		background: none;
		border: none;
		font-size: 20px;
		cursor: pointer;
		margin-left: 10px;
	}
	.sidenav {
		width: 200px;
		background-color: #333;
		color: white;
		padding: 20px;
		transition: width 0.3s ease-in-out;
	}
	.sidenav ul {
		list-style: none;
		padding: 0;
	}
	.sidenav li {
		margin-bottom: 10px;
	}
	.sidenav a {
		text-decoration: none;
		color: white;
		display: block;
		padding: 8px 12px;
		border-radius: 4px;
		transition: background-color 0.2s;
	}
	.sidenav a:hover {
		background-color: #555;
	}
	.sidenav .active {
		background-color: #555;
		font-weight: bold;
	}
	.main-content {
		padding: 20px;
		flex-grow: 1;
	}
	.app-container.closed .sidenav {
		width: 60px;
	}
	.app-container.closed .sidenav ul {
		display: none;
	}
</style>
