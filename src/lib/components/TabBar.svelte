<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ChatTab } from '../types';

	export let tabs: ChatTab[];
	export let activeTabId: string | null;

	const dispatch = createEventDispatcher();

	function handleTabClick(tabId: string) {
		dispatch('tabClick', tabId);
	}

	function handleTabClose(event: Event, tabId: string) {
		event.stopPropagation();
		dispatch('tabClose', tabId);
	}

	function handleKeydown(event: KeyboardEvent, tabId: string) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleTabClick(tabId);
		}
	}
</script>

<div class="tab-bar">
	<div class="tab-container">
		{#each tabs as tab (tab.id)}
			<div 
				class="tab"
				class:active={tab.id === activeTabId}
				on:click={() => handleTabClick(tab.id)}
				on:keydown={(e) => handleKeydown(e, tab.id)}
				role="button"
				tabindex="0"
				aria-label="Chat with {tab.nickname}"
			>
				<span class="tab-name">
					{#if tab.id === activeTabId}[{tab.nickname}]{:else}{tab.nickname}{/if}
				</span>
				{#if tab.unreadCount > 0}
					<span class="unread-count">({tab.unreadCount})</span>
				{/if}
				<button 
					class="close-button"
					on:click={(e) => handleTabClose(e, tab.id)}
					aria-label="Close chat with {tab.nickname}"
				>
					×
				</button>
			</div>
		{/each}
		<div class="add-tab">
			[+]
		</div>
	</div>
</div>

<style>
	.tab-bar {
		border-bottom: 1px solid var(--border);
		background-color: var(--bg-secondary);
		padding: 0 8px;
		overflow-x: auto;
		flex-shrink: 0;
	}

	.tab-container {
		display: flex;
		align-items: center;
		gap: 4px;
		min-height: 36px;
		white-space: nowrap;
	}

	.tab {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 6px 8px;
		cursor: pointer;
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		border-radius: 0;
		transition: background-color 0.1s ease;
		border: 1px solid transparent;
	}

	.tab:hover {
		background-color: var(--bg-primary);
		border-color: var(--border);
	}

	.tab:focus {
		outline: 2px solid var(--accent);
		outline-offset: -2px;
	}

	.tab.active {
		background-color: var(--bg-primary);
		border-color: var(--accent);
		color: var(--accent);
	}

	.tab-name {
		color: var(--text-primary);
	}

	.tab.active .tab-name {
		color: var(--accent);
		font-weight: 500;
	}

	.unread-count {
		color: var(--warning);
		font-size: 11px;
		font-weight: 500;
	}

	.close-button {
		background: none;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		font-size: 16px;
		line-height: 1;
		padding: 0;
		margin-left: 4px;
		width: 16px;
		height: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close-button:hover {
		color: var(--error);
		background-color: var(--bg-secondary);
	}

	.add-tab {
		color: var(--text-muted);
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		padding: 6px 8px;
		cursor: pointer;
	}

	.add-tab:hover {
		color: var(--text-primary);
	}

	/* Scrollbar for tab overflow */
	.tab-bar::-webkit-scrollbar {
		height: 4px;
	}
</style>