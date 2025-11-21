# CDO Portal

A comprehensive AI/ML, Emerging Tech & Data community hub for federal Chief Data Officers and their teams.

**Tagline:** Data: Fueling Our Future

## Features

- **Real-Time News**: Auto-updating news from FedScoop, GovExec, MeriTalk with MECE categorization
- **Policy & Guidance**: Comprehensive federal data policies, regulations, and standards
- **Jobs Board**: Quick search links to USAJOBS, Indeed, and LinkedIn for federal data roles
- **AI Career Tools**: Resume review and interview preparation powered by Gemini AI
- **Federal Agency Directory**: CDO contacts and information across 10+ federal agencies
- **Curated Resources**: 40+ learning resources, development tools, datasets, and professional communities
- **Ask AI**: Chatbot with federal data expertise using Gemini 2.5 Flash
- **Professional Theme**: Federal blue color scheme with responsive design

## Tech Stack

- **Frontend**: React 19, Tailwind CSS 4, shadcn/ui components
- **Backend**: Node.js, Express 4, tRPC 11
- **Database**: MySQL/TiDB with Drizzle ORM
- **Authentication**: Manus OAuth
- **AI**: Google Gemini 2.5 Flash
- **Deployment**: Railway (recommended)

## Quick Start

### Local Development

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
pnpm dev

# Run database migrations
pnpm db:push

# Build for production
pnpm build

# Start production server
pnpm start
```

### Environment Variables

See `.env.example` for all required variables. Critical ones:

- `DATABASE_URL`: MySQL connection string
- `GOOGLE_GEMINI_API_KEY`: Google Gemini API key
- `OPENAI_API_KEY`: OpenAI API key (fallback)
- `JWT_SECRET`: Session signing secret (min 32 characters)
- `VITE_APP_ID`: Manus OAuth application ID

## Deployment

### Railway (Recommended)

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for complete instructions.

Quick summary:
1. Push to GitHub
2. Connect GitHub repo to Railway
3. Add MySQL service
4. Configure environment variables
5. Run `pnpm db:push` to set up database
6. Deploy!

**Cost**: ~$10-25/month

### Other Options

- **Render**: Similar to Railway, $12-20/month
- **Fly.io**: Full-stack hosting, $10-20/month
- **Heroku**: Paid tier required, $20-75/month
- **Manus**: Free hosting (original platform)

## Project Structure

```
cdoportal/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # tRPC client, utilities
│   │   └── const.ts       # App constants (logo, title)
│   └── public/            # Static assets
├── server/                # Node.js backend
│   ├── routers.ts         # tRPC procedures
│   ├── db.ts              # Database queries
│   ├── newsHelpers.ts     # News operations
│   ├── jobHelpers.ts      # Jobs operations
│   └── _core/             # Framework code
├── drizzle/               # Database schema & migrations
├── shared/                # Shared types & constants
└── package.json           # Dependencies
```

## Key Files

- **`client/src/const.ts`**: App branding (logo, title)
- **`client/src/index.css`**: Global styles and color theme
- **`server/newsScraper.ts`**: RSS feed scraping logic
- **`drizzle/schema.ts`**: Database tables definition
- **`server/routers.ts`**: API endpoints

## Features in Detail

### News Section
- Fetches from FedScoop, GovExec, MeriTalk RSS feeds
- Categorized as: Policy, Technology, Workforce, Ethics, Community
- Filters by category and source
- Auto-updates on page refresh

### Jobs Board
- Quick search links to USAJOBS, Indeed, LinkedIn
- Pre-configured searches for: Data Scientist, Data Analyst, Chief Data Officer, ML Engineer, AI Specialist
- Links directly to job listings on each platform

### AI Career Tools
- **Resume Review**: Analyzes resume and provides federal job-specific feedback
- **Interview Prep**: Generates practice questions tailored to federal positions
- Powered by Gemini 2.5 Flash with current knowledge

### Resources
- **Learning**: 10+ courses, guides, and training resources
- **Tools**: 12+ development and ML frameworks
- **Datasets**: 10+ federal data sources
- **Communities**: 10+ professional networks and communities

## Development

### Adding a New Page

1. Create component in `client/src/pages/NewPage.tsx`
2. Add route in `client/src/App.tsx`
3. Add navigation link in `client/src/components/Header.tsx`

### Adding a New API Endpoint

1. Add procedure in `server/routers.ts`
2. Call via `trpc.featureName.useQuery()` in frontend
3. Add database helpers in `server/db.ts` if needed

### Updating Database Schema

1. Edit `drizzle/schema.ts`
2. Run `pnpm db:push` to migrate
3. Update `server/db.ts` helpers

## Customization

### Change Logo
1. Replace logo files in `client/public/`
2. Update `APP_LOGO` in `client/src/const.ts`
3. Update favicon in deployment settings

### Change Colors
Edit color variables in `client/src/index.css`:
```css
@theme {
  --color-primary: oklch(...);
  --color-secondary: oklch(...);
  /* ... */
}
```

### Change App Title
Update `VITE_APP_TITLE` in environment variables or `client/src/const.ts`

## API Keys Required

### Google Gemini (Required for AI features)
1. Go to https://aistudio.google.com/apikey
2. Create API key
3. Set `GOOGLE_GEMINI_API_KEY` environment variable

### OpenAI (Optional fallback)
1. Go to https://platform.openai.com/api-keys
2. Create API key
3. Set `OPENAI_API_KEY` environment variable

### Manus OAuth (If using Manus auth)
Contact Manus for:
- `VITE_APP_ID`
- `OAUTH_SERVER_URL`
- `VITE_OAUTH_PORTAL_URL`

## Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Build and test
pnpm build
pnpm start
```

## Troubleshooting

### News not updating
- Check RSS feed URLs are accessible
- Verify `newsScraper.ts` is running
- Check server logs for errors

### AI chat not responding
- Verify `GOOGLE_GEMINI_API_KEY` is set
- Check API key has quota remaining
- Review server logs

### Database connection error
- Verify `DATABASE_URL` is correct
- Check MySQL service is running
- Run `pnpm db:push` to create tables

### Build fails
- Clear `node_modules/` and reinstall: `pnpm install`
- Check `pnpm-lock.yaml` is committed
- Verify all environment variables are set

## Performance

- **News fetching**: ~30 seconds for all feeds
- **AI responses**: 2-5 seconds depending on query
- **Page load**: <2 seconds (optimized with Vite)
- **Database queries**: <100ms average

## Security

- All API keys stored in environment variables (never in code)
- JWT-based session management
- OAuth authentication for user management
- HTTPS enforced in production
- Database credentials never exposed

## License

Proprietary - CDO Portal

## Support

For deployment help, see [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)

For technical issues:
1. Check server logs
2. Review environment variables
3. Verify API keys are valid
4. Check database connection

## Future Enhancements

- [ ] User bookmarking system
- [ ] Email newsletter (weekly digest)
- [ ] Scheduled news updates (background jobs)
- [ ] Community forums
- [ ] Advanced job filtering
- [ ] Resume upload and analysis
- [ ] Federal agency integration APIs
