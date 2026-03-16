# 🚀 انشر مشروعك في 10 دقائق

## الطريقة الأسرع: Render.com (مجاني)

### ✅ الخطوات:

#### 1. ارفع مشروعك على GitHub (دقيقتان)

```bash
# في مجلد المشروع
git init
git add .
git commit -m "Initial commit - Ready for deployment"

# إنشاء repository جديد على GitHub ثم:
git remote add origin https://github.com/YOUR_USERNAME/CISRAI.git
git branch -M main
git push -u origin main
```

---

#### 2. اذهب إلى Render.com وسجّل دخول (دقيقة)

🔗 https://render.com/

- اضغط **Sign Up** أو استخدم حساب GitHub

---

#### 3. انشر Backend (3 دقائق)

1. في Dashboard، اضغط **"New +"** → **"Web Service"**
2. اختر repository الخاص بك من GitHub
3. املأ الإعدادات:

```
Name: cisrai-backend
Region: اختر الأقرب لك
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
Instance Type: Free
```

4. اضغط **"Advanced"** وأضف Environment Variables:

```
NODE_ENV = production
MONGODB_URI = mongodb+srv://cisrai_user:strongpassword@cisrai.doegkop.mongodb.net/cisrai?retryWrites=true&w=majority&appName=CISRAI
JWT_SECRET = CISRAI_2026_Strong_Secret_Key_32_characters_long
JWT_ADMIN_SECRET = ADMIN_Strong_Secret_Key_32_characters_long
CORS_ORIGIN = *
PORT = 5000
```

5. اضغط **"Create Web Service"**
6. **انتظر 3-5 دقائق** للنشر
7. **احفظ الرابط** (مثل: `https://cisrai-backend-xyz.onrender.com`)

---

#### 4. انشر Frontend (3 دقائق)

1. في Render، اضغط **"New +"** → **"Static Site"**
2. اختر نفس repository
3. املأ الإعدادات:

```
Name: cisrai-frontend
Branch: main
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: dist
```

4. في **Environment Variables**، أضف:

```
VITE_API_URL = YOUR_BACKEND_URL_FROM_STEP_3
```

مثال: `https://cisrai-backend-xyz.onrender.com/api`

5. اضغط **"Create Static Site"**
6. انتظر دقيقتين

✅ **مبروك! موقعك أصبح لايف** 🎉

---

#### 5. تحديث CORS (دقيقة)

1. ارجع لـ Backend في Render
2. اضغط **"Environment"**
3. عدّل `CORS_ORIGIN` من `*` إلى رابط Frontend الخاص بك
4. اضغط **"Save Changes"**

---

## 🔗 الروابط الخاصة بك

- **Frontend:** `https://cisrai-frontend.onrender.com`
- **Backend:** `https://cisrai-backend.onrender.com`
- **API Docs:** `https://cisrai-backend.onrender.com/api-docs`

---

## 🧪 اختبار الموقع

1. افتح رابط Frontend
2. جرب تسجيل الدخول كـ Admin:
   - Email: `admin@aau.edu.jo`
   - Password: (الذي حددته في ADMIN_PASSWORD)

---

## 💡 ملاحظات مهمة

- **Free Tier في Render**: الخدمة تنام بعد 15 دقيقة من عدم الاستخدام، وتستيقظ تلقائياً عند الدخول (يستغرق 30 ثانية)
- **للترقية**: يمكنك ترقية الخطة لاحقاً لتبقى نشطة 24/7
- **Custom Domain**: يمكنك ربط دومين الجامعة لاحقاً من إعدادات Render

---

## 🆘 إذا واجهت مشكلة

اضغط على **"Logs"** في Render لرؤية الأخطاء وأخبرني بها

---

## 🎯 بدائل أخرى:

### Vercel (للـ Frontend فقط):

- أسرع من Render للـ Frontend
- مجاني مع CDN عالمي
- 🔗 https://vercel.com/

### Railway.app:

- واجهة أسهل
- نشر أسرع
- 🔗 https://railway.app/

### Netlify (Frontend):

- مجاني أيضاً
- سهل الاستخدام
- 🔗 https://netlify.com/

---

## ✨ الخلاصة

**الوقت الكلي:** 10-15 دقيقة
**التكلفة:** مجاني تماماً
**النتيجة:** موقع لايف على الإنترنت

🚀 **هل تريد البدء الآن؟**
