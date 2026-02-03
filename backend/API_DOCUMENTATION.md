# CISRAI Backend API Documentation

## Overview

Complete professional backend for CISRAI Conference 2026 with authentication, registration, paper submission, and admin management.

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── models/          # Database models
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   ├── validators/      # Input validation
│   ├── utils/           # Helper functions
│   ├── types/           # TypeScript types
│   └── app.ts           # Express app
├── server.ts            # Server entry point
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── .env.example         # Environment variables
```

## Installation

```bash
cd backend
npm install
```

## Environment Setup

```bash
cp .env.example .env
# Edit .env with your configuration
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (authenticated)

### Registration

- `POST /api/registration/register` - Register as participant
- `GET /api/registration/profile` - Get participant profile
- `PUT /api/registration/:id` - Update participant info
- `GET /api/registration` - Get all participants (admin)
- `GET /api/registration/stats` - Get registration statistics

### Reviewers

- `POST /api/reviewers` - Submit reviewer application
- `GET /api/reviewers` - Get all reviewers
- `GET /api/reviewers/:id` - Get reviewer details
- `PUT /api/reviewers/:id` - Update reviewer
- `POST /api/reviewers/:id/approve` - Approve reviewer (admin)
- `POST /api/reviewers/:id/reject` - Reject reviewer (admin)
- `DELETE /api/reviewers/:id` - Delete reviewer (admin)

### Speakers

- `POST /api/speakers` - Create speaker (admin)
- `GET /api/speakers` - Get all speakers
- `GET /api/speakers/:id` - Get speaker details
- `PUT /api/speakers/:id` - Update speaker (admin)
- `POST /api/speakers/:id/confirm` - Confirm speaker
- `DELETE /api/speakers/:id` - Delete speaker (admin)

### Papers

- `POST /api/papers` - Submit paper
- `GET /api/papers` - Get all papers
- `GET /api/papers?status=submitted` - Filter by status
- `GET /api/papers/:id` - Get paper details
- `POST /api/papers/:id/accept` - Accept paper (admin)
- `POST /api/papers/:id/reject` - Reject paper (admin)
- `DELETE /api/papers/:id` - Delete paper (admin)

### Messages

- `POST /api/messages` - Submit contact message
- `GET /api/messages` - Get all messages (admin)
- `GET /api/messages/:id` - Get message (admin)
- `POST /api/messages/:id/reply` - Reply to message (admin)
- `DELETE /api/messages/:id` - Delete message (admin)

### Schedule

- `POST /api/schedule` - Create event (admin)
- `GET /api/schedule` - Get all events
- `GET /api/schedule/:id` - Get event details
- `PUT /api/schedule/:id` - Update event (admin)
- `DELETE /api/schedule/:id` - Delete event (admin)

### Committees

- `POST /api/committees` - Create committee (admin)
- `GET /api/committees` - Get all committees
- `GET /api/committees/:id` - Get committee details
- `PUT /api/committees/:id` - Update committee (admin)
- `DELETE /api/committees/:id` - Delete committee (admin)

## Technologies Used

- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **TypeScript** - Type safety
- **Express Validator** - Input validation
- **Nodemailer** - Email service
- **Morgan** - Logging
- **Helmet** - Security headers
- **CORS** - Cross-origin requests
- **Rate Limiting** - API protection

## Features

✅ User authentication with JWT
✅ Role-based access control
✅ Participant registration management
✅ Paper submission and review workflow
✅ Reviewer management and approval
✅ Speaker management
✅ Conference schedule management
✅ Committee management
✅ Contact message handling
✅ Email notifications
✅ Input validation
✅ Error handling
✅ Pagination support
✅ Security headers
✅ Rate limiting
✅ CORS support

## Security

- Password hashing with bcryptjs
- JWT token-based authentication
- Role-based access control (RBAC)
- Input validation using express-validator
- Security headers with Helmet
- CORS protection
- Rate limiting on API endpoints

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message",
  "code": 400
}
```

## Success Response Format

```json
{
  "success": true,
  "message": "Success message",
  "data": {},
  "code": 200
}
```

## Database Models

- **User** - Authentication & profile
- **Participant** - Registration information
- **Reviewer** - Reviewer applications
- **Speaker** - Keynote speakers
- **Paper** - Research papers
- **Message** - Contact messages
- **Schedule** - Conference events
- **Committee** - Committee information
- **Admin** - Admin users

## Future Enhancements

- File upload service (papers, CVs, photos)
- Payment gateway integration
- Advanced analytics dashboard
- Email templates and scheduling
- Document generation (certificates, ID cards)
- Notification system
- API documentation (Swagger/OpenAPI)
- Unit and integration tests
