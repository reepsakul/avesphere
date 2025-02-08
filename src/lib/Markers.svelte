<script lang="ts">
	import { getContext } from 'svelte';
	import L from 'leaflet';
	import { writable } from 'svelte/store';
	import SlidingPanel from '$lib/SlidingPanel.svelte';

	// Get map instance from context
	const { getMap } = getContext('map');
	let map = getMap();

	// Store for marker data (ID -> { title, notes })
	const markers = writable<Record<string, { title: string; notes: string }>>({});
	let selectedMarkerId: string | null = null;
	let title = '';
	let notes = '';

	map.on('contextmenu', function (e) {
		let markerTitle = prompt('Enter a title for the marker:');

		if (markerTitle) {
			let marker = L.marker([e.latlng.lat, e.latlng.lng], { draggable: 'true' }).addTo(map);

			// Generate a unique ID for the marker
			let markerId = L.stamp(marker).toString();

			// Bind popup with title
			marker.bindPopup(`<b>${markerTitle}</b>`);

			marker.on('mouseover', function () {
				this.openPopup();
			});

			marker.on('mouseout', function () {
				this.closePopup();
			});

			// Store marker details
			markers.update((m) => ({
				...m,
				[markerId]: { title: markerTitle, notes: '' }
			}));

			// Click event to open SlidingPanel
			marker.on('click', function () {
				selectedMarkerId = markerId;

				// Update title and notes directly
				markers.update((m) => {
					if (m[selectedMarkerId]) {
						title = m[selectedMarkerId].title;
						notes = m[selectedMarkerId].notes;
					}
					return m;
				});
			});
		}
	});

	function closePanel() {
		selectedMarkerId = null;
	}

	function updateNotes(event: Event) {
		if (selectedMarkerId !== null) {
			const target = event.target as HTMLTextAreaElement;
			markers.update((m) => ({
				...m,
				[selectedMarkerId]: { ...m[selectedMarkerId], notes: target.value }
			}));
		}
	}
</script>

{#if selectedMarkerId !== null}
	<SlidingPanel {title} {notes} onClose={closePanel} onUpdateNotes={updateNotes} />
{/if}
