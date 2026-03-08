# ✅ Deployment Checklist - CISRAI Conference

## Pre-Deployment (قبل النشر)

### إعداد الملفات

- [ ] بناء Backend: `cd backend && npm run build`
- [ ] بناء Frontend: `cd frontend && npm run build`
- [ ] التأكد من وجود مجلد `backend/dist`
- [ ] التأكد من وجود مجلد `frontend/dist`
- [ ] نسخ ملف `.env.example` إلى `.env` وتعديله

### إعدادات Backend (.env)

- [ ] تحديث `CORS_ORIGIN` بالدومين الصحيح
- [ ] تغيير `JWT_SECRET` لقيمة قوية
- [ ] تغيير `JWT_ADMIN_SECRET` لقيمة قوية
- [ ] تغيير `ADMIN_PASSWORD` لكلمة مرور قوية
- [ ] تأكيد `MONGODB_URI` يعمل
- [ ] تحديث `NODE_ENV=production`

### إعدادات Frontend

- [ ] إنشاء `.env.production` مع `VITE_API_URL`
- [ ] التأكد من URL الصحيح للـ Backend

---

## Server Setup (إعداد السيرفر)

### المتطلبات الأساسية

- [ ] Node.js 18+ مثبت
- [ ] npm مثبت
- [ ] PM2 مثبت (`npm install -g pm2`)
- [ ] Nginx مثبت
- [ ] Git مثبت (اختياري)

### رفع الملفات

- [ ] رفع مجلد `backend` إلى `/var/www/cisrai/backend`
- [ ] رفع محتويات `frontend/dist` إلى `/var/www/cisrai/frontend`
- [ ] التأكد من صلاحيات الملفات صحيحة
- [ ] إنشاء مجلد `uploads`: `mkdir -p /var/www/cisrai/backend/uploads`

---

## Backend Configuration

### تثبيت Dependencies

- [ ] `cd /var/www/cisrai/backend`
- [ ] `npm install --production`
- [ ] التحقق من عدم وجود أخطاء

### تشغيل Backend مع PM2

- [ ] `pm2 start dist/server.js --name cisrai-backend`
- [ ] `pm2 save`
- [ ] `pm2 startup` (اتبع التعليمات)
- [ ] `pm2 status` - التأكد من حالة "online"

### اختبار Backend

- [ ] `curl http://localhost:5000/api/health`
- [ ] النتيجة: `{"status":"ok"}`
- [ ] `pm2 logs cisrai-backend` - فحص عدم وجود أخطاء

---

## Nginx Configuration

### إنشاء ملف التكوين

- [ ] `sudo nano /etc/nginx/sites-available/cisrai`
- [ ] نسخ التكوين المناسب (من DEPLOYMENT_GUIDE.md)
- [ ] حفظ الملف

### تفعيل الموقع

- [ ] `sudo ln -s /etc/nginx/sites-available/cisrai /etc/nginx/sites-enabled/`
- [ ] `sudo rm /etc/nginx/sites-enabled/default` (اختياري)
- [ ] `sudo nginx -t` - التأكد من عدم وجود أخطاء
- [ ] `sudo systemctl reload nginx`

### اختبار Nginx

- [ ] فتح `http://server-ip` في المتصفح
- [ ] التأكد من ظهور Frontend
- [ ] فحص Browser Console (F12) - عدم وجود أخطاء
- [ ] التأكد من تحميل البيانات من API

---

## DNS Configuration

### سجلات DNS المطلوبة

- [ ] A Record: `cisrai.aau.edu.jo` → `server-ip`
- [ ] A Record: `www.cisrai.aau.edu.jo` → `server-ip`
- [ ] CNAME (إذا لزم): `api-cisrai.aau.edu.jo` → `cisrai.aau.edu.jo`

### التحقق من DNS

- [ ] `nslookup cisrai.aau.edu.jo`
- [ ] `ping cisrai.aau.edu.jo`
- [ ] الانتظار حتى تنشر التغييرات (قد يستغرق دقائق إلى ساعات)

---

## SSL Certificate

### تثبيت Certbot

- [ ] `sudo apt install certbot python3-certbot-nginx`

### الحصول على شهادة

- [ ] `sudo certbot --nginx -d cisrai.aau.edu.jo -d www.cisrai.aau.edu.jo`
- [ ] اتباع التعليمات
- [ ] اختيار redirect من HTTP إلى HTTPS

### التحقق من SSL

- [ ] فتح `https://cisrai.aau.edu.jo`
- [ ] التأكد من ظهور القفل 🔒 في المتصفح
- [ ] اختبار التجديد: `sudo certbot renew --dry-run`

---

## Database Setup

### اختبار الاتصال بـ MongoDB

- [ ] `cd /var/www/cisrai/backend`
- [ ] `npm run test:mongodb`
- [ ] النتيجة: "Connected to MongoDB successfully"

### تهيئة البيانات الأولية

- [ ] `npm run seed:committees` (إضافة بيانات اللجان)
- [ ] `npm run init-settings` (تهيئة الإعدادات)

---

## Admin Account

### إنشاء حساب Admin

- [ ] الدخول إلى MongoDB Atlas Dashboard
- [ ] إضافة مستخدم Admin يدوياً، أو
- [ ] استخدام API لإنشاء حساب: `POST /api/auth/admin/register`

### اختبار تسجيل الدخول

- [ ] فتح `https://cisrai.aau.edu.jo/admin`
- [ ] تسجيل الدخول بحساب Admin
- [ ] التأكد من الوصول للوحة التحكم

---

## Security Checks

### Firewall

- [ ] فتح Port 80 (HTTP)
- [ ] فتح Port 443 (HTTPS)
- [ ] Port 5000 متاح فقط على localhost

### File Permissions

- [ ] `sudo chown -R www-data:www-data /var/www/cisrai`
- [ ] `chmod 755` للمجلدات
- [ ] `chmod 644` للملفات

### Environment Variables

- [ ] `.env` لا يُرفع إلى Git
- [ ] Secrets قوية (32+ حرف)
- [ ] CORS محدد بدقة

---

## Testing

### Functional Tests

- [ ] الصفحة الرئيسية تعمل
- [ ] التنقل بين الصفحات يعمل
- [ ] تحميل البيانات من API يعمل
- [ ] إرسال رسالة من Contact Us يعمل
- [ ] تسجيل الدخول للـ Admin يعمل
- [ ] لوحة التحكم تعرض البيانات
- [ ] رفع الملفات يعمل (إذا وُجد)

### Performance Tests

- [ ] سرعة تحميل الصفحات مقبولة
- [ ] لا توجد أخطاء في Console
- [ ] لا توجد أخطاء 404
- [ ] الصور والأيقونات تظهر

### Browser Compatibility

- [ ] Chrome ✓
- [ ] Firefox ✓
- [ ] Safari ✓
- [ ] Edge ✓
- [ ] Mobile browsers ✓

---

## Monitoring & Logging

### PM2 Setup

- [ ] `pm2 status` - Backend يعمل
- [ ] `pm2 logs cisrai-backend` - فحص Logs
- [ ] `pm2 monit` - مراقبة الأداء

### Nginx Logs

- [ ] `sudo tail -f /var/log/nginx/access.log`
- [ ] `sudo tail -f /var/log/nginx/error.log`
- [ ] عدم وجود أخطاء 500

### Uptime Monitoring (اختياري)

- [ ] إعداد UptimeRobot أو مشابه
- [ ] مراقبة Backend API
- [ ] مراقبة Frontend

---

## Backup

### النسخ الاحتياطي

- [ ] إعداد script للنسخ الاحتياطي
- [ ] جدولة cron job للنسخ اليومي
- [ ] اختبار استعادة النسخة الاحتياطية

### Backup Locations

- [ ] Database: MongoDB Atlas (تلقائي)
- [ ] Files: `/var/www/cisrai/backend/uploads`
- [ ] Configs: `/etc/nginx/sites-available/`

---

## Documentation

### المستندات المُسلّمة

- [ ] DEPLOYMENT_GUIDE.md (دليل تفصيلي)
- [ ] UNIVERSITY_DEPLOYMENT.md (دليل مختصر)
- [ ] DEPLOYMENT_CHECKLIST.md (هذا الملف)
- [ ] README.md محدّث
- [ ] .env.example مع تعليقات

### معلومات الوصول

- [ ] URL الموقع
- [ ] حساب Admin
- [ ] معلومات SSH (محفوظة بأمان)
- [ ] معلومات MongoDB

---

## Post-Deployment

### إعلان الإطلاق

- [ ] إعلام الفريق
- [ ] اختبار من عدة أجهزة ومواقع
- [ ] جمع ملاحظات أولية

### المراقبة الأولية

- [ ] مراقبة لمدة 24 ساعة
- [ ] فحص Errors/Crashes
- [ ] مراجعة Performance

### التحسينات

- [ ] تحسين سرعة التحميل إذا لزم
- [ ] إضافة Caching إذا لزم
- [ ] ضبط Rate Limiting

---

## Emergency Contacts

### فريق التطوير

- Email: CISRAI2026@aau.edu.jo
- Phone: +962 7 9887 2239

### فريق IT الجامعة

- Contact: [أضف معلومات الاتصال]

---

## Notes

```
تاريخ النشر: __________
المسؤول: __________
ملاحظات إضافية:
_________________________
_________________________
_________________________
```

---

✅ **عند إكمال جميع البنود، المشروع جاهز للإطلاق!**

_آخر تحديث: 8 مارس 2026_
