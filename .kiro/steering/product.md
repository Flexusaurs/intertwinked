# Product Overview

## Intertwinked - Decentralized P2P Communication Platform

A fully decentralized peer-to-peer communication application that enables secure chat and file sharing without relying on centralized servers.

### Key Features
- **Peer-to-peer communication**: Direct communication between users using unique peer identities
- **End-to-end encryption**: All content (messages and files) encrypted before transmission
- **IPFS integration**: File sharing and app hosting via IPFS for complete decentralization
- **Local data storage**: Chat and file history stored locally in browser
- **Identity management**: Unique peer IDs with nickname system and profile pictures
- **Session control**: Users can destroy and regenerate peer identities as needed

### Security Model
- Each peer has a unique public string (like public key) for identity verification
- Login system uses unique token string and 4-word mnemonic key
- Prevents user impersonation through cryptographic identity verification
- MITM attack prevention through encryption of all transferred content
- Dead peer detection and UI marking for destroyed identities

the webapp is made for anonymous and secure messaging and file sharing in an overlay network based on p2p and distributed networking and computing.