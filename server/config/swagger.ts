import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Multi-User Role Management API',
      version: '1.0.0',
      description: 'Complete API documentation for the multi-user role-based system with MongoDB backend',
      contact: {
        name: 'API Support',
        email: 'support@yourcompany.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://api.yourcompany.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token in format: Bearer <token>',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            role: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        UserRole: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            userId: { type: 'string' },
            role: { type: 'string', enum: ['ceo', 'content_manager', 'finance_manager', 'hr', 'hod', 'project_manager', 'auditor', 'employee', 'intern', 'student', 'client', 'research_collaborator', 'user'] },
            departmentId: { type: 'string' },
            assignedBy: { type: 'string' },
            isActive: { type: 'boolean' },
            expiresAt: { type: 'string', format: 'date-time' },
          },
        },
        Permission: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            role: { type: 'string' },
            category: { type: 'string' },
            action: { type: 'string' },
            resource: { type: 'string' },
            isActive: { type: 'boolean' },
          },
        },
        Application: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            formType: { type: 'string' },
            targetId: { type: 'string' },
            targetTitle: { type: 'string' },
            applicantData: { type: 'object' },
            status: { type: 'string', enum: ['pending', 'under_review', 'shortlisted', 'accepted', 'rejected'] },
            submittedAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./server/routes/*.ts', './server/controllers/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
