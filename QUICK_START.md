# 🚀 Quick Start Guide - Frontend-Backend Integration

## Prerequisites

- Node.js 18+ installed
- MongoDB running locally or Atlas account
- Backend and Frontend repositories

## Step 1: Start MongoDB

### Option A: Local MongoDB

```bash
# If installed locally
mongod

# Verify it's running (should show port 27017)
```

### Option B: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update backend `.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/cisrai
   ```

## Step 2: Start Backend Server

```bash
cd backend

# Install dependencies (if not done)
npm install

# Run development server
npm start

# Should output: Server running on http://localhost:5000
# Should output: Connected to MongoDB
```

## Step 3: Start Frontend Development Server

```bash
cd frontend

# Install dependencies (if not done)
npm install

# Run development server
npm run dev

# Usually runs on http://localhost:5173 (or next available port)
```

## Step 4: Test the Integration

### 4.1 Admin Login

1. Navigate to `/admin/login`
2. Create an admin account or use test credentials
3. Should redirect to `/admin/dashboard` after login

### 4.2 User Registration

1. Go to `/registration`
2. Select a registration plan
3. Fill out the form
4. Click "Confirm Registration"
5. Should see success message

### 4.3 Contact Form

1. Go to `/contact`
2. Fill out message form
3. Click "Send Message"
4. Should see success message

### 4.4 Reviewer Application

1. Go to `/reviewer`
2. Click "Submit Expert Application"
3. Fill out the form
4. Click "Submit"
5. Should see success message

## Step 5: Verify in Browser DevTools

### Check Network Tab

- All requests should go to `http://localhost:5000/api/*`
- Successful responses have status 200
- Check response data for information

### Check Application Tab

- `Token`: JWT token stored in localStorage
- `User`: User object with profile info
- These persist across page reloads

### Check Console

- No errors should appear
- Check for any warning messages about CORS

## Common Issues & Solutions

### Issue: CORS Error

**Solution:**

- Verify backend is running
- Check CORS is enabled in backend (`cors()` in app.js)
- Ensure frontend uses correct API URL

### Issue: "Cannot find module" errors

**Solution:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: MongoDB connection failed

**Solution:**

- Verify MongoDB is running: `mongod`
- Check connection string in backend `.env`
- If using Atlas, add your IP to whitelist

### Issue: Blank admin dashboard

**Solution:**

- Make sure you're logged in (check localStorage)
- Verify token is being sent in requests
- Check backend logs for authentication errors

### Issue: Form submissions not working

**Solution:**

- Check Network tab for API calls
- Look at response body for error message
- Verify backend route exists
- Check that required fields are filled

## Environment Variables

### Frontend (.env.local)

```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/cisrai
JWT_SECRET=your_super_secret_key_change_in_production
NODE_ENV=development
```

## Useful Commands

### Frontend

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Backend

```bash
# Start development
npm start

# Start with nodemon (auto-restart)
npm run dev

# Build TypeScript
npm run build

# Run tests (if configured)
npm test
```

## Database Schema Overview

The backend creates these collections:

- `participants` - Registration information
- `speakers` - Speaker profiles
- `reviewers` - Reviewer applications and assignments
- `papers` - Submitted research papers
- `reviews` - Paper reviews
- `schedules` - Event schedule
- `committees` - Committee information
- `messages` - Contact messages
- `announcements` - Announcements
- `admins` - Administrator accounts

## Testing Different User Roles

### Admin User (Full Access)

- Login at `/admin/login`
- Access `/admin/dashboard`
- Can manage all data

### Reviewer Role (Under Development)

- View assigned papers
- Submit reviews
- Manage profile

### Speaker Role (Under Development)

- View submitted papers
- Update paper information
- View schedule

### Participant Role (Under Development)

- View conference information
- Access schedule
- Download materials

## Database Testing

### View MongoDB Data

```bash
# Connect to MongoDB
mongosh

# Select database
use cisrai

# View collections
show collections

# View data
db.participants.find()
db.messages.find()
db.reviewers.find()
# ... etc
```

## Debugging Tips

### 1. Check Network Requests

- Open DevTools (F12)
- Go to Network tab
- Perform an action
- Click on the request to see details
- Check Status (should be 200 for success)
- Check Response for data

### 2. Check Console for Errors

- Open DevTools Console
- Look for red error messages
- Click on error for stack trace
- Check if it's CORS, API, or validation error

### 3. Check Local Storage

- Open DevTools → Application
- Go to Local Storage
- Select your site
- Look for `TOKEN_KEY` and `USER_KEY`
- These should have values after login

### 4. Check Backend Logs

- Look at terminal where `npm start` is running
- Should show request logs
- Check for error messages

## Next Integration Tasks

### High Priority

1. **Call For Papers Page** (CallForPapers.tsx)
   - Add `paperAPI.submit()` integration
   - Handle PDF upload
   - Track submission status

2. **Dashboard Pages** (AdminDashboard.tsx)
   - Display statistics from `dashboardAPI.getStats()`
   - Show recent activities
   - Admin management panels

### Medium Priority

3. **Data Display Pages**
   - Schedule page - fetch from `scheduleAPI`
   - Committees page - fetch from `committeeAPI`
   - Speakers page - fetch from `speakerAPI`

### Low Priority

4. **Polish & Features**
   - Add toast notifications
   - Implement pagination
   - Add search/filter
   - Real-time updates

## Production Deployment

### Build Frontend

```bash
cd frontend
npm run build
# Creates dist/ folder
```

### Build Backend

```bash
cd backend
npm run build
# Creates dist/ folder with compiled TypeScript
```

### Deploy

- Frontend: Deploy `dist/` to Vercel, Netlify, or your host
- Backend: Deploy to Heroku, Railway, or your server
- Update `VITE_API_URL` to production API URL
- Ensure database is accessible from production

## Support & Resources

- Frontend API Service: `frontend/src/services/api.ts`
- Authentication Context: `frontend/src/contexts/AuthContext.tsx`
- Backend Routes: `backend/src/routes/`
- Backend Controllers: `backend/src/controllers/`
- API Documentation: `BACKEND_API_ENDPOINTS.md`

---

**Status:** Frontend-Backend integration in progress ✅

**Last Updated:** 2024

**Maintainer:** CISRAI Development Team
