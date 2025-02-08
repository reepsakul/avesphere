<script lang="ts">
	import { onMount, onDestroy, setContext } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import Markers from '$lib/Markers.svelte';
	// import 'leaflet-ruler';

	let map: L.Map | undefined;
	let mapElement: HTMLElement;

	var boundsPackage = L.latLngBounds(
		L.latLng(13.83211470255367, -8.928795211729799),
		L.latLng(44.68523182173993, 13.82951187257615)
	);

	var boundsTDE5 = L.latLngBounds(
		// NOTE: different bounds since the maps are not scaled the same
		L.latLng(13.83211470255367 - 0.99755, -8.928795211729799 - 2.30301),
		L.latLng(44.68523182173993 + 1.52704, 13.82951187257615 + 1.74868)
	);

	onMount(() => {
		// NOTE: Official TDE 5 map, converted from .pdf.
		var layerTDE5 = L.imageOverlay('map_layers/DSA_Karte_Aventurien_A3.jpg', boundsTDE5, {
			attribution: '&copy; <a href="https://ulisses-spiele.de/downloads/">Ulisses Spiele</a>'
		});
		// NOTE: Combined map from Ulisses Map package.
		var layerFan = L.imageOverlay(
			'map_layers/Aventurien (Regionalkarten) V1.2.jpg',
			boundsPackage,
			{
				attribution:
					'&copy; <a href="https://www.orkenspalter.de/filebase/index.php?file/46-aventurienkarte-aus-regionalpl%C3%A4nen/">Karte Fanprojekt</a>, <a href="https://de.wiki-aventurica.de/wiki/Kartenpaket/Lizenz">Ulisses Kartenpaket</a>'
			}
		);
		var baseMaps = {
			'Free v5': layerTDE5,
			'Fan project v.1.2': layerFan
		};

		map = L.map(mapElement, {
			crs: L.CRS.EPSG4326,
			minZoom: 4,
			maxZoom: 8,
			layers: [layerTDE5]
		});

		L.control.layers(baseMaps).addTo(map);

		L.control.scale({ metric: true, imperial: false, position: 'bottomleft' }).addTo(map);

		// L.control.ruler({
		//   position: 'topright',
		//   lengthUnit: {
		//     display: 'miles', // NOTE: miles in TDE are the same as km.
		//     decimal: 3,
		//     factor: null,
		//     label: 'Distance:'
		//   }}).addTo(map);

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

		L.control.watermark({ position: 'bottomright' }).addTo(map);

		// Provide the map instance to child components
		setContext('map', { getMap: () => map });
	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
	});

	$: if (map) {
		map.fitBounds(boundsTDE5);
	}
</script>

<div class="h-full w-full" bind:this={mapElement}>
	{#if map}
		<Markers />
		<slot />
	{/if}
</div>
