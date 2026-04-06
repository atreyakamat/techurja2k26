# Deployment Checklist for Netlify

## ✅ Issues Fixed
- [x] Fixed 553 FTP error (No such file or directory)
- [x] Registration API now working correctly
- [x] Files uploading successfully to FTP server
- [x] Both CSV data and images being transferred

## 📋 Pre-Deployment Checklist

### 1. Environment Variables (Critical)
Add these to Netlify Environment Variables:
```
FTP_HOST=ftp.aitdgoa.edu.in
FTP_USER=techurja_folder@aitdgoa.edu.in
FTP_PASSWORD=AitdTech@2026
```

**How to add in Netlify:**
1. Go to your site dashboard on Netlify
2. Navigate to: Site settings → Environment variables
3. Add each variable with the exact names and values above
4. Deploy scope: All deploy contexts (or at least Production)

### 2. Build Settings
Ensure these are configured in Netlify:
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Functions directory**: `.netlify/functions` (auto-detected)

### 3. Next.js Configuration
Already configured in `netlify.toml` and `next.config.ts`

### 4. API Route Configuration
The registration endpoint will be available at:
```
https://yourdomain.aitdgoa.edu.in/api/register/
```
**Note**: The trailing slash `/` is required!

## 🧪 Testing After Deployment

### Test 1: Basic Health Check
```bash
curl https://yourdomain.aitdgoa.edu.in/api/register/ \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "eventSlug": "test-event",
    "phone": "1234567890",
    "institution": "Test Institute"
  }'
```

Expected response: 200 OK with registration ID

### Test 2: Full Registration with Image
Use the provided `test-registration.js` script:
1. Update the hostname to your production domain
2. Run: `node test-registration.js`
3. Verify files appear on FTP server

### Test 3: FTP Verification
Run the verification script to check uploads:
```bash
node verify-ftp-upload.js
```

## 🔍 Monitoring & Logs

### Where to check logs:
1. **Netlify Function Logs**: 
   - Dashboard → Functions → Click on the function → Logs tab
   
2. **Real-time logs**:
   - Use Netlify CLI: `netlify dev` or `netlify functions:log`

### What to look for:
- `[FTP] Starting registration` - Registration initiated
- `[FTP] Connected successfully` - FTP connection OK
- `[FTP] CSV uploaded successfully` - Data file uploaded
- `[FTP] Image uploaded successfully` - Screenshot uploaded
- `[FTP] Registration X completed successfully` - Full success

### Common Issues & Solutions:

#### Issue: "FTP Storage Failure"
- **Check**: Environment variables are set correctly in Netlify
- **Solution**: Verify FTP credentials in Netlify dashboard

#### Issue: "Missing required fields"
- **Check**: Request body contains name, email, eventSlug
- **Solution**: Ensure frontend sends all required fields

#### Issue: "Port timeout" or "Connection refused"
- **Check**: Netlify Functions can access external FTP (they can)
- **Solution**: Increase function timeout in `netlify.toml` (already set to 60s)

## 📊 Expected Performance
- API response time: 1.5-4 seconds (FTP upload time)
- Success rate: Should be ~99%+
- File sizes: CSV ~450 bytes, Images vary

## 🚀 Deployment Steps

1. **Commit all changes**:
   ```bash
   git add .
   git commit -m "Fix: Resolved 553 FTP error in registration API"
   git push origin main
   ```

2. **Netlify will auto-deploy** from your connected repository

3. **Add Environment Variables** in Netlify dashboard

4. **Trigger Redeploy** if needed:
   - Deploys → Trigger deploy → Deploy site

5. **Test the API** using the production URL

6. **Monitor the first few registrations** via function logs

## ✨ Production URL
Once deployed, your registration API will be at:
```
https://yourdomain.aitdgoa.edu.in/api/register/
```

Replace `yourdomain` with your actual Netlify site URL or custom domain.

## 📝 Notes
- The FTP library uses port 21 (standard FTP)
- Connection is unencrypted (secure: false) as per server configuration
- Files are organized in `/registrations/REG_TIMESTAMP_RANDOM/` folders
- Each registration gets a unique folder with CSV data and image subfolder
