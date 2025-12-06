# 🚀 AccessVLC Frontend - Quick Start

## ✅ Status: RUNNING

The frontend is now **completely divorced from the backend** and running in standalone mode.

**URL**: http://localhost:3000

---

## 🔐 Test Accounts

### Quick Demo (Member Dashboard)
| Email | Password | Role | Tier |
|-------|----------|------|------|
| **`demo`** | **`demo`** | **MEMBER** | **GOLD** |

### All Test Accounts
| Email | Password | Role | Tier |
|-------|----------|------|------|
| **`demo`** | **`demo`** | **MEMBER** | **GOLD** |
| `admin@vlc.com` | `admin123` | ADMIN | - |
| `partner@vlc.com` | `partner123` | PARTNER | - |
| `member@vlc.com` | `member123` | MEMBER | GOLD |
| `black@vlc.com` | `black123` | MEMBER | BLACK |

---

## 🎯 What's Working

✅ **Authentication** - Login/logout with mock users  
✅ **Role-based routing** - Admin, Partner, Member dashboards  
✅ **Protected routes** - Auto-redirect to login if not authenticated  
✅ **All UI pages** - Home, How It Works, Membership, Contact, etc.  
✅ **No backend needed** - Uses mock API (see `.env.local`)

---

## 🔧 Development Commands

```bash
# Start dev server (already running)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Stop dev server
pkill -f "next dev"
```

---

## 🔄 Switch to Real Backend

Edit `.env.local`:

```bash
NEXT_PUBLIC_MOCK_API=false
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Then restart: `npm run dev`

---

## 📁 Key Files

- **`lib/mock-api.ts`** - Mock API implementation
- **`lib/auth.ts`** - Auth service (auto-detects mock mode)
- **`.env.local`** - Environment config

---

## 🚀 Deploy Skeleton

```bash
# Build production bundle
npm run build

# Deploy to Vercel/Netlify/etc
npm run start
```

The mock mode can be controlled via environment variables on your hosting platform.

