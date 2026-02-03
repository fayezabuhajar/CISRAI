# Contributing Guide

## Code Style

- Use TypeScript for type safety
- Follow consistent naming conventions
- Use PascalCase for classes and interfaces
- Use camelCase for variables and functions
- Use UPPER_SNAKE_CASE for constants

## Project Structure

```
src/
├── config/          # Configuration
├── models/          # Database models
├── controllers/     # Request handlers
├── services/        # Business logic
├── routes/          # API routes
├── middleware/      # Custom middleware
├── validators/      # Input validation
├── utils/           # Helper functions
└── types/           # TypeScript interfaces
```

## Adding a New Feature

1. **Create Model** - Define database schema
2. **Create Service** - Business logic
3. **Create Controller** - Request handlers
4. **Create Routes** - API endpoints
5. **Add Validators** - Input validation
6. **Update app.ts** - Register routes
7. **Write Tests** - Unit tests
8. **Update Documentation** - API docs

## Development Workflow

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes
# Edit files...

# 3. Test locally
npm run dev

# 4. Build and check for errors
npm run build

# 5. Commit changes
git add .
git commit -m "Add: description of changes"

# 6. Push to repository
git push origin feature/my-feature

# 7. Create Pull Request
```

## Git Commit Messages

- Use imperative mood ("Add" not "Added")
- Reference issues when applicable
- Keep messages concise but descriptive

Examples:

```
Add: user authentication middleware
Fix: email validation regex
Refactor: database connection pooling
Docs: update API documentation
```

## Code Review Checklist

- [ ] TypeScript compiles without errors
- [ ] Input validation is comprehensive
- [ ] Error handling is proper
- [ ] API responses are consistent
- [ ] Database queries are optimized
- [ ] Security best practices followed
- [ ] Code is well-documented
- [ ] Tests pass

## Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## API Design Principles

1. **RESTful** - Use standard HTTP methods
2. **Consistent** - Uniform response format
3. **Documented** - Clear endpoint descriptions
4. **Versioned** - Consider API versioning
5. **Secure** - Validate and sanitize inputs
6. **Efficient** - Paginate large responses
7. **Predictable** - Consistent error codes

## Documentation

- Update README.md for significant changes
- Add JSDoc comments to complex functions
- Document API endpoints in API_DOCUMENTATION.md
- Include usage examples

Example JSDoc:

```typescript
/**
 * Register a new user
 * @param email - User email address
 * @param password - User password (min 6 chars)
 * @param firstName - User first name
 * @param lastName - User last name
 * @returns User object with JWT token
 * @throws Error if user already exists
 */
export async function register(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<IAuthResponse> {
  // Implementation
}
```

## Performance Considerations

- Use database indexes for frequently queried fields
- Implement pagination for list endpoints
- Cache frequently accessed data
- Optimize queries with .select() and .populate()
- Use compression middleware
- Monitor response times

## Security Practices

- Never commit secrets to repository
- Validate all inputs
- Use parameterized queries
- Hash passwords with bcryptjs
- Implement rate limiting
- Use HTTPS in production
- Keep dependencies updated
- Regular security audits

## Issue Reporting

When reporting issues, include:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version)
- Error messages/logs
- Screenshots if applicable

## Questions or Need Help?

- Check existing documentation
- Review similar implementations
- Ask in team communication channels
- Open a discussion issue

---

Thank you for contributing to CISRAI Backend!
