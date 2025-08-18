import { writable } from 'svelte/store';
import type { ChatTab, Message } from '../types';

function createChatStore() {
	const { subscribe, set, update } = writable<{
		tabs: ChatTab[];
		activeTabId: string | null;
		messages: Map<string, Message[]>;
	}>({
		tabs: [],
		activeTabId: null,
		messages: new Map()
	});

	return {
		subscribe,
		openTab: (peerId: string, nickname: string) => {
			update(state => {
				// Check if tab already exists
				const existingTab = state.tabs.find(tab => tab.peerId === peerId);
				if (existingTab) {
					// Just activate existing tab
					return {
						...state,
						activeTabId: existingTab.id,
						tabs: state.tabs.map(tab => ({
							...tab,
							isActive: tab.id === existingTab.id
						}))
					};
				}

				// Create new tab
				const newTab: ChatTab = {
					id: `tab-${peerId}`,
					peerId,
					nickname,
					unreadCount: 0,
					isActive: true
				};

				return {
					...state,
					tabs: [
						...state.tabs.map(tab => ({ ...tab, isActive: false })),
						newTab
					],
					activeTabId: newTab.id
				};
			});
		},
		closeTab: (tabId: string) => {
			update(state => {
				const newTabs = state.tabs.filter(tab => tab.id !== tabId);
				let newActiveTabId = state.activeTabId;

				// If we closed the active tab, activate another one
				if (state.activeTabId === tabId) {
					if (newTabs.length > 0) {
						newActiveTabId = newTabs[newTabs.length - 1].id;
						newTabs[newTabs.length - 1].isActive = true;
					} else {
						newActiveTabId = null;
					}
				}

				return {
					...state,
					tabs: newTabs,
					activeTabId: newActiveTabId
				};
			});
		},
		setActiveTab: (tabId: string) => {
			update(state => ({
				...state,
				activeTabId: tabId,
				tabs: state.tabs.map(tab => ({
					...tab,
					isActive: tab.id === tabId,
					unreadCount: tab.id === tabId ? 0 : tab.unreadCount
				}))
			}));
		},
		addMessage: (peerId: string, message: Message) => {
			update(state => {
				const newMessages = new Map(state.messages);
				const peerMessages = newMessages.get(peerId) || [];
				newMessages.set(peerId, [...peerMessages, message]);

				// Update unread count if tab is not active
				const tabs = state.tabs.map(tab => {
					if (tab.peerId === peerId && !tab.isActive) {
						return { ...tab, unreadCount: tab.unreadCount + 1 };
					}
					return tab;
				});

				return {
					...state,
					messages: newMessages,
					tabs
				};
			});
		}
	};
}

export const chatStore = createChatStore();