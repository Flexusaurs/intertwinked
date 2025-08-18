<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let inputValue = '';
	let inputElement: HTMLInputElement;

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}

	function sendMessage() {
		const content = inputValue.trim();
		if (content) {
			dispatch('send', content);
			inputValue = '';
		}
	}

	function handleSubmit(event: Event) {
		event.preventDefault();
		sendMessage();
	}
</script>

<form class="message-input-container" on:submit={handleSubmit}>
	<div class="input-wrapper">
		<span class="prompt">></span>
		<input
			bind:this={inputElement}
			bind:value={inputValue}
			class="message-input cli-input"
			type="text"
			placeholder="type message here..."
			on:keydown={handleKeydown}
			autocomplete="off"
			maxlength="1000"
		/>
		<span class="cursor">_</span>
	</div>
	<button type="submit" class="send-button cli-button" disabled={!inputValue.trim()}>
		[Send]
	</button>
</form>

<style>
	.message-input-container {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		background-color: var(--bg-secondary);
		border-top: 1px solid var(--border);
	}

	.input-wrapper {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 4px;
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
	}

	.prompt {
		color: var(--accent);
		font-weight: 500;
	}

	.message-input {
		flex: 1;
		background: transparent;
		border: none;
		border-bottom: 1px solid var(--border);
		color: var(--text-primary);
		font-family: inherit;
		font-size: inherit;
		padding: 4px 0;
		outline: none;
	}

	.message-input:focus {
		border-bottom-color: var(--accent);
	}

	.message-input::placeholder {
		color: var(--text-muted);
		font-style: italic;
	}

	.cursor {
		color: var(--accent);
		animation: blink 1s infinite;
	}

	.send-button {
		font-size: 12px;
		padding: 4px 8px;
	}

	.send-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		border-color: var(--border-muted);
		color: var(--text-muted);
	}

	.send-button:disabled:hover {
		background: transparent;
		border-color: var(--border-muted);
	}

	@keyframes blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0; }
	}

	@media (max-width: 768px) {
		.message-input-container {
			padding: 6px 8px;
		}
		
		.send-button {
			font-size: 11px;
			padding: 3px 6px;
		}
	}
</style>