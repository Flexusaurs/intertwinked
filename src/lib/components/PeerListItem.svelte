<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { PeerInfo } from '../types';

	export let peer: PeerInfo;

	const dispatch = createEventDispatcher();

	function getStatusSymbol(status: PeerInfo['status']): string {
		switch (status) {
			case 'online': return '●';
			case 'offline': return '○';
			case 'dead': return '✗';
			default: return '○';
		}
	}

	function getStatusClass(status: PeerInfo['status']): string {
		switch (status) {
			case 'online': return 'status-online';
			case 'offline': return 'status-offline';
			case 'dead': return 'status-dead';
			default: return 'status-offline';
		}
	}

	function handleClick() {
		if (peer.status !== 'dead') {
			dispatch('click');
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	}
</script>

<div 
	class="peer-item {getStatusClass(peer.status)}"
	class:clickable={peer.status !== 'dead'}
	on:click={handleClick}
	on:keydown={handleKeydown}
	role="button"
	tabindex={peer.status !== 'dead' ? 0 : -1}
	aria-label="Open chat with {peer.nickname}"
>
	<span class="status-indicator">
		{getStatusSymbol(peer.status)}
	</span>
	<span class="peer-nickname">
		{peer.nickname}@{peer.id.slice(0, 7)}
	</span>
	{#if peer.status === 'dead'}
		<span class="dead-label">(DEAD)</span>
	{/if}
</div>

<style>
	.peer-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 12px;
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		transition: background-color 0.1s ease;
		border-left: 3px solid transparent;
	}

	.peer-item.clickable {
		cursor: pointer;
	}

	.peer-item.clickable:hover {
		background-color: var(--bg-secondary);
		border-left-color: var(--accent);
	}

	.peer-item.clickable:focus {
		outline: 2px solid var(--accent);
		outline-offset: -2px;
		background-color: var(--bg-secondary);
	}

	.status-indicator {
		font-size: 12px;
		width: 12px;
		text-align: center;
	}

	.peer-nickname {
		flex: 1;
		color: var(--text-primary);
	}

	.dead-label {
		color: var(--error);
		font-size: 11px;
		font-weight: 500;
	}

	.status-online .status-indicator {
		color: var(--success);
	}

	.status-offline .status-indicator {
		color: var(--text-muted);
	}

	.status-dead .status-indicator {
		color: var(--error);
	}

	.status-dead .peer-nickname {
		text-decoration: line-through;
		color: var(--text-muted);
	}
</style>