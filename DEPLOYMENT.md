# GitHub Pages Deployment Guide

This guide will help you deploy your portfolio website to GitHub Pages with optional custom domain support.

## 📋 Prerequisites

- A GitHub account
- Git installed on your local machine
- (Optional) A custom domain name

## 🚀 Deployment Steps

### Step 1: Initialize Git Repository (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: Portfolio website"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Name it `portfolio` (or your preferred name)
4. Choose **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

### Step 3: Connect and Push to GitHub

```bash
git remote add origin https://github.com/<your-username>/portfolio.git
git branch -M main
git push -u origin main
```

Replace `<your-username>` with your actual GitHub username.

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`
   - OR select **GitHub Actions** (recommended - uses the workflow)
5. Click **Save**

### Step 5: Wait for Deployment

- If using GitHub Actions, go to the **Actions** tab to see the deployment progress
- The workflow will automatically deploy on every push to `main`
- Your site will be live at: `https://<username>.github.io/portfolio`

## 🌐 Custom Domain Setup

### Option A: Using CNAME (Subdomain like www.yourdomain.com)

1. **Edit CNAME file**:
   - Open `CNAME` file in your repository
   - Replace `yourdomain.com` with your actual domain (e.g., `www.rishabhshrestha.com`)
   - Commit and push:
     ```bash
     git add CNAME
     git commit -m "Add custom domain"
     git push
     ```

2. **Configure DNS at your domain registrar**:
   - Log in to your domain registrar (GoDaddy, Namecheap, etc.)
   - Go to DNS Management
   - Add a **CNAME record**:
     - **Type**: CNAME
     - **Name**: www (or subdomain you want)
     - **Value**: `<username>.github.io`
     - **TTL**: 3600 (or default)

3. **Wait for DNS propagation** (can take up to 48 hours, usually much faster)

4. **GitHub will automatically**:
   - Detect your CNAME file
   - Enable SSL/HTTPS for your custom domain
   - Configure the domain in repository settings

### Option B: Using A Records (Root domain like yourdomain.com)

1. **Edit CNAME file**:
   - Replace content with just your root domain (e.g., `rishabhshrestha.com`)
   - Commit and push

2. **Configure DNS**:
   - Add **A records** pointing to GitHub Pages IPs:
     ```
     Type: A
     Name: @
     Value: 185.199.108.153
     TTL: 3600

     Type: A
     Name: @
     Value: 185.199.109.153
     TTL: 3600

     Type: A
     Name: @
     Value: 185.199.110.153
     TTL: 3600

     Type: A
     Name: @
     Value: 185.199.111.153
     TTL: 3600
     ```
   - Also add a CNAME for www:
     ```
     Type: CNAME
     Name: www
     Value: <username>.github.io
     TTL: 3600
     ```

3. **Wait for DNS propagation**

### Verify Custom Domain

1. Go to repository **Settings** → **Pages**
2. Under **Custom domain**, you should see your domain
3. Check **Enforce HTTPS** (will be available after DNS is configured)
4. Visit your domain in a browser - it should load your portfolio!

## 🔄 Updating Your Site

After making changes to your website:

```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

GitHub Actions will automatically rebuild and deploy your site. Changes typically go live within 1-2 minutes.

## 📝 Important Notes

- **CNAME file**: Must be in the root directory and contain only your domain name (one line, no http:// or https://)
- **.nojekyll file**: Already created - this tells GitHub Pages not to process files with Jekyll (since we're using pure HTML/CSS/JS)
- **Custom domain**: You can use either the root domain or a subdomain, but not both in the same CNAME file
- **SSL Certificate**: GitHub automatically provides free SSL certificates for custom domains (may take a few minutes to provision)
- **DNS Propagation**: Can take anywhere from a few minutes to 48 hours, but usually happens within an hour

## 🐛 Troubleshooting

### Site not loading?
- Check GitHub Actions tab for any deployment errors
- Verify DNS settings are correct
- Wait a bit longer for DNS propagation
- Clear your browser cache

### Custom domain not working?
- Verify CNAME file is in the root directory
- Check DNS records are correct
- Ensure "Enforce HTTPS" is enabled in Pages settings
- Wait for DNS propagation (can take up to 48 hours)

### Changes not showing?
- Check if GitHub Actions workflow completed successfully
- Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
- Verify you pushed to the correct branch (main)

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup Guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

Need help? Check the main README.md file or GitHub Pages documentation.
