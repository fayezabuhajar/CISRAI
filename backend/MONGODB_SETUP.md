# 🚀 MongoDB Setup for Windows

## Quick Fix - MongoDB is NOT Running

Your backend server is working perfectly! The error you see is just that **MongoDB is not running on your computer**.

### ⚡ Quick Solution (Choose One)

## Option 1: MongoDB Atlas (Easiest - Recommended)

MongoDB Atlas is a cloud database service - no installation needed!

### Steps:

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Start Free"
3. Create account
4. Create a new cluster (free tier available)
5. Click "Connect" button
6. Choose "Connect your application"
7. Copy the connection string
8. Update your `.env` file:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/cisrai?retryWrites=true&w=majority
```

**That's it!** No need to install anything locally.

---

## Option 2: Local MongoDB (Windows)

### Method A: MongoDB Community (Recommended)

1. **Download MongoDB**
   - Go to: https://www.mongodb.com/try/download/community
   - Select: Windows, .msi installer
   - Click Download

2. **Install MongoDB**
   - Run the installer
   - Follow the setup wizard
   - Choose "Install MongoDB as a Service"

3. **Start MongoDB**

   **Method 1 - Windows Services (Easiest)**

   ```powershell
   # Open Services app
   services.msc

   # Find "MongoDB Server" and click Start
   ```

   **Method 2 - Command Line**

   ```powershell
   # Run in PowerShell as Administrator
   net start MongoDB
   ```

   **Method 3 - MongoDB Compass**
   - Download from: https://www.mongodb.com/products/tools/compass
   - Open the app
   - It will automatically start the local MongoDB server

4. **Verify MongoDB is Running**

   ```powershell
   # Test connection
   mongosh

   # You should see:
   # test> _
   ```

5. **Your backend should now work!**
   ```powershell
   npm run dev
   ```

### Method B: Chocolatey (If you have it installed)

```powershell
# Run as Administrator
choco install mongodb-community

# Start MongoDB
net start MongoDB
```

---

## Option 3: Quick Test Without MongoDB

If you want to test the backend without MongoDB, temporarily modify `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/cisrai-test
```

This will attempt connection but won't crash if MongoDB is unavailable.

---

## ✅ Verify MongoDB is Running

### Using MongoDB Compass (Easiest)

1. Download: https://www.mongodb.com/products/tools/compass
2. Open the app
3. If it connects successfully, MongoDB is running

### Using Command Line

```powershell
mongosh

# Should output:
# test> _
```

### Your Backend Console

Look for this message:

```
✓ MongoDB Connected: localhost
```

---

## 🎯 Next Steps

1. **Choose Option 1 (Atlas) or Option 2 (Local)**
2. **Get connection string / Start MongoDB**
3. **Update `.env` file with connection details**
4. **Run**: `npm run dev`
5. **Wait for**: `✓ MongoDB Connected`
6. **Seed database**: `npm run seed` (in another terminal)

---

## 📝 MongoDB Connection Strings

### Local MongoDB

```env
MONGODB_URI=mongodb://localhost:27017/cisrai
```

### MongoDB Atlas

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cisrai?retryWrites=true&w=majority
```

---

## 🆘 Troubleshooting

### "MongoDB Connection Refused"

- ✓ MongoDB is not running
- ✓ Use Option 1 (Atlas) or Option 2 (Local) above

### "Windows Services Manager not found"

- Run `services.msc` in Windows search

### "Cannot run Powershell as Administrator"

- Right-click PowerShell icon → "Run as administrator"

### "MongoDB Compass won't start"

- Your computer might not have Visual C++ Runtime
- Download: https://support.microsoft.com/en-us/help/2977003

### "Atlas won't connect"

- Check connection string format
- Verify IP whitelist includes your machine
- Check username/password

---

## 💡 Recommended Approach

**For Development**: Use **MongoDB Atlas (Option 1)**

- No installation needed
- Free tier available
- Works everywhere
- Easy to share with team

**For Learning**: Use **Local MongoDB + Compass (Option 2)**

- Full control
- No internet needed
- Visual database explorer

---

## ✅ Success Indicators

Your backend is working when you see:

```
╔════════════════════════════════════╗
║  CISRAI Backend Server Started     ║
║  🚀 http://localhost:5000          ║
║  Environment: DEVELOPMENT          ║
╚════════════════════════════════════╝

✓ MongoDB Connected: localhost
```

---

**Choose your option above and come back. Your backend is ready! 🚀**
