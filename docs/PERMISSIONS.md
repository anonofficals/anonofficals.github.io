# Permission System Configuration

## Overview
Complete permission matrix and seed data for the multi-user role system.

---

## Permission Matrix

### CEO Permissions (Complete Access)
```typescript
{
  role: 'ceo',
  permissions: [
    // Users
    { category: 'users', action: 'create' },
    { category: 'users', action: 'read' },
    { category: 'users', action: 'update' },
    { category: 'users', action: 'delete' },
    { category: 'users', action: 'manage' },
    
    // Roles
    { category: 'roles', action: 'create' },
    { category: 'roles', action: 'read' },
    { category: 'roles', action: 'update' },
    { category: 'roles', action: 'delete' },
    { category: 'roles', action: 'manage' },
    
    // Departments
    { category: 'departments', action: 'create' },
    { category: 'departments', action: 'read' },
    { category: 'departments', action: 'update' },
    { category: 'departments', action: 'delete' },
    { category: 'departments', action: 'manage' },
    
    // Projects
    { category: 'projects', action: 'create' },
    { category: 'projects', action: 'read' },
    { category: 'projects', action: 'update' },
    { category: 'projects', action: 'delete' },
    { category: 'projects', action: 'manage' },
    
    // Finance
    { category: 'finance', action: 'read' },
    { category: 'finance', action: 'update' },
    { category: 'finance', action: 'manage' },
    { category: 'finance', action: 'export' },
    
    // Analytics
    { category: 'analytics', action: 'read' },
    { category: 'analytics', action: 'export' },
    
    // System
    { category: 'system', action: 'manage' }
  ]
}
```

### HR Permissions
```typescript
{
  role: 'hr',
  permissions: [
    // Users (limited - cannot manage CEO/HOD)
    { category: 'users', action: 'create' },
    { category: 'users', action: 'read' },
    { category: 'users', action: 'update' },
    
    // Roles (limited)
    { category: 'roles', action: 'create' },
    { category: 'roles', action: 'read' },
    { category: 'roles', action: 'update' },
    
    // Applications
    { category: 'applications', action: 'read' },
    { category: 'applications', action: 'update' },
    { category: 'applications', action: 'approve' },
    
    // Internships
    { category: 'internships', action: 'create' },
    { category: 'internships', action: 'read' },
    { category: 'internships', action: 'update' },
    { category: 'internships', action: 'manage' },
    
    // Analytics (HR-specific)
    { category: 'analytics', action: 'read', resource: 'hr-metrics' },
    { category: 'analytics', action: 'export', resource: 'hr-metrics' }
  ]
}
```

### HOD Permissions
```typescript
{
  role: 'hod',
  permissions: [
    // Users (department only)
    { 
      category: 'users', 
      action: 'read',
      conditions: { departmentOnly: true }
    },
    { 
      category: 'users', 
      action: 'update',
      conditions: { departmentOnly: true }
    },
    
    // Roles (department only)
    { 
      category: 'roles', 
      action: 'create',
      conditions: { departmentOnly: true }
    },
    
    // Projects (department)
    { 
      category: 'projects', 
      action: 'create',
      conditions: { departmentOnly: true }
    },
    { 
      category: 'projects', 
      action: 'read',
      conditions: { departmentOnly: true }
    },
    { 
      category: 'projects', 
      action: 'update',
      conditions: { departmentOnly: true }
    },
    { 
      category: 'projects', 
      action: 'manage',
      conditions: { departmentOnly: true }
    },
    
    // Finance (department budget)
    { 
      category: 'finance', 
      action: 'read',
      resource: 'department-budget',
      conditions: { departmentOnly: true }
    },
    
    // Analytics (department)
    { 
      category: 'analytics', 
      action: 'read',
      resource: 'department-metrics',
      conditions: { departmentOnly: true }
    }
  ]
}
```

### Finance Manager Permissions
```typescript
{
  role: 'finance-manager',
  permissions: [
    // Finance
    { category: 'finance', action: 'create' },
    { category: 'finance', action: 'read' },
    { category: 'finance', action: 'update' },
    { category: 'finance', action: 'manage' },
    { category: 'finance', action: 'export' },
    
    // Analytics (financial)
    { category: 'analytics', action: 'read', resource: 'finance-metrics' },
    { category: 'analytics', action: 'export', resource: 'finance-metrics' }
  ]
}
```

### Project Manager Permissions
```typescript
{
  role: 'project-manager',
  permissions: [
    // Projects (assigned only)
    { 
      category: 'projects', 
      action: 'read',
      conditions: { ownOnly: true }
    },
    { 
      category: 'projects', 
      action: 'update',
      conditions: { ownOnly: true }
    },
    
    // Users (project team members)
    { 
      category: 'users', 
      action: 'read',
      resource: 'team-members'
    }
  ]
}
```

### Employee Permissions
```typescript
{
  role: 'employee',
  permissions: [
    // Projects (view assigned)
    { 
      category: 'projects', 
      action: 'read',
      conditions: { ownOnly: true }
    },
    
    // Users (own profile)
    { 
      category: 'users', 
      action: 'read',
      conditions: { ownOnly: true }
    },
    { 
      category: 'users', 
      action: 'update',
      conditions: { ownOnly: true }
    }
  ]
}
```

### Intern Permissions
```typescript
{
  role: 'intern',
  permissions: [
    // Projects (view assigned)
    { 
      category: 'projects', 
      action: 'read',
      conditions: { ownOnly: true }
    },
    
    // Users (own profile)
    { 
      category: 'users', 
      action: 'read',
      conditions: { ownOnly: true }
    },
    { 
      category: 'users', 
      action: 'update',
      conditions: { ownOnly: true }
    }
  ]
}
```

### Auditor Permissions
```typescript
{
  role: 'auditor',
  permissions: [
    // Read-only access to most resources
    { category: 'users', action: 'read' },
    { category: 'roles', action: 'read' },
    { category: 'departments', action: 'read' },
    { category: 'projects', action: 'read' },
    { category: 'finance', action: 'read' },
    { category: 'analytics', action: 'read' },
    { category: 'analytics', action: 'export' },
    
    // Full audit log access
    { category: 'system', action: 'read', resource: 'audit-logs' }
  ]
}
```

---

## Permission Seed Script

**File**: `server/scripts/seedPermissions.ts`

```typescript
import mongoose from 'mongoose';
import Permission, { PermissionCategory, PermissionAction } from '../models/Permission';
import { AppRole } from '../models/UserRole';
import connectDB from '../config/db';

const permissions = [
  // CEO - Full access
  ...Object.values(PermissionCategory).flatMap(category =>
    Object.values(PermissionAction).map(action => ({
      role: AppRole.CEO,
      category,
      action,
      isActive: true,
      description: `CEO can ${action} ${category}`
    }))
  ),

  // HR Permissions
  { role: AppRole.HR, category: PermissionCategory.USERS, action: PermissionAction.CREATE },
  { role: AppRole.HR, category: PermissionCategory.USERS, action: PermissionAction.READ },
  { role: AppRole.HR, category: PermissionCategory.USERS, action: PermissionAction.UPDATE },
  { role: AppRole.HR, category: PermissionCategory.ROLES, action: PermissionAction.CREATE },
  { role: AppRole.HR, category: PermissionCategory.ROLES, action: PermissionAction.READ },
  { role: AppRole.HR, category: PermissionCategory.APPLICATIONS, action: PermissionAction.READ },
  { role: AppRole.HR, category: PermissionCategory.APPLICATIONS, action: PermissionAction.UPDATE },
  { role: AppRole.HR, category: PermissionCategory.APPLICATIONS, action: PermissionAction.APPROVE },
  { role: AppRole.HR, category: PermissionCategory.INTERNSHIPS, action: PermissionAction.MANAGE },

  // HOD Permissions
  { 
    role: AppRole.HOD, 
    category: PermissionCategory.USERS, 
    action: PermissionAction.READ,
    conditions: { departmentOnly: true }
  },
  { 
    role: AppRole.HOD, 
    category: PermissionCategory.PROJECTS, 
    action: PermissionAction.MANAGE,
    conditions: { departmentOnly: true }
  },

  // Finance Manager Permissions
  { role: AppRole.FINANCE_MANAGER, category: PermissionCategory.FINANCE, action: PermissionAction.MANAGE },
  { role: AppRole.FINANCE_MANAGER, category: PermissionCategory.FINANCE, action: PermissionAction.EXPORT },

  // Auditor Permissions
  { role: AppRole.AUDITOR, category: PermissionCategory.USERS, action: PermissionAction.READ },
  { role: AppRole.AUDITOR, category: PermissionCategory.FINANCE, action: PermissionAction.READ },
  { role: AppRole.AUDITOR, category: PermissionCategory.ANALYTICS, action: PermissionAction.READ },
  { role: AppRole.AUDITOR, category: PermissionCategory.ANALYTICS, action: PermissionAction.EXPORT }
];

const seedPermissions = async () => {
  try {
    await connectDB();

    // Clear existing permissions
    await Permission.deleteMany({});
    console.log('Cleared existing permissions');

    // Insert new permissions
    await Permission.insertMany(permissions);
    console.log(`Seeded ${permissions.length} permissions`);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedPermissions();
```

---

## Run Seed Script

Add to `package.json`:

```json
{
  "scripts": {
    "seed:permissions": "ts-node server/scripts/seedPermissions.ts"
  }
}
```

Run:
```bash
npm run seed:permissions
```

---

## Permission Utility Functions

**File**: `server/utils/permissionChecker.ts`

```typescript
import Permission from '../models/Permission';
import UserRole from '../models/UserRole';
import { AppRole } from '../models/UserRole';
import { PermissionCategory, PermissionAction } from '../models/Permission';

export const hasPermission = async (
  userId: string,
  category: PermissionCategory,
  action: PermissionAction,
  options?: {
    resource?: string;
    departmentId?: string;
  }
): Promise<boolean> => {
  try {
    // Get user's active roles
    const userRoles = await UserRole.find({
      userId,
      isActive: true
    });

    const roles = userRoles.map(ur => ur.role);

    // Check if user has permission
    const permission = await Permission.findOne({
      role: { $in: roles },
      category,
      action,
      ...(options?.resource && { resource: options.resource }),
      isActive: true
    });

    if (!permission) return false;

    // Check department restrictions
    if (permission.conditions?.departmentOnly && options?.departmentId) {
      const hasRoleInDepartment = userRoles.some(
        ur => ur.departmentId?.toString() === options.departmentId
      );
      return hasRoleInDepartment;
    }

    return true;
  } catch (error) {
    console.error('Permission check error:', error);
    return false;
  }
};
```
