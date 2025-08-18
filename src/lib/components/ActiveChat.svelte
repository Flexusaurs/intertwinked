<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import type { Message } from '../types';
	import MessageInput from './MessageInput.svelte';
	import { chatStore } from '../stores/chat';

	export let peerId: string;
	export let nickname: string;
	export let messages: Message[];

	let messagesContainer: HTMLDivElement;

	// Auto-scroll to bottom when new messages arrive
	afterUpdate(() => {
		if (messagesContainer) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	});

	function handleSendMessage(content: string) {
		const message: Message = {
			id: `msg-${Date.now()}`,
			senderId: 'you',
			senderNickname: 'you',
			content,
			timestamp: new Date(),
			status: 'sent'
		};

		chatStore.addMessage(peerId, message);

		// Simulate receiving a response (for demo purposes)
		setTimeout(() => {
			const response: Message = {
				id: `msg-${Date.now()}-response`,
				senderId: peerId,
				senderNickname: nickname,
				content: `Echo: ${content}`,
				timestamp: new Date(),
				status: 'delivered'
			};
			chatStore.addMessage(peerId, response);
		}, 1000);
	}

	function formatTime(date: Date): string {
		return date.toLocaleTimeString('en-US', { 
			hour12: false, 
			hour: '2-digit', 
			minute: '2-digit' 
		});
	}

	function getStatusSymbol(status: Message['status']): string {
		switch (status) {
			case 'sent': return '→';
			case 'delivered': return '✓';
			case 'failed': return '✗';
			default: return '';
		}
	}
</script>

<div class="active-chat">
	<div class="chat-header">
		┌─ Chat: {nickname} ──────────────────────────────────────┐
	</div>
	
	<div class="messages-container" bind:this={messagesContainer}>
		{#if messages.length === 0}
			<div class="no-messages">
				│ No messages yet. Start the conversation!           │
			</div>
		{:else}
			{#each messages as message (message.id)}
				<div class="message" class:own-message={message.senderId === 'you'}>
					<span class="message-sender">{message.senderNickname}:</span>
					<span class="message-content">{message.content}</span>
					<span class="message-meta">
						<span class="message-time">{formatTime(message.timestamp)}</span>
						<span class="message-status">{getStatusSymbol(message.status)}</span>
					</span>
				</div>
			{/each}
		{/if}
	</div>

	<MessageInput on:send={(e) => handleSendMessage(e.detail)} />
	
	<div class="chat-footer">
		└────────────────────────────────────────────────────────┘
	</div>
</div>

<style>
	.active-chat {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.chat-header {
		padding: 8px 12px;
		background-color: var(--bg-secondary);
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
	}

	.messages-container {
		flex: 1;
		overflow-y: auto;
		padding: 8px 12px;
		background-color: var(--bg-primary);
	}

	.no-messages {
		color: var(--text-muted);
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		padding: 20px 0;
	}

	.message {
		display: flex;
		gap: 8px;
		padding: 4px 0;
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		line-height: 1.4;
		word-wrap: break-word;
	}

	.message-sender {
		color: var(--accent);
		font-weight: 500;
		flex-shrink: 0;
		min-width: 60px;
	}

	.own-message .message-sender {
		color: var(--success);
	}

	.message-content {
		color: var(--text-primary);
		flex: 1;
	}

	.message-meta {
		display: flex;
		gap: 4px;
		color: var(--text-muted);
		font-size: 11px;
		flex-shrink: 0;
		align-items: center;
	}

	.message-time {
		opacity: 0.7;
	}

	.message-status {
		width: 12px;
		text-align: center;
	}

	.chat-footer {
		padding: 4px 12px;
		background-color: var(--bg-secondary);
		border-top: 1px solid var(--border);
		color: var(--text-muted);
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
	}
</style>