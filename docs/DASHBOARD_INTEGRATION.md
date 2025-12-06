# Dashboard Integration Guide

Quick reference for connecting public pages to role-based dashboards.

---

## **CEO Dashboard Integration**

**New Components:**
- `DashboardCEOPublicPages.tsx` - Manage all public page content
- `DashboardCEOApplications.tsx` - Review all applications

**Tabs to Add:**
```typescript
- "Public Pages" → Manage Dev Lab, Research, Collaboration, etc.
- "Applications" → Review submissions
- "Analytics" → Platform metrics
```

---

## **Content Manager Dashboard**

**Manages:**
- Dev Lab projects (AI/ML, Robotics, Blockchain)
- Research papers
- Team profiles
- Media library
- Portfolio content

**API Calls:**
```typescript
GET /api/pages/public/:pageType
PUT /api/pages/:pageType
POST /api/content
PUT /api/content/:blockId
```

---

## **Finance Manager Dashboard**

**Manages:**
- All pricing tiers
- Payment tracking
- Revenue analytics
- Financial reports

**API Calls:**
```typescript
GET /api/pricing/:category
PUT /api/pricing/:category
POST /api/pricing/:category/items
```

---

## **Frontend Integration**

**Fetch page content:**
```typescript
const fetchPageContent = async (pageType: string) => {
  const response = await fetch(`/api/pages/public/${pageType}`);
  const data = await response.json();
  return data.data;
};
```

**Update content (authenticated):**
```typescript
const updateContent = async (pageType: string, content: any, token: string) => {
  const response = await fetch(`/api/pages/${pageType}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(content)
  });
  return response.json();
};
```

---

## **Role-Based Access**

- **CEO**: Full access to all dashboards
- **Content Manager**: Content & media management
- **Finance Manager**: Pricing & financial data
- **HR**: Application review for internships
- **Others**: Read-only access

---

## **Quick Setup**

1. Import dashboard components
2. Add tabs to respective dashboards
3. Connect API endpoints
4. Test with proper authentication
5. Deploy with environment variables
