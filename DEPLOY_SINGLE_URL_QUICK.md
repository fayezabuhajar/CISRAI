# ⚡ نشر سريع - URL واحد للمشروع

## 🎯 الهدف:

المستخدم يزور رابط واحد فقط مثل: `https://cisrai.com`

- الصفحات → Frontend
- `/api/*` → Backend (شفاف للمستخدم)

---

## 🚀 الطريقة السريعة: Vercel + Render (15 دقيقة)

### الخطوة 1️⃣: نشر Backend على Render (5 دقائق)

1. اذهب إلى: https://render.com/
2. **"New +"** → **"Web Service"**
3. اختر repository من GitHub
4. إعدادات:
   ```
   Name: cisrai-backend
   Root Directory: backend
   Build Command: npm install && npm run build
   Start Command: npm start
   ```
5. Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://cisrai_user:strongpassword@cisrai.doegkop.mongodb.net/cisrai?retryWrites=true&w=majority&appName=CISRAI
   JWT_SECRET=CISRAI_2026_Strong_Secret_Key_32_characters_long
   JWT_ADMIN_SECRET=ADMIN_Strong_Secret_Key_32_characters_long
   CORS_ORIGIN=*
   ```
6. اضغط **"Create Web Service"**
7. **احفظ الرابط** (مثل: `https://cisrai-backend-abc.onrender.com`)

---

### الخطوة 2️⃣: تحديث vercel.json (دقيقة)

في ملف `vercel.json` في المجلد الرئيسي، عدّل:

```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "cd frontend && npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://cisrai-backend-abc.onrender.com/api/:path*"
    }
  ]
}
```

⚠️ **مهم:** استبدل `cisrai-backend-abc.onrender.com` برابط Backend الخاص بك!

---

### الخطوة 3️⃣: نشر Frontend على Vercel (5 دقائق)

1. اذهب إلى: https://vercel.com/
2. سجل دخول بـ GitHub
3. **"Add New"** → **"Project"**
4. اختر repository
5. إعدادات:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```
6. **لا تضيف VITE_API_URL!** (سيستخدم `/api` تلقائياً)
7. اضغط **"Deploy"**

---

### الخطوة 4️⃣: تحديث CORS في Backend (دقيقة)

في Render Dashboard → Backend → Environment:

عدّل `CORS_ORIGIN` إلى:

```
https://your-app.vercel.app
```

استبدل برابط Vercel الخاص بك.

---

## ✅ النتيجة:

المستخدم يزور: **`https://your-app.vercel.app`**

- `https://your-app.vercel.app` → Frontend
- `https://your-app.vercel.app/api/users` → يتحول تلقائياً لـ Backend!
- `https://your-app.vercel.app/api/papers` → Backend
- الخ...

**المستخدم لا يعرف شيء عن Backend URL!** ✨

---

## 🎯 اختبار:

بعد النشر:

1. افتح: `https://your-app.vercel.app`
2. جرب تسجيل الدخول
3. افتح Developer Console (F12) → Network
4. ستجد الطلبات تذهب لـ `/api/...` وتعمل!

---

## 📋 Checklist:

- [ ] Backend منشور على Render
- [ ] حفظت رابط Backend
- [ ] حدثت `vercel.json` برابط Backend
- [ ] رفعت التغييرات على GitHub
- [ ] Frontend منشور على Vercel
- [ ] حدثت CORS_ORIGIN في Backend
- [ ] اختبرت الموقع وكل شيء يعمل!

---

## 🆘 إذا واجهت مشكلة:

### CORS Error:

- تأكد من تحديث `CORS_ORIGIN` في Backend برابط Vercel

### API لا يعمل:

- تأكد من `vercel.json` موجود في المجلد الرئيسي
- تأكد من رابط Backend صحيح في `vercel.json`

### 404 على `/api`:

- تأكد من `rewrites` في `vercel.json` صحيح
- تأكد من Backend يعمل (افتح رابطه مباشرة)

---

## 💡 تحسينات لاحقة:

### Custom Domain:

في Vercel:

1. Settings → Domains
2. أضف: `cisrai.aau.edu.jo`
3. اتبع التعليمات لتحديث DNS

---

## 📁 الملفات المهمة:

- ✅ [vercel.json](vercel.json) - Proxy configuration
- ✅ [nginx.conf](nginx.conf) - إذا استخدمت سيرفر الجامعة
- ✅ [frontend/.env.production](frontend/.env.production) - Environment variables
- ✅ [DEPLOY_SINGLE_URL.md](DEPLOY_SINGLE_URL.md) - دليل شامل

---

✨ **الوقت الكلي: 15 دقيقة فقط!**
🎯 **URL واحد للمستخدم!**
🚀 **جاهز للنشر الآن!**
