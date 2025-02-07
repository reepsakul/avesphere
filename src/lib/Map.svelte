<script lang="ts">
	import { onMount, onDestroy, setContext } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	let map: L.Map | undefined;
	let mapElement: HTMLElement;

	// NOTE: geographical bounds taken from dereglobus
	var corner1 = L.latLng(13.83211470255367, -8.928795211729799),
		corner2 = L.latLng(44.68523182173993, 13.82951187257615),
		bounds = L.latLngBounds(corner1, corner2);

	onMount(() => {
		map = L.map(mapElement, {
			crs: L.CRS.EPSG4326,
			minZoom: 4,
			maxZoom: 7
		});

		const imageUrl = 'DSA_Karte_Aventurien_A3.png'; // NOTE: converted from the original .pdf file

		// Add image overlay as a layer
		L.imageOverlay(imageUrl, bounds, {
			attribution: '&copy; <a href="https://ulisses-spiele.de/downloads/">Ulisses Spiele</a>'
		}).addTo(map);

		L.control
			.scale({
				metric: true,
				imperial: false,
				position: 'bottomleft'
			})
			.addTo(map);

		L.Control.Watermark = L.Control.extend({
			onAdd: function (map) {
				var img = L.DomUtil.create('img');
				img.src = 'Fan-Projekt-Logo.png';
				img.style.width = '150px';
				return img;
			},
			onRemove: function (map) {}
		});

		L.control.watermark = function (opts) {
			return new L.Control.Watermark(opts);
		};

		L.control.watermark({ position: 'topright' }).addTo(map);

		map.on('contextmenu', function (e) {
			var marker = new L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
		});
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

<div class="h-full w-full" bind:this={mapElement}>
	{#if map}
		<slot />
	{/if}
</div>
