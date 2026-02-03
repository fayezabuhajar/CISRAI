# Deployment Guide

## Development Setup

### 1. Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure .env with local values
# Edit .env to set MONGODB_URI to your local MongoDB

# Start development server
npm run dev

# Server will run on http://localhost:5000
```

### 2. Database Setup

#### Local MongoDB

```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or install MongoDB locally
# https://docs.mongodb.com/manual/installation/
```

#### MongoDB Atlas (Cloud)

```
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Copy connection string
4. Add to .env as MONGODB_URI
```

## Production Deployment

### 1. Environment Configuration

```bash
# Production .env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_jwt_secret
JWT_ADMIN_SECRET=your_strong_admin_jwt_secret
CORS_ORIGIN=https://yourdomain.com
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

### 2. Build for Production

```bash
# Build TypeScript
npm run build

# Output goes to dist/ folder
```

### 3. Deployment Options

#### Option A: Using Node.js Hosting (Heroku, Render, Railway)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

#### Option B: Using Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 5000

CMD ["node", "dist/server.js"]
```

```bash
# Build image
docker build -t cisrai-backend .

# Run container
docker run -p 5000:5000 \
  -e MONGODB_URI=your_uri \
  -e JWT_SECRET=your_secret \
  cisrai-backend
```

#### Option C: Traditional VPS (AWS EC2, DigitalOcean, Linode)

```bash
# SSH into server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone your-repo.git
cd backend

# Install dependencies
npm install

# Build
npm run build

# Install PM2 for process management
npm install -g pm2

# Start with PM2
pm2 start dist/server.js --name "cisrai-backend"
pm2 save
pm2 startup

# Setup Nginx reverse proxy
sudo apt install nginx
# Configure /etc/nginx/sites-available/default
sudo systemctl restart nginx
```

#### Option D: Kubernetes

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cisrai-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: cisrai-backend
  template:
    metadata:
      labels:
        app: cisrai-backend
    spec:
      containers:
        - name: cisrai-backend
          image: cisrai-backend:latest
          ports:
            - containerPort: 5000
          env:
            - name: NODE_ENV
              value: "production"
            - name: MONGODB_URI
              valueFrom:
                secretKeyRef:
                  name: cisrai-secrets
                  key: mongodb-uri
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"
```

## Pre-deployment Checklist

- [ ] Environment variables configured
- [ ] Database backup configured
- [ ] SSL/TLS certificate obtained
- [ ] Monitoring and logging setup
- [ ] Rate limiting configured
- [ ] CORS origins set correctly
- [ ] Email service verified
- [ ] Database indexes created
- [ ] Security headers enabled
- [ ] Error handling tested

## Post-deployment Tasks

```bash
# 1. Seed initial data
npm run seed

# 2. Verify health endpoint
curl https://yourdomain.com/health

# 3. Test authentication
curl -X POST https://yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cisrai.com","password":"..."}'

# 4. Monitor logs
pm2 logs cisrai-backend
```

## SSL/TLS Setup with Let's Encrypt

```bash
# Using Certbot with Nginx
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com
sudo systemctl restart nginx
```

## CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy Backend

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        run: |
          # Your deployment script here
```

## Monitoring & Maintenance

### Logs

```bash
# Check logs
pm2 logs cisrai-backend

# Clear logs
pm2 flush
```

### Database Maintenance

```bash
# Create backup
mongodump --uri "mongodb://..." --out ./backup

# Restore from backup
mongorestore ./backup
```

### Performance Monitoring

- Use MongoDB Atlas monitoring
- Set up application monitoring (New Relic, Datadog)
- Monitor server resources (CPU, Memory, Disk)

## Scaling

1. **Horizontal Scaling**: Run multiple instances behind a load balancer
2. **Database Optimization**: Add indexes, optimize queries
3. **Caching**: Implement Redis for frequently accessed data
4. **CDN**: Use CDN for static assets
5. **Microservices**: Split into separate services if needed

## Security Hardening

1. Keep dependencies updated
2. Use strong secret keys
3. Enable HTTPS only
4. Implement rate limiting
5. Regular security audits
6. Keep server OS updated
7. Use environment variables for secrets
8. Enable CORS restrictions

## Rollback Plan

```bash
# Keep previous versions
git tag v1.0.0
git tag v1.0.1

# Switch to previous version
git checkout v1.0.0
npm run build
pm2 restart cisrai-backend
```

---

For more information, see the [README.md](./README.md)
