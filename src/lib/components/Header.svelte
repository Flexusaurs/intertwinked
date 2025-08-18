<script lang="ts">
	import { themeStore } from '../stores/theme';
	
	$: currentTheme = $themeStore;
</script>

<header class="header">
	<div class="title">
		┌─ Intertwinked ─────────────────────────────────────────┐
	</div>
	<button 
		class="theme-toggle cli-button" 
		on:click={themeStore.toggle}
		aria-label="Toggle theme"
	>
		[{currentTheme === 'light' ? 'Dark' : 'Light'}]
	</button>
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 16px;
		border-bottom: 1px solid var(--border);
		background-color: var(--bg-primary);
		min-height: 40px;
	}

	.title {
		font-weight: 500;
		color: var(--text-primary);
		font-family: 'JetBrains Mono', monospace;
	}

	.theme-toggle {
		font-size: 12px;
		padding: 2px 6px;
	}

	@media (max-width: 768px) {
		.title {
			font-size: 12px;
		}
	}
</style>