# Intertwinked - P2P Communication Platform

A decentralized peer-to-peer communication application with a CLI-style interface.

## Features

- Terminal-inspired UI with dark/light theme toggle
- Peer sidebar with real-time status indicators
- Tabbed chat system
- Responsive design for mobile, tablet, and desktop
- Full keyboard navigation support

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **Frontend**: SvelteKit + TypeScript
- **Styling**: CSS Custom Properties with CLI aesthetic
- **P2P**: libp2p, Helia, GossipSub (planned)
- **Build**: Vite
- **Deployment**: IPFS (planned)

## Current Status

This is a limited test build with:
- ✅ CLI-style interface with theme toggle
- ✅ Peer sidebar with mock data and status indicators
- ✅ Tabbed chat system with unread counts
- ✅ Message input/display with mock responses
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Keyboard navigation and accessibility
- ✅ Local storage for theme persistence
- ✅ ASCII-style borders and terminal aesthetics
- ✅ JetBrains Mono font and monospace styling
- ✅ Build system with SvelteKit + Vite
- ✅ Docker containerization ready
- ✅ GitHub Actions CI/CD pipeline
- ⏳ P2P networking (planned)
- ⏳ End-to-end encryption (planned)
- ⏳ IPFS integration (planned)

## Demo Features

- **Theme Toggle**: Click [Light]/[Dark] button in header
- **Peer Interaction**: Click on peers in sidebar to open chat tabs
- **Chat Tabs**: Multiple conversations with unread indicators
- **Mock Messaging**: Send messages and receive echo responses
- **Responsive**: Test on different screen sizes
- **Keyboard Navigation**: Full Tab/Enter key support