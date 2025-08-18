<script lang="ts">
	import PeerSidebar from './PeerSidebar.svelte';
	import ChatArea from './ChatArea.svelte';
</script>

<main class="main-interface">
	<PeerSidebar />
	<ChatArea />
</main>

<style>
	.main-interface {
		flex: 1;
		display: grid;
		grid-template-columns: 300px 1fr;
		height: calc(100vh - 40px); /* Subtract header height */
		overflow: hidden;
	}

	@media (max-width: 1024px) {
		.main-interface {
			grid-template-columns: 200px 1fr;
		}
	}

	@media (max-width: 768px) {
		.main-interface {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 200px;
		}
	}
</style>