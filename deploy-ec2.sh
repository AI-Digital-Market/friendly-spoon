#!/bin/bash

# OneLastAI.com AWS EC2 Deployment Script
# This script sets up the complete platform on AWS EC2

set -e

echo "🚀 Starting OneLastAI.com deployment on AWS EC2..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="onelastai.com"
APP_DIR="/opt/onelastai"
SSL_DIR="/etc/nginx/ssl"
LOG_DIR="/var/log/onelastai"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   print_error "This script must be run as root (use sudo)"
   exit 1
fi

print_status "Updating system packages..."
apt update && apt upgrade -y

print_status "Installing required packages..."
apt install -y \
    curl \
    wget \
    git \
    nginx \
    certbot \
    python3-certbot-nginx \
    ufw \
    htop \
    unzip

# Install Docker
print_status "Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
systemctl start docker
systemctl enable docker

# Install Docker Compose
print_status "Installing Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install Node.js (for build tools)
print_status "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Create application directory
print_status "Setting up application directory..."
mkdir -p $APP_DIR
mkdir -p $SSL_DIR
mkdir -p $LOG_DIR

# Configure firewall
print_status "Configuring firewall..."
ufw --force enable
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp
ufw reload

# Clone or copy application code
print_status "Setting up application code..."
cd $APP_DIR

# If git repository exists, clone it
# git clone https://github.com/AI-Digital-Market/friendly-spoon.git .

# For now, we'll assume code is copied manually
print_warning "Please ensure your application code is in $APP_DIR"

# Build and start the application
print_status "Building and starting OneLastAI.com platform..."
if [ -f "docker-compose.yml" ]; then
    docker-compose down --remove-orphans 2>/dev/null || true
    docker-compose build --no-cache
    docker-compose up -d
    print_success "Application started successfully!"
else
    print_warning "docker-compose.yml not found. Please copy your application files first."
fi

# Setup SSL certificates with Let's Encrypt
setup_ssl() {
    print_status "Setting up SSL certificates..."
    
    domains=(
        "onelastai.com"
        "www.onelastai.com"
        "chat.onelastai.com"
        "creator.onelastai.com"
        "mood.onelastai.com"
        "ip.onelastai.com"
        "visual.onelastai.com"
        "blog.onelastai.com"
        "memory.onelastai.com"
    )
    
    for domain in "${domains[@]}"; do
        print_status "Obtaining SSL certificate for $domain..."
        certbot --nginx -d $domain --non-interactive --agree-tos --email admin@onelastai.com || print_warning "Failed to get SSL for $domain"
    done
}

# Setup monitoring
setup_monitoring() {
    print_status "Setting up monitoring..."
    
    # Create monitoring script
    cat > /usr/local/bin/onelastai-monitor.sh << 'EOF'
#!/bin/bash
# OneLastAI.com Health Monitor

LOG_FILE="/var/log/onelastai/monitor.log"
date >> $LOG_FILE

# Check if containers are running
if ! docker ps | grep -q onelastai-platform; then
    echo "ERROR: OneLastAI platform container is not running" >> $LOG_FILE
    docker-compose -f /opt/onelastai/docker-compose.yml up -d
fi

# Check disk space
DISK_USAGE=$(df / | awk 'NR==2{print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "WARNING: Disk usage is ${DISK_USAGE}%" >> $LOG_FILE
fi

# Check memory usage
MEM_USAGE=$(free | awk 'NR==2{printf "%.2f", $3*100/$2}')
if (( $(echo "$MEM_USAGE > 80" | bc -l) )); then
    echo "WARNING: Memory usage is ${MEM_USAGE}%" >> $LOG_FILE
fi

echo "Health check completed" >> $LOG_FILE
EOF

    chmod +x /usr/local/bin/onelastai-monitor.sh
    
    # Add to crontab
    (crontab -l 2>/dev/null; echo "*/5 * * * * /usr/local/bin/onelastai-monitor.sh") | crontab -
}

# Setup log rotation
setup_logging() {
    print_status "Setting up log rotation..."
    
    cat > /etc/logrotate.d/onelastai << 'EOF'
/var/log/onelastai/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 root root
    postrotate
        docker kill --signal="USR1" onelastai-platform 2>/dev/null || true
    endscript
}
EOF
}

# Performance optimization
optimize_system() {
    print_status "Optimizing system performance..."
    
    # Increase file limits
    cat >> /etc/security/limits.conf << 'EOF'
* soft nofile 65535
* hard nofile 65535
EOF
    
    # Optimize sysctl
    cat >> /etc/sysctl.conf << 'EOF'
# OneLastAI optimizations
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 65535
net.ipv4.ip_local_port_range = 1024 65535
net.ipv4.tcp_fin_timeout = 30
vm.swappiness = 10
EOF
    
    sysctl -p
}

# Main execution
print_status "Starting OneLastAI.com setup..."

# Run setup functions
setup_monitoring
setup_logging
optimize_system

# Ask about SSL setup
read -p "Do you want to setup SSL certificates now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    setup_ssl
fi

print_success "🎉 OneLastAI.com deployment completed!"
echo
echo "=== Deployment Summary ==="
echo "• Platform URL: https://onelastai.com"
echo "• Chat Agent: https://chat.onelastai.com"
echo "• Creative Agent: https://creator.onelastai.com"
echo "• Mood Agent: https://mood.onelastai.com"
echo "• IP Tracker: https://ip.onelastai.com"
echo "• Visual Agent: https://visual.onelastai.com"
echo "• Blog: https://blog.onelastai.com"
echo "• Memory Agent: https://memory.onelastai.com"
echo
echo "=== Next Steps ==="
echo "1. Point your domain DNS to this server's IP"
echo "2. Copy your application code to $APP_DIR"
echo "3. Run: cd $APP_DIR && docker-compose up -d"
echo "4. Check logs: docker-compose logs -f"
echo
echo "=== Useful Commands ==="
echo "• Check status: docker ps"
echo "• View logs: docker-compose logs -f"
echo "• Restart: docker-compose restart"
echo "• Update: git pull && docker-compose up -d --build"
echo
print_success "OneLastAI.com is ready to serve the world! 🚀"
