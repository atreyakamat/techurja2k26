# Quick Guide: Set Netlify Environment Variables

## 🚨 IMPORTANT - Do This BEFORE Deploying

To fix the "Exposed Secrets" error, you MUST set these environment variables in Netlify:

### Step-by-Step Instructions:

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com/
   - Select your site: **techurja2k26**

2. **Navigate to Environment Variables**
   - Click: **Site settings** (in top navigation)
   - Scroll to: **Environment variables** (in left sidebar)
   - Click: **Environment variables**

3. **Add These 3 Variables**

   Click "**Add a variable**" button and add each:

   **Variable 1:**
   ```
   Key: FTP_HOST
   Value: ftp.aitdgoa.edu.in
   Scopes: All scopes (Production, Deploy previews, Branch deploys)
   ```

   **Variable 2:**
   ```
   Key: FTP_USER
   Value: techurja_folder@aitdgoa.edu.in
   Scopes: All scopes
   ```

   **Variable 3:**
   ```
   Key: FTP_PASSWORD
   Value: AitdTech@2026
   Scopes: All scopes
   ```

4. **Save Each Variable**
   - Click "**Create variable**" after each one

5. **Trigger a New Deploy**
   - Go to: **Deploys** tab
   - Click: **Trigger deploy** → **Clear cache and deploy site**

## ✅ Expected Result

- Build should now succeed (no exposed secrets error)
- Registration API will work at: `https://your-site.netlify.app/api/register/`
- FTP uploads will function correctly

## 🧪 Testing After Deployment

```bash
curl https://your-site.netlify.app/api/register/ \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"1234567890","eventSlug":"test","institution":"Test"}'
```

Expected: `{"message":"Registration successful.","registrationId":"REG_...","path":"registrations/REG_..."}`

---

## 📸 Visual Guide

**Finding Environment Variables:**
1. Site Settings (top right) → 
2. Environment variables (left sidebar) → 
3. Add a variable button

**Setting Values:**
- Just copy-paste the exact values above
- Make sure to check all 3 scope checkboxes
- Click "Create variable" to save

---

## ❓ Troubleshooting

### If build still fails with exposed secrets:
- The commit removing hardcoded credentials is now pushed
- Clear deploy cache: Deploys → Trigger deploy → Clear cache and deploy site
- Contact Netlify support if issue persists

### If API returns 500 error:
- Check that all 3 environment variables are set correctly
- Check Function logs in Netlify dashboard
- Look for: "Missing FTP credentials" error message

---

**You can delete this file after successfully deploying to Netlify.**
