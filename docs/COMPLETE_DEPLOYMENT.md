# Complete Deployment Guide

## 🚀 Production Deployment - Node.js + MongoDB Backend

This guide covers deploying your complete backend to production servers.

## Prerequisites

- **Node.js** 18+ installed
- **MongoDB** database (MongoDB Atlas recommended)
- **PM2** for process management (production)
- **Nginx** for reverse proxy (optional but recommended)
- **SSL Certificate** (Let's Encrypt recommended)
- **Git** for version control

---

## Environment Setup

### 1. Clone Repository

```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2. Install Dependencies

```bash
npm install --production
```

### 3. Configure Environment Variables

Create `.env` file:

```env
# Server Configuration
NODE_ENV=production
PORT=5000
HOST=0.0.0.0

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT Secret (use strong random string)
JWT_SECRET=your_super_secure_jwt_secret_key_here_min_32_chars

# API Configuration
API_URL=https://api.yourdomain.com

# Logging
LOG_LEVEL=info

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Origins (comma-separated)
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

---

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create Cluster**: Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Network Access**: Whitelist your server IP or use `0.0.0.0/0` (not recommended for production)
3. **Database User**: Create user with read/write permissions
4. **Connection String**: Copy connection string to `MONGO_URI`

### Seed Database

```bash
npm run seed
```

This creates:
- Default permissions
- Default departments
- Admin user (admin@company.com / Admin@123456)

⚠️ **IMPORTANT**: Change admin password immediately!

---

## Build Application

```bash
npm run build
```

This compiles TypeScript to JavaScript in `dist/` directory.

---

## Deployment Options

### Option 1: PM2 (Recommended for Node.js)

#### Install PM2 Globally

```bash
npm install -g pm2
```

#### Start Application

```bash
# Start with ecosystem config
npm run pm2:start

# Or manually
pm2 start ecosystem.config.js --env production
```

#### PM2 Commands

```bash
# View logs
pm2 logs backend-api

# Monitor
pm2 monit

# Restart
pm2 restart backend-api

# Stop
pm2 stop backend-api

# Delete
pm2 delete backend-api

# Save PM2 process list
pm2 save

# Auto-start on server reboot
pm2 startup
```

#### PM2 Cluster Mode

The `ecosystem.config.js` is configured for cluster mode:
- Uses all CPU cores
- Auto-restart on crashes
- 1GB memory limit per instance

---

### Option 2: Docker Deployment

#### Build Docker Image

```bash
npm run docker:build

# Or manually
docker build -t backend-api:latest .
```

#### Run with Docker Compose

```bash
npm run docker:run

# Or manually
docker-compose up -d
```

#### Docker Commands

```bash
# View logs
docker-compose logs -f backend

# Stop
npm run docker:stop

# Restart
docker-compose restart

# Remove containers
docker-compose down
```

---

### Option 3: Systemd Service (Linux)

Create service file `/etc/systemd/system/backend-api.service`:

```ini
[Unit]
Description=Backend API Node.js Application
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/backend-api
Environment=NODE_ENV=production
ExecStart=/usr/bin/node /var/www/backend-api/dist/server/index.js
Restart=on-failure
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=backend-api

[Install]
WantedBy=multi-user.target
```

**Enable and start:**

```bash
sudo systemctl enable backend-api
sudo systemctl start backend-api
sudo systemctl status backend-api
```

---

## Nginx Reverse Proxy

### Install Nginx

```bash
sudo apt update
sudo apt install nginx
```

### Configure Nginx

Create `/etc/nginx/sites-available/backend-api`:

```nginx
upstream backend_api {
    server 127.0.0.1:5000;
}

server {
    listen 80;
    server_name api.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Logging
    access_log /var/log/nginx/backend-api.access.log;
    error_log /var/log/nginx/backend-api.error.log;

    # Proxy Settings
    location / {
        proxy_pass http://backend_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health Check
    location /health {
        access_log off;
        proxy_pass http://backend_api;
    }

    # Static Files (if any)
    location /uploads {
        alias /var/www/backend-api/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Security
    location ~ /\. {
        deny all;
    }
}
```

**Enable site:**

```bash
sudo ln -s /etc/nginx/sites-available/backend-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## SSL Certificate (Let's Encrypt)

### Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx
```

### Obtain Certificate

```bash
sudo certbot --nginx -d api.yourdomain.com
```

### Auto-Renewal

Certbot adds auto-renewal cron job. Test with:

```bash
sudo certbot renew --dry-run
```

---

## Database Backups

### Automated Backups

```bash
# Make script executable
chmod +x scripts/backup-db.sh

# Run backup
npm run backup
```

### Schedule with Cron

```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * cd /var/www/backend-api && /bin/bash scripts/backup-db.sh >> /var/log/mongodb-backup.log 2>&1
```

### Restore from Backup

```bash
chmod +x scripts/restore-db.sh
./scripts/restore-db.sh backups/backup_20250101_020000.tar.gz
```

---

## Monitoring & Logging

### Health Endpoints

- **Health Check**: `GET /health`
- **Readiness**: `GET /ready`
- **Liveness**: `GET /live`
- **Metrics**: `GET /metrics`

### View Application Logs

**PM2:**
```bash
pm2 logs backend-api
pm2 logs backend-api --lines 1000
```

**Docker:**
```bash
docker-compose logs -f backend
```

**System Logs:**
```bash
tail -f logs/combined.log
tail -f logs/error.log
```

### Log Rotation

Logs automatically rotate when they reach 5MB (max 5 files).

---

## Security Checklist

- ✅ Strong JWT secret (min 32 characters)
- ✅ Change default admin password
- ✅ Enable HTTPS/SSL
- ✅ Configure CORS properly
- ✅ Set up firewall rules
- ✅ Enable rate limiting
- ✅ Regular security updates
- ✅ MongoDB network restrictions
- ✅ Environment variables secured
- ✅ Input validation enabled
- ✅ Helmet security headers

---

## Performance Optimization

### PM2 Cluster Mode

Already configured in `ecosystem.config.js` - uses all CPU cores.

### Database Indexes

All models have appropriate indexes. Check with:

```javascript
db.users.getIndexes()
```

### Compression

Enabled in server configuration (gzip).

### Caching

Consider adding Redis for:
- Session storage
- API response caching
- Rate limiting data

---

## Firewall Configuration

```bash
# Allow SSH
sudo ufw allow 22

# Allow HTTP
sudo ufw allow 80

# Allow HTTPS
sudo ufw allow 443

# Enable firewall
sudo ufw enable
```

---

## CI/CD Integration

### GitHub Actions

Already configured in `.github/workflows/deploy.yml`:

1. **Test**: Runs on every push
2. **Build**: Creates production build
3. **Deploy**: Deploys to production (configure your deployment steps)

### Environment Secrets

Add to GitHub repository secrets:
- `TEST_MONGO_URI`
- `PRODUCTION_MONGO_URI`
- `JWT_SECRET`

---

## Cloud Platform Deployment

### AWS EC2

1. Launch Ubuntu 20.04+ instance
2. Configure security groups (ports 22, 80, 443)
3. SSH into instance
4. Follow standard deployment steps above

### Heroku

```bash
heroku create backend-api
heroku addons:create mongolab
heroku config:set NODE_ENV=production
git push heroku main
```

### DigitalOcean

1. Create Droplet (Ubuntu 20.04+)
2. Add MongoDB managed database
3. Follow standard deployment steps

### Google Cloud Run (Docker)

```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/backend-api
gcloud run deploy --image gcr.io/PROJECT_ID/backend-api --platform managed
```

---

## Troubleshooting

### Application Won't Start

```bash
# Check logs
pm2 logs backend-api --lines 100

# Check environment
node -v
npm -v

# Test MongoDB connection
mongosh "$MONGO_URI"
```

### High Memory Usage

```bash
# Monitor with PM2
pm2 monit

# Restart application
pm2 restart backend-api
```

### Database Connection Issues

- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check network connectivity
- Review MongoDB Atlas status

### Nginx Issues

```bash
# Test configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log

# Restart nginx
sudo systemctl restart nginx
```

---

## Maintenance

### Update Application

```bash
# Pull latest code
git pull origin main

# Install dependencies
npm install --production

# Rebuild
npm run build

# Restart
pm2 restart backend-api
```

### Update Dependencies

```bash
npm update
npm audit fix
npm run build
pm2 restart backend-api
```

---

## Support & Resources

- **API Documentation**: https://your-domain.com/api-docs
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **PM2 Documentation**: https://pm2.keymetrics.io/
- **Let's Encrypt**: https://letsencrypt.org/

---

## Default Admin Credentials

**⚠️ CHANGE IMMEDIATELY AFTER FIRST LOGIN**

- Email: `admin@company.com`
- Password: `Admin@123456`

---

## Quick Reference

```bash
# Start server
npm run pm2:start

# View logs
pm2 logs backend-api

# Backup database
npm run backup

# Check health
curl https://api.yourdomain.com/health

# Restart application
pm2 restart backend-api

# View metrics
pm2 monit
```

---

## Production Checklist

Before going live:

- [ ] Environment variables configured
- [ ] MongoDB Atlas connection tested
- [ ] Database seeded
- [ ] Admin password changed
- [ ] SSL certificate installed
- [ ] Nginx configured
- [ ] PM2 process running
- [ ] Firewall rules set
- [ ] Backup script scheduled
- [ ] Monitoring enabled
- [ ] API documentation accessible
- [ ] Health checks passing
- [ ] CORS origins configured
- [ ] Rate limiting tested
- [ ] Error logging working

---

**🎉 Your backend is now production-ready!**
