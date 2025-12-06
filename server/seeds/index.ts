import dotenv from 'dotenv';
import connectDB from '../config/db';
import { seedPermissions } from './permissions';
import { seedAdminUser } from './adminUser';
import { seedDepartments } from './departments';

dotenv.config();

const runSeeds = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Connect to database
    await connectDB();

    // Run seeds in order
    await seedPermissions();
    console.log('');
    
    await seedDepartments();
    console.log('');
    
    await seedAdminUser();
    console.log('');

    console.log('✅ All seeds completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Login with the admin credentials');
    console.log('2. Change the admin password');
    console.log('3. Start assigning roles to users');
    console.log('4. Configure department HODs\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

runSeeds();
