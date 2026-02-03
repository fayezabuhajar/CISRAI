# CISRAI Backend - Setup & Running Guide

## Prerequisites

- Node.js 18+
- MongoDB 5.0+ (local or Atlas)
- npm or yarn

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Update these important variables:

```env
MONGODB_URI=mongodb://localhost:27017/cisrai
JWT_SECRET=your-secret-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### 3. Build TypeScript

```bash
npm run build
```

### 4. Seed Database (Optional)

```bash
npm run seed
```

This creates:

- Default admin user (admin@cisrai.com / admin_password)
- Sample announcements
- Database indexes

### 5. Start Development Server

```bash
npm run dev
```

The server will start at `http://localhost:5000`

## MongoDB Setup

### Option 1: Local MongoDB

```bash
# macOS with Homebrew
brew install mongodb-community
brew services start mongodb-community

# Windows (download from mongodb.com)
# Linux
sudo systemctl start mongod
```

### Option 2: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string from "Connect" button
4. Update `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cisrai?retryWrites=true&w=majority
   ```

## Available Commands

```bash
# Development (with auto-reload)
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Seed database
npm run seed

# Watch seed file changes
npm run seed:dev

# Run tests
npm run test
```

## API Documentation

Base URL: `http://localhost:5000/api`

### Authentication Routes

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `POST /auth/refresh-token` - Refresh JWT

### Registration Routes

- `POST /registration` - Register as participant
- `GET /registration/profile` - Get participant profile
- `PUT /registration/:id` - Update participant
- `GET /registration` - Get all participants (admin)

### Reviewer Routes

- `POST /reviewers` - Apply as reviewer
- `GET /reviewers/:id` - Get reviewer details
- `GET /reviewers` - Get all reviewers
- `PUT /reviewers/:id` - Update reviewer (admin)
- `DELETE /reviewers/:id` - Delete reviewer (admin)
- `POST /reviewers/:id/papers` - Assign papers (admin)
- `GET /reviewers/:id/papers` - Get assigned papers

### Speaker Routes

- `POST /speakers` - Register as speaker
- `GET /speakers/:id` - Get speaker details
- `GET /speakers` - Get all speakers
- `PUT /speakers/:id` - Update speaker (admin)
- `DELETE /speakers/:id` - Delete speaker (admin)

### Paper Routes

- `POST /papers` - Submit paper
- `GET /papers/:id` - Get paper details
- `GET /papers` - Get all papers
- `PUT /papers/:id` - Update paper
- `DELETE /papers/:id` - Delete paper
- `POST /papers/:id/review` - Submit review

### Schedule Routes

- `POST /schedule` - Create schedule (admin)
- `GET /schedule/:id` - Get schedule details
- `GET /schedule` - Get all schedules
- `PUT /schedule/:id` - Update schedule (admin)
- `DELETE /schedule/:id` - Delete schedule (admin)

### Committee Routes

- `POST /committees` - Create committee (admin)
- `GET /committees/:id` - Get committee details
- `GET /committees` - Get all committees
- `PUT /committees/:id` - Update committee (admin)
- `DELETE /committees/:id` - Delete committee (admin)

### Message Routes

- `POST /messages` - Send message
- `GET /messages/:id` - Get message details
- `GET /messages` - Get all messages (admin)
- `PUT /messages/:id` - Update message (admin)
- `DELETE /messages/:id` - Delete message (admin)

### Announcement Routes

- `POST /announcements` - Create announcement (admin)
- `GET /announcements/:id` - Get announcement details
- `GET /announcements` - Get all announcements
- `PUT /announcements/:id` - Update announcement (admin)
- `DELETE /announcements/:id` - Delete announcement (admin)

### Dashboard Routes

- `GET /dashboard/stats` - Get dashboard statistics (admin)
- `GET /dashboard/recent-activities` - Get recent activities (admin)
- `GET /dashboard/participants-stats` - Get participant stats (admin)
- `GET /dashboard/paper-stats` - Get paper stats (admin)

## Security Features

✓ JWT Token Authentication
✓ Role-Based Access Control (RBAC)
✓ Password Hashing with bcryptjs
✓ CORS Protection
✓ Rate Limiting (100 requests/15 min)
✓ Helmet Security Headers
✓ Input Validation & Sanitization
✓ MongoDB Injection Protection

## Frontend Integration

Update your frontend API configuration:

```typescript
// frontend/.env
VITE_API_URL=http://localhost:5000/api
```

Example API call:

```typescript
const response = await fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
```

## Troubleshooting

### "MongoDB Connection Error"

- Check MongoDB is running: `mongosh`
- Check connection string in `.env`
- Check firewall/network settings

### "Cannot find module" errors

- Delete `node_modules` and `dist` folders
- Run `npm install` again
- Run `npm run build`

### Port already in use

- Change `PORT` in `.env`
- Or kill process: `lsof -ti:5000 | xargs kill -9`

### Email not sending

- Enable "Less secure app" or App Passwords in Gmail
- Check EMAIL_USER and EMAIL_PASSWORD in `.env`
- Test with mock email in development

## Project Structure

```
backend/
├── src/
│   ├── config/          # Database & environment config
│   ├── models/          # MongoDB schemas (10 models)
│   ├── services/        # Business logic (8 services)
│   ├── controllers/     # Request handlers (8 controllers)
│   ├── routes/          # API endpoints (10 route files)
│   ├── middleware/      # Auth, validation, error handling
│   ├── validators/      # Input validation rules
│   ├── utils/           # JWT, email, response formatting
│   ├── types/           # TypeScript interfaces
│   └── app.ts           # Express app setup
├── server.ts            # Server entry point
├── seed.ts              # Database seeding
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── .env                 # Environment variables
```

## Database Models

1. **User** - Authentication & profile
2. **Participant** - Conference registration
3. **Reviewer** - Paper review management
4. **Speaker** - Speaker information
5. **Paper** - Paper submissions
6. **Message** - Contact & support
7. **Schedule** - Event schedule
8. **Committee** - Committee members
9. **Announcement** - News & updates
10. **Admin** - Admin users

## Technologies Used

- **Framework**: Express.js 4.18.2
- **Database**: MongoDB 7.5.0 (Mongoose ODM)
- **Language**: TypeScript 5.3.3
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Security**: bcryptjs, Helmet, CORS, Rate Limiting
- **Validation**: express-validator
- **Email**: Nodemailer
- **Image Processing**: Sharp
- **Development**: nodemon, ts-node
- **Testing**: Jest

## Support

For issues or questions, check the API documentation or create an issue in the repository.
