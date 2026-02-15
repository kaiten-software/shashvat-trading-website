# Shashwat Trading Website - Server Deployment Guide

## Server Details
- **Host**: 3.111.120.235
- **Domain**: shashwat.kaitensoftware.com (also: shashvat.kaitensoftware.com)
- **SSH Key**: koristu-dev-26.pem
- **User**: ubuntu
- **Database**: MariaDB (already installed on server)
- **Web Server**: Nginx
- **Process Manager**: PM2

## Prerequisites on Server
The server should have:
- Node.js (v18 or higher)
- MariaDB/MySQL
- Nginx
- PM2 (will be installed if not present)
- Certbot (for SSL, will be installed if not present)

## Deployment Steps

### Option 1: Automated Deployment (Recommended)

Simply run the deployment script:

```bash
chmod +x deploy-to-server.sh
./deploy-to-server.sh
```

This script will:
1. ✅ Build the application locally
2. ✅ Create a deployment package
3. ✅ Upload files to the server
4. ✅ Create MariaDB database and user
5. ✅ Configure Nginx with SSL
6. ✅ Start the application with PM2
7. ✅ Set up automatic SSL certificate renewal

### Option 2: Manual Deployment

If you prefer manual deployment, follow these steps:

#### 1. Build the Application Locally

```bash
npm run build
```

#### 2. Prepare Deployment Package

```bash
tar -czf deploy-package.tar.gz dist/ package.json package-lock.json .env.production server/ uploads/
```

#### 3. Upload to Server

```bash
chmod 400 koristu-dev-26.pem
scp -i koristu-dev-26.pem deploy-package.tar.gz ubuntu@3.111.120.235:/tmp/
scp -i koristu-dev-26.pem nginx-shashwat.conf ubuntu@3.111.120.235:/tmp/
```

#### 4. SSH into Server

```bash
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235
```

#### 5. Extract and Setup Application

```bash
# Create application directory
sudo mkdir -p /var/www/shashwat-trading
sudo chown -R ubuntu:ubuntu /var/www/shashwat-trading

# Extract files
cd /var/www/shashwat-trading
tar -xzf /tmp/deploy-package.tar.gz

# Install dependencies
npm ci --production
```

#### 6. Setup MariaDB Database

```bash
# Generate secure passwords
DB_PASS=$(openssl rand -base64 32)
SESSION_SECRET=$(openssl rand -base64 32)

# Create database and user
sudo mysql -e "CREATE DATABASE IF NOT EXISTS shashvat_trading CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'shashvat_user'@'localhost' IDENTIFIED BY '$DB_PASS';"
sudo mysql -e "GRANT ALL PRIVILEGES ON shashvat_trading.* TO 'shashvat_user'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Update .env file with credentials
cd /var/www/shashvat-trading
sed -i "s/DB_PASSWORD=CHANGE_THIS_PASSWORD/DB_PASSWORD=$DB_PASS/" .env.production
sed -i "s/SESSION_SECRET=CHANGE_THIS_TO_RANDOM_STRING/SESSION_SECRET=$SESSION_SECRET/" .env.production
cp .env.production .env

# Save credentials (IMPORTANT!)
echo "Database Password: $DB_PASS"
echo "Session Secret: $SESSION_SECRET"
```

#### 7. Run Database Migrations

```bash
cd /var/www/shashvat-trading
npm run db:push
```

#### 8. Configure Nginx

```bash
# Copy nginx configuration
sudo cp /tmp/nginx-shashwat.conf /etc/nginx/sites-available/shashwat-trading
sudo ln -sf /etc/nginx/sites-available/shashwat-trading /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

#### 9. Setup SSL Certificate

```bash
# Install certbot if needed
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d shashwat.kaitensoftware.com --non-interactive --agree-tos --email admin@kaitensoftware.com

# Reload nginx
sudo systemctl reload nginx
```

#### 10. Start Application with PM2

```bash
# Install PM2 globally if not installed
sudo npm install -g pm2

# Start application
cd /var/www/shashwat-trading
pm2 start dist/index.js --name shashwat-trading --time

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup systemd -u ubuntu --hp /home/ubuntu
# Run the command that PM2 outputs
```

## Post-Deployment

### Verify Deployment

1. Check application status:
```bash
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'pm2 status'
```

2. View logs:
```bash
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'pm2 logs shashwat-trading --lines 50'
```

3. Test the website:
- Visit: https://shashwat.kaitensoftware.com
- Check SSL certificate (should show valid)
- Test all pages and functionality

### Useful Commands

```bash
# Restart application
pm2 restart shashwat-trading

# Stop application
pm2 stop shashwat-trading

# View logs
pm2 logs shashwat-trading

# Monitor resources
pm2 monit

# Check Nginx status
sudo systemctl status nginx

# Check Nginx error logs
sudo tail -f /var/log/nginx/shashwat-trading-error.log

# Check database connection
mysql -u shashvat_user -p shashvat_trading
```

## Updating the Application

To deploy updates:

```bash
# On local machine
./deploy-to-server.sh
```

Or manually:

```bash
# Build locally
npm run build

# Create package
tar -czf deploy-package.tar.gz dist/ server/

# Upload
scp -i koristu-dev-26.pem deploy-package.tar.gz ubuntu@3.111.120.235:/tmp/

# On server
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235
cd /var/www/shashwat-trading
tar -xzf /tmp/deploy-package.tar.gz
pm2 restart shashwat-trading
```

## Troubleshooting

### Application won't start
```bash
# Check logs
pm2 logs shashwat-trading --err

# Check environment variables
cat /var/www/shashvat-trading/.env

# Test database connection
mysql -u shashvat_user -p shashvat_trading
```

### Nginx errors
```bash
# Test configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/shashwat-trading-error.log

# Restart nginx
sudo systemctl restart nginx
```

### SSL certificate issues
```bash
# Renew certificate manually
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

### Database connection issues
```bash
# Check MariaDB status
sudo systemctl status mariadb

# Check database exists
sudo mysql -e "SHOW DATABASES;"

# Check user permissions
sudo mysql -e "SHOW GRANTS FOR 'shashvat_user'@'localhost';"
```

## Security Notes

1. **Database Credentials**: The deployment script generates secure random passwords. Make sure to save them!
2. **SSH Key**: Keep `koristu-dev-26.pem` secure with 400 permissions
3. **Firewall**: Ensure ports 80, 443, and 3001 are properly configured
4. **SSL**: Certificates auto-renew via certbot cron job

## File Structure on Server

```
/var/www/shashvat-trading/
├── dist/                  # Built frontend and backend
├── server/               # Server source files
├── uploads/              # User uploaded files
├── node_modules/         # Dependencies
├── .env                  # Environment configuration
├── package.json          # Project dependencies
└── ecosystem.config.js   # PM2 configuration
```

## Support

For issues or questions:
- Kaiten Software: www.kaitensoftware.com
- Email: admin@kaitensoftware.com
