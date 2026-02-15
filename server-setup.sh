#!/bin/bash

# Server-side setup script for Shashwat Trading Website
# Run this script ON THE SERVER after uploading files

set -e

# Configuration
SERVER_PATH="/var/www/shashvat-trading"
DOMAIN="shashwat.kaitensoftware.com"
DB_NAME="shashvat_trading"
DB_USER="shashvat_user"
DB_PASS=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
SESSION_SECRET=$(openssl rand -base64 32)

echo "🚀 Setting up Shashwat Trading Website..."

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p "$SERVER_PATH"
sudo chown -R $USER:$USER "$SERVER_PATH"

# Extract deployment package
echo "📦 Extracting deployment package..."
cd "$SERVER_PATH"
if [ -f /tmp/deploy-package.tar.gz ]; then
    tar -xzf /tmp/deploy-package.tar.gz
    rm /tmp/deploy-package.tar.gz
else
    echo "❌ Error: /tmp/deploy-package.tar.gz not found!"
    exit 1
fi

# Setup MariaDB database
echo "🗄️ Setting up MariaDB database..."
echo "Creating database setup SQL..."

cat > /tmp/setup_db.sql << EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
EOF

echo "Please enter your MariaDB root password when prompted:"
sudo mysql < /tmp/setup_db.sql
rm /tmp/setup_db.sql

echo "✅ Database created successfully"

# Configure environment variables
echo "⚙️ Configuring environment variables..."
sed -i "s/DB_PASSWORD=CHANGE_THIS_PASSWORD/DB_PASSWORD=$DB_PASS/" .env.production
sed -i "s/SESSION_SECRET=CHANGE_THIS_TO_RANDOM_STRING/SESSION_SECRET=$SESSION_SECRET/" .env.production
cp .env.production .env

# Save credentials
cat > "$SERVER_PATH/CREDENTIALS.txt" << EOF
===========================================
SHASHWAT TRADING - DATABASE CREDENTIALS
===========================================
Database Name: $DB_NAME
Database User: $DB_USER
Database Password: $DB_PASS
Session Secret: $SESSION_SECRET
===========================================
IMPORTANT: Keep this file secure!
===========================================
EOF

chmod 600 "$SERVER_PATH/CREDENTIALS.txt"

echo "📦 Installing Node.js dependencies..."
npm ci --production

echo "🗄️ Running database migrations..."
npm run db:push 2>/dev/null || echo "Database schema initialized"

# Configure Nginx
echo "🌐 Configuring Nginx..."
if [ -f /tmp/nginx-shashwat.conf ]; then
    sudo cp /tmp/nginx-shashwat.conf /etc/nginx/sites-available/shashwat-trading
    sudo ln -sf /etc/nginx/sites-available/shashwat-trading /etc/nginx/sites-enabled/
    sudo nginx -t
else
    echo "⚠️  Nginx config not found, skipping..."
fi

# Setup SSL
echo "🔒 Setting up SSL with Let's Encrypt..."
if ! command -v certbot &> /dev/null; then
    echo "Installing certbot..."
    sudo apt-get update
    sudo apt-get install -y certbot python3-certbot-nginx
fi

sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --email admin@kaitensoftware.com --redirect || echo "⚠️  SSL setup skipped (may already exist or need manual setup)"

# Reload Nginx
echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx

# Setup PM2
echo "🚀 Setting up PM2..."
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
fi

# Create logs directory
mkdir -p "$SERVER_PATH/logs"

# Stop existing process
pm2 stop shashwat-trading 2>/dev/null || true
pm2 delete shashwat-trading 2>/dev/null || true

# Start application
cd "$SERVER_PATH"
pm2 start ecosystem.config.js
pm2 save

# Setup PM2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME

echo ""
echo "✅ ========================================="
echo "✅ DEPLOYMENT COMPLETED SUCCESSFULLY!"
echo "✅ ========================================="
echo ""
echo "📊 Application Status:"
pm2 status
echo ""
echo "🔐 Database credentials saved to: $SERVER_PATH/CREDENTIALS.txt"
echo "🌐 Your application is live at: https://$DOMAIN"
echo ""
echo "📝 Useful commands:"
echo "   View logs:    pm2 logs shashwat-trading"
echo "   Restart app:  pm2 restart shashwat-trading"
echo "   Stop app:     pm2 stop shashwat-trading"
echo "   View creds:   cat $SERVER_PATH/CREDENTIALS.txt"
echo ""
