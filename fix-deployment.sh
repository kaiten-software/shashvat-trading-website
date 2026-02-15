#!/bin/bash

# Manual fix script to complete the deployment
# Run this on the server after the initial deployment failed

set -e

DOMAIN="shashwat.kaitensoftware.com"
SERVER_PATH="/var/www/shashwat-trading"

echo "🔧 Fixing Nginx configuration and setting up SSL..."

# Remove the broken symlink
sudo rm -f /etc/nginx/sites-enabled/shashwat-trading

# Upload the temporary config (without SSL)
echo "📤 Please upload nginx-shashwat-temp.conf to the server first"
echo "Run this on your local machine:"
echo "scp -i koristu-dev-26.pem nginx-shashwat-temp.conf ubuntu@3.111.120.235:/tmp/"
echo ""
read -p "Press Enter after uploading the file..."

# Copy temporary nginx configuration
sudo cp /tmp/nginx-shashwat-temp.conf /etc/nginx/sites-available/shashwat-trading
sudo ln -sf /etc/nginx/sites-available/shashwat-trading /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

echo "🔒 Setting up SSL with Let's Encrypt..."
# Install certbot if not already installed
if ! command -v certbot &> /dev/null; then
    echo "Installing certbot..."
    sudo apt-get update
    sudo apt-get install -y certbot python3-certbot-nginx
fi

# Get SSL certificate - this will automatically update the nginx config
sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --email admin@kaitensoftware.com --redirect

echo "🔄 Reloading Nginx with SSL..."
sudo systemctl reload nginx

echo "🚀 Setting up PM2..."
# Install PM2 if not already installed
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
fi

# Create logs directory
mkdir -p "$SERVER_PATH/logs"

# Stop existing process if running
pm2 stop shashwat-trading 2>/dev/null || true
pm2 delete shashwat-trading 2>/dev/null || true

# Start the application
cd "$SERVER_PATH"
pm2 start ecosystem.config.js
pm2 save

# Setup PM2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu

echo ""
echo "✅ ========================================="
echo "✅ DEPLOYMENT COMPLETED SUCCESSFULLY!"
echo "✅ ========================================="
echo ""
echo "📊 Application Status:"
pm2 status
echo ""
echo "🔐 Database credentials: cat $SERVER_PATH/CREDENTIALS.txt"
echo "🌐 Your application is live at: https://$DOMAIN"
echo ""
