# GitHub Setup Instructions

Follow these steps to push CDO Portal to GitHub and prepare for Railway deployment.

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Enter repository name: `cdoportal`
3. Add description: "CDO Portal - AI/ML & Data Community Hub for Federal CDOs"
4. Choose visibility: **Public** (recommended for open-source) or **Private**
5. Do NOT initialize with README (we have one)
6. Click "Create repository"

## Step 2: Initialize Git Locally

If you don't have the code locally yet:

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/cdoportal.git
cd cdoportal

# Copy all files from this export
# (Or if you already have the code, skip to Step 3)
```

## Step 3: Set Up Git

```bash
# Navigate to your project directory
cd cdoportal

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: CDO Portal with news, jobs, policies, AI tools"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/cdoportal.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 4: Verify GitHub

1. Go to https://github.com/YOUR_USERNAME/cdoportal
2. Verify all files are uploaded
3. Check that `.gitignore` is working (no `node_modules/`, `.env`, etc.)

## Step 5: Important Files to Check

Ensure these files are in your repository:

- ✅ `README.md` - Project documentation
- ✅ `RAILWAY_DEPLOYMENT.md` - Deployment guide
- ✅ `.env.example` - Environment variables template
- ✅ `.gitignore` - Git ignore rules
- ✅ `railway.json` - Railway configuration
- ✅ `package.json` - Dependencies
- ✅ `pnpm-lock.yaml` - Locked dependencies
- ✅ `drizzle.config.ts` - Database configuration
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `vite.config.ts` - Vite configuration
- ✅ `client/` - React frontend
- ✅ `server/` - Node.js backend
- ✅ `drizzle/` - Database schema

## Step 6: Connect to Railway

1. Go to https://railway.app
2. Sign in or create account
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Authorize Railway to access your GitHub
6. Select your `cdoportal` repository
7. Click "Deploy Now"

Railway will automatically:
- Detect Node.js project
- Install dependencies
- Build the application
- Start the server

## Step 7: Add MySQL Database in Railway

1. In Railway project dashboard, click "Add Service"
2. Select "MySQL"
3. Railway creates MySQL instance and sets `DATABASE_URL`

## Step 8: Configure Environment Variables in Railway

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for complete list.

Critical variables to add:
```
JWT_SECRET=your-random-32-char-string
GOOGLE_GEMINI_API_KEY=your-key
OPENAI_API_KEY=your-key
VITE_APP_ID=your-app-id
OWNER_OPEN_ID=your-id
OWNER_NAME=Your Name
```

## Step 9: Run Database Migrations

In Railway shell or locally:

```bash
pnpm db:push
```

This creates all database tables.

## Step 10: Deploy

Railway automatically deploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Your changes"
git push origin main

# Railway automatically redeploys
```

## Troubleshooting

### Git push fails
```bash
# Check remote
git remote -v

# Update remote if needed
git remote set-url origin https://github.com/YOUR_USERNAME/cdoportal.git
```

### Large files error
```bash
# Remove node_modules from git
git rm -r --cached node_modules/
git commit -m "Remove node_modules"
git push
```

### pnpm-lock.yaml too large
- This is normal, keep it in git
- It ensures reproducible builds

### Files not showing on GitHub
1. Check `.gitignore` isn't excluding them
2. Verify files are committed: `git status`
3. Force push if needed: `git push -u origin main --force`

## Next Steps

1. Follow [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for deployment
2. Add environment variables in Railway
3. Run database migrations
4. Test your deployed app

## Useful Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline

# View remote
git remote -v

# Update from GitHub
git pull origin main

# Create new branch
git checkout -b feature/my-feature

# Push new branch
git push -u origin feature/my-feature
```

## GitHub Best Practices

1. **Commit frequently** with clear messages
2. **Never commit** `.env` files (use `.env.example`)
3. **Keep** `pnpm-lock.yaml` in sync
4. **Use branches** for new features
5. **Write** descriptive commit messages

## Security Notes

- ✅ `.env` is in `.gitignore` (never committed)
- ✅ API keys stored in Railway environment variables only
- ✅ No secrets in code
- ✅ GitHub repository can be public (no sensitive data)

## Support

For GitHub issues:
- GitHub Docs: https://docs.github.com
- Git Tutorial: https://git-scm.com/book

For Railway deployment:
- See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)
