<script lang="ts">
	import { slide } from 'svelte/transition';

	let { children } = $props();

	let currentNavItem = $state('home');
	let navOpen = true;

	function handleClick(item: string) {
		currentNavItem = item;
	}
</script>

<div class="campaign-container">
	<div class="campaign-header">
		<h1 class="campaign-title">Titel</h1>
		<p class="campaign-description">Description</p>
		<nav class="campaign-nav" transition:slide={{ duration: 200 }}>
			{#if navOpen}
				<div class:active={currentNavItem === 'home'} on:click={() => handleClick('home')}>
					<a href="/campaigns/1/">Home</a>
				</div>
				<div class:active={currentNavItem === 'map'} on:click={() => handleClick('map')}>
					<a href="/campaigns/1/map">Karte</a>
				</div>
				<div class:active={currentNavItem === 'logs'} on:click={() => handleClick('logs')}>
					<a href="/campaigns/1/logs">Logs</a>
				</div>
				<div
					class:active={currentNavItem === 'calendar-ingame'}
					on:click={() => handleClick('calendar-ingame')}
				>
					<a href="/campaigns/1/calendar-ingame">Kalender</a>
				</div>
				<div
					class:active={currentNavItem === 'calendar-irl'}
					on:click={() => handleClick('calendar-irl')}
				>
					<a href="/campaigns/1/calendar-irl">Termine</a>
				</div>
				<div class:active={currentNavItem === 'npcs'} on:click={() => handleClick('npcs')}>
					<a href="/campaigns/1/npcs">NPCs</a>
				</div>
			{/if}
		</nav>
	</div>

	<div class="campaign-content">
		<main class="campaign-content__wrapper">
			{@render children()}
		</main>
	</div>
</div>

<style>
	.campaign-header {
		width: 100%;
	}
	.campaign-title {
		font-size: 45px;
	}
	.campaign-nav {
		width: 100%;
		background-color: #333;
		color: white;
		padding: 20px;
		transition: width 0.3s ease-in-out;
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: row;
	}
	.campaign-nav div {
		margin-bottom: 10px;
	}
	.campaign-nav a {
		text-decoration: none;
		color: white;
		display: block;
		padding: 8px 12px;
		border-radius: 4px;
		transition: background-color 0.2s;
	}
	.campaign-nav a:hover {
		background-color: #555;
	}
	.campaign-nav .active {
		background-color: #555;
		font-weight: bold;
	}
	.main-content {
		padding: 20px;
		flex-grow: 1;
	}
</style>
