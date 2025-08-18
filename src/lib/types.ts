export interface PeerInfo {
	id: string;
	nickname: string;
	status: 'online' | 'offline' | 'dead';
	lastSeen: Date;
}

export interface ChatTab {
	id: string;
	peerId: string;
	nickname: string;
	unreadCount: number;
	isActive: boolean;
}

export interface Message {
	id: string;
	senderId: string;
	senderNickname: string;
	content: string;
	timestamp: Date;
	status: 'sent' | 'delivered' | 'failed';
}

export interface AppState {
	theme: 'light' | 'dark';
	peers: Map<string, PeerInfo>;
	activeChatTabs: ChatTab[];
	activeTabId: string | null;
	messages: Map<string, Message[]>;
	unreadCounts: Map<string, number>;
}