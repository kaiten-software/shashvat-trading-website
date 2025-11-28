# Netlify Deployment Guide

## Prerequisites
- Netlify account
- GitHub repository (optional but recommended)

## Environment Variables
Set these in Netlify dashboard (Site settings → Environment variables):

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_TO=recipient@example.com
```

**Important:** For Gmail, use an App Password (not your regular password)
Generate one at: https://myaccount.google.com/apppasswords

## Deployment Options

### Option 1: Deploy via Netlify CLI

1. Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy the site:
```bash
netlify deploy --prod
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to Netlify dashboard
3. Click "Add new site" → "Import an existing project"
4. Connect to your GitHub repository
5. Build settings are already configured in `netlify.toml`
6. Add environment variables in Site settings
7. Deploy!

### Option 3: Manual Deploy

1. Build the project locally:
```bash
npm install
npm run build
```

2. Deploy the `dist` folder manually via Netlify UI

## Build Configuration

The `netlify.toml` file is already configured with:
- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`
- API redirects: `/api/*` → `/.netlify/functions/:splat`
- SPA routing: All routes redirect to `index.html`

## Testing the Contact Form

After deployment:
1. Visit your site's contact page
2. Fill out the form
3. Submit
4. Check the recipient email inbox

## Troubleshooting

- **Function not found**: Check Netlify function logs in dashboard
- **Email not sending**: Verify environment variables are set correctly
- **Build fails**: Check build logs for missing dependencies
- **401 Unauthorized**: Use Gmail App Password, not regular password

## Files Created for Netlify

- `netlify/functions/contact.ts` - Serverless function for contact form
- `netlify.toml` - Netlify configuration (already existed)
- This README

## Next Steps

1. Install dependencies: `npm install`
2. Test locally: `npm run dev`
3. Build: `npm run build`
4. Deploy to Netlify using one of the options above
5. Set environment variables in Netlify dashboard
6. Test the deployed site

Your site is now ready for Netlify deployment! 🚀
