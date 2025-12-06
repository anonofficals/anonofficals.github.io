# Deployment Guide

## Prerequisites
- Node.js 18+
- MongoDB Atlas account or MongoDB server
- PM2 (for production deployment)

## Quick Start

### 1. Environment Setup
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Seed Database
```bash
npm run seed
```

### 4. Start Server

**Development:**
```bash
npm run dev
```

**Production (PM2):**
```bash
npm run build
npm run pm2:start
```

**Production (Docker):**
```bash
npm run docker:build
npm run docker:run
```

## API Documentation
Access Swagger docs at: `http://localhost:5000/api-docs`

## Default Admin Credentials
- Email: admin@company.com
- Password: Admin@123456
⚠️ **Change immediately after first login!**
