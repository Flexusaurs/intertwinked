# Project Structure

## Organization Principles
- **Decentralized architecture**: No server-side components, pure client-side application
- **Modular design**: Separate concerns for P2P networking, encryption, UI, and storage
- **Browser-first**: All functionality implemented for web browser environment

## Expected Folder Structure
```
/
├── src/
│   ├── components/          # UI components
│   ├── crypto/             # Encryption/decryption utilities
│   ├── p2p/                # Peer-to-peer networking logic
│   ├── storage/            # Local storage management
│   ├── identity/           # Peer identity and authentication
│   └── ipfs/               # IPFS integration utilities
├── public/                 # Static assets
├── tests/                  # Test suites
├── docker/                 # Container configuration
├── .github/workflows/      # CI/CD pipeline definitions
└── docs/                   # Documentation
```

## Key Components
- **Identity Management**: Peer ID generation, token management, mnemonic keys
- **P2P Communication**: Direct peer connections and message routing
- **Encryption Layer**: End-to-end encryption for all transmitted data
- **IPFS Integration**: File pinning, retrieval, and decentralized hosting
- **Local Storage**: Browser-based persistence for chat history and user data
- **UI Components**: User interface for chat, file sharing, and identity management

## Development Guidelines
- All code must work without centralized server dependencies
- Implement proper error handling for P2P connection failures
- Ensure all sensitive data is encrypted before storage or transmission
- Follow container-first development practices
- Design for IPFS deployment constraints