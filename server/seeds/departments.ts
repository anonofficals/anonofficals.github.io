import Department from '../models/Department';

export const seedDepartments = async () => {
  console.log('Seeding departments...');

  const departments = [
    {
      name: 'Artificial Intelligence & Machine Learning',
      code: 'AIML',
      description: 'AI/ML research and development',
      budget: {
        total: 500000,
        allocated: 0,
        spent: 0,
        currency: 'USD',
      },
      isActive: true,
    },
    {
      name: 'Robotics & Automation',
      code: 'ROBOT',
      description: 'Robotics systems and automation',
      budget: {
        total: 750000,
        allocated: 0,
        spent: 0,
        currency: 'USD',
      },
      isActive: true,
    },
    {
      name: 'Blockchain Development',
      code: 'BLOCKCHAIN',
      description: 'Blockchain and distributed systems',
      budget: {
        total: 400000,
        allocated: 0,
        spent: 0,
        currency: 'USD',
      },
      isActive: true,
    },
    {
      name: 'Web & Mobile Development',
      code: 'WEBMOB',
      description: 'Web and mobile application development',
      budget: {
        total: 300000,
        allocated: 0,
        spent: 0,
        currency: 'USD',
      },
      isActive: true,
    },
    {
      name: 'Cybersecurity',
      code: 'CYBERSEC',
      description: 'Security and network protection',
      budget: {
        total: 450000,
        allocated: 0,
        spent: 0,
        currency: 'USD',
      },
      isActive: true,
    },
    {
      name: 'Networking & Infrastructure',
      code: 'NETINF',
      description: 'Network infrastructure and systems',
      budget: {
        total: 350000,
        allocated: 0,
        spent: 0,
        currency: 'USD',
      },
      isActive: true,
    },
    {
      name: 'Research & Development',
      code: 'RND',
      description: 'Research and innovation lab',
      budget: {
        total: 600000,
        allocated: 0,
        spent: 0,
        currency: 'USD',
      },
      isActive: true,
    },
    {
      name: 'Human Resources',
      code: 'HR',
      description: 'Human resources and talent management',
      budget: {
        total: 200000,
        allocated: 0,
        spent: 0,
        currency: 'USD',
      },
      isActive: true,
    },
    {
      name: 'Finance & Accounting',
      code: 'FINANCE',
      description: 'Financial operations and accounting',
      budget: {
        total: 150000,
        allocated: 0,
        spent: 0,
        currency: 'USD',
      },
      isActive: true,
    },
    {
      name: 'Content & Marketing',
      code: 'CONTENT',
      description: 'Content creation and marketing',
      budget: {
        total: 250000,
        allocated: 0,
        spent: 0,
        currency: 'USD',
      },
      isActive: true,
    },
  ];

  try {
    // Check if departments already exist
    const existingCount = await Department.countDocuments();
    
    if (existingCount > 0) {
      console.log(`ℹ️  ${existingCount} departments already exist, skipping seed`);
      return;
    }

    // Insert departments
    await Department.insertMany(departments);

    console.log(`✅ ${departments.length} departments seeded successfully`);
  } catch (error) {
    console.error('❌ Error seeding departments:', error);
    throw error;
  }
};
