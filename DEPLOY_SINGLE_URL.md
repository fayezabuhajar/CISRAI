# 🌐 نشر بـ URL واحد - الحل الصحيح

## المشكلة:

في النشر العادي:

- Frontend: `https://cisrai-frontend.onrender.com`
- Backend: `https://cisrai-backend.onrender.com`

❌ **المستخدم يضطر يعرف URL مختلف!**

---

## ✅ الحل: URL واحد فقط

المستخدم يزور: `https://cisrai.com`

- الصفحات → Frontend
- `/api/*` → Backend
- **كل شيء شفاف للمستخدم!**

---

## 🎯 الطريقة 1: Vercel (الأسهل - موصى به) ⭐

### المميزات:

✅ URL واحد فقط
✅ سريع جداً (CDN عالمي)
✅ مجاني
✅ Setup سهل

### الخطوات:

#### 1. نشر Frontend على Vercel:

1. اذهب إلى: https://vercel.com/
2. سجل دخول بـ GitHub
3. **"Add New"** → **"Project"**
4. اختر repository الخاص بك
5. إعدادات:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```
6. **لا تضيف** `VITE_API_URL` الآن!
7. اضغط **"Deploy"**

#### 2. نشر Backend على Render:

(نفس الخطوات السابقة - راجع DEPLOY_NOW_QUICK.md)

احفظ رابط Backend: مثلاً `https://cisrai-backend.onrender.com`

#### 3. إعداد Proxy في Vercel:

بعد نشر Frontend على Vercel:

1. في مجلد المشروع، أنشئ ملف: `vercel.json` في المجلد الرئيسي
2. ضع فيه:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://cisrai-backend.onrender.com/api/:path*"
    }
  ]
}
```

3. ارفع التغييرات:

```bash
git add vercel.json
git commit -m "Add API proxy"
git push
```

4. Vercel سيعيد النشر تلقائياً

#### 4. النتيجة:

المستخدم يزور: **`https://your-app.vercel.app`**

- `https://your-app.vercel.app` → Frontend
- `https://your-app.vercel.app/api/...` → يتحول تلقائياً للـ Backend!

✅ **URL واحد فقط!**

---

## 🎯 الطريقة 2: سيرفر الجامعة مع Nginx (تحكم كامل) 🏫

إذا لديك سيرفر في الجامعة، هذا أفضل حل للأداء والتحكم.

### الخطوات:

#### 1. رفع الملفات:

```bash
# رفع للسيرفر
scp -r * user@server:/var/www/cisrai/
```

#### 2. بناء Frontend:

```bash
cd /var/www/cisrai/frontend
npm install
npm run build
# سينشئ مجلد dist/
```

#### 3. تشغيل Backend:

```bash
cd /var/www/cisrai/backend
npm install
npm run build
pm2 start dist/server.js --name cisrai-backend
```

#### 4. إعداد Nginx:

ملف: `/etc/nginx/sites-available/cisrai`

```nginx
server {
    listen 80;
    server_name cisrai.aau.edu.jo;  # أو الدومين الخاص بك

    # Frontend - الصفحات الأساسية
    location / {
        root /var/www/cisrai/frontend/dist;
        try_files $uri $uri/ /index.html;

        # Headers للأمان
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
    }

    # Backend API - كل طلبات /api
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;

        # Headers مهمة
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

    # Uploads - إذا كان لديك رفع ملفات
    location /uploads {
        alias /var/www/cisrai/backend/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Static files - تحسين الأداء
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        root /var/www/cisrai/frontend/dist;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 5. تفعيل الموقع:

```bash
# ربط
sudo ln -s /etc/nginx/sites-available/cisrai /etc/nginx/sites-enabled/

# اختبار
sudo nginx -t

# تطبيق
sudo systemctl reload nginx
```

#### 6. SSL (اختياري - موصى به):

```bash
# تثبيت Certbot
sudo apt install certbot python3-certbot-nginx

# إضافة SSL
sudo certbot --nginx -d cisrai.aau.edu.jo

# سيتم تحويل HTTP → HTTPS تلقائياً
```

#### 7. النتيجة:

المستخدم يزور: **`https://cisrai.aau.edu.jo`**

- `https://cisrai.aau.edu.jo` → Frontend
- `https://cisrai.aau.edu.jo/api/...` → Backend
- **كل شيء على دومين واحد!** ✅

---

## 🎯 الطريقة 3: Railway.app (سهل ومباشر) 🚂

Railway يدعم نشر Frontend + Backend معاً بسهولة.

### الخطوات:

1. اذهب إلى: https://railway.app/
2. **"New Project"** → من GitHub
3. سيكتشف Backend و Frontend تلقائياً
4. أضف Environment Variables للـ Backend
5. في Frontend، أضف:
   ```
   VITE_API_URL=/api
   ```
6. Railway سيوفر لك دومين واحد تلقائياً!

---

## 📋 مقارنة الطرق:

| الطريقة             | السرعة     | السهولة    | التكلفة   | URL واحد         |
| ------------------- | ---------- | ---------- | --------- | ---------------- |
| **Vercel + Render** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐   | مجاني     | ✅               |
| **سيرفر الجامعة**   | ⭐⭐⭐⭐   | ⭐⭐⭐     | مجاني     | ✅               |
| **Railway**         | ⭐⭐⭐⭐   | ⭐⭐⭐⭐⭐ | نصف مجاني | ✅               |
| **Render فقط**      | ⭐⭐⭐     | ⭐⭐⭐     | مجاني     | ❌ (URLs منفصلة) |

---

## ✅ توصيتي النهائية:

### للنشر السريع الآن:

**استخدم Vercel + Render** (الطريقة 1)

- 15 دقيقة فقط
- URL واحد
- سريع جداً
- مجاني

### للإنتاج الرسمي:

**سيرفر الجامعة + Nginx** (الطريقة 2)

- تحكم كامل
- أداء ممتاز
- دومين الجامعة الرسمي
- آمن ومستقر

---

## 🔧 تحديث Frontend للـ Proxy:

إذا استخدمت الطريقة 1 (Vercel)، عدّل Frontend:

في `frontend/.env.production`:

```
VITE_API_URL=/api
```

أو في `frontend/src/services/api.ts`:

```typescript
const API_BASE = import.meta.env.VITE_API_URL || "/api";
```

هكذا Frontend سيستدعي `/api` بدلاً من URL كامل!

---

## 🎯 الخلاصة:

✅ URL واحد فقط للمستخدم
✅ Frontend + Backend على نفس الدومين
✅ شفاف تماماً للمستخدم
✅ آمن وسريع

**أي طريقة تفضل؟** 🚀
