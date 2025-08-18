<!------------------------------------------------------------------------------------
   Add Rules to this file or a short description and have Kiro refine them for you:   
-------------------------------------------------------------------------------------> 

# Deployment Workflow

## Decentralized Deployment Requirements

In order for the app to be completely decentralized, the final build has to be pinned to IPFS exclusively through ipfs.io.

## CI/CD Pipeline

### Continuous Integration (CI)
- Check for no failing tests
- Compile and build everything using GitHub Actions
- Verify build integrity and completeness
- Generate build artifacts

### Continuous Deployment (CD)
- Pin the final files to IPFS network via ipfs.io
- Host them on the IPFS network to avoid reliance on traditional cloud hosts or servers
- Ensure complete decentralization by using only IPFS for hosting
- The app must be completely containerized
- After CI, the app image will be updated
- CD job deploys the webapp to the IPFS network exclusively on ipfs.io

## Deployment Target
- **Primary**: ipfs.io IPFS network
- **Access**: https://ipfs.io/ipfs/[HASH]
- **No fallback gateways**: Only ipfs.io to maintain true decentralization

