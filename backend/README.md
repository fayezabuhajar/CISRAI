# ✅ CISRAI Conference Backend - READY!

## 🎉 STATUS: Backend is WORKING! Only MongoDB needed (5 min)

```
✅ Server: http://localhost:5000 (RUNNING)
✅ API: 30+ endpoints ready
✅ Security: Implemented
❌ MongoDB: Not started yet
```

### 🚀 QUICK START (Choose One - 5 Minutes)

**Option 1: MongoDB Atlas (Cloud - Easiest)**

```powershell
# 1. Go to: https://www.mongodb.com/cloud/atlas
# 2. Create free account and cluster
# 3. Copy connection string
# 4. Update .env with: MONGODB_URI=...
# 5. Done!
npm run dev
```

**Option 2: Local MongoDB**

```powershell
# Download & install, then start:
net start MongoDB
# Or use MongoDB Compass app
npm run dev
```

### 📖 Full Guides

1. **NEXT_STEPS.md** ← Start here
2. **GET_MONGODB_RUNNING.md** ← Detailed MongoDB setup
3. **QUICK_COMMANDS.md** ← All commands

### 🧪 Test MongoDB Connection

```powershell
npm run test:mongodb
```

---

# CISRAI Conference Backend

Professional, scalable backend for CISRAI Conference 2026.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB 5.0+ (Atlas or Local)
- npm or yarn

### Installation

```bash
# Clone and navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# Important: Set MONGODB_URI, JWT secrets, and email settings
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Server runs on http://localhost:5000
```

### Production Build

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── config/              # Configuration (Database, Environment)
├── models/              # Mongoose schemas
├── controllers/         # Request handlers
├── services/            # Business logic
├── routes/              # API routes
├── middleware/          # Express middleware
├── validators/          # Input validation
├── utils/               # Helper functions
└── types/               # TypeScript types
```

## 🔐 Key Features

### Authentication & Authorization

- JWT-based authentication
- Role-based access control (Admin, User, Reviewer, etc.)
- Password hashing with bcryptjs
- Secure token generation and verification

### Core Modules

#### 1. **User Management**

- Registration & login
- Profile management
- Role assignment

#### 2. **Registration Management**

- Participant registration
- Multiple registration plans (On-site, Online, Attendance)
- Payment tracking
- Registration statistics

#### 3. **Reviewer Management**

- Reviewer applications
- Application review workflow
- Reviewer approval/rejection
- Paper assignments

#### 4. **Paper Submission**

- Paper submission workflow
- Review status tracking
- Accept/reject functionality
- Abstract and keywords management

#### 5. **Speaker Management**

- Keynote speaker information
- Speaker confirmation
- Presentation details
- Social links management

#### 6. **Schedule Management**

- Conference event scheduling
- Event types (keynote, session, break, etc.)
- Status tracking (scheduled, ongoing, completed)

#### 7. **Committee Management**

- Committee creation and management
- Member assignments
- Committee roles

#### 8. **Message Management**

- Contact form submissions
- Admin replies
- Message status tracking (unread, read, replied)

#### 9. **Announcements**

- Create and publish announcements
- Target audience selection
- Priority levels

#### 10. **Dashboard Analytics**

- Overview statistics
- Payment analytics
- Paper submission stats
- Country distribution
- Recent activity feed

## 🔌 API Endpoints

### Authentication

```
POST   /api/auth/register                    # Register new user
POST   /api/auth/login                       # User login
GET    /api/auth/profile                     # Get user profile (authenticated)
```

### Registration

```
POST   /api/registration/register            # Register as participant
GET    /api/registration/profile             # Get participant profile
PUT    /api/registration/:id                 # Update participant
GET    /api/registration                     # List all participants
GET    /api/registration/stats               # Get statistics
```

### Reviewers

```
POST   /api/reviewers                        # Submit reviewer application
GET    /api/reviewers                        # List reviewers
GET    /api/reviewers/:id                    # Get reviewer details
PUT    /api/reviewers/:id                    # Update reviewer
POST   /api/reviewers/:id/approve            # Approve reviewer (admin)
POST   /api/reviewers/:id/reject             # Reject reviewer (admin)
DELETE /api/reviewers/:id                    # Delete reviewer (admin)
```

### Papers

```
POST   /api/papers                           # Submit paper
GET    /api/papers                           # List papers
GET    /api/papers/:id                       # Get paper details
POST   /api/papers/:id/accept                # Accept paper (admin)
POST   /api/papers/:id/reject                # Reject paper (admin)
DELETE /api/papers/:id                       # Delete paper (admin)
```

### Speakers

```
POST   /api/speakers                         # Create speaker (admin)
GET    /api/speakers                         # List speakers
GET    /api/speakers/:id                     # Get speaker details
PUT    /api/speakers/:id                     # Update speaker (admin)
POST   /api/speakers/:id/confirm             # Confirm speaker
DELETE /api/speakers/:id                     # Delete speaker (admin)
```

### Schedule

```
POST   /api/schedule                         # Create event (admin)
GET    /api/schedule                         # List events
GET    /api/schedule/:id                     # Get event details
PUT    /api/schedule/:id                     # Update event (admin)
DELETE /api/schedule/:id                     # Delete event (admin)
```

### Committees

```
POST   /api/committees                       # Create committee (admin)
GET    /api/committees                       # List committees
GET    /api/committees/:id                   # Get committee details
PUT    /api/committees/:id                   # Update committee (admin)
DELETE /api/committees/:id                   # Delete committee (admin)
```

### Messages

```
POST   /api/messages                         # Submit message
GET    /api/messages                         # List messages (admin)
GET    /api/messages/:id                     # Get message (admin)
POST   /api/messages/:id/reply               # Reply to message (admin)
DELETE /api/messages/:id                     # Delete message (admin)
```

### Announcements

```
POST   /api/announcements                    # Create announcement (admin)
GET    /api/announcements                    # List announcements
GET    /api/announcements/latest             # Get latest announcements
GET    /api/announcements/:id                # Get announcement details
PUT    /api/announcements/:id                # Update announcement (admin)
DELETE /api/announcements/:id                # Delete announcement (admin)
```

### Dashboard

```
GET    /api/dashboard/stats/overview         # Overview statistics
GET    /api/dashboard/stats/payment          # Payment statistics
GET    /api/dashboard/stats/papers           # Paper statistics
GET    /api/dashboard/stats/reviewers        # Reviewer statistics
GET    /api/dashboard/activity/recent        # Recent activity
GET    /api/dashboard/analytics/countries    # Countries distribution
```

## 📋 Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "code": 200
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message",
  "code": 400
}
```

## 🔒 Security Features

- ✅ Helmet - Security headers
- ✅ CORS - Cross-origin protection
- ✅ Rate Limiting - API endpoint protection
- ✅ Input Validation - XSS and injection prevention
- ✅ Password Hashing - bcryptjs encryption
- ✅ JWT Tokens - Secure authentication
- ✅ Role-Based Access Control - Authorization

## 🛠 Technologies

- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **TypeScript** - Type safety
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **Express Validator** - Input validation
- **Morgan** - HTTP logging
- **Helmet** - Security headers
- **CORS** - Cross-origin requests
- **Compression** - Response compression
- **Rate Limit** - DDoS protection

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 📊 Database Schema

### Collections

- **users** - User accounts
- **participants** - Conference participants
- **reviewers** - Paper reviewers
- **speakers** - Keynote speakers
- **papers** - Research papers
- **messages** - Contact messages
- **schedules** - Conference events
- **committees** - Committee information
- **announcements** - Conference announcements
- **admins** - Admin users

## 🌍 Environment Variables

Required environment variables:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/cisrai

# JWT
JWT_SECRET=your_secret_key
JWT_ADMIN_SECRET=your_admin_secret_key
JWT_EXPIRE_IN=7d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-password
EMAIL_FROM=noreply@cisrai.com

# CORS
CORS_ORIGIN=http://localhost:5173
```

## 📈 Performance Considerations

- Database indexing on frequently queried fields
- Pagination support for list endpoints
- Response compression
- Connection pooling
- Async/await for non-blocking operations

## 🚨 Error Handling

- Centralized error middleware
- Validation error responses
- HTTP status codes
- Detailed error logging
- Development stack traces

## 🔄 Logging

Morgan middleware logs:

- HTTP method
- URL path
- Response status
- Response time
- Request size

## 📚 Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API documentation.

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Follow TypeScript conventions
4. Test your changes
5. Submit a pull request

## 📝 License

All rights reserved - CISRAI Conference 2026

## 📞 Support

For issues or questions, please contact the development team.

---

**Version:** 1.0.0  
**Last Updated:** February 2026
