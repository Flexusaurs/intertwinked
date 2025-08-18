# Technology Stack

## Core Technologies
- **Frontend**: Web application (browser-based)
- **P2P Protocol**: Peer-to-peer networking for direct communication
- **Storage**: IPFS (InterPlanetary File System) for decentralized file storage and hosting
- **Encryption**: End-to-end encryption for all communications
- **Local Storage**: Browser-based storage for chat history and user data

## Development & Deployment

### Build System
- Containerized application architecture
- GitHub Actions for CI/CD pipeline

### CI/CD Pipeline
```bash
# CI Process
- Run automated tests (must pass)
- Compile and build application
- Create container image

# CD Process  
- Pin built files to IPFS
- Deploy webapp to IPFS network via ipfs.io
- Update container image deployment
```

### Key Requirements
- **Complete decentralization**: No reliance on traditional cloud hosts or servers
- **IPFS deployment**: Final build must be pinned and hosted on IPFS
- **Containerization**: Application must be fully containerized
- **Zero central dependencies**: All functionality must work without centralized services

### Security Implementation
- Cryptographic peer identity generation
- Token-based authentication with mnemonic backup
- Local encryption/decryption of all transmitted content
- Secure key management for peer-to-peer communications

the webapp should work in a p2p and decentralized manner, as there's no dependance of any kind on external servers or services. it has to use typescript all around for both the backend and frontend. svelte has to be used for the frontend code, the networking stack has to use helia for IPFS, libp2p, escpecially gossipsub, kad-dht, yamux for peer discovery, routing and connection between different peers. 