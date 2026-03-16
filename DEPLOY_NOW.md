# 🚀 دليل النشر الفوري - CISRAI Conference

## الطريقة الأولى: Render.com (الأسرع والأسهل - مجاني) ⭐

### الخطوات:

#### 1. نشر Backend (5 دقائق)

1. **إنشاء حساب في Render**: https://render.com/
2. **ربط GitHub**:
   - اذهب إلى Dashboard
   - اضغط "New" → "Web Service"
   - اختر "Connect GitHub" وارفع المشروع لـ GitHub أولاً

3. **إعدادات النشر**:

   ```
   Name: cisrai-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **متغيرات البيئة** (Environment Variables):

   ```
   NODE_ENV = production
   PORT = 5000
   MONGODB_URI = mongodb+srv://cisrai_user:strongpassword@cisrai.doegkop.mongodb.net/cisrai?retryWrites=true&w=majority&appName=CISRAI
   JWT_SECRET = CISRAI_2026_Strong_Secret_Key_32chars_minimum
   JWT_ADMIN_SECRET = CISRAI_ADMIN_Strong_Secret_Key_32chars_minimum
   JWT_EXPIRE_IN = 7d
   CORS_ORIGIN = *
   ```

5. **اضغط "Create Web Service"** وانتظر 3-5 دقائق

✅ سيعطيك رابط مثل: `https://cisrai-backend.onrender.com`

---

#### 2. نشر Frontend (3 دقائق)

1. في Render، اضغط **"New"** → **"Static Site"**
2. **إعدادات**:

   ```
   Name: cisrai-frontend
   Root Directory: frontend
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

3. **متغيرات البيئة**:

   ```
   VITE_API_URL = https://cisrai-backend.onrender.com
   ```

4. اضغط **"Create Static Site"**

✅ سيعطيك رابط مثل: `https://cisrai-frontend.onrender.com`

---

#### 3. تحديث CORS في Backend

ارجع لإعدادات Backend في Render وعدّل:

```
CORS_ORIGIN = https://cisrai-frontend.onrender.com
```

---

## الطريقة الثانية: Vercel + Render (أداء أفضل) 🚀

### Frontend على Vercel:

1. **إنشاء حساب**: https://vercel.com/
2. **استيراد المشروع**:
   - اضغط "Add New" → "Project"
   - اختر مجلد frontend
3. **إعدادات**:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```
4. **Environment Variables**:
   ```
   VITE_API_URL = https://your-backend-url.onrender.com
   ```

### Backend على Render:

- نفس الخطوات السابقة

---

## الطريقة الثالثة: Railway.app (سريع جداً) ⚡

1. **إنشاء حساب**: https://railway.app/
2. **New Project** → من GitHub
3. **Add Backend**:
   - Root Directory: `backend`
   - Start Command: `npm run build && npm start`
4. **Add Frontend**:
   - Root Directory: `frontend`
   - Start Command: `npm run build && npm run preview`
5. **إضافة Environment Variables** لكل خدمة

---

## الطريقة الرابعة: سيرفر الجامعة (إذا متوفر) 🏫

### المتطلبات:

- Node.js 18+
- PM2
- Nginx

### خطوات سريعة:

```bash
# 1. رفع الملفات للسيرفر
scp -r backend/* user@server:/var/www/cisrai/backend
scp -r frontend/* user@server:/var/www/cisrai/frontend

# 2. على السيرفر - Backend
cd /var/www/cisrai/backend
npm install --production
npm run build
pm2 start dist/server.js --name cisrai-backend

# 3. على السيرفر - Frontend
cd /var/www/cisrai/frontend
npm install
npm run build

# 4. إعداد Nginx
sudo nano /etc/nginx/sites-available/cisrai
```

**ملف Nginx**:

```nginx
server {
    listen 80;
    server_name cisrai.aau.edu.jo;

    # Frontend
    location / {
        root /var/www/cisrai/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# تفعيل الموقع
sudo ln -s /etc/nginx/sites-available/cisrai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 📋 Checklist قبل النشر

- [ ] تغيير JWT_SECRET و JWT_ADMIN_SECRET لقيم قوية
- [ ] تحديث ADMIN_EMAIL و ADMIN_PASSWORD
- [ ] تحديث CORS_ORIGIN برابط Frontend الحقيقي
- [ ] اختبار الاتصال بقاعدة البيانات
- [ ] بناء المشروع محلياً للتأكد `npm run build`
- [ ] رفع الكود على GitHub (إذا استخدمت Render/Vercel)

---

## 🔍 اختبار بعد النشر

```bash
# اختبار Backend
curl https://your-backend-url.com/api/health

# يجب أن يرجع:
{"status": "OK", "timestamp": "..."}
```

---

## 🆘 في حالة المشاكل

### Backend لا يعمل:

1. تحقق من Logs في Render/Railway
2. تأكد من متغيرات البيئة صحيحة
3. تأكد من MONGODB_URI يعمل

### Frontend لا يتصل بالـ Backend:

1. تحقق من VITE_API_URL في متغيرات البيئة
2. تحقق من CORS_ORIGIN في Backend
3. افتح Developer Console في المتصفح وابحث عن أخطاء

---

## ✅ التوصية النهائية

**للنشر الفوري الآن:**

1. استخدم **Render.com** (مجاني وسريع)
2. Backend على Render Web Service
3. Frontend على Render Static Site

**للأداء الأفضل لاحقاً:**

1. Frontend على **Vercel** (CDN عالمي سريع)
2. Backend على **Render** أو **Railway**

**للتحكم الكامل:**

1. سيرفر الجامعة مع PM2 + Nginx

---

## 📞 هل تحتاج مساعدة؟

- اختر الطريقة المناسبة لك
- اتبع الخطوات بالترتيب
- سأكون هنا للمساعدة في أي مشكلة

**الوقت المتوقع للنشر:** 10-15 دقيقة ✨
