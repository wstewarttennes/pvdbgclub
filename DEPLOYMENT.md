# Deployment Instructions for pvdbackgammon.club

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `pvdbgclub` (or any name you prefer)
3. Make it **Public** (required for free GitHub Pages)
4. **Do NOT** initialize with README (we already have files)
5. Click "Create repository"

## Step 2: Push Code to GitHub

Copy the repository URL from GitHub, then run these commands:

```bash
# Add GitHub as remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/pvdbgclub.git

# Push code
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in left sidebar)
3. Under "Build and deployment":
   - Source: **GitHub Actions**
4. The site will automatically deploy when you push to main

## Step 4: Configure Custom Domain (pvdbackgammon.club)

### In GitHub:

1. Still in **Settings** → **Pages**
2. Under "Custom domain", enter: `pvdbackgammon.club`
3. Click **Save**
4. Wait a moment, then check the "Enforce HTTPS" checkbox (might take a few minutes to appear)

### In Namecheap:

1. Log in to Namecheap
2. Go to **Domain List** → Click **Manage** next to pvdbackgammon.club
3. Go to **Advanced DNS** tab
4. Add these records (delete any existing A/CNAME records for @ and www first):

   **A Records (for apex domain):**
   ```
   Type: A Record
   Host: @
   Value: 185.199.108.153
   TTL: Automatic

   Type: A Record
   Host: @
   Value: 185.199.109.153
   TTL: Automatic

   Type: A Record
   Host: @
   Value: 185.199.110.153
   TTL: Automatic

   Type: A Record
   Host: @
   Value: 185.199.111.153
   TTL: Automatic
   ```

   **CNAME Record (for www subdomain):**
   ```
   Type: CNAME Record
   Host: www
   Value: YOUR-USERNAME.github.io.
   TTL: Automatic
   ```
   (Replace YOUR-USERNAME with your actual GitHub username)

5. Save all changes

## Step 5: Wait for DNS Propagation

- DNS changes can take 5 minutes to 48 hours (usually ~30 minutes)
- Check status at: https://dnschecker.org/#A/pvdbackgammon.club
- Once propagated, your site will be live at https://pvdbackgammon.club

## Verification Steps

1. After GitHub Actions finishes (check Actions tab), visit your site
2. Test both URLs:
   - https://YOUR-USERNAME.github.io/pvdbgclub
   - https://pvdbackgammon.club (after DNS propagates)
3. Verify HTTPS certificate is working
4. Check that Luma calendar loads properly

## Future Updates

To update the site:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push

# GitHub Actions will automatically rebuild and deploy
```

## Troubleshooting

**GitHub Pages not deploying:**
- Check the **Actions** tab for build errors
- Ensure repository is Public
- Verify GitHub Pages source is set to "GitHub Actions"

**Custom domain not working:**
- Wait longer (DNS can take time)
- Verify DNS records in Namecheap are correct
- Check GitHub Pages settings show your custom domain
- Ensure CNAME record points to YOUR-USERNAME.github.io (with trailing dot)

**HTTPS certificate issues:**
- Wait 24 hours for Let's Encrypt to issue certificate
- Ensure "Enforce HTTPS" is checked in GitHub Pages settings
- Verify DNS is fully propagated

## Cost Breakdown

- **GitHub Pages Hosting:** $0/month (FREE!)
- **Domain (pvdbackgammon.club):** ~$10-15/year (already purchased)
- **Luma Calendar:** FREE for basic features
- **SSL Certificate:** $0 (FREE via Let's Encrypt)

**Total Monthly Cost: $0** 🎉

This is literally the cheapest option possible!
