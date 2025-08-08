# OneLastAI.com AWS EC2 Deployment Guide

## 🚀 Complete Platform Deployment

This guide will help you deploy the entire **OneLastAI.com** platform with all AI agents to AWS EC2.

### 📋 Prerequisites

1. **AWS EC2 Instance**
   - Minimum: t3.medium (2 vCPU, 4GB RAM)
   - Recommended: t3.large (2 vCPU, 8GB RAM)
   - Storage: 20GB+ SSD
   - OS: Ubuntu 22.04 LTS

2. **Domain Configuration**
   - Domain: `onelastai.com`
   - Subdomains: `chat`, `creator`, `mood`, `ip`, `visual`, `blog`, `memory`

3. **Security Groups**
   - Port 22 (SSH)
   - Port 80 (HTTP)
   - Port 443 (HTTPS)

## 🎯 AI Agents Included

| Agent | Subdomain | Description |
|-------|-----------|-------------|
| **ARIA** | chat.onelastai.com | Advanced Reasoning & Intelligence Assistant |
| **MUSE** | creator.onelastai.com | Creative Studio & Content Generation |
| **EMPATHY** | mood.onelastai.com | Emotional Intelligence & Mood Analysis |
| **TRACKER** | ip.onelastai.com | IP Information & Network Analysis |
| **CINEMATIC** | visual.onelastai.com | AI Storytelling & Video Generation |
| **BLOG** | blog.onelastai.com | AI Knowledge Hub & Educational Content |
| **MEMORY** | memory.onelastai.com | Personal AI Brain & Data Storage |

## 🛠️ Deployment Steps

### Step 1: Launch EC2 Instance

```bash
# Create EC2 instance with Ubuntu 22.04
# Configure security groups for ports 22, 80, 443
# Allocate Elastic IP for static IP address
```

### Step 2: Connect to EC2

```bash
# Connect via SSH
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### Step 3: Transfer Files

```bash
# Upload deployment files to EC2
scp -i your-key.pem -r . ubuntu@your-ec2-ip:~/onelastai/
```

### Step 4: Run Deployment Script

```bash
# Make script executable and run
chmod +x deploy-ec2.sh
sudo ./deploy-ec2.sh
```

### Step 5: Configure DNS

Point your domain and subdomains to your EC2 Elastic IP:

```
A    onelastai.com           -> YOUR_EC2_IP
A    www.onelastai.com       -> YOUR_EC2_IP
A    chat.onelastai.com      -> YOUR_EC2_IP
A    creator.onelastai.com   -> YOUR_EC2_IP
A    mood.onelastai.com      -> YOUR_EC2_IP
A    ip.onelastai.com        -> YOUR_EC2_IP
A    visual.onelastai.com    -> YOUR_EC2_IP
A    blog.onelastai.com      -> YOUR_EC2_IP
A    memory.onelastai.com    -> YOUR_EC2_IP
```

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Internet                            │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                AWS Load Balancer                        │
│                 (Optional)                              │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                 EC2 Instance                            │
│  ┌─────────────────────────────────────────────────┐    │
│  │              Nginx Reverse Proxy                │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │            Docker Container             │   │    │
│  │  │  ┌─────────────────────────────────┐   │   │    │
│  │  │  │      OneLastAI.com Platform     │   │   │    │
│  │  │  │                                 │   │   │    │
│  │  │  │  • React + TypeScript Frontend  │   │   │    │
│  │  │  │  • 7 AI Agents                  │   │   │    │
│  │  │  │  • Multi-subdomain routing      │   │   │    │
│  │  │  │  • Voice & Chat interfaces      │   │   │    │
│  │  │  └─────────────────────────────────┘   │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## 🔧 Configuration Files

### 1. Dockerfile
- Multi-stage build for React app
- Nginx server for static files
- Health checks and monitoring

### 2. nginx.conf
- Multi-subdomain routing
- SSL/TLS configuration
- Security headers
- Performance optimization
- Rate limiting

### 3. docker-compose.yml
- Container orchestration
- Volume mounting
- Network configuration
- Health monitoring

### 4. deploy-ec2.sh
- Automated deployment script
- System optimization
- SSL certificate setup
- Monitoring configuration

## 📊 Monitoring & Maintenance

### Health Checks
```bash
# Check container status
docker ps

# View application logs
docker-compose logs -f

# Check nginx status
systemctl status nginx

# Monitor system resources
htop
```

### Performance Monitoring
```bash
# View monitoring logs
tail -f /var/log/onelastai/monitor.log

# Check disk usage
df -h

# Monitor memory usage
free -m
```

### Updates & Maintenance
```bash
# Update application
cd /opt/onelastai
git pull
docker-compose up -d --build

# Restart services
docker-compose restart

# View SSL certificate status
certbot certificates
```

## 🔐 Security Features

- **SSL/TLS Encryption** - Let's Encrypt certificates
- **Security Headers** - XSS, CSRF, Content-Type protection
- **Rate Limiting** - API and login protection
- **Firewall Configuration** - UFW with minimal open ports
- **Container Isolation** - Docker security boundaries

## 📈 Scalability Options

### Horizontal Scaling
- Multiple EC2 instances behind Load Balancer
- Auto Scaling Groups
- CloudFront CDN for global distribution

### Vertical Scaling
- Upgrade instance type (t3.large → t3.xlarge)
- Add more storage (EBS volumes)
- Enhanced networking (SR-IOV)

## 💰 Cost Optimization

| Instance Type | vCPU | RAM | Monthly Cost |
|---------------|------|-----|--------------|
| t3.medium     | 2    | 4GB | ~$30         |
| t3.large      | 2    | 8GB | ~$60         |
| t3.xlarge     | 4    | 16GB| ~$120        |

### Cost Saving Tips
- Use Reserved Instances for 1-3 year terms
- Enable CloudWatch monitoring
- Set up billing alerts
- Use Spot Instances for development

## 🚨 Troubleshooting

### Common Issues

1. **Container won't start**
   ```bash
   docker-compose logs
   docker system prune
   ```

2. **SSL certificate issues**
   ```bash
   certbot renew --dry-run
   nginx -t
   ```

3. **Domain not resolving**
   ```bash
   dig onelastai.com
   nslookup onelastai.com
   ```

4. **High resource usage**
   ```bash
   docker stats
   top
   iostat
   ```

## 🔄 Backup Strategy

### Daily Backups
```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf "/backup/onelastai-$DATE.tar.gz" /opt/onelastai
aws s3 cp "/backup/onelastai-$DATE.tar.gz" s3://your-backup-bucket/
```

### Database Backups (Future)
When you add databases, include backup procedures for:
- User data
- Memory agent data
- Analytics data
- Content management

## 📞 Support & Contact

- **Documentation**: This README
- **Logs**: `/var/log/onelastai/`
- **Monitoring**: Health check endpoints
- **Emergency**: Check container status first

---

## 🎉 Deployment Complete!

Your **OneLastAI.com** platform is now live with all 7 AI agents:

- 🤖 **ARIA** - Chat intelligence
- 🎨 **MUSE** - Creative studio  
- 💚 **EMPATHY** - Mood analysis
- 🌐 **TRACKER** - IP information
- 🎬 **CINEMATIC** - Video generation
- 📚 **BLOG** - Knowledge hub
- 🧠 **MEMORY** - Personal brain

**Welcome to the future of AI! 🚀**
