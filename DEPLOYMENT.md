# Deployment Guide

## GitHub Actions Workflows

This project includes two GitHub Actions workflows:

### 1. CI Workflow (`.github/workflows/ci.yml`)
- **Purpose**: Build and test the application
- **Triggers**: Push to main/master, PRs, manual dispatch
- **Steps**: Install deps → Test → Build → Upload artifacts

### 2. Deploy Workflow (`.github/workflows/deploy.yml`)
- **Purpose**: Build and deploy to IPFS
- **Triggers**: Push to main/master, PRs, manual dispatch
- **Steps**: Build → Deploy to IPFS → Generate access URLs

## Troubleshooting GitHub Actions

### Common Issues:

1. **Workflow not triggering**
   - Check if your default branch is `main` or `master`
   - Ensure the workflow files are in `.github/workflows/`
   - Try manual trigger via "Actions" tab → "Run workflow"

2. **Organization Action Restrictions**
   - If you get "actions not allowed" errors, your organization restricts external actions
   - Go to Organization Settings → Actions → Allow GitHub actions
   - Or use the modified workflows that don't require external actions

3. **Build failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Test build locally: `npm ci && npm run build`

4. **IPFS deployment issues**
   - IPFS setup might timeout - check logs
   - Network issues with IPFS gateways
   - Try the CI workflow first to isolate build issues

5. **504 Gateway Timeout on IPFS**
   - Content may take 5-10 minutes to propagate across IPFS network
   - Try alternative gateways: dweb.link or cf-ipfs.com
   - Check if IPFS daemon connected to network during deployment
   - Verify content was properly pinned in GitHub Actions logs

### Manual Testing:

```bash
# Test the build process locally
npm ci
npm test
npm run build
ls -la build/

# Test with Docker
docker build -t intertwinked .
docker run -p 8080:80 intertwinked
```

### Deployment URLs:

Once deployed to IPFS, the app will be available at:
- **Primary**: https://ipfs.io/ipfs/[HASH]
- **Alternatives** (if primary is slow): 
  - https://dweb.link/ipfs/[HASH]
  - https://cf-ipfs.com/ipfs/[HASH]

**Important**: IPFS content may take 5-10 minutes to propagate across the network. If you get a 504 timeout immediately after deployment, wait a few minutes and try again.

The application is pinned to the IPFS network for complete decentralization. The HASH will be displayed in the GitHub Actions summary.

## Local Development

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Environment Setup

The workflows are configured to:
- Use Node.js 20
- Cache npm dependencies
- Continue on test failures (for now)
- Support both `main` and `master` branches
- Allow manual workflow dispatch