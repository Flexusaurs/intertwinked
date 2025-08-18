#!/bin/bash

# Test IPFS deployment script
# Usage: ./scripts/test-ipfs.sh <IPFS_HASH>

HASH=$1

if [ -z "$HASH" ]; then
    echo "Usage: $0 <IPFS_HASH>"
    echo "Example: $0 QmWjqjXeoxjHvnDKPodCX8G8bFrpmx9pxMeoEKvQcpVCd1"
    exit 1
fi

echo "🔍 Testing IPFS content: $HASH"
echo ""

# Test different gateways
GATEWAYS=(
    "https://ipfs.io/ipfs"
    "https://dweb.link/ipfs"
    "https://cf-ipfs.com/ipfs"
    "https://gateway.pinata.cloud/ipfs"
    "https://cloudflare-ipfs.com/ipfs"
)

for gateway in "${GATEWAYS[@]}"; do
    echo "Testing: $gateway/$HASH"
    
    # Test with curl
    response=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$gateway/$HASH")
    
    if [ "$response" = "200" ]; then
        echo "✅ $gateway - OK"
    elif [ "$response" = "504" ]; then
        echo "⏳ $gateway - Gateway timeout (content may still be propagating)"
    elif [ "$response" = "000" ]; then
        echo "❌ $gateway - Connection timeout"
    else
        echo "⚠️  $gateway - HTTP $response"
    fi
    
    sleep 1
done

echo ""
echo "🔗 Direct links:"
for gateway in "${GATEWAYS[@]}"; do
    echo "- $gateway/$HASH"
done

echo ""
echo "💡 Tips:"
echo "- If all gateways show 504, content may still be propagating (wait 5-10 minutes)"
echo "- If some work and others don't, try the working ones"
echo "- ipfs.io is the primary gateway for this deployment"