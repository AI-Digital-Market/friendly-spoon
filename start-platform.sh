#!/bin/bash

# Quick deployment script for OneLastAI.com
# Run this after the main deployment to start the platform

set -e

APP_DIR="/opt/onelastai"
DOMAIN="onelastai.com"

echo "🚀 Starting OneLastAI.com Platform..."

# Navigate to app directory
cd $APP_DIR

# Pull latest code (if using git)
if [ -d ".git" ]; then
    echo "📥 Pulling latest code..."
    git pull origin main
fi

# Build and start containers
echo "🏗️ Building and starting containers..."
docker-compose down --remove-orphans 2>/dev/null || true
docker-compose build --no-cache
docker-compose up -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 30

# Check if containers are running
if docker ps | grep -q "onelastai-platform"; then
    echo "✅ OneLastAI.com platform is running!"
    echo ""
    echo "🌐 Platform URLs:"
    echo "   Main Site: https://$DOMAIN"
    echo "   ARIA Chat: https://chat.$DOMAIN"
    echo "   MUSE Creative: https://creator.$DOMAIN"
    echo "   EMPATHY Mood: https://mood.$DOMAIN"
    echo "   TRACKER IP: https://ip.$DOMAIN"
    echo "   CINEMATIC: https://visual.$DOMAIN"
    echo "   BLOG: https://blog.$DOMAIN"
    echo "   MEMORY: https://memory.$DOMAIN"
    echo ""
    echo "📊 Status: docker ps"
    echo "📝 Logs: docker-compose logs -f"
else
    echo "❌ Failed to start platform!"
    echo "Check logs: docker-compose logs"
    exit 1
fi
