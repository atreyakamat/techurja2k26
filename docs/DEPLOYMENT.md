# TechUrja 2K26 - Direct Launch Guide (GitHub Actions + FTP)

This setup is designed for **BigRock Shared Hosting** (PHP/MySQL). It uses a "Hybrid" approach:
1. **Frontend:** Exported as static HTML/CSS (works on any server).
2. **Backend:** A PHP script handles the registration form and saves to MySQL.
3. **Automation:** GitHub Actions builds the site and uploads it via FTP on every push.

---

## Step 1: GitHub Secrets Configuration
In your GitHub Repository, go to **Settings > Secrets and variables > Actions** and add these:

| Secret Name | Description | Example |
| :--- | :--- | :--- |
| `FTP_SERVER` | Your FTP Hostname | `ftp.yourdomain.com` |
| `FTP_USERNAME` | Your FTP/cPanel User | `techurja@yourdomain.com` |
| `FTP_PASSWORD` | Your FTP Password | `your_secure_password` |

---

## Step 2: Database Setup (One-time)
1. In cPanel, go to **MySQL® Databases**.
2. Create a database named `techurja_db` (or your choice).
3. Create a user and grant it **All Privileges** to that database.
4. **IMPORTANT:** Open `public/api/register.php` in your code and update the `$host`, `$db`, `$user`, and `$pass` variables to match your credentials.

---

## Step 3: Run the Schema
Since you are using PHP/MySQL without Prisma on the server, you need to create the `Registration` table manually once.
1. Open **phpMyAdmin** in cPanel.
2. Select your database.
3. Click the **SQL** tab and run this command:

```sql
CREATE TABLE Registration (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    eventSlug VARCHAR(255) NOT NULL,
    eventName VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL
);
```

---

## Step 4: Launch!
1. Commit your changes:
   ```bash
   git add .
   git commit -m "chore: setup direct launch via FTP"
   ```
2. Push to GitHub:
   ```bash
   git push origin main
   ```
3. GitHub Actions will now:
   - Build your Next.js project.
   - Export it to the `out/` folder.
   - FTP everything to your `public_html` folder.

---

## Why this works "Directly":
- No Node.js is required on the server.
- No SSH keys are required (uses standard FTP).
- The PHP script bridges the gap between your React frontend and the MySQL database.
