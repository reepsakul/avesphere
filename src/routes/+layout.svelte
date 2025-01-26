<script lang="ts">
	import '../app.css';
	import { slide } from 'svelte/transition';

	let { children } = $props();

	let currentNavItem = $state('home');

	function handleClick(item: string) {
		currentNavItem = item;
	}
</script>

<div class="app-container">
	<nav class="sidenav" transition:slide={{ duration: 200 }}>
		<ul>
			<li class:active={currentNavItem === 'home'} on:click={() => handleClick('home')}>
				<a href="/">Home</a>
			</li>
			<li class:active={currentNavItem === 'characters'} on:click={() => handleClick('characters')}>
				<a href="/characters">Characters</a>
			</li>
			<li class:active={currentNavItem === 'campaigns'} on:click={() => handleClick('campaigns')}>
				<a href="/campaigns">Campaigns</a>
			</li>
		</ul>
	</nav>

	<div class="app-container">
		<main class="main-content">
			{@render children()}
		</main>
	</div>
</div>

<style>
	.app-container {
		width: 100%;
		display: flex;
	}
	.sidenav {
		height: 100vh;
		width: 200px;
		border-right: 1px solid #a3a3a3;
		padding: 20px;
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
		color: #a3a3a3;
		display: block;
		padding: 8px 12px;
		border-radius: 4px;
		transition: background-color 0.2s;
	}
	.sidenav a:hover {
		background-color: #e0e0e0;
	}
	.sidenav .active {
		background-color: #ddd;
		font-weight: bold;
	}
</style>
