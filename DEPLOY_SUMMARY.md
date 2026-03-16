# ⚡ ملخص النشر السريع - 4 خطوات فقط!

## 🎯 الهدف: موقعك لايف في 15 دقيقة!

---

## 1️⃣ رفع على GitHub (3 دقائق)

```powershell
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/CISRAI.git
git push -u origin main
```

📝 إنشاء repo جديد: https://github.com/new

---

## 2️⃣ Backend على Render.com (5 دقائق)

🔗 https://render.com/

```
New + → Web Service
Repository: CISRAI
Root Directory: backend
Build: npm install && npm run build
Start: npm start

Environment Variables:
NODE_ENV=production
MONGODB_URI=mongodb+srv://cisrai_user:strongpassword@cisrai.doegkop.mongodb.net/cisrai?retryWrites=true&w=majority&appName=CISRAI
JWT_SECRET=YOUR_STRONG_SECRET_32_CHARS
JWT_ADMIN_SECRET=YOUR_STRONG_ADMIN_SECRET_32_CHARS
CORS_ORIGIN=*
```

💾 احفظ الرابط: `https://cisrai-backend-xyz.onrender.com`

---

## 3️⃣ تحديث vercel.json (1 دقيقة)

في ملف `vercel.json`، عدّل السطر:

```json
"destination": "https://YOUR_BACKEND_URL_FROM_RENDER/api/:path*"
```

```powershell
git add vercel.json
git commit -m "Update backend URL"
git push
```

---

## 4️⃣ Frontend على Vercel.com (4 دقائق)

🔗 https://vercel.com/

```
Sign up with GitHub
Add New → Project
Import: CISRAI
Root Directory: frontend
Deploy!
```

💾 احفظ الرابط: `https://cisrai-xyz.vercel.app`

---

## 5️⃣ تحديث CORS (1 دقيقة)

ارجع لـ Render → Backend → Environment:

```
CORS_ORIGIN = https://YOUR_VERCEL_URL
```

Save Changes

---

## 🎉 تمام!

### الرابط للمستخدمين:

```
https://cisrai-xyz.vercel.app
```

### تسجيل دخول Admin:

```
Email: admin@cisrai.com
Password: Admin@2026Change
```

---

## 📱 شارك الموقع!

```
مبروك! موقعك الآن لايف على:
https://cisrai-xyz.vercel.app

مجاني 100% ✅
URL واحد ✅
SSL آمن ✅
```

---

## 🔄 للتحديثات لاحقاً:

```powershell
# عدّل الكود ثم:
git add .
git commit -m "Update"
git push

# سيتم النشر تلقائياً!
```

---

## 📚 للتفاصيل الكاملة:

افتح: [DEPLOY_PERSONAL_QUICK.md](DEPLOY_PERSONAL_QUICK.md)

---

✨ **جاهز للبدء؟** اتبع الخطوات بالترتيب! 🚀
