<script lang="ts">
	import { onMount, onDestroy, setContext } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import Markers from '$lib/Markers.svelte';

	let map: L.Map | undefined;
	let mapElement: HTMLElement;

	var corner1 = L.latLng(13.83211470255367, -8.928795211729799),
		corner2 = L.latLng(44.68523182173993, 13.82951187257615),
		bounds = L.latLngBounds(corner1, corner2);

	onMount(() => {
		map = L.map(mapElement, {
			crs: L.CRS.EPSG4326,
			minZoom: 4,
			maxZoom: 7
		});

		const imageUrl = 'map_layers/DSA_Karte_Aventurien_A3.png';

		L.imageOverlay(imageUrl, bounds, {
			attribution: '&copy; <a href="https://ulisses-spiele.de/downloads/">Ulisses Spiele</a>'
		}).addTo(map);

		L.control.scale({ metric: true, imperial: false, position: 'bottomleft' }).addTo(map);

		L.Control.Watermark = L.Control.extend({
			onAdd: function () {
				var img = L.DomUtil.create('img');
				img.src = 'Fan-Projekt-Logo.png';
				img.style.width = '150px';
				return img;
			},
			onRemove: function () {}
		});

		L.control.watermark = function (opts: L.ControlOptions) {
			return new L.Control.Watermark(opts);
		};

		L.control.watermark({ position: 'topright' }).addTo(map);

		// Provide the map instance to child components
		setContext('map', { getMap: () => map });
	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
	});

	$: if (map) {
		map.fitBounds(bounds);
	}
</script>

<div class="h-full w-full" bind:this={mapElement}>
	{#if map}
		<Markers />
		<slot />
	{/if}
</div>
