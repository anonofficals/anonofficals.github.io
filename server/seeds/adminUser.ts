import User from '../models/User';
import UserRole, { AppRole } from '../models/UserRole';

export const seedAdminUser = async () => {
  console.log('Seeding admin user...');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@company.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
  const adminName = process.env.ADMIN_NAME || 'System Administrator';

  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
      
      // Ensure admin has CEO role
      const adminRole = await UserRole.findOne({
        userId: existingAdmin._id,
        role: AppRole.CEO,
        isActive: true,
      });

      if (!adminRole) {
        await UserRole.create({
          userId: existingAdmin._id,
          role: AppRole.CEO,
          assignedBy: existingAdmin._id,
          isActive: true,
        });
        console.log('✅ CEO role assigned to existing admin');
      }

      return existingAdmin;
    }

    // Create admin user
    const adminUser = new User({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'admin', // Legacy field, will use UserRole for actual permissions
    });

    await adminUser.save();

    // Assign CEO role
    const ceoRole = new UserRole({
      userId: adminUser._id,
      role: AppRole.CEO,
      assignedBy: adminUser._id, // Self-assigned on creation
      isActive: true,
      metadata: {
        reason: 'Initial system setup',
        notes: 'Created during database seeding',
      },
    });

    await ceoRole.save();

    console.log('✅ Admin user created successfully');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('⚠️  IMPORTANT: Change the admin password after first login!');

    return adminUser;
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    throw error;
  }
};
