# 📋 دليل النشر المختصر لفريق تقنية المعلومات بالجامعة

## نظرة سريعة

هذا المشروع يتكون من:

- **Backend API**: Node.js (Port 5000)
- **Frontend**: React SPA (Static Files)
- **Database**: MongoDB Atlas (مستضاف خارجياً - لا يحتاج إعداد)

---

## 1️⃣ المتطلبات على السيرفر

```
✅ Node.js 18+ أو 20+
✅ Nginx أو Apache
✅ PM2 (لإدارة Node.js process)
✅ SSL Certificate
```

---

## 2️⃣ البنية المقترحة

### الخيار A: Backend + Frontend على نفس الدومين

```
Domain: cisrai.aau.edu.jo
├── / → Frontend (Static Files)
└── /api → Backend (Proxy to Port 5000)
```

### الخيار B: Backend على subdomain منفصل

```
Frontend: cisrai.aau.edu.jo
Backend:  api-cisrai.aau.edu.jo
```

---

## 3️⃣ ملفات المشروع المطلوبة

سوف يتم تسليمكم:

### Backend (يعمل على Port 5000):

```
backend/
├── dist/                    # الكود المترجم (جاهز للتشغيل)
├── node_modules/           # المكتبات
├── package.json
├── .env                    # ملف الإعدادات (مشفّر)
└── uploads/                # مجلد رفع الملفات
```

### Frontend (ملفات Static):

```
dist/
├── index.html
├── assets/
│   ├── *.js
│   ├── *.css
│   └── images/
└── *.docx, *.png          # ملفات إضافية
```

---

## 4️⃣ خطوات التشغيل السريعة

### الخطوة 1: رفع الملفات

```bash
# رفع Backend إلى
/var/www/cisrai/backend/

# رفع Frontend إلى
/var/www/cisrai/frontend/
```

### الخطوة 2: تشغيل Backend

```bash
cd /var/www/cisrai/backend

# تثبيت المكتبات (إذا لم تكن مثبتة)
npm install --production

# تشغيل بـ PM2
pm2 start dist/server.js --name cisrai-backend

# حفظ التكوين
pm2 save
pm2 startup
```

### الخطوة 3: إعداد Nginx

**للخيار A (دومين واحد):**

```nginx
server {
    listen 80;
    server_name cisrai.aau.edu.jo;

    # Frontend
    root /var/www/cisrai/frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

**للخيار B (subdomain منفصل):**

```nginx
# Backend
server {
    listen 80;
    server_name api-cisrai.aau.edu.jo;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Frontend
server {
    listen 80;
    server_name cisrai.aau.edu.jo;
    root /var/www/cisrai/frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### الخطوة 4: تفعيل SSL

```bash
# باستخدام Let's Encrypt
sudo certbot --nginx -d cisrai.aau.edu.jo

# أو استخدام شهادة الجامعة (سنوفر التعليمات)
```

---

## 5️⃣ ملف `.env` المطلوب تعديله

سنوفر ملف `.env` مع المشروع، لكن يجب تعديل:

```env
# ضع دومين الجامعة هنا
CORS_ORIGIN=https://cisrai.aau.edu.jo

# غيّر هذه للأمان (سنوفر قيم جديدة)
JWT_SECRET=random_32_character_string_here
JWT_ADMIN_SECRET=another_random_string_here

# إعدادات الإيميل (إذا أردتم تفعيل الإشعارات)
EMAIL_USER=cisrai@aau.edu.jo
EMAIL_PASSWORD=app_password_here
```

---

## 6️⃣ Ports المطلوب فتحها في Firewall

```
✅ Port 80  (HTTP)
✅ Port 443 (HTTPS)
✅ Port 5000 (Backend - localhost only)
```

---

## 7️⃣ التحقق من التشغيل

### اختبار Backend:

```bash
curl http://localhost:5000/api/health
# النتيجة المتوقعة: {"status":"ok",...}
```

### اختبار Frontend:

```
افتح المتصفح: https://cisrai.aau.edu.jo
```

### اختبار الاتصال:

```
افتح Developer Tools (F12)
تحقق من Console - يجب ألا يكون هناك أخطاء
```

---

## 8️⃣ الصيانة والمراقبة

### إعادة تشغيل Backend:

```bash
pm2 restart cisrai-backend
```

### عرض Logs:

```bash
pm2 logs cisrai-backend
```

### إيقاف Backend:

```bash
pm2 stop cisrai-backend
```

### إعادة تشغيل Nginx:

```bash
sudo systemctl reload nginx
```

---

## 9️⃣ النسخ الاحتياطي

قاعدة البيانات مستضافة على MongoDB Atlas وتُنسخ تلقائياً.

للملفات المرفوعة على السيرفر:

```bash
# نسخ مجلد uploads
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/cisrai/backend/uploads
```

---

## 🔟 التحديثات المستقبلية

عند الحاجة لتحديث المشروع:

```bash
# 1. إيقاف Backend
pm2 stop cisrai-backend

# 2. استبدال الملفات الجديدة
# (سنوفر الملفات المحدثة)

# 3. إعادة التشغيل
pm2 restart cisrai-backend
```

---

## ⚠️ ملاحظات مهمة

1. **قاعدة البيانات**: لا تحتاج إعداد - متصلة بـ MongoDB Atlas
2. **Port 5000**: يجب أن يكون متاحاً على localhost
3. **CORS**: يجب تطابق الدومين في `.env` مع الدومين الفعلي
4. **SSL**: ضروري للأمان وعمل بعض الميزات

---

**فريق التطوير:**

- Email: CISRAI2026@aau.edu.jo
- الملفات المرفقة: `DEPLOYMENT_GUIDE.md` (دليل تفصيلي)

**الملفات المطلوبة منا:**

- [ ] Backend files (مجلد backend كامل)
- [ ] Frontend files (مجلد dist فقط)
- [ ] ملف `.env` بالإعدادات
- [ ] تعليمات خاصة إذا وُجدت

---

**شكراً لتعاونكم** 🙏

_هذا دليل مختصر للمساعدة. للتفاصيل الكاملة، راجع ملف DEPLOYMENT_GUIDE.md_
