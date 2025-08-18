<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from './stores/theme';
	import MainInterface from './components/MainInterface.svelte';
	import Header from './components/Header.svelte';

	onMount(() => {
		themeStore.init();
	});
</script>

<div class="app">
	<Header />
	<MainInterface />
</div>

<style>
	.app {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: var(--bg-primary);
		color: var(--text-primary);
	}
</style>