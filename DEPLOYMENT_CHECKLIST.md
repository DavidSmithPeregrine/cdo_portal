# CDO Portal - Deployment Checklist

Use this checklist to ensure everything is configured correctly before deploying.

## Pre-Deployment (Local)

- [ ] Clone or download the repository
- [ ] Run `pnpm install` to install dependencies
- [ ] Copy `.env.example` to `.env.local`
- [ ] Fill in all required environment variables in `.env.local`
- [ ] Run `pnpm dev` and verify app works locally
- [ ] Test News page loads articles
- [ ] Test Jobs page shows search links
- [ ] Test Ask AI chatbot responds
- [ ] Run `pnpm build` to verify production build works
- [ ] Commit all changes to git

## GitHub Setup

- [ ] Create GitHub repository at https://github.com/new
- [ ] Initialize git: `git init`
- [ ] Add remote: `git remote add origin https://github.com/YOUR_USERNAME/cdoportal.git`
- [ ] Add all files: `git add .`
- [ ] Commit: `git commit -m "Initial commit"`
- [ ] Push: `git push -u origin main`
- [ ] Verify all files on GitHub (except .env, node_modules)
- [ ] Check `.gitignore` is working

## Railway Setup

- [ ] Create Railway account at https://railway.app
- [ ] Create new project
- [ ] Connect GitHub repository
- [ ] Railway starts building automatically
- [ ] Wait for build to complete (5-10 minutes)
- [ ] Verify build succeeded in Railway logs

## Database Setup

- [ ] Add MySQL service in Railway
- [ ] Verify `DATABASE_URL` is set in Railway variables
- [ ] Get MySQL connection string from Railway
- [ ] Run `pnpm db:push` to create tables
- [ ] Verify tables created: `SELECT * FROM information_schema.tables WHERE table_schema='cdoportal';`

## Environment Variables in Railway

Add these variables in Railway dashboard (Variables section):

### Authentication
- [ ] `JWT_SECRET` - Random 32+ character string
- [ ] `VITE_APP_ID` - Your Manus app ID
- [ ] `OAUTH_SERVER_URL` - https://api.manus.im
- [ ] `VITE_OAUTH_PORTAL_URL` - https://auth.manus.im
- [ ] `OWNER_OPEN_ID` - Your user ID
- [ ] `OWNER_NAME` - Your name

### API Keys
- [ ] `GOOGLE_GEMINI_API_KEY` - From https://aistudio.google.com/apikey
- [ ] `OPENAI_API_KEY` - From https://platform.openai.com/api-keys

### Manus APIs (if applicable)
- [ ] `BUILT_IN_FORGE_API_URL` - https://api.manus.im/forge
- [ ] `BUILT_IN_FORGE_API_KEY` - Your forge API key
- [ ] `VITE_FRONTEND_FORGE_API_URL` - https://api.manus.im/forge
- [ ] `VITE_FRONTEND_FORGE_API_KEY` - Your frontend forge API key

### Analytics (optional)
- [ ] `VITE_ANALYTICS_ENDPOINT` - Your analytics endpoint
- [ ] `VITE_ANALYTICS_WEBSITE_ID` - Your website ID

### App Configuration
- [ ] `VITE_APP_TITLE` - CDO Portal
- [ ] `VITE_APP_LOGO` - /logo.svg
- [ ] `NODE_ENV` - production
- [ ] `PORT` - 3000

## Testing Deployment

- [ ] Visit your Railway app URL (e.g., https://cdoportal-production.up.railway.app)
- [ ] Homepage loads
- [ ] Navigation works
- [ ] News page displays articles
- [ ] Jobs page shows quick search links
- [ ] Policy page displays policies
- [ ] Resources page loads all categories
- [ ] Ask AI chatbot responds to queries
- [ ] Career Tools page loads
- [ ] Agency Directory displays agencies
- [ ] Check server logs for errors: Railway > Logs tab

## News Scraping Verification

- [ ] Visit News page
- [ ] Check "Last updated" timestamp
- [ ] Verify articles are from FedScoop, GovExec, MeriTalk
- [ ] Try filtering by category
- [ ] Click article links (should open in new tab)

## AI Features Verification

- [ ] Ask AI page loads
- [ ] Send test message to chatbot
- [ ] Verify response appears
- [ ] Test resume review tool
- [ ] Test interview prep tool

## Custom Domain (Optional)

- [ ] Purchase domain (GoDaddy, Namecheap, etc.)
- [ ] In Railway, go to project settings > Domains
- [ ] Add your custom domain
- [ ] Update DNS records (Railway provides instructions)
- [ ] Wait for DNS propagation (up to 24 hours)
- [ ] Verify custom domain works

## Monitoring & Maintenance

- [ ] Set up Railway alerts (optional)
- [ ] Monitor costs in Railway dashboard
- [ ] Check logs regularly for errors
- [ ] Test app weekly
- [ ] Keep dependencies updated: `pnpm update`

## Post-Deployment

- [ ] Document your deployment URL
- [ ] Share with team
- [ ] Set up monitoring/alerts
- [ ] Plan regular backups (Railway handles this)
- [ ] Monitor database size growth
- [ ] Review costs monthly

## Troubleshooting Checklist

If something doesn't work:

- [ ] Check Railway logs (Logs tab)
- [ ] Verify all environment variables are set
- [ ] Verify `DATABASE_URL` is correct
- [ ] Run `pnpm db:push` to ensure tables exist
- [ ] Check API keys are valid and have quota
- [ ] Verify RSS feed URLs are accessible
- [ ] Check firewall/network isn't blocking connections
- [ ] Review error messages in logs carefully

## Common Issues & Solutions

### Build fails
- [ ] Check `pnpm-lock.yaml` is committed
- [ ] Verify `package.json` has all dependencies
- [ ] Check Node.js version (should be 18+)

### Database connection error
- [ ] Verify `DATABASE_URL` environment variable
- [ ] Check MySQL service is running in Railway
- [ ] Verify database credentials are correct

### News not updating
- [ ] Check RSS feed URLs are accessible
- [ ] Verify `newsScraper.ts` is running
- [ ] Check server logs for errors

### AI chat not working
- [ ] Verify `GOOGLE_GEMINI_API_KEY` is set
- [ ] Check API key is valid
- [ ] Verify API key has quota remaining
- [ ] Check server logs for errors

### App slow or crashing
- [ ] Check Railway resource usage
- [ ] Monitor database query performance
- [ ] Consider upgrading Railway plan
- [ ] Check for memory leaks in logs

## Final Verification

- [ ] App is live and accessible
- [ ] All pages load without errors
- [ ] News updates automatically
- [ ] AI features respond correctly
- [ ] Database is working
- [ ] Logs show no critical errors
- [ ] Custom domain works (if set up)
- [ ] Team can access the app

## Success!

If all checkboxes are checked, your CDO Portal is successfully deployed on Railway!

Next steps:
1. Share the URL with your team
2. Monitor performance and costs
3. Plan for future enhancements
4. Set up automated backups
5. Document any customizations

For ongoing maintenance:
- Review logs weekly
- Update dependencies monthly
- Monitor costs
- Plan feature additions
- Gather user feedback
