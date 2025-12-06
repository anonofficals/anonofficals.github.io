# Complete API Reference

## Base URL

```
Production: https://api.yourdomain.com/api
Development: http://localhost:5000/api
```

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <token>
```

---

## Health & Monitoring

### GET /health
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "uptime": 12345,
  "database": {
    "status": "connected",
    "connected": true
  },
  "system": {
    "platform": "linux",
    "nodeVersion": "v18.0.0",
    "memory": {...},
    "cpu": 4
  }
}
```

---

## Authentication Endpoints

### POST /api/auth/signup
Register new user

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### POST /api/auth/login
User login

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### GET /api/auth/me
Get current user (Protected)

---

## Staff Management

### GET /api/staff
Get all staff members (Protected)

**Query Parameters:**
- `department` - Filter by department ID
- `status` - Filter by status (active, on_leave, inactive, terminated)
- `position` - Search by position
- `search` - Search by name or employee ID
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}
```

### GET /api/staff/:id
Get staff member by ID (Protected)

### POST /api/staff
Create staff member (Protected)

**Request:**
```json
{
  "userId": "...",
  "employeeId": "EMP00001",
  "departmentId": "...",
  "position": "Software Engineer",
  "salary": 75000,
  "joinDate": "2025-01-01",
  "phone": "+1234567890",
  "address": "123 Main St",
  "emergencyContact": {
    "name": "Jane Doe",
    "phone": "+1234567891",
    "relationship": "Spouse"
  }
}
```

### PUT /api/staff/:id
Update staff member (Protected)

### PATCH /api/staff/:id/performance
Update staff performance (Protected)

**Request:**
```json
{
  "rating": 4.5,
  "comments": "Excellent performance"
}
```

### DELETE /api/staff/:id
Delete staff member (Protected)

---

## Project Management

### GET /api/projects
Get all projects (Protected)

**Query Parameters:**
- `department` - Filter by department
- `status` - Filter by status
- `priority` - Filter by priority
- `search` - Search title/description
- `page` - Page number
- `limit` - Items per page

### GET /api/projects/:id
Get project by ID (Protected)

### POST /api/projects
Create project (Protected)

**Request:**
```json
{
  "title": "New Project",
  "description": "Project description",
  "departmentId": "...",
  "teamMembers": ["userId1", "userId2"],
  "status": "planning",
  "priority": "high",
  "budget": 50000,
  "startDate": "2025-01-01",
  "endDate": "2025-12-31",
  "milestones": [
    {
      "title": "Phase 1",
      "description": "Initial phase",
      "dueDate": "2025-03-31"
    }
  ]
}
```

### PUT /api/projects/:id
Update project (Protected)

### PATCH /api/projects/:id/progress
Update project progress (Protected)

**Request:**
```json
{
  "progress": 75
}
```

### DELETE /api/projects/:id
Delete project (Protected)

---

## Intern Management

### GET /api/interns
Get all interns (Protected)

**Query Parameters:**
- `department` - Filter by department
- `status` - Filter by status
- `search` - Search name/email/university
- `page` - Page number
- `limit` - Items per page

### GET /api/interns/:id
Get intern by ID (Protected)

### POST /api/interns
Create intern (Protected)

**Request:**
```json
{
  "name": "John Smith",
  "email": "john.smith@university.edu",
  "phone": "+1234567890",
  "university": "Tech University",
  "program": "Computer Science",
  "departmentId": "...",
  "supervisorId": "...",
  "startDate": "2025-01-01",
  "endDate": "2025-06-30",
  "stipend": 2000,
  "documents": {
    "resume": "url_to_resume",
    "coverLetter": "url_to_cover_letter"
  }
}
```

### PUT /api/interns/:id
Update intern (Protected)

### PATCH /api/interns/:id/evaluate
Evaluate intern performance (Protected)

**Request:**
```json
{
  "rating": 4.5,
  "feedback": "Great work during internship"
}
```

### DELETE /api/interns/:id
Delete intern (Protected)

---

## Leave Management

### GET /api/leave
Get all leave requests (Protected)

**Query Parameters:**
- `employee` - Filter by employee ID
- `status` - Filter by status (pending, approved, rejected)
- `type` - Filter by leave type
- `page` - Page number
- `limit` - Items per page

### GET /api/leave/:id
Get leave request by ID (Protected)

### POST /api/leave
Create leave request (Protected)

**Request:**
```json
{
  "employeeId": "...",
  "type": "vacation",
  "startDate": "2025-03-01",
  "endDate": "2025-03-07",
  "reason": "Family vacation",
  "documents": ["url_to_medical_cert"]
}
```

### PATCH /api/leave/:id/approve
Approve leave request (Protected)

### PATCH /api/leave/:id/reject
Reject leave request (Protected)

**Request:**
```json
{
  "rejectionReason": "Insufficient notice"
}
```

### DELETE /api/leave/:id
Delete leave request (Protected)

---

## Department Management

### GET /api/departments
Get all departments (Protected)

### GET /api/departments/:id
Get department by ID (Protected)

### GET /api/departments/:id/stats
Get department statistics (Protected)

### POST /api/departments
Create department (Protected)

**Request:**
```json
{
  "name": "Engineering",
  "description": "Software Development",
  "hodId": "...",
  "budget": 500000
}
```

### PUT /api/departments/:id
Update department (Protected)

### DELETE /api/departments/:id
Delete department (Protected)

---

## Role Management

### GET /api/roles/user/:userId
Get user roles (Protected)

### POST /api/roles/assign
Assign role to user (Protected)

**Request:**
```json
{
  "userId": "...",
  "role": "HOD",
  "departmentId": "...",
  "assignedBy": "...",
  "expiresAt": "2025-12-31"
}
```

### POST /api/roles/revoke
Revoke user role (Protected)

**Request:**
```json
{
  "userId": "...",
  "role": "HOD"
}
```

---

## Permissions

### GET /api/permissions
Get all permissions (Protected)

### GET /api/permissions/user/:userId
Get user permissions (Protected)

### POST /api/permissions
Create permission (Protected)

### PUT /api/permissions/:id
Update permission (Protected)

### DELETE /api/permissions/:id
Delete permission (Protected)

---

## Files

### POST /api/files/upload
Upload single file (Protected, Multipart)

**Form Data:**
```
file: <file>
relatedModel: "Project"
relatedId: "..."
uploadedBy: "..."
```

### POST /api/files/upload-multiple
Upload multiple files (Protected, Multipart)

### GET /api/files/:id
Get file by ID (Protected)

### GET /api/files/related/:model/:id
Get files related to model (Protected)

### DELETE /api/files/:id
Delete file (Protected)

---

## Applications

### GET /api/applications
Get all applications (Protected)

**Query Parameters:**
- `formType` - Filter by form type
- `status` - Filter by status
- `page` - Page number
- `limit` - Items per page

### GET /api/applications/:id
Get application by ID (Protected)

### POST /api/applications
Create application

**Request:**
```json
{
  "formType": "internship",
  "applicantInfo": {...},
  "formData": {...},
  "status": "submitted"
}
```

### PATCH /api/applications/:id/status
Update application status (Protected)

**Request:**
```json
{
  "status": "approved",
  "reviewedBy": "...",
  "notes": "Approved for internship"
}
```

### DELETE /api/applications/:id
Delete application (Protected)

### GET /api/applications/stats/overview
Get application statistics (Protected)

---

## Payments

### GET /api/payments
Get all payments (Protected)

### GET /api/payments/:id
Get payment by ID (Protected)

### POST /api/payments
Create payment (Protected)

**Request:**
```json
{
  "applicationId": "...",
  "amount": 100,
  "currency": "USD",
  "paymentMethod": "card",
  "status": "pending"
}
```

### PATCH /api/payments/:id/status
Update payment status (Protected)

**Request:**
```json
{
  "status": "completed",
  "transactionId": "txn_123"
}
```

### GET /api/payments/stats/overview
Get payment statistics (Protected)

---

## Notifications

### GET /api/notifications/user/:userId
Get user notifications (Protected)

### POST /api/notifications
Create notification (Protected)

**Request:**
```json
{
  "userId": "...",
  "type": "info",
  "title": "New Message",
  "message": "You have a new message",
  "relatedModel": "Message",
  "relatedId": "..."
}
```

### PATCH /api/notifications/:id/read
Mark notification as read (Protected)

### PATCH /api/notifications/user/:userId/read-all
Mark all notifications as read (Protected)

### DELETE /api/notifications/:id
Delete notification (Protected)

### GET /api/notifications/user/:userId/unread-count
Get unread notification count (Protected)

---

## Analytics

### GET /api/analytics/system
Get system-wide analytics (Protected)

### GET /api/analytics/departments/:id
Get department analytics (Protected)

### GET /api/analytics/monthly
Get monthly analytics data (Protected)

---

## Content Management

### GET /api/pages/public/:pageType
Get public page content

### PUT /api/pages/:pageType
Update page content (Protected)

**Request:**
```json
{
  "sections": [...],
  "metadata": {...}
}
```

### GET /api/content/:id
Get content by ID

### POST /api/content
Create content (Protected)

### PUT /api/content/:id
Update content (Protected)

### DELETE /api/content/:id
Delete content (Protected)

---

## Pricing

### GET /api/pricing/:category
Get pricing for category

**Categories:** internship, collaboration, research, other

### PUT /api/pricing/:category
Update pricing (Protected)

**Request:**
```json
{
  "basePrice": 100,
  "tiers": [...]
}
```

---

## Audit Logs

### GET /api/audit
Get audit logs (Protected)

**Query Parameters:**
- `userId` - Filter by user
- `action` - Filter by action type
- `startDate` - Start date
- `endDate` - End date
- `page` - Page number
- `limit` - Items per page

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Rate Limiting

- **Default**: 100 requests per 15 minutes
- **Headers**:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

---

## Swagger Documentation

Interactive API documentation available at:

```
http://localhost:5000/api-docs
```

---

**For more information, visit the [Complete Deployment Guide](./COMPLETE_DEPLOYMENT.md)**
