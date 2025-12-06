import Permission, { PermissionCategory, PermissionAction } from '../models/Permission';
import { AppRole } from '../models/UserRole';

export const seedPermissions = async () => {
  console.log('Seeding permissions...');

  const permissions = [
    // CEO - Full Access
    { role: AppRole.CEO, category: PermissionCategory.USERS, action: PermissionAction.MANAGE },
    { role: AppRole.CEO, category: PermissionCategory.ROLES, action: PermissionAction.MANAGE },
    { role: AppRole.CEO, category: PermissionCategory.DEPARTMENTS, action: PermissionAction.MANAGE },
    { role: AppRole.CEO, category: PermissionCategory.APPLICATIONS, action: PermissionAction.MANAGE },
    { role: AppRole.CEO, category: PermissionCategory.CONTENT, action: PermissionAction.MANAGE },
    { role: AppRole.CEO, category: PermissionCategory.PAGES, action: PermissionAction.MANAGE },
    { role: AppRole.CEO, category: PermissionCategory.PRICING, action: PermissionAction.MANAGE },
    { role: AppRole.CEO, category: PermissionCategory.PAYMENTS, action: PermissionAction.MANAGE },
    { role: AppRole.CEO, category: PermissionCategory.PROJECTS, action: PermissionAction.MANAGE },
    { role: AppRole.CEO, category: PermissionCategory.ANALYTICS, action: PermissionAction.READ },
    { role: AppRole.CEO, category: PermissionCategory.AUDIT, action: PermissionAction.READ },
    { role: AppRole.CEO, category: PermissionCategory.FILES, action: PermissionAction.MANAGE },

    // Content Manager
    { role: AppRole.CONTENT_MANAGER, category: PermissionCategory.CONTENT, action: PermissionAction.MANAGE },
    { role: AppRole.CONTENT_MANAGER, category: PermissionCategory.PAGES, action: PermissionAction.MANAGE },
    { role: AppRole.CONTENT_MANAGER, category: PermissionCategory.FILES, action: PermissionAction.MANAGE },
    { role: AppRole.CONTENT_MANAGER, category: PermissionCategory.APPLICATIONS, action: PermissionAction.READ },
    { role: AppRole.CONTENT_MANAGER, category: PermissionCategory.PROJECTS, action: PermissionAction.READ },

    // Finance Manager
    { role: AppRole.FINANCE_MANAGER, category: PermissionCategory.PRICING, action: PermissionAction.MANAGE },
    { role: AppRole.FINANCE_MANAGER, category: PermissionCategory.PAYMENTS, action: PermissionAction.MANAGE },
    { role: AppRole.FINANCE_MANAGER, category: PermissionCategory.ANALYTICS, action: PermissionAction.READ },
    { role: AppRole.FINANCE_MANAGER, category: PermissionCategory.DEPARTMENTS, action: PermissionAction.READ },

    // HR
    { role: AppRole.HR, category: PermissionCategory.USERS, action: PermissionAction.CREATE },
    { role: AppRole.HR, category: PermissionCategory.USERS, action: PermissionAction.UPDATE },
    { role: AppRole.HR, category: PermissionCategory.USERS, action: PermissionAction.READ },
    { role: AppRole.HR, category: PermissionCategory.ROLES, action: PermissionAction.CREATE },
    { role: AppRole.HR, category: PermissionCategory.ROLES, action: PermissionAction.UPDATE },
    { role: AppRole.HR, category: PermissionCategory.APPLICATIONS, action: PermissionAction.MANAGE },
    { role: AppRole.HR, category: PermissionCategory.DEPARTMENTS, action: PermissionAction.READ },
    { role: AppRole.HR, category: PermissionCategory.FILES, action: PermissionAction.READ },

    // HOD (Head of Department)
    { role: AppRole.HOD, category: PermissionCategory.USERS, action: PermissionAction.READ },
    { role: AppRole.HOD, category: PermissionCategory.PROJECTS, action: PermissionAction.MANAGE },
    { role: AppRole.HOD, category: PermissionCategory.DEPARTMENTS, action: PermissionAction.UPDATE },
    { role: AppRole.HOD, category: PermissionCategory.APPLICATIONS, action: PermissionAction.READ },
    { role: AppRole.HOD, category: PermissionCategory.FILES, action: PermissionAction.MANAGE },

    // Project Manager
    { role: AppRole.PROJECT_MANAGER, category: PermissionCategory.PROJECTS, action: PermissionAction.MANAGE },
    { role: AppRole.PROJECT_MANAGER, category: PermissionCategory.FILES, action: PermissionAction.MANAGE },
    { role: AppRole.PROJECT_MANAGER, category: PermissionCategory.USERS, action: PermissionAction.READ },

    // Auditor
    { role: AppRole.AUDITOR, category: PermissionCategory.AUDIT, action: PermissionAction.READ },
    { role: AppRole.AUDITOR, category: PermissionCategory.ANALYTICS, action: PermissionAction.READ },
    { role: AppRole.AUDITOR, category: PermissionCategory.USERS, action: PermissionAction.READ },
    { role: AppRole.AUDITOR, category: PermissionCategory.DEPARTMENTS, action: PermissionAction.READ },
    { role: AppRole.AUDITOR, category: PermissionCategory.PAYMENTS, action: PermissionAction.READ },

    // Employee
    { role: AppRole.EMPLOYEE, category: PermissionCategory.PROJECTS, action: PermissionAction.READ },
    { role: AppRole.EMPLOYEE, category: PermissionCategory.FILES, action: PermissionAction.READ },
    { role: AppRole.EMPLOYEE, category: PermissionCategory.CONTENT, action: PermissionAction.READ },

    // Intern
    { role: AppRole.INTERN, category: PermissionCategory.PROJECTS, action: PermissionAction.READ },
    { role: AppRole.INTERN, category: PermissionCategory.FILES, action: PermissionAction.READ },

    // Student
    { role: AppRole.STUDENT, category: PermissionCategory.CONTENT, action: PermissionAction.READ },
    { role: AppRole.STUDENT, category: PermissionCategory.APPLICATIONS, action: PermissionAction.CREATE },

    // Client
    { role: AppRole.CLIENT, category: PermissionCategory.PROJECTS, action: PermissionAction.READ },
    { role: AppRole.CLIENT, category: PermissionCategory.PAYMENTS, action: PermissionAction.READ },

    // Research Collaborator
    { role: AppRole.RESEARCH_COLLABORATOR, category: PermissionCategory.CONTENT, action: PermissionAction.CREATE },
    { role: AppRole.RESEARCH_COLLABORATOR, category: PermissionCategory.CONTENT, action: PermissionAction.READ },
    { role: AppRole.RESEARCH_COLLABORATOR, category: PermissionCategory.FILES, action: PermissionAction.MANAGE },

    // User (Default)
    { role: AppRole.USER, category: PermissionCategory.CONTENT, action: PermissionAction.READ },
    { role: AppRole.USER, category: PermissionCategory.APPLICATIONS, action: PermissionAction.CREATE },
  ];

  try {
    // Clear existing permissions
    await Permission.deleteMany({});

    // Insert new permissions
    await Permission.insertMany(permissions);

    console.log(`✅ ${permissions.length} permissions seeded successfully`);
  } catch (error) {
    console.error('❌ Error seeding permissions:', error);
    throw error;
  }
};
