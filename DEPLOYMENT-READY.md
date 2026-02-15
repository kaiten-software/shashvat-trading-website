# 🚀 Deployment Ready - Shashwat Trading Website

## 📦 Files Created for Deployment

### 1. **deploy-to-server.sh**
   - Automated deployment script
   - Builds, packages, and deploys to server
   - Sets up database, Nginx, SSL, and PM2
   - **Usage**: `./deploy-to-server.sh`

### 2. **nginx-shashwat.conf**
   - Nginx configuration for shashwat.kaitensoftware.com
   - Includes SSL setup
   - Proxies API requests to Node.js backend
   - Serves static files efficiently

### 3. **.env.production**
   - Production environment configuration
   - Uses MariaDB (localhost)
   - Port 3001 for backend
   - Credentials will be auto-generated during deployment

### 4. **ecosystem.config.js**
   - PM2 process manager configuration
   - Auto-restart on crashes
   - Logging configuration
   - Memory limits

### 5. **SERVER-DEPLOYMENT.md**
   - Comprehensive deployment guide
   - Manual deployment steps
   - Troubleshooting guide
   - Useful commands

## 🎯 Quick Start

### Deploy Now (Recommended)

```bash
./deploy-to-server.sh
```

This single command will:
- ✅ Build your application
- ✅ Upload to server (3.111.120.235)
- ✅ Create MariaDB database with secure credentials
- ✅ Configure Nginx with SSL for shashwat.kaitensoftware.com
- ✅ Start application with PM2
- ✅ Save database credentials to server

### What Happens During Deployment

1. **Local Build** (1-2 minutes)
   - Builds frontend with Vite
   - Bundles backend with esbuild
   - Creates deployment package

2. **Upload** (30 seconds - 1 minute)
   - Uploads build files to server
   - Uploads Nginx configuration

3. **Server Setup** (2-3 minutes)
   - Creates application directory
   - Sets up MariaDB database
   - Installs dependencies
   - Runs database migrations
   - Configures Nginx
   - Obtains SSL certificate
   - Starts application with PM2

## 🔐 Important Notes

### Database Credentials
- Automatically generated during deployment
- Saved to `/var/www/shashvat-trading/CREDENTIALS.txt` on server
- **Retrieve them with**:
  ```bash
  ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'cat /var/www/shashvat-trading/CREDENTIALS.txt'
  ```

### SSL Certificate
- Automatically obtained from Let's Encrypt
- Auto-renewal configured
- Valid for shashwat.kaitensoftware.com

### Application Management
```bash
# View status
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'pm2 status'

# View logs
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'pm2 logs shashwat-trading'

# Restart application
ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'pm2 restart shashwat-trading'
```

## 🌐 After Deployment

Your application will be live at:
**https://shashwat.kaitensoftware.com**

### Verify Deployment
1. Visit the URL
2. Check SSL certificate (should show green lock)
3. Test all pages and functionality
4. Verify contact form works
5. Check admin panel if applicable

## 📋 Server Architecture

```
┌─────────────────────────────────────┐
│   shashwat.kaitensoftware.com       │
│   (Port 80/443 - Nginx)             │
└──────────────┬──────────────────────┘
               │
               ├─ Static Files (/dist)
               │
               └─ API Proxy (/api)
                  │
                  ▼
          ┌──────────────────┐
          │   Node.js App    │
          │   (Port 3001)    │
          │   Managed by PM2 │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │   MariaDB        │
          │   (Port 3306)    │
          └──────────────────┘
```

## 🔧 Troubleshooting

### If deployment fails:

1. **Check SSH connection**:
   ```bash
   ssh -i koristu-dev-26.pem ubuntu@3.111.120.235
   ```

2. **Check server logs**:
   ```bash
   ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'pm2 logs shashwat-trading --err'
   ```

3. **Check Nginx**:
   ```bash
   ssh -i koristu-dev-26.pem ubuntu@3.111.120.235 'sudo nginx -t'
   ```

4. **Manual deployment**: See `SERVER-DEPLOYMENT.md` for step-by-step manual instructions

## 📞 Support

For deployment issues:
- Check `SERVER-DEPLOYMENT.md` for detailed troubleshooting
- Review logs on the server
- Contact: admin@kaitensoftware.com

---

**Ready to deploy? Run**: `./deploy-to-server.sh`
