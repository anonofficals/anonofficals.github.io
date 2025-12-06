# Complete API Endpoints Reference

This document provides a comprehensive reference for all API endpoints in the multi-user role system.

---

## **Authentication & Authorization**

All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## **1. Authentication Routes** (`/api/auth`)

### **POST** `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

### **POST** `/api/auth/login`
Login existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

---

## **2. Page Management Routes** (`/api/pages`)

### **GET** `/api/pages/public`
Get all published public pages.

**Authorization:** None required

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "pageType": "devlab",
      "title": "Dev Lab - Innovation Hub",
      "slug": "dev-lab",
      "content": {
        "hero": {
          "title": "Welcome to Dev Lab",
          "subtitle": "Innovation starts here",
          "backgroundImage": "https://..."
        },
        "sections": [...]
      },
      "isPublished": true,
      "version": 3
    }
  ]
}
```

### **GET** `/api/pages/public/:pageType`
Get specific page by type.

**Parameters:**
- `pageType`: devlab | research | collaboration | internships | arcadeum | careers | ai | robotics | space | web

**Authorization:** None required

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "pageType": "devlab",
    "title": "Dev Lab",
    "content": {...},
    "images": ["url1", "url2"],
    "isPublished": true
  }
}
```

### **PUT** `/api/pages/:pageType`
Update page content (CEO/Content Manager only).

**Authorization:** Required (CEO, Content Manager)

**Request Body:**
```json
{
  "title": "Updated Dev Lab Title",
  "content": {
    "hero": {
      "title": "New Hero Title",
      "subtitle": "New Subtitle"
    }
  },
  "images": ["newUrl1", "newUrl2"],
  "metadata": {
    "description": "Updated description",
    "keywords": ["dev", "lab", "innovation"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "pageType": "devlab",
    "title": "Updated Dev Lab Title",
    "version": 4
  }
}
```

### **POST** `/api/pages`
Create new page (Admin only).

**Authorization:** Required (Admin)

**Request Body:**
```json
{
  "pageType": "new_page",
  "title": "New Page Title",
  "slug": "new-page",
  "content": {
    "hero": {...}
  }
}
```

### **PATCH** `/api/pages/:pageType/publish`
Toggle page publish status.

**Authorization:** Required (CEO, Admin)

**Response:**
```json
{
  "success": true,
  "data": {
    "pageType": "devlab",
    "isPublished": false
  }
}
```

---

## **3. Content Management Routes** (`/api/content`)

### **GET** `/api/content/page/:pageId`
Get all content blocks for a page.

**Authorization:** Required

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "pageId": "507f1f77bcf86cd799439011",
      "blockType": "card",
      "title": "Feature 1",
      "content": {
        "text": "Description...",
        "data": {...}
      },
      "order": 1,
      "isActive": true
    }
  ]
}
```

### **POST** `/api/content`
Create new content block.

**Authorization:** Required (Content Manager)

**Request Body:**
```json
{
  "pageId": "507f1f77bcf86cd799439011",
  "blockType": "card",
  "title": "New Feature",
  "content": {
    "text": "Feature description",
    "data": {...}
  },
  "images": ["url1"],
  "order": 5
}
```

### **PUT** `/api/content/:blockId`
Update content block.

**Authorization:** Required (Content Manager)

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": {
    "text": "Updated text"
  },
  "order": 3,
  "isActive": true
}
```

### **DELETE** `/api/content/:blockId`
Delete content block.

**Authorization:** Required (Content Manager)

### **POST** `/api/content/reorder`
Reorder content blocks.

**Authorization:** Required (Content Manager)

**Request Body:**
```json
{
  "pageId": "507f1f77bcf86cd799439011",
  "blockOrders": [
    { "blockId": "block1", "order": 1 },
    { "blockId": "block2", "order": 2 }
  ]
}
```

---

## **4. Pricing Routes** (`/api/pricing`)

### **GET** `/api/pricing`
Get all pricing configurations.

**Authorization:** None required

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "category": "collaboration",
      "items": [
        {
          "name": "Basic Plan",
          "description": "Perfect for small teams",
          "price": 99,
          "currency": "USD",
          "billingPeriod": "monthly",
          "features": ["Feature 1", "Feature 2"],
          "isPopular": false,
          "isActive": true
        }
      ],
      "metadata": {
        "lastUpdatedBy": "userId",
        "notes": "Updated pricing for 2024"
      }
    }
  ]
}
```

### **GET** `/api/pricing/:category`
Get pricing for specific category.

**Parameters:**
- `category`: features | collaboration | internships | hackathons | opportunities | arcadeum

**Authorization:** None required

### **PUT** `/api/pricing/:category`
Update pricing (Finance Manager only).

**Authorization:** Required (Finance Manager)

**Request Body:**
```json
{
  "items": [
    {
      "name": "Premium Plan",
      "description": "For enterprise teams",
      "price": 299,
      "currency": "USD",
      "billingPeriod": "monthly",
      "features": ["All features", "Priority support"],
      "isPopular": true,
      "isActive": true
    }
  ],
  "notes": "Q1 2024 pricing update"
}
```

### **POST** `/api/pricing/:category/items`
Add pricing item.

**Authorization:** Required (Finance Manager)

**Request Body:**
```json
{
  "name": "Starter Plan",
  "description": "Get started quickly",
  "price": 49,
  "currency": "USD",
  "billingPeriod": "monthly",
  "features": ["Basic features"],
  "isPopular": false
}
```

### **PUT** `/api/pricing/:category/items/:itemId`
Update pricing item.

**Authorization:** Required (Finance Manager)

### **DELETE** `/api/pricing/:category/items/:itemId`
Delete pricing item.

**Authorization:** Required (Finance Manager)

---

## **5. Application Routes** (`/api/applications`)

### **POST** `/api/applications`
Submit new application.

**Request Body:**
```json
{
  "formType": "internship",
  "targetId": "internship123",
  "targetTitle": "Software Engineering Internship",
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "university": "MIT",
  "program": "Computer Science",
  "yearOfStudy": "3rd Year",
  "department": "Engineering",
  "expectedStartDate": "2024-06-01",
  "skills": "JavaScript, React, Node.js",
  "motivation": "I am passionate about..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "formType": "internship",
    "status": "pending",
    "submittedAt": "2024-01-15T10:30:00Z"
  }
}
```

### **GET** `/api/applications`
Get all applications (filtered by role).

**Authorization:** Required (CEO, HR, Admin)

**Query Parameters:**
- `type`: Filter by application type
- `status`: Filter by status (pending, approved, rejected)
- `page`: Pagination
- `limit`: Results per page

### **GET** `/api/applications/:id`
Get specific application.

**Authorization:** Required

### **PUT** `/api/applications/:id/status`
Update application status.

**Authorization:** Required (CEO, HR)

**Request Body:**
```json
{
  "status": "approved",
  "notes": "Great candidate, proceed to interview"
}
```

---

## **6. Dashboard Routes** (`/api/dashboard`)

### **GET** `/api/dashboard/stats/:role`
Get dashboard statistics based on user role.

**Authorization:** Required

**Parameters:**
- `role`: ceo | content_manager | finance_manager | hr | hod | employee | intern

**Response:**
```json
{
  "success": true,
  "data": {
    "role": "ceo",
    "stats": {
      "totalApplications": 45,
      "pendingReviews": 12,
      "totalRevenue": 125000,
      "activeProjects": 8
    }
  }
}
```

---

## **7. Analytics Routes** (`/api/analytics`)

### **GET** `/api/analytics/overview`
Get analytics overview.

**Authorization:** Required (CEO, Analytics roles)

### **GET** `/api/analytics/applications`
Get application analytics.

**Authorization:** Required (CEO, HR)

### **GET** `/api/analytics/revenue`
Get revenue analytics.

**Authorization:** Required (CEO, Finance Manager)

---

## **Rate Limiting**

All API endpoints are rate-limited:
- **Authentication endpoints**: 5 requests per minute
- **Read endpoints**: 100 requests per minute
- **Write endpoints**: 30 requests per minute

---

## **Error Responses**

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized (invalid/missing token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `429`: Too Many Requests (rate limit exceeded)
- `500`: Internal Server Error

---

## **Authentication Flow**

1. Register or login to receive JWT token
2. Include token in all subsequent requests:
   ```
   Authorization: Bearer <token>
   ```
3. Token expires after 24 hours
4. Refresh token or re-login when expired
