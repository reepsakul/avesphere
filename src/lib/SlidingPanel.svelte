<script lang="ts">
	export let title = '';
	export let notes = '';
	export let onClose: () => void;
	export let onUpdateNotes: (event: Event) => void;

	let panelElement: HTMLElement;

	function openPanel() {
		panelElement.style.right = '0'; // Open the panel (reset from the -25% state)
	}

	function closePanel() {
		panelElement.style.right = '-25%'; // Close the panel
		setTimeout(onClose, 300); // Ensure smooth close
	}

	// Call openPanel() directly when component is rendered or marker clicked
	import { onMount } from 'svelte';
	onMount(() => {
		openPanel();
	});
</script>

<div bind:this={panelElement} class="infoPanel">
	<h3>{title}</h3>
	<textarea bind:value={notes} on:input={onUpdateNotes}></textarea>
	<button class="closeBtn" on:click={closePanel}>Close</button>
</div>

<style>
	.infoPanel {
		position: fixed;
		top: 0;
		right: -25%; /* Initially off-screen */
		width: 25%;
		height: 100%;
		background: white;
		box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
		padding: 15px;
		transition: right 0.3s ease-in-out;
	}

	h3 {
		margin: 0;
		font-size: 18px;
		font-weight: bold;
	}

	textarea {
		width: 100%;
		height: 200px;
		margin-top: 10px;
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 14px;
	}

	.closeBtn {
		display: block;
		margin-top: 10px;
		padding: 8px 15px;
		background: #ff4d4d;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	.closeBtn:hover {
		background: #cc0000;
	}
</style>
