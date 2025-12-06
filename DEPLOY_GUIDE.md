# 🚀 GitHub Pages Deployment Guide

## Quick Deploy

```bash
./deploy-to-github.sh
```

That's it! The script handles everything automatically.

---

## What the Script Does

1. ✅ Creates README.md with project info
2. ✅ Initializes git repository (if needed)
3. ✅ Sets up .gitignore
4. ✅ Commits all changes
5. ✅ Pushes to GitHub: `git@github.com:tylermaginnis/xXfGlUx.git`
6. ✅ Triggers automatic GitHub Actions deployment

---

## Manual Steps (First Time Only)

After running the script, you need to **enable GitHub Pages** (one time):

1. Go to: https://github.com/tylermaginnis/xXfGlUx
2. Click **Settings** → **Pages**
3. Under "Source", select: **GitHub Actions**
4. Save

That's it! GitHub Actions will automatically build and deploy.

---

## Your Live Site

🌐 **URL**: https://tylermaginnis.github.io/xXfGlUx

The site will be live within 2-3 minutes after the first push.

---

## Configuration Files

### 📄 `next.config.mjs`
- Configured for static export (`output: 'export'`)
- Base path set to `/xXfGlUx` for GitHub Pages
- Images unoptimized for static hosting

### 📄 `.github/workflows/deploy.yml`
- Automatic deployment on push to `main`
- Builds Next.js app
- Deploys to GitHub Pages
- Node.js 18 + npm ci for fast installs

### 📄 `.env.local`
- Mock API enabled by default
- No backend required for demos

---

## Deployment Workflow

```mermaid
graph LR
    A[Local Changes] --> B[Run deploy script]
    B --> C[Git Push]
    C --> D[GitHub Actions]
    D --> E[Build Next.js]
    E --> F[Deploy to Pages]
    F --> G[Live Site! 🎉]
```

---

## Test Accounts (Live on GitHub Pages)

| Username | Password | Role |
|----------|----------|------|
| `demo` | `demo` | Gold Member |
| `admin@vlc.com` | `admin123` | Admin |
| `partner@vlc.com` | `partner123` | Partner |
| `black@vlc.com` | `black123` | Black Member |

---

## Updating the Site

Just run the script again:

```bash
./deploy-to-github.sh
```

Changes will be live in 2-3 minutes.

---

## Troubleshooting

### ❌ Build Failed

Check the GitHub Actions log:
1. Go to: https://github.com/tylermaginnis/xXfGlUx/actions
2. Click on the latest workflow run
3. Check for errors

### ❌ Site Not Loading

1. Verify GitHub Pages is enabled (Settings → Pages)
2. Check the deployment status in Actions tab
3. Wait 2-3 minutes for DNS propagation

### ❌ Images Not Showing

- Images are unoptimized for static export
- Check that `next.config.mjs` has `images: { unoptimized: true }`

### ❌ 404 on Page Refresh

- This is normal for GitHub Pages with client-side routing
- Users can navigate from home page
- Or add a custom 404 page

---

## Production Environment

The live site runs with:
- ✅ Mock API enabled (no backend needed)
- ✅ Static HTML/CSS/JS (fast loading)
- ✅ All authentication working client-side
- ✅ Interactive 3D cards
- ✅ Full role-based routing

---

## SSH Key Setup (If Needed)

If you get authentication errors, set up SSH:

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: Settings → SSH Keys
```

Then run the deploy script again.

---

## Custom Domain (Optional)

To use a custom domain:

1. Add `CNAME` file with your domain:
   ```bash
   echo "yourdomain.com" > public/CNAME
   ```

2. Update DNS records:
   ```
   Type: CNAME
   Name: www
   Value: tylermaginnis.github.io
   ```

3. Configure in GitHub: Settings → Pages → Custom domain

---

## Support

- **Repo**: https://github.com/tylermaginnis/xXfGlUx
- **Actions**: https://github.com/tylermaginnis/xXfGlUx/actions
- **Issues**: https://github.com/tylermaginnis/xXfGlUx/issues

---

**Ready to deploy?** Run: `./deploy-to-github.sh` 🚀
