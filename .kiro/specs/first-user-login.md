# Spec: First User Login Flow

## Overview
Design and implement the initial user onboarding flow that generates cryptographic identity, authentication credentials, and allows profile customization for the decentralized P2P communication platform.

## Requirements

### Functional Requirements
1. **Identity Generation**: Generate unique peer ID on first login
2. **Authentication Setup**: Create login token and 4-word mnemonic key
3. **Profile Setup**: Allow nickname selection and profile picture upload
4. **IPFS Integration**: Pin profile picture to IPFS network
5. **Local Storage**: Persist user credentials and profile data locally
6. **Security**: Ensure all generated credentials are cryptographically secure

### Non-Functional Requirements
- **Performance**: Identity generation should complete within 2 seconds
- **Security**: Use cryptographically secure random generation
- **Usability**: Simple, guided onboarding flow
- **Reliability**: Handle network failures gracefully during IPFS operations
- **Privacy**: No data transmitted to centralized servers

## Design

### User Flow
```
1. User opens app for first time
2. System detects no existing identity
3. Generate peer ID, token, and mnemonic automatically
4. Display generated credentials to user
5. Prompt user to save mnemonic securely
6. Collect nickname from user
7. Optional: Upload profile picture
8. Pin profile picture to IPFS (if provided)
9. Store all data locally
10. Complete onboarding, enter main app
```

### Data Models

#### Peer Identity
```typescript
interface PeerIdentity {
  peerId: string;           // Unique public identifier
  loginToken: string;       // Authentication token
  mnemonic: string[];       // 4-word recovery phrase
  privateKey: string;       // Encrypted private key
  createdAt: Date;
}
```

#### User Profile
```typescript
interface UserProfile {
  nickname: string;
  profilePictureHash?: string;  // IPFS hash
  profilePictureUrl?: string;   // IPFS gateway URL
  createdAt: Date;
  updatedAt: Date;
}
```

### Security Considerations
- Generate peer ID using cryptographically secure random number generator
- Derive login token from secure key derivation function
- Use BIP39 wordlist for mnemonic generation
- Encrypt private key before local storage
- Validate mnemonic entropy meets security requirements

## Implementation Tasks

### Phase 1: Core Identity Generation
- [ ] Implement cryptographic peer ID generation
- [ ] Create secure login token generation
- [ ] Implement 4-word mnemonic generation using BIP39
- [ ] Add private key generation and encryption
- [ ] Create local storage utilities for identity data

### Phase 2: User Interface
- [ ] Design onboarding flow UI components
- [ ] Create identity display screen (show generated credentials)
- [ ] Implement mnemonic backup confirmation flow
- [ ] Add nickname input form with validation
- [ ] Create profile picture upload component

### Phase 3: IPFS Integration
- [ ] Implement IPFS client initialization
- [ ] Add profile picture pinning functionality
- [ ] Handle IPFS upload errors and retries
- [ ] Generate IPFS gateway URLs for profile pictures
- [ ] Add offline handling for IPFS operations

### Phase 4: Data Persistence
- [ ] Implement secure local storage for identity
- [ ] Add profile data persistence
- [ ] Create data migration utilities
- [ ] Implement backup/restore functionality

### Phase 5: Error Handling & Edge Cases
- [ ] Handle identity generation failures
- [ ] Add IPFS connection error handling
- [ ] Implement retry mechanisms for network operations
- [ ] Add validation for user inputs
- [ ] Handle storage quota exceeded scenarios

## Acceptance Criteria

### Identity Generation
- ✅ Peer ID is unique and cryptographically secure
- ✅ Login token provides sufficient entropy for authentication
- ✅ 4-word mnemonic follows BIP39 standard
- ✅ Private key is properly encrypted before storage

### User Experience
- ✅ Onboarding flow is intuitive and guided
- ✅ User can successfully save and verify mnemonic
- ✅ Nickname validation prevents conflicts and inappropriate content
- ✅ Profile picture upload works with common image formats

### IPFS Integration
- ✅ Profile pictures are successfully pinned to IPFS
- ✅ IPFS hash is stored and retrievable
- ✅ Graceful degradation when IPFS is unavailable
- ✅ Profile pictures load correctly from IPFS gateway

### Security & Privacy
- ✅ No sensitive data transmitted to external servers
- ✅ All credentials stored encrypted locally
- ✅ Identity generation uses secure randomness
- ✅ User can complete flow entirely offline (except IPFS pinning)

## Technical Notes

### Dependencies
- Crypto library for secure random generation
- IPFS client library (js-ipfs or similar)
- BIP39 library for mnemonic generation
- Local storage encryption utilities

### Browser Compatibility
- Support modern browsers with Web Crypto API
- Graceful degradation for older browsers
- Handle different storage quota limits

### Testing Strategy
- Unit tests for cryptographic functions
- Integration tests for IPFS operations
- E2E tests for complete onboarding flow
- Security testing for credential generation