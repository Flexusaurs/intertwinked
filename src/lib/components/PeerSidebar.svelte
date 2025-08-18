<script lang="ts">
	import { peerStore } from '../stores/peers';
	import { chatStore } from '../stores/chat';
	import PeerListItem from './PeerListItem.svelte';
	
	$: peers = $peerStore;

	function handlePeerClick(peerId: string, nickname: string) {
		chatStore.openTab(peerId, nickname);
	}
</script>

<aside class="peer-sidebar">
	<div class="sidebar-header">
		│ [●] Connected Peers
	</div>
	<div class="peer-list">
		{#each peers as peer (peer.id)}
			<PeerListItem 
				{peer} 
				on:click={() => handlePeerClick(peer.id, peer.nickname)}
			/>
		{/each}
	</div>
	<div class="sidebar-footer">
		└─────────────────────────
	</div>
</aside>

<style>
	.peer-sidebar {
		background-color: var(--bg-primary);
		border-right: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.sidebar-header {
		padding: 8px 12px;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		font-weight: 500;
		background-color: var(--bg-secondary);
	}

	.peer-list {
		flex: 1;
		overflow-y: auto;
		padding: 4px 0;
	}

	.sidebar-footer {
		padding: 4px 12px;
		color: var(--text-muted);
		border-top: 1px solid var(--border);
		background-color: var(--bg-secondary);
	}

	@media (max-width: 768px) {
		.peer-sidebar {
			order: 2;
			border-right: none;
			border-top: 1px solid var(--border);
		}
	}
</style>