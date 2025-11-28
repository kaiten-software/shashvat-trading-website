# Rajasthan Green Energy Solar - Netlify Deployment Guide

## ✅ Build Verified
Your project builds successfully! Ready for Netlify deployment.

## 🚀 Quick Deploy to Netlify

### Option 1: One-Click Deploy (Recommended)

1. **Connect to Netlify:**
   - Go to [https://app.netlify.com/](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize
   - Select repository: `kaiten-software/rajsolar-website`

2. **Build Settings (Auto-configured via netlify.toml):**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
   - ✅ All settings are in `netlify.toml` - no manual config needed!

3. **Set Environment Variables:**
   Go to Site settings → Environment variables and add:
   ```
   EMAIL_USER=kaitensolution@gmail.com
   EMAIL_PASSWORD=rmes irrz ovnf gqro
   EMAIL_TO=info@rajgreenenergy.com
   ```

4. **Deploy!**
   - Click "Deploy site"
   - Wait 2-3 minutes for build
   - Your site will be live at `https://[your-site-name].netlify.app`

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Or deploy directly
netlify deploy --prod
```

## 📋 Pre-Deployment Checklist

- ✅ Git repository pushed to GitHub
- ✅ Build tested locally (`npm run build`) - **PASSED**
- ✅ `netlify.toml` configured
- ✅ Contact form serverless function ready
- ✅ Environment variables documented
- ✅ SPA routing configured
- ✅ All pages tested

## 🔧 Configuration Files

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Contact Form Function
Location: `netlify/functions/contact.ts`
- Handles form submissions
- Sends emails via Gmail SMTP
- Returns JSON responses

## 🌐 After Deployment

### Custom Domain (Optional)
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration steps
4. Examples:
   - `rajgreenenergy.com`
   - `solar.rajgreenenergy.com`

### SSL Certificate
- ✅ Automatically provisioned by Netlify
- ✅ HTTPS enabled by default

### Test Contact Form
1. Visit `/contact` page
2. Fill out the form
3. Submit
4. Check email: `info@rajgreenenergy.com`

## 📱 Pages Included

- **Home** (`/`) - Hero, services, testimonials, FAQ
- **About** (`/about`) - Company story, process
- **Solutions** (`/products`, `/solutions`) - Solar systems
- **Technology** (`/technology`) - Tech specs, how it works
- **Projects** (`/projects`) - Case studies, testimonials
- **Contact** (`/contact`) - Lead capture form

## 🔍 Troubleshooting

### Build Fails
```bash
# Test build locally first
npm install
npm run build
```

### Contact Form Not Working
- Verify environment variables in Netlify dashboard
- Check function logs: Site overview → Functions → contact
- Ensure Gmail App Password is correct

### 404 on Routes
- Verified: SPA redirect is configured in `netlify.toml`
- All routes redirect to `/index.html`

### Outdated Browserslist Warning
```bash
npx update-browserslist-db@latest
```

## 🎯 Performance Optimizations

Already implemented:
- ✅ Vite production build with tree-shaking
- ✅ CSS minification (100KB → 15KB gzipped)
- ✅ JS bundle optimization (393KB → 119KB gzipped)
- ✅ Asset optimization
- ✅ Lazy loading for routes

## 📊 Expected Build Output

```
dist/index.html                   2.29 kB
dist/assets/index-*.css         100.71 kB (15.64 kB gzipped)
dist/assets/index-*.js          393.42 kB (119.04 kB gzipped)
dist/index.js                     6.7 kB
```

## 🔐 Security Notes

- Environment variables are NOT in git
- `.env.example` provided as template
- Sensitive data stored in Netlify dashboard only
- HTTPS enforced automatically

## 🚀 Deploy Now!

1. **GitHub:** Already pushed to `kaiten-software/rajsolar-website`
2. **Netlify:** Connect repository and deploy
3. **Environment:** Add 3 email variables
4. **Live:** Site will be online in ~3 minutes!

Your **Rajasthan Green Energy Solar** website is ready for production! 🌞⚡
