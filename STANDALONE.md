# AccessVLC Frontend - Standalone Mode

This frontend is now **divorced from the backend** and can run independently using mock APIs.

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

The app will run on `http://localhost:3000`

## Mock Users

The standalone mode includes the following test accounts:

| Email | Password | Role | Tier |
|-------|----------|------|------|
| admin@vlc.com | admin123 | ADMIN | - |
| partner@vlc.com | partner123 | PARTNER | - |
| member@vlc.com | member123 | MEMBER | GOLD |
| black@vlc.com | black123 | MEMBER | BLACK |

## Environment Modes

### Development (Mock Mode)
Uses `.env.local` with `NEXT_PUBLIC_MOCK_API=true`
- No backend required
- Instant responses
- Perfect for UI iterations

### Production (Real API)
Uses `.env.production` with `NEXT_PUBLIC_MOCK_API=false`
- Connects to real backend
- Set `NEXT_PUBLIC_API_URL` to your API endpoint

## Switching Modes

To switch from mock to real backend:

```bash
# Edit .env.local
NEXT_PUBLIC_MOCK_API=false
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Then restart the dev server.

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Features in Mock Mode

✅ Login/Logout
✅ Role-based access (Admin, Partner, Member)
✅ Tier-based access (Gold, Black)
✅ Protected routes
✅ User authentication state
✅ All UI components

## Adding More Mock Data

Edit `lib/mock-api.ts` to add more mock responses as needed.

