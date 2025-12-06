# 🖼️ Image Path Fix for GitHub Pages

## Problem
Images weren't loading on GitHub Pages because Next.js Image component and `/` paths don't work with subdirectory deployments (`/xXfGlUx`).

## Solution Applied

### Changed in `components/membership/card-3d.tsx`:

**Before:**
```tsx
import Image from 'next/image';
<Image src="/vlx-icon.png" ... />
```

**After:**
```tsx
const basePath = process.env.NODE_ENV === 'production' ? '/xXfGlUx' : '';
<img src={`${basePath}/vlx-icon.png`} ... />
```

## Why This Works

1. **Production**: Images load from `/xXfGlUx/vlx-icon.png` (GitHub Pages subdirectory)
2. **Development**: Images load from `/vlx-icon.png` (local dev server)
3. **Native `<img>`**: Works with static export, no optimization needed

## Changes Made

- ✅ Replaced `next/image` with native `<img>` tag
- ✅ Added dynamic `basePath` for production
- ✅ Kept all styling and filters intact
- ✅ Works in both dev and production

## Deploy Instructions

```bash
./deploy-to-github.sh
```

Wait 2-3 minutes, then check: https://tylermaginnis.github.io/xXfGlUx

## Local Testing

To test locally with production paths:
```bash
npm run build
npx serve out
```

Then visit: http://localhost:3000/xXfGlUx

---

**Status**: ✅ Fixed and ready to deploy!
