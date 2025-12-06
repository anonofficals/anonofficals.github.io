# Pricing Management API Guide

Complete guide for managing pricing across all platform features and services.

---

## **Overview**

The Pricing Management System enables Finance Managers to:
- Manage pricing tiers for all services
- Create and update pricing plans
- Track pricing history and changes
- Generate financial reports
- Monitor revenue metrics

---

## **Pricing Schema**

```javascript
{
  _id: ObjectId,
  category: String, // 'features', 'collaboration', 'internships', 'hackathons', 'opportunities', 'arcadeum'
  items: [{
    name: String,
    description: String,
    price: Number,
    currency: String,
    billingPeriod: String, // 'one-time', 'monthly', 'yearly'
    features: [String],
    isPopular: Boolean,
    isActive: Boolean,
    _id: ObjectId
  }],
  metadata: {
    lastUpdatedBy: ObjectId,
    notes: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## **Pricing Categories**

### **1. Features Pricing**
Platform features and tools pricing.

### **2. Collaboration Pricing**
Research collaboration and partnership pricing.

### **3. Internships Pricing**
Internship program fees (if applicable).

### **4. Hackathons Pricing**
Hackathon participation fees.

### **5. Opportunities Pricing**
Fellowship, grants, and other opportunity fees.

### **6. Arcadeum Pricing**
Game challenges and competition pricing.

---

## **API Endpoints**

### **1. Get All Pricing**

```http
GET /api/pricing
```

**Authorization:** None required (public endpoint)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "category": "collaboration",
      "items": [
        {
          "_id": "item1",
          "name": "Basic Collaboration",
          "description": "Perfect for small research teams",
          "price": 99,
          "currency": "USD",
          "billingPeriod": "monthly",
          "features": [
            "Up to 5 team members",
            "10 GB storage",
            "Email support"
          ],
          "isPopular": false,
          "isActive": true
        },
        {
          "_id": "item2",
          "name": "Professional",
          "description": "For established research groups",
          "price": 299,
          "currency": "USD",
          "billingPeriod": "monthly",
          "features": [
            "Up to 20 team members",
            "100 GB storage",
            "Priority support",
            "Advanced analytics"
          ],
          "isPopular": true,
          "isActive": true
        }
      ],
      "metadata": {
        "lastUpdatedBy": "userId",
        "notes": "2024 Q1 pricing"
      },
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### **2. Get Pricing by Category**

```http
GET /api/pricing/:category
```

**Example:**
```http
GET /api/pricing/collaboration
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "category": "collaboration",
    "items": [...]
  }
}
```

### **3. Update Pricing** (Finance Manager Only)

```http
PUT /api/pricing/:category
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "items": [
    {
      "name": "Starter Plan",
      "description": "Get started with basic features",
      "price": 49,
      "currency": "USD",
      "billingPeriod": "monthly",
      "features": [
        "Up to 3 users",
        "5 GB storage",
        "Basic support"
      ],
      "isPopular": false,
      "isActive": true
    },
    {
      "name": "Growth Plan",
      "description": "Scale your operations",
      "price": 149,
      "currency": "USD",
      "billingPeriod": "monthly",
      "features": [
        "Up to 10 users",
        "50 GB storage",
        "Priority support",
        "Analytics dashboard"
      ],
      "isPopular": true,
      "isActive": true
    }
  ],
  "notes": "Updated pricing for 2024 Q1"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "category": "collaboration",
    "items": [...],
    "metadata": {
      "lastUpdatedBy": "financeManagerId",
      "notes": "Updated pricing for 2024 Q1"
    },
    "updatedAt": "2024-01-15T14:20:00Z"
  }
}
```

### **4. Add Pricing Item**

```http
POST /api/pricing/:category/items
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Enterprise Plan",
  "description": "For large organizations",
  "price": 999,
  "currency": "USD",
  "billingPeriod": "monthly",
  "features": [
    "Unlimited users",
    "Unlimited storage",
    "24/7 dedicated support",
    "Custom integrations",
    "SLA guarantee"
  ],
  "isPopular": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "category": "collaboration",
    "items": [
      // ... existing items
      {
        "_id": "newItemId",
        "name": "Enterprise Plan",
        "price": 999,
        "isActive": true
      }
    ]
  }
}
```

### **5. Update Pricing Item**

```http
PUT /api/pricing/:category/items/:itemId
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "price": 279,
  "description": "Updated description",
  "features": [
    "Updated feature list"
  ],
  "isPopular": true
}
```

### **6. Delete Pricing Item**

```http
DELETE /api/pricing/:category/items/:itemId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "category": "collaboration",
    "items": [
      // Remaining items after deletion
    ]
  }
}
```

---

## **Pricing Strategies**

### **1. Tiered Pricing**
```json
{
  "category": "features",
  "items": [
    {
      "name": "Free",
      "price": 0,
      "billingPeriod": "one-time",
      "features": ["Basic features"]
    },
    {
      "name": "Pro",
      "price": 19,
      "billingPeriod": "monthly",
      "features": ["All basic", "Advanced features"]
    },
    {
      "name": "Enterprise",
      "price": 99,
      "billingPeriod": "monthly",
      "features": ["All Pro", "Premium support"]
    }
  ]
}
```

### **2. One-Time Pricing**
```json
{
  "category": "hackathons",
  "items": [
    {
      "name": "Standard Entry",
      "price": 50,
      "billingPeriod": "one-time",
      "features": ["Participation", "Swag bag"]
    },
    {
      "name": "VIP Entry",
      "price": 150,
      "billingPeriod": "one-time",
      "features": ["All Standard", "Networking dinner", "Premium swag"]
    }
  ]
}
```

### **3. Subscription Pricing**
```json
{
  "category": "internships",
  "items": [
    {
      "name": "Monthly Access",
      "price": 29,
      "billingPeriod": "monthly",
      "features": ["Job board access", "Resume reviews"]
    },
    {
      "name": "Annual Access",
      "price": 249,
      "billingPeriod": "yearly",
      "features": ["All Monthly", "Career coaching", "20% savings"]
    }
  ]
}
```

---

## **Usage Examples**

### **Example 1: Get Collaboration Pricing (Public)**

```javascript
const getCollaborationPricing = async () => {
  const response = await fetch('/api/pricing/collaboration');
  const data = await response.json();
  
  if (data.success) {
    console.log('Pricing tiers:', data.data.items);
  }
};
```

### **Example 2: Update Pricing (Finance Manager)**

```javascript
const updatePricing = async (token) => {
  const response = await fetch('/api/pricing/collaboration', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items: [
        {
          name: 'Starter',
          description: 'Perfect for individuals',
          price: 29,
          currency: 'USD',
          billingPeriod: 'monthly',
          features: ['Basic collaboration', 'Email support'],
          isPopular: false,
          isActive: true
        },
        {
          name: 'Team',
          description: 'Great for teams',
          price: 99,
          currency: 'USD',
          billingPeriod: 'monthly',
          features: ['Advanced collaboration', 'Priority support'],
          isPopular: true,
          isActive: true
        }
      ],
      notes: 'New 2024 pricing'
    })
  });
  
  const data = await response.json();
  console.log(data);
};
```

### **Example 3: Add New Pricing Tier**

```javascript
const addPricingTier = async (token) => {
  const response = await fetch('/api/pricing/arcadeum/items', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Champion Pass',
      description: 'Ultimate gaming experience',
      price: 199,
      currency: 'USD',
      billingPeriod: 'yearly',
      features: [
        'All game challenges',
        'Exclusive tournaments',
        'Premium rewards',
        'Leaderboard badges'
      ],
      isPopular: true
    })
  });
  
  const data = await response.json();
  console.log(data);
};
```

---

## **Financial Reporting**

### **Revenue Tracking**
Track revenue per category:

```javascript
const getRevenueByCategory = async (token) => {
  const response = await fetch('/api/analytics/revenue', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  // Returns revenue breakdown by category
};
```

### **Popular Plans Analytics**
Identify most popular pricing tiers:

```javascript
const getPopularPlans = (pricingData) => {
  return pricingData.items.filter(item => item.isPopular);
};
```

---

## **Best Practices**

1. **Use descriptive names** for pricing tiers (Starter, Pro, Enterprise)
2. **Highlight popular plans** with `isPopular: true`
3. **Keep feature lists clear** and concise
4. **Update `metadata.notes`** when making pricing changes
5. **Use consistent currency** across related items
6. **Consider discounts** for yearly billing (e.g., 20% off)
7. **Mark inactive plans** instead of deleting them (`isActive: false`)
8. **Audit all pricing changes** via `lastUpdatedBy` field

---

## **Authorization**

- **Public Access**: GET endpoints (view pricing)
- **Finance Manager**: All endpoints (create, update, delete pricing)
- **CEO**: View all pricing and financial reports
- **Others**: View-only access

---

## **Currency Support**

Currently supported currencies:
- USD (US Dollar)
- EUR (Euro)
- GBP (British Pound)

**To add more currencies**, update the pricing items with the appropriate `currency` field.
