<script lang="ts">
	import { onMount, onDestroy, setContext, createEventDispatcher, tick } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

  export let bounds: [[number, number], [number, number]] = [[0, 0], [1800, 1100]];


	let map: L.Map | undefined;
	let mapElement: HTMLElement;

	onMount(() => {

		map = L.map(mapElement, {
        crs: L.CRS.Simple, // Use a simple coordinate system
        minZoom: 0,
        maxZoom: 10,
        zoom: 3,
    });

    const imageUrl = '00_Aventurien.jpg'; // Ensure it's placed in the "static" folder

    // Add image overlay as a layer
    L.imageOverlay(imageUrl, bounds).addTo(map);

	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
	});

	setContext('map', {
		getMap: () => map
	});

	$: if (map) {
		map.fitBounds(bounds);
	}
</script>

<div class="w-full h-full" bind:this={mapElement}>
	{#if map}
		<slot />
	{/if}
</div>
