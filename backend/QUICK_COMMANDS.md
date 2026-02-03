# CISRAI Backend - Quick Commands Reference

## 📍 Location

```powershell
cd C:\Users\User\Desktop\CISRAI\backend
```

## 🎯 Essential Commands

### 1️⃣ FIRST TIME SETUP

```powershell
# Navigate to backend
cd "C:\Users\User\Desktop\CISRAI\backend"

# Install dependencies (already done but if needed)
npm install

# Build TypeScript
npm run build

# Seed database with initial data
npm run seed
```

### 2️⃣ DEVELOPMENT

```powershell
# Start development server (auto-reload)
npm run dev

# In another terminal, check if server is healthy
npm run health-check

# Or test manually
curl http://localhost:5000
```

### 3️⃣ DATABASE

```powershell
# Seed database (creates admin user and sample data)
npm run seed

# Watch seed script for changes
npm run seed:dev
```

### 4️⃣ BUILDING

```powershell
# Build TypeScript to JavaScript
npm run build

# Start production (uses compiled dist/ files)
npm start
```

### 5️⃣ TESTING

```powershell
# Run tests
npm test
```

## 🌍 Frontend Integration

### Update Frontend .env

```env
VITE_API_URL=http://localhost:5000/api
```

### Example API Call (JavaScript/TypeScript)

```typescript
// Login
const response = await fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "admin@cisrai.com",
    password: "admin_password",
  }),
});

const { token } = await response.json();

// Use token in subsequent requests
const registrationResponse = await fetch(
  "http://localhost:5000/api/registration/profile",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
);
```

## 📋 API Endpoints Summary

### Auth (3 endpoints)

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Registration (4 endpoints)

```
POST /api/registration
GET /api/registration/profile
PUT /api/registration/:id
GET /api/registration
```

### Reviewers (7 endpoints)

```
POST /api/reviewers
GET /api/reviewers/:id
GET /api/reviewers
PUT /api/reviewers/:id
DELETE /api/reviewers/:id
POST /api/reviewers/:id/papers
GET /api/reviewers/:id/papers
```

### Speakers (6 endpoints)

```
POST /api/speakers
GET /api/speakers/:id
GET /api/speakers
PUT /api/speakers/:id
DELETE /api/speakers/:id
```

### Papers (6 endpoints)

```
POST /api/papers
GET /api/papers/:id
GET /api/papers
PUT /api/papers/:id
DELETE /api/papers/:id
POST /api/papers/:id/review
```

### Schedule (5 endpoints)

```
POST /api/schedule
GET /api/schedule/:id
GET /api/schedule
PUT /api/schedule/:id
DELETE /api/schedule/:id
```

### Committees (5 endpoints)

```
POST /api/committees
GET /api/committees/:id
GET /api/committees
PUT /api/committees/:id
DELETE /api/committees/:id
```

### Messages (5 endpoints)

```
POST /api/messages
GET /api/messages/:id
GET /api/messages
PUT /api/messages/:id
DELETE /api/messages/:id
```

### Announcements (6 endpoints)

```
POST /api/announcements
GET /api/announcements/:id
GET /api/announcements
PUT /api/announcements/:id
DELETE /api/announcements/:id
```

### Dashboard (4 endpoints)

```
GET /api/dashboard/stats
GET /api/dashboard/recent-activities
GET /api/dashboard/participants-stats
GET /api/dashboard/paper-stats
```

## 🔐 Test Credentials

### Admin User (After seeding)

```
Email: admin@cisrai.com
Password: admin_password
Role: admin
```

## ⚙️ Configuration (.env)

### Database

```env
MONGODB_URI=mongodb://localhost:27017/cisrai
```

### Server

```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### JWT

```env
JWT_SECRET=your-secret-key
JWT_ADMIN_SECRET=your-admin-secret-key
JWT_EXPIRE_IN=7d
JWT_ADMIN_EXPIRE_IN=24h
```

## 📊 Technology Stack

| Technology | Version | Purpose          |
| ---------- | ------- | ---------------- |
| Node.js    | 18+     | Runtime          |
| Express    | 4.18.2  | Web Framework    |
| MongoDB    | 5.0+    | Database         |
| Mongoose   | 7.5.0   | ODM              |
| TypeScript | 5.3.3   | Type System      |
| JWT        | 9.0.2   | Auth Tokens      |
| bcryptjs   | 2.4.3   | Password Hashing |
| nodemon    | 3.0.2   | Dev Auto-reload  |

## 🚨 Common Issues & Solutions

### Issue: Cannot connect to MongoDB

```powershell
# Make sure MongoDB is running
# Windows: MongoDB service should be running
# Check with MongoDB Compass

# Or start MongoDB directly:
mongod

# If using Atlas, verify connection string in .env
```

### Issue: Port 5000 already in use

```powershell
# Change port in .env
PORT=3001

# Or kill existing process
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

### Issue: Module not found errors

```powershell
# Clean reinstall
rm -r node_modules
rm package-lock.json
npm install
npm run build
```

### Issue: CORS errors in frontend

```
# Update .env
CORS_ORIGIN=http://localhost:5173

# Or match your frontend URL exactly
```

## 📁 Important Files

```
backend/
├── .env                    # ⭐ Configuration (edit this!)
├── src/
│   ├── models/            # Database schemas
│   ├── services/          # Business logic
│   ├── controllers/       # Request handlers
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth, validation, errors
│   └── utils/             # Helpers
├── dist/                  # Compiled code (auto-generated)
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
└── README*.md             # Documentation
```

## ✅ Verification Steps

1. **Start MongoDB**: Ensure MongoDB is running
2. **Start Backend**: `npm run dev`
3. **Seed Database**: `npm run seed`
4. **Test Login**:
   ```powershell
   curl -X POST http://localhost:5000/api/auth/login `
     -H "Content-Type: application/json" `
     -d '{"email":"admin@cisrai.com","password":"admin_password"}'
   ```
5. **Connect Frontend**: Update VITE_API_URL

## 🎯 Success Indicators

✅ Server starts without errors
✅ MongoDB connects successfully
✅ Seeding completes without errors
✅ Admin user can log in
✅ JWT tokens are issued
✅ Frontend can connect to API
✅ All CRUD operations work

## 🔗 Useful Resources

- **Express Docs**: https://expressjs.com
- **MongoDB Docs**: https://docs.mongodb.com
- **TypeScript Docs**: https://www.typescriptlang.org/docs
- **JWT Docs**: https://jwt.io
- **Mongoose Docs**: https://mongoosejs.com

## 📞 Need Help?

1. Check error messages in terminal
2. Review `.env` configuration
3. Check MongoDB is running
4. Review logs in `dist/` folder
5. Check documentation files (README\*.md)

---

**Status**: ✅ Ready to Use  
**Last Updated**: 2024  
**Environment**: Development  
**Backend Location**: C:\Users\User\Desktop\CISRAI\backend
