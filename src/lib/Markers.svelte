<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import L from 'leaflet';

	let map;
	let selectedMarkerId = null;

	// Retrieve map instance from context
	const { getMap } = getContext('map');

	onMount(() => {
		map = getMap();

		map.on('contextmenu', function (e) {
			let markerTitle = prompt('Enter a title for the marker:');

			if (markerTitle) {
				let marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
				marker.bindPopup(markerTitle);

				marker.on('mouseover', function () {
					this.openPopup();
				});

				marker.on('mouseout', function () {
					this.closePopup();
				});

				marker.on('click', function () {
					selectedMarkerId = marker._leaflet_id;
					console.log(`Marker ${selectedMarkerId} clicked!`); // Placeholder for future logic
				});
			}
		});
	});
</script>
