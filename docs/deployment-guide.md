# Deployment Guide

This guide provides step-by-step instructions for deploying your React Ecommerce Learning application to various hosting platforms.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Deploying to Vercel](#deploying-to-vercel)
- [Deploying to Netlify](#deploying-to-netlify)
- [Deploying to GitHub Pages](#deploying-to-github-pages)
- [Environment Variables Setup](#environment-variables-setup)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:
- ✅ A GitHub account (for all deployment options)
- ✅ Your project pushed to a GitHub repository
- ✅ Node.js and npm installed locally
- ✅ Successfully built the project locally (`npm run build`)

---

## Deploying to Vercel

Vercel is the recommended platform for React applications, offering zero-configuration deployment with excellent performance.

### Step 1: Create a Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and authenticate with your GitHub account
3. Grant Vercel access to your repositories

### Step 2: Import Your Project
1. Click "Add New Project" from your Vercel dashboard
2. Select "Import Git Repository"
3. Find and select your `react-ecommerce-learning` repository
4. Click "Import"

### Step 3: Configure Build Settings
Vercel should auto-detect your Vite project. Verify these settings:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Add Environment Variables (Optional)
1. In the project settings, go to "Environment Variables"
2. Add any variables from your `.env` file:
   ```
   VITE_APP_NAME=React Ecommerce Learning
   VITE_APP_URL=https://your-project.vercel.app
   ```
3. Click "Add" for each variable

### Step 5: Deploy
1. Click "Deploy"
2. Wait 1-2 minutes for the build to complete
3. Your app will be live at `https://your-project.vercel.app`

### Automatic Deployments
- Every push to your `main` branch triggers a new deployment
- Pull requests get preview deployments automatically
- View deployment logs in the Vercel dashboard

---

## Deploying to Netlify

Netlify is another excellent option with a generous free tier and great developer experience.

### Step 1: Create a Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up with your GitHub account
3. Authorize Netlify to access your repositories

### Step 2: Create a New Site
1. Click "Add new site" → "Import an existing project"
2. Choose "GitHub" as your Git provider
3. Select your `react-ecommerce-learning` repository

### Step 3: Configure Build Settings
Set the following build configuration:
- **Base directory**: (leave empty)
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### Step 4: Add Environment Variables
1. Go to "Site settings" → "Environment variables"
2. Click "Add a variable"
3. Add your environment variables:
   ```
   VITE_APP_NAME=React Ecommerce Learning
   VITE_APP_URL=https://your-site.netlify.app
   ```

### Step 5: Deploy
1. Click "Deploy site"
2. Wait for the build to complete (usually 1-3 minutes)
3. Your site will be live at `https://random-name.netlify.app`
4. You can customize the subdomain in site settings

### Netlify CLI (Alternative Method)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from your project directory
netlify deploy --prod
```

---

## Deploying to GitHub Pages

GitHub Pages is a free option for hosting static sites directly from your repository.

### Step 1: Install gh-pages Package
```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json
Add the homepage field and deployment scripts:
```json
{
  "homepage": "https://yourusername.github.io/react-ecommerce-learning",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 3: Update vite.config.js
Add the base path for GitHub Pages:
```javascript
export default defineConfig({
  base: '/react-ecommerce-learning/',
  // ... rest of config
})
```

### Step 4: Deploy
```bash
npm run deploy
```

This will:
1. Build your project
2. Create a `gh-pages` branch
3. Push the `dist` folder to that branch
4. Your site will be live at `https://yourusername.github.io/react-ecommerce-learning`

### Step 5: Enable GitHub Pages
1. Go to your repository on GitHub
2. Navigate to Settings → Pages
3. Under "Source", select the `gh-pages` branch
4. Click "Save"

---

## Environment Variables Setup

### Understanding Vite Environment Variables
- Vite exposes environment variables prefixed with `VITE_`
- Access them in your code: `import.meta.env.VITE_APP_NAME`
- Never commit `.env` files with sensitive data

### Creating Environment Files
```bash
# Development
.env.development

# Production
.env.production

# Example file (commit this)
.env.example
```

### Platform-Specific Setup

#### Vercel
- Add variables in Project Settings → Environment Variables
- Separate variables for Production, Preview, and Development
- Variables are encrypted and secure

#### Netlify
- Add variables in Site Settings → Environment Variables
- Can scope variables to specific deploy contexts
- Supports file-based variables for sensitive data

#### GitHub Pages
- GitHub Pages doesn't support server-side environment variables
- Use build-time variables only
- Consider GitHub Secrets for CI/CD workflows

### Example Environment Variables
```bash
# Application
VITE_APP_NAME=React Ecommerce Learning
VITE_APP_URL=https://your-domain.com

# API (for future backend)
VITE_API_URL=https://api.example.com
VITE_API_KEY=your_api_key

# Analytics
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false
```

---

## Troubleshooting

### Build Fails on Deployment Platform

**Problem**: Build succeeds locally but fails on the platform

**Solutions**:
1. Check Node.js version compatibility
   ```bash
   # Add to package.json
   "engines": {
     "node": ">=18.0.0"
   }
   ```

2. Clear build cache on the platform
   - Vercel: Redeploy with "Clear cache and deploy"
   - Netlify: Site settings → Build & deploy → Clear cache

3. Check for missing dependencies
   ```bash
   npm install
   npm run build
   ```

### Blank Page After Deployment

**Problem**: Deployment succeeds but shows a blank page

**Solutions**:
1. Check browser console for errors
2. Verify the base path in `vite.config.js`
3. Ensure all assets are using relative paths
4. Check if environment variables are set correctly

### Routing Issues (404 on Refresh)

**Problem**: Routes work on initial load but 404 on page refresh

**Solutions**:

#### Vercel
Create `vercel.json` in project root:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

#### Netlify
Create `public/_redirects` file:
```
/*    /index.html   200
```

#### GitHub Pages
- GitHub Pages doesn't support SPA routing well
- Consider using hash routing: `<BrowserRouter basename="/">` → `<HashRouter>`
- Or implement a 404.html redirect trick

### Environment Variables Not Working

**Problem**: `import.meta.env.VITE_*` returns undefined

**Solutions**:
1. Ensure variable names start with `VITE_`
2. Restart dev server after adding new variables
3. Check if variables are added on the deployment platform
4. Verify the deployment environment (production vs preview)

### Build Size Too Large

**Problem**: Warning about chunk size or slow loading

**Solutions**:
1. Enable code splitting in `vite.config.js`
2. Lazy load routes:
   ```javascript
   const Home = lazy(() => import('./pages/Home'))
   ```
3. Optimize images (use WebP, compress)
4. Remove unused dependencies
5. Use dynamic imports for large libraries

### CORS Errors

**Problem**: API requests fail with CORS errors

**Solutions**:
1. Configure CORS on your backend
2. Use a proxy in development:
   ```javascript
   // vite.config.js
   server: {
     proxy: {
       '/api': 'http://localhost:3000'
     }
   }
   ```
3. Ensure API URLs use HTTPS in production

### Deployment Takes Too Long

**Problem**: Build process is very slow

**Solutions**:
1. Check for large dependencies
2. Use npm ci instead of npm install
3. Enable caching on the platform
4. Optimize build configuration
5. Consider upgrading to a paid tier for faster builds

---

## Post-Deployment Checklist

After deploying, verify:
- ✅ All pages load correctly
- ✅ Navigation works (including browser back/forward)
- ✅ Images and assets load properly
- ✅ Forms submit correctly
- ✅ Cart functionality works
- ✅ Authentication flow works
- ✅ Responsive design works on mobile
- ✅ No console errors
- ✅ SEO meta tags are present
- ✅ Performance is acceptable (use Lighthouse)

---

## Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [React Router Deployment](https://reactrouter.com/en/main/guides/deployment)

---

## Need Help?

If you encounter issues not covered here:
1. Check the platform's status page
2. Review deployment logs carefully
3. Search the platform's community forums
4. Check GitHub issues for similar problems
5. Reach out to platform support

Happy deploying! 🚀
