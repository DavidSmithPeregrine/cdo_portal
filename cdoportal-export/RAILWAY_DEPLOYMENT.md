# CDO Portal - Railway Deployment Guide

This guide walks you through deploying CDO Portal to Railway with full infrastructure ownership.

## Prerequisites

- GitHub account
- Railway account (free signup at https://railway.app)
- This repository pushed to GitHub

## Step 1: Set Up Railway Project

1. Go to https://railway.app and sign in
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub account
5. Select the `cdoportal` repository
6. Click "Deploy Now"

Railway will automatically detect the Node.js project and start building.

## Step 2: Add MySQL Database

1. In your Railway project, click "Add Service"
2. Select "MySQL"
3. Railway creates a MySQL instance and automatically sets `DATABASE_URL` environment variable
4. Note the database credentials for reference

## Step 3: Configure Environment Variables

Railway automatically sets `DATABASE_URL` from the MySQL service. You need to add the remaining variables:

1. In Railway project dashboard, go to "Variables"
2. Add the following environment variables (copy from `.env.example`):

```
JWT_SECRET=generate-a-random-32-character-string
VITE_APP_ID=your-manus-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im
OWNER_OPEN_ID=your-owner-open-id
OWNER_NAME=Your Name
GOOGLE_GEMINI_API_KEY=your-google-gemini-api-key
OPENAI_API_KEY=your-openai-api-key
BUILT_IN_FORGE_API_URL=https://api.manus.im/forge
BUILT_IN_FORGE_API_KEY=your-forge-api-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im/forge
VITE_FRONTEND_FORGE_API_KEY=your-frontend-forge-api-key
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_ANALYTICS_WEBSITE_ID=your-website-id
VITE_APP_TITLE=CDO Portal
VITE_APP_LOGO=/logo.svg
NODE_ENV=production
PORT=3000
```

### Getting API Keys

**Google Gemini API Key:**
1. Go to https://aistudio.google.com/apikey
2. Create a new API key
3. Copy and paste into Railway variables

**OpenAI API Key:**
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy and paste into Railway variables

**Manus OAuth (if using Manus auth):**
- Contact Manus support for VITE_APP_ID and credentials

## Step 4: Database Migration

After Railway deploys, you need to set up the database schema:

1. In Railway, click on your Node.js service
2. Go to "Connect" tab
3. Copy the `DATABASE_URL`
4. In your local terminal, run:

```bash
# Set the database URL
export DATABASE_URL="mysql://user:password@host:port/database"

# Run migrations
pnpm db:push
```

Or use Railway's shell:

1. Click your Node.js service in Railway
2. Go to "Shell" tab
3. Run: `pnpm db:push`

## Step 5: Verify Deployment

1. Railway shows your app URL (e.g., `https://cdoportal-production.up.railway.app`)
2. Click the URL to visit your deployed app
3. Test the following:
   - Homepage loads
   - News section displays articles
   - Jobs page shows quick search links
   - Resources page loads all categories
   - Ask AI chatbot responds

## Step 6: Custom Domain (Optional)

1. In Railway project settings, go to "Domains"
2. Click "Add Domain"
3. Enter your custom domain (e.g., `cdoportal.com`)
4. Update your domain's DNS settings to point to Railway
5. Railway provides DNS instructions

## Troubleshooting

### Build Fails
- Check build logs in Railway dashboard
- Ensure `pnpm-lock.yaml` is committed to Git
- Verify `package.json` has all dependencies

### Database Connection Error
- Verify `DATABASE_URL` is set in Railway variables
- Check MySQL service is running
- Run `pnpm db:push` to create tables

### News Not Updating
- Check server logs in Railway dashboard
- Verify RSS feed URLs are accessible
- Check API keys are correct

### AI Chat Not Working
- Verify `GOOGLE_GEMINI_API_KEY` and `OPENAI_API_KEY` are set
- Check API keys are valid and have quota
- Review server logs for errors

## Monitoring & Logs

1. In Railway dashboard, click your Node.js service
2. Go to "Logs" tab to see real-time logs
3. Check for errors or warnings

## Updating Your App

1. Make changes locally
2. Commit and push to GitHub
3. Railway automatically redeploys on push
4. Monitor deployment in Railway dashboard

## Database Backups

Railway automatically backs up your MySQL database. To restore:

1. In Railway, go to MySQL service
2. Look for backup options in service settings
3. Contact Railway support for restore procedures

## Cost Estimation

- **Node.js Service**: $5-10/month (depending on usage)
- **MySQL Database**: $5-15/month (depending on size)
- **Total**: ~$10-25/month

## Support

For Railway-specific issues:
- Railway Docs: https://docs.railway.app
- Railway Support: https://railway.app/support

For CDO Portal issues:
- Check logs in Railway dashboard
- Review `.env.example` for required variables
- Verify all API keys are valid

## Next Steps

1. Set up monitoring/alerts in Railway
2. Configure auto-scaling if needed
3. Set up custom domain
4. Monitor costs and optimize as needed
