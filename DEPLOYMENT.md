# Netlify Deployment Guide

## Quick Deploy

### Option 1: Deploy via Netlify CLI

1. Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize and deploy:
```bash
netlify init
```

4. Or deploy directly:
```bash
netlify deploy --prod
```

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository

2. Go to [Netlify](https://app.netlify.com)

3. Click "Add new site" > "Import an existing project"

4. Connect to your GitHub repository

5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18

6. Click "Deploy site"

## Build Configuration

The project includes:
- ✅ `netlify.toml` - Netlify configuration file
- ✅ `client/public/_redirects` - Client-side routing support
- ✅ Build script in `package.json`

## Environment Variables

If your app requires environment variables, add them in Netlify:

1. Go to Site settings > Environment variables
2. Add your variables (e.g., API keys, database URLs)

## Custom Domain

After deployment, you can add a custom domain:

1. Go to Domain settings
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

## Important Notes

- The site is built as a static SPA (Single Page Application)
- All routes are handled client-side via React Router (Wouter)
- The `_redirects` file ensures proper routing for page refreshes
- No backend server is deployed (static site only)

## Contact Form

The contact page uses Calendly integration, which works perfectly with static deployment.

## Deployment Checklist

Before deploying, ensure:
- [ ] All environment variables are set
- [ ] Logo image is saved to `/client/public/images/logo.png`
- [ ] Calendly URL is correct: https://calendly.com/kaiten/koristu
- [ ] All pages are tested locally
- [ ] Build runs successfully: `npm run build`

## Support

For issues, contact:
- Kaiten Software: www.kaitensoftware.com
- Rajasthan Green Energy Solar: Jaipur, Rajasthan
