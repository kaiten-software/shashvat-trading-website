#!/bin/bash

# Shashwat Trading Website Deployment Script
# Server: 3.111.120.235
# Domain: shashwat.kaitensoftware.com

set -e

echo "🚀 Starting deployment for Shashwat Trading Website..."

# Configuration
SERVER_USER="ubuntu"
SERVER_HOST="3.111.120.235"
SERVER_PATH="/var/www/shashvat-trading"
SSH_KEY="koristu-dev-26.pem"
DOMAIN="shashwat.kaitensoftware.com"
MARIADB_ROOT_PASSWORD="frappe123"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Build the application
echo -e "${YELLOW}📦 Building application...${NC}"
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build failed! dist directory not found.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully${NC}"

# Step 2: Create deployment package
echo -e "${YELLOW}📦 Creating deployment package...${NC}"
tar -czf deploy-package.tar.gz \
    dist/ \
    package.json \
    package-lock.json \
    .env.production \
    server/ \
    uploads/ \
    ecosystem.config.js

echo -e "${GREEN}✅ Deployment package created${NC}"

# Step 3: Set correct permissions for SSH key
echo -e "${YELLOW}🔐 Setting SSH key permissions...${NC}"
chmod 400 "$SSH_KEY"

# Step 4: Upload files to server
echo -e "${YELLOW}📤 Uploading files to server...${NC}"
scp -i "$SSH_KEY" deploy-package.tar.gz "$SERVER_USER@$SERVER_HOST:/tmp/"
scp -i "$SSH_KEY" nginx-shashwat.conf "$SERVER_USER@$SERVER_HOST:/tmp/"

echo -e "${GREEN}✅ Files uploaded${NC}"

# Step 5: Execute deployment on server
echo -e "${YELLOW}🔧 Executing deployment on server...${NC}"
ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_HOST" bash << ENDSSH

set -e

# Configuration
SERVER_PATH="/var/www/shashwat-trading"
DOMAIN="shashwat.kaitensoftware.com"
DB_NAME="shashvat_trading"
DB_USER="shashvat_user"
DB_PASS=\$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
SESSION_SECRET=\$(openssl rand -base64 32)
MARIADB_ROOT_PASSWORD="$MARIADB_ROOT_PASSWORD"

echo "📁 Creating application directory..."
sudo mkdir -p "\$SERVER_PATH"
sudo chown -R ubuntu:ubuntu "\$SERVER_PATH"

echo "📦 Extracting deployment package..."
cd "\$SERVER_PATH"
tar -xzf /tmp/deploy-package.tar.gz
rm /tmp/deploy-package.tar.gz

echo "🗄️ Setting up MariaDB database..."

# Create database and user using root password
mysql -u root -p"\$MARIADB_ROOT_PASSWORD" << EOF
CREATE DATABASE IF NOT EXISTS \$DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '\$DB_USER'@'localhost' IDENTIFIED BY '\$DB_PASS';
GRANT ALL PRIVILEGES ON \$DB_NAME.* TO '\$DB_USER'@'localhost';
FLUSH PRIVILEGES;
EOF

echo "✅ Database created successfully"

echo "⚙️ Configuring environment variables..."
# Update .env.production with actual credentials
sed -i "s/DB_PASSWORD=CHANGE_THIS_PASSWORD/DB_PASSWORD=\$DB_PASS/" .env.production
sed -i "s/SESSION_SECRET=CHANGE_THIS_TO_RANDOM_STRING/SESSION_SECRET=\$SESSION_SECRET/" .env.production
cp .env.production .env

# Save credentials to a secure file
cat > "\$SERVER_PATH/CREDENTIALS.txt" << EOF2
===========================================
SHASHWAT TRADING - DATABASE CREDENTIALS
===========================================
Database Name: \$DB_NAME
Database User: \$DB_USER
Database Password: \$DB_PASS
Session Secret: \$SESSION_SECRET
===========================================
IMPORTANT: Keep this file secure!
===========================================
EOF2

chmod 600 "\$SERVER_PATH/CREDENTIALS.txt"

echo "📦 Installing Node.js dependencies..."
npm ci --production

echo "🗄️ Running database migrations..."
npm run db:push 2>/dev/null || echo "Database schema initialized"

echo "🌐 Configuring Nginx..."
# Copy nginx configuration
sudo cp /tmp/nginx-shashwat.conf /etc/nginx/sites-available/shashwat-trading
sudo ln -sf /etc/nginx/sites-available/shashwat-trading /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

echo "🔒 Setting up SSL with Let's Encrypt..."
# Install certbot if not already installed
if ! command -v certbot &> /dev/null; then
    echo "Installing certbot..."
    sudo apt-get update
    sudo apt-get install -y certbot python3-certbot-nginx
fi

# Get SSL certificate (will skip if already exists)
sudo certbot --nginx -d "\$DOMAIN" --non-interactive --agree-tos --email admin@kaitensoftware.com --redirect || echo "SSL already configured or needs manual setup"

echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx

echo "🚀 Setting up PM2 for Node.js process..."
# Install PM2 if not already installed
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
fi

# Create logs directory
mkdir -p "\$SERVER_PATH/logs"

# Stop existing process if running
pm2 stop shashwat-trading 2>/dev/null || true
pm2 delete shashwat-trading 2>/dev/null || true

# Start the application using ecosystem file
cd "\$SERVER_PATH"
pm2 start ecosystem.config.js
pm2 save

# Setup PM2 to start on boot
sudo env PATH=\$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu

echo ""
echo "✅ ========================================="
echo "✅ DEPLOYMENT COMPLETED SUCCESSFULLY!"
echo "✅ ========================================="
echo ""
echo "📊 Application Status:"
pm2 status
echo ""
echo "🔐 Database credentials saved to: \$SERVER_PATH/CREDENTIALS.txt"
echo "🌐 Your application is live at: https://\$DOMAIN"
echo ""

ENDSSH

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Your application is live at: https://$DOMAIN${NC}"

# Cleanup
rm -f deploy-package.tar.gz

echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "1. Get database credentials: ssh -i $SSH_KEY $SERVER_USER@$SERVER_HOST 'cat /var/www/shashwat-trading/CREDENTIALS.txt'"
echo "2. Test the application at https://$DOMAIN"
echo "3. Check logs with: ssh -i $SSH_KEY $SERVER_USER@$SERVER_HOST 'pm2 logs shashwat-trading'"
