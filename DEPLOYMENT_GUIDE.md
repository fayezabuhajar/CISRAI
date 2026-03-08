# 🚀 دليل نشر مشروع CISRAI Conference

## 📋 نظرة عامة

هذا الدليل يوضح الخطوات التفصيلية لنشر مشروع CISRAI Conference على سيرفر الجامعة.

### مكونات المشروع:

- **Backend**: Node.js + Express + TypeScript (Port 5000)
- **Frontend**: React + Vite + TypeScript
- **Database**: MongoDB Atlas (متصل بالفعل)

---

## 📦 المتطلبات الأساسية على السيرفر

### 1. البرمجيات المطلوبة:

```bash
- Node.js 18+ أو 20+ (مُوصى به)
- npm أو yarn
- Nginx أو Apache (لخادم الويب)
- PM2 (لإدارة عملية Node.js)
- Git (اختياري للتحديثات)
- SSL Certificate (للأمان)
```

### 2. صلاحيات الوصول المطلوبة:

- SSH access إلى السيرفر
- صلاحيات sudo أو root (لتثبيت البرامج)
- وصول إلى إعدادات DNS للدومين

---

## 🔧 الخطوة 1: إعداد الملفات للنشر

### 1.1 إعداد Backend

#### أ. إنشاء ملف البيئة للإنتاج `.env`

انسخ محتوى الملف التالي وأنشئ ملف `.env` في مجلد `backend`:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://abuhajarfayez_db_user:vVZH9tiwVoC1dN80@cisrai.doegkop.mongodb.net/?appName=CISRAI

# Server Configuration
PORT=5000
NODE_ENV=production

# JWT Security Keys
# ⚠️ مهم جداً: قم بتغيير هذه القيم لقيم عشوائية قوية!
JWT_SECRET=PUT_YOUR_STRONG_32_CHAR_SECRET_KEY_HERE_12345678
JWT_ADMIN_SECRET=PUT_YOUR_ADMIN_SECRET_KEY_HERE_32_CHARACTERS
JWT_EXPIRE_IN=7d
JWT_ADMIN_EXPIRE_IN=24h

# Email Service Configuration (اختياري - للإشعارات)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-university-email@aau.edu.jo
EMAIL_PASSWORD=your-email-app-password
EMAIL_FROM=CISRAI2026@aau.edu.jo

# Admin Account
ADMIN_EMAIL=admin@aau.edu.jo
ADMIN_PASSWORD=ChangeThisStrongPassword123!

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads

# CORS Configuration
# ⚠️ مهم: ضع رابط دومين الجامعة هنا
CORS_ORIGIN=https://cisrai.aau.edu.jo

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### ب. بناء Backend للإنتاج

```bash
# في مجلد backend
cd backend
npm install --production=false
npm run build
```

هذا سينشئ مجلد `dist` يحتوي على الكود المترجم.

#### ج. الملفات المطلوب رفعها للسيرفر:

```
backend/
├── dist/              (الكود المترجم)
├── node_modules/      (المكتبات)
├── package.json
├── package-lock.json
├── .env              (ملف البيئة)
└── uploads/          (مجلد رفع الملفات - فارغ)
```

---

### 1.2 إعداد Frontend

#### أ. إنشاء ملف البيئة `.env.production`

في مجلد `frontend`، أنشئ ملف `.env.production`:

```env
# API Backend URL
# ⚠️ غيّر هذا حسب رابط الدومين النهائي
VITE_API_URL=https://cisrai.aau.edu.jo/api
```

**ملاحظات مهمة:**

- إذا كان Backend على subdomain منفصل: `https://api-cisrai.aau.edu.jo/api`
- إذا كان على نفس الدومين بمسار `/api`: `https://cisrai.aau.edu.jo/api`

#### ب. بناء Frontend للإنتاج

```bash
# في مجلد frontend
cd frontend
npm install
npm run build
```

هذا سينشئ مجلد `dist` يحتوي على ملفات HTML/CSS/JS/Images الجاهزة.

#### ج. محتويات مجلد `dist`:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [images]
├── logo.png
├── logo1.png
└── CISRAI-Temp.docx
```

---

## 📤 الخطوة 2: رفع الملفات إلى السيرفر

### الطريقة 1: استخدام SCP (من جهازك)

```bash
# رفع Backend
scp -r backend/ username@server-ip:/var/www/cisrai/backend/

# رفع Frontend (مجلد dist فقط)
scp -r frontend/dist/ username@server-ip:/var/www/cisrai/frontend/
```

### الطريقة 2: استخدام FTP/SFTP

استخدم برنامج **FileZilla** أو **WinSCP**:

1. اتصل بالسيرفر عبر SFTP
2. ارفع مجلد `backend` كامل
3. ارفع محتويات `frontend/dist` إلى مجلد خاص بالـ Frontend

### الطريقة 3: استخدام Git (الأفضل للتحديثات)

```bash
# على السيرفر
cd /var/www
git clone your-repository-url cisrai
cd cisrai/backend
npm install --production
npm run build
```

---

## ⚙️ الخطوة 3: تكوين السيرفر

### 3.1 تثبيت Node.js (إذا لم يكن مثبتاً)

```bash
# تحديث النظام
sudo apt update && sudo apt upgrade -y

# تثبيت Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# التحقق من التثبيت
node --version  # يجب أن يكون v20.x أو أحدث
npm --version
```

### 3.2 تثبيت PM2 (Process Manager)

```bash
# تثبيت PM2 عالمياً
sudo npm install -g pm2

# التحقق من التثبيت
pm2 --version
```

### 3.3 إنشاء مستخدم للتطبيق (اختياري لكن موصى به)

```bash
# إنشاء مستخدم cisrai
sudo adduser cisrai

# إعطاء صلاحيات للملفات
sudo chown -R cisrai:cisrai /var/www/cisrai
```

---

## 🚀 الخطوة 4: تشغيل Backend

### 4.1 إعداد PM2

```bash
# الانتقال لمجلد Backend
cd /var/www/cisrai/backend

# تثبيت dependencies (إذا لم يتم)
npm install --production

# تشغيل التطبيق بـ PM2
pm2 start dist/server.js --name cisrai-backend

# التحقق من الحالة
pm2 status

# عرض logs
pm2 logs cisrai-backend
```

### 4.2 حفظ تكوين PM2 (للتشغيل التلقائي)

```bash
# حفظ قائمة التطبيقات
pm2 save

# إعداد PM2 للتشغيل عند بدء النظام
pm2 startup
# سيعطيك أمر، نفذه (مثال):
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u cisrai --hp /home/cisrai
```

### 4.3 أوامر PM2 المفيدة

```bash
# إعادة تشغيل
pm2 restart cisrai-backend

# إيقاف
pm2 stop cisrai-backend

# حذف من القائمة
pm2 delete cisrai-backend

# مراقبة الأداء
pm2 monit

# عرض معلومات التطبيق
pm2 info cisrai-backend
```

---

## 🌐 الخطوة 5: إعداد Nginx (خادم الويب)

### 5.1 تثبيت Nginx (إذا لم يكن مثبتاً)

```bash
sudo apt install -y nginx

# التحقق من الحالة
sudo systemctl status nginx
```

### 5.2 إنشاء ملف تكوين للموقع

أنشئ ملف `/etc/nginx/sites-available/cisrai`:

```bash
sudo nano /etc/nginx/sites-available/cisrai
```

#### أ. تكوين شامل (Frontend + Backend على نفس الدومين):

```nginx
# Backend API - Port 5000
upstream backend {
    server localhost:5000;
    keepalive 64;
}

# Main Server Block
server {
    listen 80;
    server_name cisrai.aau.edu.jo www.cisrai.aau.edu.jo;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Root directory for Frontend
    root /var/www/cisrai/frontend;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript
               application/x-javascript application/xml+rss
               application/json application/javascript;

    # Frontend - React Router (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API Proxy
    location /api {
        proxy_pass http://backend;
        proxy_http_version 1.1;

        # Headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Uploads directory (إذا كان Backend يحفظ ملفات)
    location /uploads {
        alias /var/www/cisrai/backend/uploads;
        expires 1y;
        add_header Cache-Control "public";
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

#### ب. تكوين بديل (Backend على subdomain منفصل):

```nginx
# Backend API Server
server {
    listen 80;
    server_name api-cisrai.aau.edu.jo;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend Server
server {
    listen 80;
    server_name cisrai.aau.edu.jo www.cisrai.aau.edu.jo;

    root /var/www/cisrai/frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 5.3 تفعيل الموقع

```bash
# إنشاء symbolic link
sudo ln -s /etc/nginx/sites-available/cisrai /etc/nginx/sites-enabled/

# حذف الموقع الافتراضي (اختياري)
sudo rm /etc/nginx/sites-enabled/default

# فحص التكوين
sudo nginx -t

# إعادة تحميل Nginx
sudo systemctl reload nginx

# أو إعادة تشغيل كاملة
sudo systemctl restart nginx
```

---

## 🔒 الخطوة 6: تثبيت SSL Certificate (HTTPS)

### 6.1 استخدام Let's Encrypt (مجاني)

```bash
# تثبيت Certbot
sudo apt install -y certbot python3-certbot-nginx

# الحصول على شهادة SSL
sudo certbot --nginx -d cisrai.aau.edu.jo -d www.cisrai.aau.edu.jo

# إذا كان هناك subdomain للـ API
sudo certbot --nginx -d api-cisrai.aau.edu.jo
```

### 6.2 التجديد التلقائي

```bash
# Certbot يضيف cron job تلقائياً، لكن يمكنك التحقق:
sudo certbot renew --dry-run

# جدولة التجديد (اختياري)
sudo crontab -e
# أضف هذا السطر:
# 0 3 * * * /usr/bin/certbot renew --quiet
```

### 6.3 استخدام شهادة الجامعة (إذا كانت متوفرة)

إذا قدمت الجامعة شهادة SSL خاصة بها:

```nginx
server {
    listen 443 ssl http2;
    server_name cisrai.aau.edu.jo;

    # SSL Configuration
    ssl_certificate /path/to/university/certificate.crt;
    ssl_certificate_key /path/to/university/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # ... باقي التكوين
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name cisrai.aau.edu.jo;
    return 301 https://$server_name$request_uri;
}
```

---

## 🗄️ الخطوة 7: التحقق من MongoDB

### 7.1 اختبار الاتصال

```bash
cd /var/www/cisrai/backend

# تشغيل اختبار MongoDB
npm run test:mongodb
```

### 7.2 تهيئة البيانات الأولية

```bash
# إضافة بيانات اللجان
npm run seed:committees

# تهيئة الإعدادات
npm run init-settings
```

---

## ✅ الخطوة 8: اختبار التطبيق

### 8.1 اختبار Backend

```bash
# من خلال المتصفح أو curl
curl http://localhost:5000/api/health

# يجب أن تحصل على:
# {"status":"ok","timestamp":"...","uptime":"..."}
```

### 8.2 اختبار Frontend

```bash
# افتح في المتصفح
http://cisrai.aau.edu.jo

# أو
https://cisrai.aau.edu.jo
```

### 8.3 اختبار الـ API من Frontend

1. افتح المتصفح وانتقل للموقع
2. افتح Developer Tools (F12)
3. تحقق من Console - يجب ألا يكون هناك أخطاء CORS
4. تحقق من Network tab عند تحميل البيانات

---

## 🔍 الخطوة 9: إعداد الإدارة والمراقبة

### 9.1 إنشاء حساب Admin

```bash
cd /var/www/cisrai/backend

# تشغيل script إنشاء Admin
node dist/scripts/create-admin.js

# أو يدوياً من خلال MongoDB Compass/Atlas
```

أو استخدم هذا الـ script:

```javascript
// create-admin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

mongoose.connect(process.env.MONGODB_URI);

const Admin = mongoose.model("Admin", {
  email: String,
  password: String,
  name: String,
  role: String,
});

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("YourStrongPassword", 10);
  await Admin.create({
    email: "admin@aau.edu.jo",
    password: hashedPassword,
    name: "CISRAI Admin",
    role: "super-admin",
  });
  console.log("Admin created!");
  process.exit(0);
}

createAdmin();
```

### 9.2 إعداد Logs

```bash
# إنشاء مجلد logs
mkdir -p /var/www/cisrai/logs

# تكوين PM2 للـ logs
pm2 restart cisrai-backend --log /var/www/cisrai/logs/app.log
pm2 save
```

### 9.3 إعداد Monitoring

```bash
# تثبيت PM2 Web Dashboard (اختياري)
pm2 install pm2-logrotate

# تكوين log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

---

## 🔄 الخطوة 10: التحديثات والصيانة

### 10.1 إجراءات التحديث

```bash
# 1. عمل backup لقاعدة البيانات
mongodump --uri="mongodb+srv://..." --out=/backup/$(date +%Y%m%d)

# 2. سحب آخر تحديثات (إذا كنت تستخدم Git)
cd /var/www/cisrai
git pull origin main

# 3. تحديث Backend
cd backend
npm install --production
npm run build
pm2 restart cisrai-backend

# 4. تحديث Frontend
cd ../frontend
npm install
npm run build
# انسخ محتويات dist إلى مجلد frontend على السيرفر

# 5. إعادة تشغيل Nginx (إذا لزم)
sudo systemctl reload nginx
```

### 10.2 النسخ الاحتياطي

```bash
# Script بسيط للنسخ الاحتياطي
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/cisrai"

# Backup Database
mongodump --uri="$MONGODB_URI" --out="$BACKUP_DIR/db_$DATE"

# Backup Files
tar -czf "$BACKUP_DIR/files_$DATE.tar.gz" /var/www/cisrai/backend/uploads

# حذف النسخ القديمة (أكثر من 30 يوم)
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
find $BACKUP_DIR -name "db_*" -mtime +30 -delete

echo "Backup completed: $DATE"
```

جدولة النسخ الاحتياطي:

```bash
# إضافة cron job
sudo crontab -e

# نسخ احتياطي يومي الساعة 2 صباحاً
0 2 * * * /var/www/cisrai/scripts/backup.sh >> /var/log/cisrai-backup.log 2>&1
```

---

## 📊 مراقبة الأداء

### استخدام PM2 Monitoring

```bash
# مراقبة فورية
pm2 monit

# معلومات CPU/Memory
pm2 list

# تفاصيل التطبيق
pm2 info cisrai-backend
```

### Nginx Access Logs

```bash
# عرض آخر 100 طلب
sudo tail -n 100 /var/log/nginx/access.log

# مراقبة فورية
sudo tail -f /var/log/nginx/access.log

# عرض الأخطاء
sudo tail -f /var/log/nginx/error.log
```

---

## ❌ استكشاف الأخطاء

### المشكلة: Backend لا يعمل

```bash
# فحص حالة PM2
pm2 status

# عرض logs
pm2 logs cisrai-backend --lines 50

# إعادة تشغيل
pm2 restart cisrai-backend

# فحص البورت
sudo netstat -tulpn | grep 5000
```

### المشكلة: Frontend لا يحمل

```bash
# فحص Nginx
sudo nginx -t
sudo systemctl status nginx

# فحص الملفات
ls -la /var/www/cisrai/frontend/

# فحص logs
sudo tail -f /var/log/nginx/error.log
```

### المشكلة: CORS Error

تأكد من:

1. `CORS_ORIGIN` في `.env` يطابق دومين Frontend
2. Nginx يمرر headers بشكل صحيح
3. Frontend يستخدم HTTPS إذا كان Backend يستخدم HTTPS

### المشكلة: MongoDB Connection Error

```bash
# فحص الاتصال
curl -I https://cisrai.doegkop.mongodb.net

# فحص .env
cat /var/www/cisrai/backend/.env | grep MONGODB_URI

# اختبار من Node.js
node -e "require('mongoose').connect('your-mongodb-uri').then(() => console.log('Connected!'))"
```

---

## 📋 Checklist قبل النشر

- [ ] Backend مبني (npm run build)
- [ ] Frontend مبني (npm run build)
- [ ] ملف .env محدّث بقيم الإنتاج
- [ ] CORS_ORIGIN يطابق الدومين
- [ ] JWT secrets تم تغييرها لقيم قوية
- [ ] MongoDB متصل ويعمل
- [ ] PM2 مثبت ومكوّن
- [ ] Nginx مثبت ومكوّن
- [ ] SSL Certificate مثبت
- [ ] DNS مكوّن بشكل صحيح
- [ ] Firewall يسمح بـ ports (80, 443, 5000)
- [ ] حساب Admin تم إنشاؤه
- [ ] النسخ الاحتياطي مجدول

---

## 📞 معلومات الدعم

### روابط مهمة:

- [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)

### ملفات مهمة على السيرفر:

```
/var/www/cisrai/              # المجلد الرئيسي
/etc/nginx/sites-available/   # تكوين Nginx
/var/log/nginx/               # Nginx logs
~/.pm2/logs/                  # PM2 logs
```

---

## 🎯 ملخص سريع

```bash
# 1. بناء المشروع
cd backend && npm run build
cd ../frontend && npm run build

# 2. رفع الملفات
scp -r backend user@server:/var/www/cisrai/
scp -r frontend/dist user@server:/var/www/cisrai/frontend/

# 3. على السيرفر
cd /var/www/cisrai/backend
pm2 start dist/server.js --name cisrai-backend
pm2 save

# 4. تكوين Nginx
sudo nano /etc/nginx/sites-available/cisrai
sudo ln -s /etc/nginx/sites-available/cisrai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 5. تثبيت SSL
sudo certbot --nginx -d yourdomain.com

# ✅ انتهى!
```

---

**تم إعداد هذا الدليل بواسطة فريق CISRAI 2026**  
**آخر تحديث: 8 مارس 2026**
