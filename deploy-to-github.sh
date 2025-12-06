#!/bin/bash

# AccessVLC Frontend - GitHub Deployment Script
# This script pushes the frontend to GitHub and sets up GitHub Pages

set -e  # Exit on error

echo "🚀 AccessVLC Frontend - GitHub Deployment"
echo "=========================================="
echo ""

# Configuration
REPO_URL="git@github.com:tylermaginnis/xXfGlUx.git"
BRANCH="main"

# Check if we're in the frontend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in frontend directory!"
    echo "Please run this script from the frontend folder."
    exit 1
fi

# Create/update README.md
echo "📝 Creating README.md..."
cat > README.md << 'README'
# xXfGlUx

**AccessVLC Frontend** - Luxury concierge membership platform

## 🚀 Live Demo

Visit: [https://tylermaginnis.github.io/xXfGlUx](https://tylermaginnis.github.io/xXfGlUx)

## 🔐 Demo Access

**Quick Login:**
- Email: `demo`
- Password: `demo`

**All Test Accounts:**
- Demo (Gold Member): `demo` / `demo`
- Admin: `admin@vlc.com` / `admin123`
- Partner: `partner@vlc.com` / `partner123`
- Black Member: `black@vlc.com` / `black123`

## ✨ Features

- 🎴 Interactive 3D membership cards
- 🔐 Role-based authentication (Admin, Partner, Member)
- 💳 Gold & Black tier memberships
- 🎨 Modern, responsive UI
- 🔄 Mock API for standalone operation

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Auth**: Mock authentication system
- **Deployment**: GitHub Pages

## 🏃 Running Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## 📦 Build

```bash
npm run build
npm start
```

## 🌐 Environment

This frontend runs in **standalone mode** with a mock API. No backend required!

To connect to a real backend, edit `.env.local`:
```bash
NEXT_PUBLIC_MOCK_API=false
NEXT_PUBLIC_API_URL=https://your-api-url.com/api
```

## 📄 License

Proprietary - All rights reserved

---

**Access VLX** - Your Key to Legendary Access
README

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git branch -M $BRANCH
else
    echo "✓ Git repository already initialized"
fi

# Create/update .gitignore if needed
echo "📄 Ensuring .gitignore is set up..."
if [ ! -f ".gitignore" ]; then
    cat > .gitignore << 'GITIGNORE'
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/
next-env.d.ts

# production
/build
/dist

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo

# IDE
.vscode
.idea
GITIGNORE
fi

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit
echo "💾 Committing changes..."
COMMIT_MSG="Deploy: $(date +'%Y-%m-%d %H:%M:%S') - AccessVLC Frontend"
git commit -m "$COMMIT_MSG" || echo "No changes to commit"

# Set up remote (remove if exists, then add)
echo "🔗 Setting up GitHub remote..."
git remote remove origin 2>/dev/null || true
git remote add origin $REPO_URL

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin $BRANCH --force

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to: https://github.com/tylermaginnis/xXfGlUx"
echo "2. Go to Settings → Pages"
echo "3. Set Source to: 'GitHub Actions'"
echo "4. The site will build and deploy automatically"
echo ""
echo "🌐 Your site will be live at:"
echo "   https://tylermaginnis.github.io/xXfGlUx"
echo ""
