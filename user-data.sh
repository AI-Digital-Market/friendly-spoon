#!/bin/bash
# User data script for EC2 instance initialization

exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

echo "Starting OneLastAI.com server initialization..."

# Update system
apt-get update
apt-get upgrade -y

# Install essential packages
apt-get install -y \
    curl \
    wget \
    git \
    unzip \
    htop \
    nginx \
    certbot \
    python3-certbot-nginx \
    ufw

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
systemctl start docker
systemctl enable docker

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Create application user
useradd -m -s /bin/bash onelastai
usermod -aG docker onelastai

# Create application directory
mkdir -p /opt/onelastai
chown onelastai:onelastai /opt/onelastai

# Configure firewall
ufw --force enable
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp

# Create welcome message
cat > /etc/motd << 'EOF'
 ██████╗ ███╗   ██╗███████╗██╗      █████╗ ███████╗████████╗ █████╗ ██╗
██╔═══██╗████╗  ██║██╔════╝██║     ██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██║
██║   ██║██╔██╗ ██║█████╗  ██║     ███████║███████╗   ██║   ███████║██║
██║   ██║██║╚██╗██║██╔══╝  ██║     ██╔══██║╚════██║   ██║   ██╔══██║██║
╚██████╔╝██║ ╚████║███████╗███████╗██║  ██║███████║   ██║   ██║  ██║██║
 ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝

🚀 OneLastAI.com Server Ready!

Next Steps:
1. Upload your application files to /opt/onelastai/
2. Run the deployment script: sudo ./deploy-ec2.sh
3. Point your domain DNS to this server's IP
4. Access your platform at https://${domain_name}

Server Info:
- Application Dir: /opt/onelastai/
- Logs: /var/log/onelastai/
- Status: docker ps

EOF

echo "OneLastAI.com server initialization completed!"
