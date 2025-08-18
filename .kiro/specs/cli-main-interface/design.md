# Design Document - CLI Main Interface

## Overview

The CLI Main Interface provides a terminal-inspired user experience for the Intertwinked P2P communication platform. The design emphasizes a familiar command-line aesthetic while delivering modern chat functionality through a peer sidebar and tabbed chat system.

## Architecture

### Component Hierarchy
```
MainInterface
├── ThemeProvider
├── Header
│   ├── AppTitle
│   └── ThemeToggle
├── Layout
│   ├── PeerSidebar
│   │   ├── PeerList
│   │   └── ScrollContainer
│   └── ChatArea
│       ├── TabBar
│       ├── ActiveChat
│       └── MessageInput
└── StatusBar
```

### State Management
```typescript
interface AppState {
  theme: 'light' | 'dark';
  peers: Map<string, PeerInfo>;
  activeChatTabs: ChatTab[];
  activeTabId: string | null;
  messages: Map<string, Message[]>;
  unreadCounts: Map<string, number>;
}

interface PeerInfo {
  id: string;
  nickname: string;
  status: 'online' | 'offline' | 'dead';
  lastSeen: Date;
}

interface ChatTab {
  id: string;
  peerId: string;
  nickname: string;
  unreadCount: number;
  isActive: boolean;
}
```

## Components and Interfaces

### 1. Theme System

**ThemeProvider Component**
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  // Manages theme state and persistence
  // Provides CSS custom properties for colors
  // Handles localStorage persistence
}
```

**CSS Custom Properties**
```css
:root[data-theme="dark"] {
  --bg-primary: #0d1117;
  --text-primary: #c9d1d9;
  --text-secondary: #8b949e;
  --accent: #58a6ff;
  --border: #30363d;
}

:root[data-theme="light"] {
  --bg-primary: #ffffff;
  --text-primary: #24292f;
  --text-secondary: #656d76;
  --accent: #0969da;
  --border: #d0d7de;
}
```

### 2. Peer Sidebar

**PeerSidebar Component**
```typescript
interface PeerSidebarProps {
  peers: Map<string, PeerInfo>;
  onPeerClick: (peerId: string) => void;
  className?: string;
}

const PeerSidebar: React.FC<PeerSidebarProps> = ({peers, onPeerClick}) => {
  // Renders scrollable peer list
  // Handles peer selection
  // Shows real-time status indicators
}
```

**PeerListItem Component**
```typescript
interface PeerListItemProps {
  peer: PeerInfo;
  onClick: () => void;
  isSelected?: boolean;
}

const StatusIndicator = {
  online: '●',
  offline: '○', 
  dead: '✗'
};
```

### 3. Chat Tab System

**TabBar Component**
```typescript
interface TabBarProps {
  tabs: ChatTab[];
  activeTabId: string | null;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({tabs, activeTabId, onTabClick, onTabClose}) => {
  // Renders horizontal tab list
  // Handles tab switching and closing
  // Shows unread message counts
}
```

**Tab Styling Logic**
```typescript
const getTabStyle = (tab: ChatTab, isActive: boolean) => ({
  display: isActive ? '[' + tab.nickname + ']' : tab.nickname,
  unreadIndicator: tab.unreadCount > 0 ? `(${tab.unreadCount})` : '',
  className: isActive ? 'tab-active' : 'tab-inactive'
});
```

### 4. Chat Interface

**ActiveChat Component**
```typescript
interface ActiveChatProps {
  peerId: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
  isTyping: boolean;
}

interface Message {
  id: string;
  senderId: string;
  senderNickname: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'failed';
}
```

**MessageInput Component**
```typescript
const MessageInput: React.FC<{onSend: (message: string) => void}> = ({onSend}) => {
  // Terminal-style input with cursor
  // Handles Enter key for sending
  // Shows typing indicators
  // Displays as: "> type message here_"
}
```

## Data Models

### Local Storage Schema
```typescript
interface StoredAppState {
  theme: 'light' | 'dark';
  chatHistory: {
    [peerId: string]: Message[];
  };
  peerProfiles: {
    [peerId: string]: {
      nickname: string;
      lastSeen: Date;
    };
  };
  openTabs: string[]; // Array of peer IDs
  activeTab: string | null;
}
```

### P2P Message Protocol
```typescript
interface P2PMessage {
  type: 'chat' | 'typing' | 'status';
  from: string;
  to: string;
  content: string;
  timestamp: Date;
  messageId: string;
}

interface TypingIndicator {
  type: 'typing';
  from: string;
  to: string;
  isTyping: boolean;
}
```

## Error Handling

### Connection Errors
- **Peer Disconnection**: Mark peer as offline, show in sidebar
- **Message Send Failure**: Show retry button, mark message as failed
- **P2P Network Issues**: Display system message with error details

### UI Error States
```typescript
interface ErrorState {
  type: 'connection' | 'send_failed' | 'peer_unreachable';
  message: string;
  retryAction?: () => void;
}

const ErrorDisplay = {
  connection: '[ERROR] Connection lost - attempting reconnect...',
  send_failed: '[FAILED] Message not sent - [Retry]',
  peer_unreachable: '[WARN] Peer unreachable - they may be offline'
};
```

### Graceful Degradation
- **Offline Mode**: Show cached messages, disable sending
- **Storage Full**: Warn user, offer to clear old messages
- **P2P Unavailable**: Show error state, allow retry

## Testing Strategy

### Unit Tests
- Theme toggle functionality
- Peer status indicator logic
- Message formatting and display
- Tab management operations
- Local storage persistence

### Integration Tests
- Peer sidebar updates with real P2P events
- Chat tab creation and switching
- Message sending and receiving flow
- Theme persistence across sessions

### E2E Tests
- Complete user flow: login → see peers → open chat → send message
- Multi-tab chat management
- Theme switching during active conversations
- Responsive layout on different screen sizes

### Accessibility Tests
- Keyboard navigation through all interface elements
- Screen reader compatibility
- Color contrast validation
- Focus management during tab switching

## Performance Considerations

### Optimization Strategies
- **Virtual Scrolling**: For large peer lists and message histories
- **Message Pagination**: Load messages on demand
- **Debounced Typing**: Limit typing indicator frequency
- **Memoization**: Cache rendered peer list items and messages

### Memory Management
- **Message Cleanup**: Remove old messages beyond storage limit
- **Tab Limits**: Maximum number of open chat tabs
- **Event Cleanup**: Proper P2P event listener cleanup

## Responsive Design

### Breakpoint Strategy
```css
/* Mobile: < 768px */
.layout-mobile {
  flex-direction: column;
  .peer-sidebar { order: 2; height: 200px; }
  .chat-area { order: 1; flex: 1; }
}

/* Tablet: 768px - 1024px */
.layout-tablet {
  .peer-sidebar { width: 200px; }
  .chat-area { flex: 1; }
}

/* Desktop: > 1024px */
.layout-desktop {
  .peer-sidebar { width: 300px; }
  .chat-area { flex: 1; }
}
```

### Mobile Adaptations
- Collapsible sidebar with hamburger menu
- Swipe gestures for tab switching
- Touch-friendly tap targets (minimum 44px)
- Optimized virtual keyboard handling

## Security Integration

### Message Encryption Display
- Show encryption status in chat header
- Visual indicators for encrypted/unencrypted messages
- Warning for failed encryption attempts

### Peer Verification
- Display peer public key fingerprints
- Visual indicators for verified/unverified peers
- Warning system for potential impersonation attempts