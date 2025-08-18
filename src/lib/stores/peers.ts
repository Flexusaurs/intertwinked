import { writable } from 'svelte/store';
import type { PeerInfo } from '../types';

// Mock peer data for development
const mockPeers: PeerInfo[] = [
	{
		id: 'peer123',
		nickname: 'alice',
		status: 'online',
		lastSeen: new Date()
	},
	{
		id: 'peer456', 
		nickname: 'bob',
		status: 'online',
		lastSeen: new Date()
	},
	{
		id: 'peer789',
		nickname: 'charlie',
		status: 'dead',
		lastSeen: new Date(Date.now() - 3600000) // 1 hour ago
	},
	{
		id: 'peer012',
		nickname: 'diana',
		status: 'offline',
		lastSeen: new Date(Date.now() - 1800000) // 30 minutes ago
	}
];

function createPeerStore() {
	const { subscribe, set, update } = writable<PeerInfo[]>(mockPeers);

	return {
		subscribe,
		updatePeerStatus: (peerId: string, status: PeerInfo['status']) => {
			update(peers => peers.map(peer => 
				peer.id === peerId 
					? { ...peer, status, lastSeen: new Date() }
					: peer
			));
		},
		addPeer: (peer: PeerInfo) => {
			update(peers => [...peers, peer]);
		},
		removePeer: (peerId: string) => {
			update(peers => peers.filter(peer => peer.id !== peerId));
		}
	};
}

export const peerStore = createPeerStore();