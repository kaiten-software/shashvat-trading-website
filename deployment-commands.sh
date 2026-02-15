#!/bin/bash

# Quick Deployment Commands for Shashwat Trading Website
# Copy and paste these commands as needed

# ============================================
# DEPLOYMENT
# ============================================

# Full automated deployment
./deploy-to-server.sh

# ============================================
# POST-DEPLOYMENT VERIFICATION
# ============================================

# Get database credentials
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'cat /var/www/shashvat-trading/CREDENTIALS.txt'

# Check application status
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'pm2 status'

# View application logs
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'pm2 logs shashvat-trading --lines 50'

# View error logs only
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'pm2 logs shashvat-trading --err --lines 50'

# ============================================
# APPLICATION MANAGEMENT
# ============================================

# Restart application
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'pm2 restart shashvat-trading'

# Stop application
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'pm2 stop shashvat-trading'

# Start application
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'pm2 start shashvat-trading'

# Monitor application resources
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'pm2 monit'

# ============================================
# NGINX MANAGEMENT
# ============================================

# Test Nginx configuration
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'sudo nginx -t'

# Reload Nginx
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'sudo systemctl reload nginx'

# Restart Nginx
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'sudo systemctl restart nginx'

# Check Nginx status
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'sudo systemctl status nginx'

# View Nginx error logs
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'sudo tail -f /var/log/nginx/shashwat-trading-error.log'

# ============================================
# DATABASE MANAGEMENT
# ============================================

# Connect to database (you'll need the password from CREDENTIALS.txt)
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'mysql -u shashvat_user -p shashvat_trading'

# Check database status
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'sudo systemctl status mariadb'

# ============================================
# SSL CERTIFICATE
# ============================================

# Check SSL certificate status
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'sudo certbot certificates'

# Renew SSL certificate manually
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'sudo certbot renew'

# ============================================
# UPDATES & REDEPLOYMENT
# ============================================

# Quick update (after making changes)
npm run build
tar -czf deploy-package.tar.gz dist/ server/
scp -i koristu-dev-26.pem deploy-package.tar.gz ubuntu@3.111.120.235:/tmp/
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'cd /var/www/shashvat-trading && tar -xzf /tmp/deploy-package.tar.gz && pm2 restart shashvat-trading'

# ============================================
# SSH ACCESS
# ============================================

# SSH into server
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235

# ============================================
# TROUBLESHOOTING
# ============================================

# Check if port 3001 is listening
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'sudo netstat -tulpn | grep 3001'

# Check disk space
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'df -h'

# Check memory usage
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'free -h'

# View system logs
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'sudo journalctl -xe'
