# Content Management API Guide

Complete guide for managing dynamic content across all public pages.

---

## **Overview**

The Content Management System allows authorized users (CEO, Content Manager) to:
- Manage public page content dynamically
- Create, update, and delete content blocks
- Reorder content sections
- Upload and manage media
- Version control for content changes

---

## **Content Architecture**

### **Pages Collection**
Each public page (Dev Lab, Research, Collaboration, etc.) has a dedicated page document.

**Page Schema:**
```javascript
{
  _id: ObjectId,
  pageType: String, // 'devlab', 'research', 'collaboration', etc.
  title: String,
  slug: String,
  content: {
    hero: {
      title: String,
      subtitle: String,
      backgroundImage: String
    },
    sections: [{
      id: String,
      type: String, // 'text', 'cards', 'grid', 'feature', 'pricing'
      title: String,
      content: Mixed,
      order: Number
    }]
  },
  metadata: {
    description: String,
    keywords: [String],
    author: String,
    lastModifiedBy: ObjectId
  },
  images: [String],
  isPublished: Boolean,
  version: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### **Content Blocks Collection**
Modular content blocks that can be mixed and matched.

**Content Block Schema:**
```javascript
{
  _id: ObjectId,
  pageId: ObjectId,
  blockType: String, // 'hero', 'section', 'card', 'pricing', 'team', 'project', 'research'
  title: String,
  content: {
    text: String,
    html: String,
    data: Mixed
  },
  images: [String],
  order: Number,
  isActive: Boolean,
  createdBy: ObjectId,
  updatedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

---

## **API Endpoints**

### **1. Page Management**

#### **Get All Public Pages**
```http
GET /api/pages/public
```

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
      "content": {...},
      "isPublished": true,
      "version": 3
    }
  ]
}
```

#### **Get Page by Type**
```http
GET /api/pages/public/:pageType
```

**Example:**
```http
GET /api/pages/public/devlab
```

#### **Update Page Content** (Protected)
```http
PUT /api/pages/:pageType
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated Dev Lab",
  "content": {
    "hero": {
      "title": "New Hero Title",
      "subtitle": "Innovative Solutions",
      "backgroundImage": "https://..."
    },
    "sections": [
      {
        "id": "section1",
        "type": "cards",
        "title": "Our Projects",
        "content": {
          "cards": [
            {
              "title": "AI/ML",
              "description": "Advanced AI projects",
              "image": "https://..."
            }
          ]
        },
        "order": 1
      }
    ]
  },
  "metadata": {
    "description": "Explore our development projects",
    "keywords": ["dev", "lab", "innovation"]
  },
  "images": ["url1", "url2"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "pageType": "devlab",
    "title": "Updated Dev Lab",
    "version": 4,
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### **2. Content Block Management**

#### **Get Content Blocks for Page**
```http
GET /api/content/page/:pageId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "block1",
      "pageId": "page1",
      "blockType": "card",
      "title": "Feature 1",
      "content": {
        "text": "Description...",
        "data": {
          "icon": "rocket",
          "color": "blue"
        }
      },
      "images": ["url1"],
      "order": 1,
      "isActive": true,
      "createdBy": {...},
      "updatedBy": {...}
    }
  ]
}
```

#### **Create Content Block**
```http
POST /api/content
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "pageId": "507f1f77bcf86cd799439011",
  "blockType": "card",
  "title": "New Feature",
  "content": {
    "text": "Feature description here",
    "data": {
      "icon": "star",
      "color": "purple",
      "link": "/features/new-feature"
    }
  },
  "images": ["https://example.com/image.jpg"],
  "order": 5
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "newBlockId",
    "pageId": "507f1f77bcf86cd799439011",
    "blockType": "card",
    "title": "New Feature",
    "order": 5,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### **Update Content Block**
```http
PUT /api/content/:blockId
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated Feature Title",
  "content": {
    "text": "Updated description",
    "data": {...}
  },
  "order": 3,
  "isActive": true
}
```

#### **Delete Content Block**
```http
DELETE /api/content/:blockId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Content block deleted successfully"
}
```

#### **Reorder Content Blocks**
```http
POST /api/content/reorder
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "pageId": "507f1f77bcf86cd799439011",
  "blockOrders": [
    { "blockId": "block1", "order": 1 },
    { "blockId": "block2", "order": 2 },
    { "blockId": "block3", "order": 3 }
  ]
}
```

---

## **Content Types**

### **1. Hero Block**
```json
{
  "blockType": "hero",
  "content": {
    "data": {
      "title": "Main Title",
      "subtitle": "Subtitle text",
      "backgroundImage": "url",
      "ctaText": "Get Started",
      "ctaLink": "/apply"
    }
  }
}
```

### **2. Card Grid Block**
```json
{
  "blockType": "card",
  "content": {
    "data": {
      "cards": [
        {
          "title": "Card Title",
          "description": "Card description",
          "image": "url",
          "link": "/details",
          "icon": "rocket"
        }
      ]
    }
  }
}
```

### **3. Research Paper Block**
```json
{
  "blockType": "research",
  "content": {
    "data": {
      "title": "Paper Title",
      "authors": ["Author 1", "Author 2"],
      "abstract": "Abstract text...",
      "publishedDate": "2024-01-15",
      "pdfUrl": "url",
      "doi": "10.1234/example"
    }
  }
}
```

### **4. Team Member Block**
```json
{
  "blockType": "team",
  "content": {
    "data": {
      "name": "John Doe",
      "role": "Lead Developer",
      "bio": "Bio text...",
      "image": "url",
      "social": {
        "linkedin": "url",
        "github": "url",
        "twitter": "url"
      }
    }
  }
}
```

### **5. Project Block**
```json
{
  "blockType": "project",
  "content": {
    "data": {
      "title": "Project Name",
      "description": "Description...",
      "technologies": ["React", "Node.js"],
      "status": "active",
      "startDate": "2024-01-01",
      "gallery": ["url1", "url2"],
      "githubUrl": "url",
      "liveUrl": "url"
    }
  }
}
```

### **6. Pricing Block**
```json
{
  "blockType": "pricing",
  "content": {
    "data": {
      "tiers": [
        {
          "name": "Basic",
          "price": 99,
          "currency": "USD",
          "period": "monthly",
          "features": ["Feature 1", "Feature 2"],
          "isPopular": false,
          "ctaText": "Get Started",
          "ctaLink": "/apply"
        }
      ]
    }
  }
}
```

---

## **Usage Examples**

### **Example 1: Update Dev Lab Hero Section**

```javascript
const updateDevLabHero = async () => {
  const response = await fetch('/api/pages/devlab', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: {
        hero: {
          title: 'Innovation Lab',
          subtitle: 'Building the Future',
          backgroundImage: 'https://example.com/hero.jpg'
        }
      }
    })
  });
  
  const data = await response.json();
  console.log(data);
};
```

### **Example 2: Add New Research Paper**

```javascript
const addResearchPaper = async () => {
  const response = await fetch('/api/content', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pageId: 'researchPageId',
      blockType: 'research',
      title: 'AI in Healthcare',
      content: {
        data: {
          title: 'AI in Healthcare: A Comprehensive Study',
          authors: ['Dr. Smith', 'Dr. Johnson'],
          abstract: 'This paper explores...',
          publishedDate: '2024-01-15',
          pdfUrl: 'https://example.com/paper.pdf',
          doi: '10.1234/ai-healthcare'
        }
      },
      order: 1
    })
  });
  
  const data = await response.json();
  console.log(data);
};
```

### **Example 3: Reorder Content Blocks**

```javascript
const reorderBlocks = async () => {
  const response = await fetch('/api/content/reorder', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pageId: 'pageId',
      blockOrders: [
        { blockId: 'block3', order: 1 },
        { blockId: 'block1', order: 2 },
        { blockId: 'block2', order: 3 }
      ]
    })
  });
  
  const data = await response.json();
  console.log(data);
};
```

---

## **Media Management**

### **Upload Images**
Images should be uploaded to a centralized media library (AWS S3, Cloudinary, etc.) and the URLs stored in content.

**Recommended Flow:**
1. Upload image to media service
2. Receive public URL
3. Include URL in content block

---

## **Version Control**

Each page update increments the version number automatically:

```javascript
{
  "version": 1  // Initial version
}
// After update
{
  "version": 2  // Incremented
}
```

**Audit Trail:**
- `metadata.lastModifiedBy`: User who last modified the page
- `createdBy` / `updatedBy`: Track content block creators and editors
- `createdAt` / `updatedAt`: Timestamps for all changes

---

## **Authorization**

**CEO** - Full access to all content management
**Content Manager** - Manage content blocks and page content
**Finance Manager** - No content management access
**Others** - Read-only access to published content

---

## **Best Practices**

1. **Always set `order` values** when creating content blocks
2. **Use meaningful `blockType` values** for filtering
3. **Keep content data structures consistent** across similar blocks
4. **Validate image URLs** before saving
5. **Use `isActive` flag** instead of deleting content blocks
6. **Increment version numbers** for audit purposes
7. **Add metadata** for SEO optimization
