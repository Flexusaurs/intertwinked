<script lang="ts">
	import { chatStore } from '../stores/chat';
	import TabBar from './TabBar.svelte';
	import ActiveChat from './ActiveChat.svelte';
	
	$: chatState = $chatStore;
	$: activeTab = chatState.tabs.find(tab => tab.id === chatState.activeTabId);
</script>

<section class="chat-area">
	{#if chatState.tabs.length > 0}
		<TabBar 
			tabs={chatState.tabs}
			activeTabId={chatState.activeTabId}
			on:tabClick={(e) => chatStore.setActiveTab(e.detail)}
			on:tabClose={(e) => chatStore.closeTab(e.detail)}
		/>
		{#if activeTab}
			<ActiveChat 
				peerId={activeTab.peerId}
				nickname={activeTab.nickname}
				messages={chatState.messages.get(activeTab.peerId) || []}
			/>
		{/if}
	{:else}
		<div class="empty-state">
			<div class="empty-message">
				┌─ Chat Area ────────────────────────────────────────┐<br>
				│                                                   │<br>
				│  Select a peer from the sidebar to start         │<br>
				│  a conversation                                   │<br>
				│                                                   │<br>
				└───────────────────────────────────────────────────┘
			</div>
		</div>
	{/if}
</section>

<style>
	.chat-area {
		display: flex;
		flex-direction: column;
		background-color: var(--bg-primary);
		overflow: hidden;
	}

	.empty-state {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-muted);
	}

	.empty-message {
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		line-height: 1.4;
		text-align: left;
		white-space: pre;
	}

	@media (max-width: 768px) {
		.chat-area {
			order: 1;
		}
	}
</style>