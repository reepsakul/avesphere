<script lang="ts">
	import '../../app.css';
	// import type { LatLngExpression } from 'leaflet';
	import Leaflet from '$lib/Map.svelte';

	const bounds: [[number, number], [number, number]] = [[0, 0], [1800, 1100]]
</script>

<div class="map-container">
	<Leaflet bounds={bounds}>
	</Leaflet>
</div>

<style>
	.map-container {
		width: 100%;
		height: 100%;
		position: relative;
	}

	/* Ensure the Leaflet map has a height */
	:global(.leaflet-container) {
		width: 100%;
		height: 100%;
	}
</style>
