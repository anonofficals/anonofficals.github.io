# MongoDB Models Documentation

## Overview
Complete MongoDB models for the multi-user role system with security, audit trails, and permissions.

---

## 1. UserRole Model

**File**: `server/models/UserRole.ts`

```typescript
import mongoose, { Document, Schema } from 'mongoose';

export enum AppRole {
  CEO = 'ceo',
  CONTENT_MANAGER = 'content-manager',
  FINANCE_MANAGER = 'finance-manager',
  HR = 'hr',
  HOD = 'hod',
  PROJECT_MANAGER = 'project-manager',
  EMPLOYEE = 'employee',
  INTERN = 'intern',
  STUDENT = 'student',
  CLIENT = 'client',
  RESEARCH_COLLABORATOR = 'research-collaborator',
  AUDITOR = 'auditor'
}

export interface IUserRole extends Document {
  userId: mongoose.Types.ObjectId;
  role: AppRole;
  departmentId?: mongoose.Types.ObjectId;
  assignedBy: mongoose.Types.ObjectId;
  assignedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  metadata?: {
    reason?: string;
    notes?: string;
    ipAddress?: string;
  };
}

const UserRoleSchema: Schema<IUserRole> = new Schema(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      index: true 
    },
    role: { 
      type: String, 
      enum: Object.values(AppRole), 
      required: true,
      index: true 
    },
    departmentId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Department',
      index: true 
    },
    assignedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    assignedAt: { 
      type: Date, 
      default: Date.now,
      index: true 
    },
    expiresAt: { 
      type: Date,
      index: true 
    },
    isActive: { 
      type: Boolean, 
      default: true,
      index: true 
    },
    metadata: {
      reason: String,
      notes: String,
      ipAddress: String
    }
  },
  { timestamps: true }
);

// Compound indexes for efficient queries
UserRoleSchema.index({ userId: 1, role: 1 }, { unique: true });
UserRoleSchema.index({ userId: 1, isActive: 1 });
UserRoleSchema.index({ role: 1, isActive: 1 });
UserRoleSchema.index({ departmentId: 1, isActive: 1 });

const UserRole = mongoose.model<IUserRole>('UserRole', UserRoleSchema);

export default UserRole;
```

---

## 2. Permission Model

**File**: `server/models/Permission.ts`

```typescript
import mongoose, { Document, Schema } from 'mongoose';
import { AppRole } from './UserRole';

export enum PermissionCategory {
  USERS = 'users',
  ROLES = 'roles',
  DEPARTMENTS = 'departments',
  PROJECTS = 'projects',
  FINANCE = 'finance',
  ANALYTICS = 'analytics',
  APPLICATIONS = 'applications',
  INTERNSHIPS = 'internships',
  CONTENT = 'content',
  SYSTEM = 'system'
}

export enum PermissionAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage',
  APPROVE = 'approve',
  EXPORT = 'export'
}

export interface IPermission extends Document {
  role: AppRole;
  category: PermissionCategory;
  action: PermissionAction;
  resource?: string;
  conditions?: {
    departmentOnly?: boolean;
    ownOnly?: boolean;
    statusRestrictions?: string[];
  };
  description?: string;
  isActive: boolean;
}

const PermissionSchema: Schema<IPermission> = new Schema(
  {
    role: { 
      type: String, 
      enum: Object.values(AppRole), 
      required: true,
      index: true 
    },
    category: { 
      type: String, 
      enum: Object.values(PermissionCategory), 
      required: true,
      index: true 
    },
    action: { 
      type: String, 
      enum: Object.values(PermissionAction), 
      required: true 
    },
    resource: { 
      type: String 
    },
    conditions: {
      departmentOnly: { type: Boolean, default: false },
      ownOnly: { type: Boolean, default: false },
      statusRestrictions: [{ type: String }]
    },
    description: { type: String },
    isActive: { 
      type: Boolean, 
      default: true,
      index: true 
    }
  },
  { timestamps: true }
);

// Compound indexes
PermissionSchema.index({ role: 1, category: 1, action: 1 });
PermissionSchema.index({ role: 1, isActive: 1 });

const Permission = mongoose.model<IPermission>('Permission', PermissionSchema);

export default Permission;
```

---

## 3. RoleAssignment (Audit Log) Model

**File**: `server/models/RoleAssignment.ts`

```typescript
import mongoose, { Document, Schema } from 'mongoose';
import { AppRole } from './UserRole';

export enum AssignmentAction {
  ASSIGNED = 'assigned',
  REVOKED = 'revoked',
  UPDATED = 'updated',
  EXPIRED = 'expired'
}

export interface IRoleAssignment extends Document {
  userId: mongoose.Types.ObjectId;
  role: AppRole;
  action: AssignmentAction;
  performedBy: mongoose.Types.ObjectId;
  performedAt: Date;
  departmentId?: mongoose.Types.ObjectId;
  reason?: string;
  metadata: {
    ipAddress?: string;
    userAgent?: string;
    previousRole?: AppRole;
    expiresAt?: Date;
  };
}

const RoleAssignmentSchema: Schema<IRoleAssignment> = new Schema(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      index: true 
    },
    role: { 
      type: String, 
      enum: Object.values(AppRole), 
      required: true,
      index: true 
    },
    action: { 
      type: String, 
      enum: Object.values(AssignmentAction), 
      required: true,
      index: true 
    },
    performedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      index: true 
    },
    performedAt: { 
      type: Date, 
      default: Date.now,
      index: true 
    },
    departmentId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Department' 
    },
    reason: { type: String },
    metadata: {
      ipAddress: String,
      userAgent: String,
      previousRole: { type: String, enum: Object.values(AppRole) },
      expiresAt: Date
    }
  },
  { timestamps: true }
);

// Indexes for audit queries
RoleAssignmentSchema.index({ userId: 1, performedAt: -1 });
RoleAssignmentSchema.index({ performedBy: 1, performedAt: -1 });
RoleAssignmentSchema.index({ action: 1, performedAt: -1 });

const RoleAssignment = mongoose.model<IRoleAssignment>('RoleAssignment', RoleAssignmentSchema);

export default RoleAssignment;
```

---

## 4. UserInvitation Model

**File**: `server/models/UserInvitation.ts`

```typescript
import mongoose, { Document, Schema } from 'mongoose';
import { AppRole } from './UserRole';
import crypto from 'crypto';

export enum InvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  EXPIRED = 'expired',
  REVOKED = 'revoked'
}

export interface IUserInvitation extends Document {
  email: string;
  role: AppRole;
  departmentId?: mongoose.Types.ObjectId;
  invitedBy: mongoose.Types.ObjectId;
  invitedAt: Date;
  token: string;
  expiresAt: Date;
  status: InvitationStatus;
  acceptedAt?: Date;
  acceptedUserId?: mongoose.Types.ObjectId;
  metadata?: {
    message?: string;
    permissions?: string[];
  };
  generateToken(): string;
  isExpired(): boolean;
}

const UserInvitationSchema: Schema<IUserInvitation> = new Schema(
  {
    email: { 
      type: String, 
      required: true, 
      lowercase: true,
      index: true 
    },
    role: { 
      type: String, 
      enum: Object.values(AppRole), 
      required: true 
    },
    departmentId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Department' 
    },
    invitedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      index: true 
    },
    invitedAt: { 
      type: Date, 
      default: Date.now,
      index: true 
    },
    token: { 
      type: String, 
      required: true, 
      unique: true,
      index: true 
    },
    expiresAt: { 
      type: Date, 
      required: true,
      index: true 
    },
    status: { 
      type: String, 
      enum: Object.values(InvitationStatus), 
      default: InvitationStatus.PENDING,
      index: true 
    },
    acceptedAt: { type: Date },
    acceptedUserId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    metadata: {
      message: String,
      permissions: [String]
    }
  },
  { timestamps: true }
);

// Methods
UserInvitationSchema.methods.generateToken = function(): string {
  this.token = crypto.randomBytes(32).toString('hex');
  return this.token;
};

UserInvitationSchema.methods.isExpired = function(): boolean {
  return this.expiresAt < new Date() || this.status !== InvitationStatus.PENDING;
};

// Compound indexes
UserInvitationSchema.index({ email: 1, status: 1 });
UserInvitationSchema.index({ token: 1, status: 1 });

const UserInvitation = mongoose.model<IUserInvitation>('UserInvitation', UserInvitationSchema);

export default UserInvitation;
```

---

## 5. Department Model

**File**: `server/models/Department.ts`

```typescript
import mongoose, { Document, Schema } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  code: string;
  description?: string;
  hodId?: mongoose.Types.ObjectId;
  budget?: number;
  allocatedBudget?: number;
  isActive: boolean;
  metadata?: {
    location?: string;
    contactEmail?: string;
    teamSize?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const DepartmentSchema: Schema<IDepartment> = new Schema(
  {
    name: { 
      type: String, 
      required: true, 
      unique: true,
      index: true 
    },
    code: { 
      type: String, 
      required: true, 
      unique: true,
      uppercase: true,
      index: true 
    },
    description: { type: String },
    hodId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      index: true 
    },
    budget: { 
      type: Number, 
      default: 0 
    },
    allocatedBudget: { 
      type: Number, 
      default: 0 
    },
    isActive: { 
      type: Boolean, 
      default: true,
      index: true 
    },
    metadata: {
      location: String,
      contactEmail: String,
      teamSize: Number
    }
  },
  { timestamps: true }
);

// Indexes
DepartmentSchema.index({ code: 1, isActive: 1 });

const Department = mongoose.model<IDepartment>('Department', DepartmentSchema);

export default Department;
```

---

## Index Summary

### Critical Indexes by Model

**UserRole**:
- `{ userId: 1, role: 1 }` (unique)
- `{ userId: 1, isActive: 1 }`
- `{ role: 1, isActive: 1 }`
- `{ departmentId: 1, isActive: 1 }`

**Permission**:
- `{ role: 1, category: 1, action: 1 }`
- `{ role: 1, isActive: 1 }`

**RoleAssignment**:
- `{ userId: 1, performedAt: -1 }`
- `{ performedBy: 1, performedAt: -1 }`
- `{ action: 1, performedAt: -1 }`

**UserInvitation**:
- `{ email: 1, status: 1 }`
- `{ token: 1, status: 1 }`

**Department**:
- `{ code: 1, isActive: 1 }`

---

## Usage Examples

### Create a User Role
```typescript
import UserRole, { AppRole } from './models/UserRole';

const userRole = new UserRole({
  userId: userId,
  role: AppRole.HR,
  departmentId: departmentId,
  assignedBy: adminUserId,
  metadata: {
    reason: 'New hire onboarding',
    ipAddress: req.ip
  }
});

await userRole.save();
```

### Query User Roles
```typescript
// Get all active roles for a user
const roles = await UserRole.find({ 
  userId: userId, 
  isActive: true 
}).populate('departmentId');

// Get all users with a specific role
const hrUsers = await UserRole.find({ 
  role: AppRole.HR, 
  isActive: true 
}).populate('userId');
```

### Check Permissions
```typescript
import Permission, { PermissionCategory, PermissionAction } from './models/Permission';

const hasPermission = await Permission.findOne({
  role: AppRole.HR,
  category: PermissionCategory.USERS,
  action: PermissionAction.CREATE,
  isActive: true
});
```
