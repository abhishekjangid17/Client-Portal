const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Clean up existing guest data
  const existing = await User.findOne({ email: 'guest@demo.com' });
  if (existing) {
    await Project.deleteMany({ admin: existing._id });
    await User.deleteOne({ _id: existing._id });
    console.log('Cleaned old guest data');
  }

  // Create guest user
  const hashedPassword = await bcrypt.hash('demo1234', 10);
  const guest = await User.create({
    name: 'Alex Johnson',
    email: 'guest@demo.com',
    password: hashedPassword,
    role: 'admin',
  });
  console.log('Guest user created');

  // Create projects
  const p1 = await Project.create({
    title: 'E-Commerce Website Redesign',
    description: 'Full redesign of the client shopping experience with new UI components and checkout flow.',
    status: 'active',
    admin: guest._id,
    deadline: new Date('2026-07-15'),
  });

  const p2 = await Project.create({
    title: 'Mobile App Development',
    description: 'React Native app for iOS and Android with push notifications and offline support.',
    status: 'active',
    admin: guest._id,
    deadline: new Date('2026-08-30'),
  });

  const p3 = await Project.create({
    title: 'Brand Identity Package',
    description: 'Logo, typography, color palette and brand guidelines for a fintech startup.',
    status: 'completed',
    admin: guest._id,
    deadline: new Date('2026-05-01'),
  });

  const p4 = await Project.create({
    title: 'SEO & Analytics Dashboard',
    description: 'Custom analytics dashboard pulling data from Google Search Console and GA4.',
    status: 'on-hold',
    admin: guest._id,
    deadline: new Date('2026-09-10'),
  });

  console.log('Projects created');

  // Tasks for project 1
  await Task.insertMany([
    { title: 'Audit current website UX', description: 'Document pain points in current checkout flow', status: 'done', priority: 'high', project: p1._id, dueDate: new Date('2026-06-01') },
    { title: 'Design new homepage wireframes', description: 'Create low and high fidelity wireframes in Figma', status: 'done', priority: 'high', project: p1._id, dueDate: new Date('2026-06-10') },
    { title: 'Build product listing page', description: 'React component with filters, sorting and pagination', status: 'in-progress', priority: 'high', project: p1._id, dueDate: new Date('2026-06-20') },
    { title: 'Integrate Stripe payments', description: 'Stripe checkout with webhook handling', status: 'in-progress', priority: 'medium', project: p1._id, dueDate: new Date('2026-07-01') },
    { title: 'Mobile responsiveness pass', description: 'Make all pages fully responsive on mobile', status: 'todo', priority: 'medium', project: p1._id, dueDate: new Date('2026-07-10') },
    { title: 'Performance optimisation', description: 'Lighthouse score above 90 on all pages', status: 'todo', priority: 'low', project: p1._id, dueDate: new Date('2026-07-14') },
  ]);

  // Tasks for project 2
  await Task.insertMany([
    { title: 'Set up React Native project', description: 'Expo setup with TypeScript and navigation', status: 'done', priority: 'high', project: p2._id, dueDate: new Date('2026-06-05') },
    { title: 'Authentication screens', description: 'Login, register, forgot password flows', status: 'in-progress', priority: 'high', project: p2._id, dueDate: new Date('2026-06-25') },
    { title: 'Push notification system', description: 'Firebase Cloud Messaging integration', status: 'todo', priority: 'medium', project: p2._id, dueDate: new Date('2026-07-20') },
    { title: 'Offline data sync', description: 'AsyncStorage + background sync logic', status: 'todo', priority: 'medium', project: p2._id, dueDate: new Date('2026-08-01') },
    { title: 'App Store submission', description: 'Screenshots, metadata, review guidelines', status: 'todo', priority: 'low', project: p2._id, dueDate: new Date('2026-08-25') },
  ]);

  // Tasks for project 3
  await Task.insertMany([
    { title: 'Brand discovery workshop', description: 'Client interview and mood board creation', status: 'done', priority: 'high', project: p3._id },
    { title: 'Logo concepts (3 directions)', description: 'Present 3 distinct visual directions', status: 'done', priority: 'high', project: p3._id },
    { title: 'Final logo refinement', description: 'Refine chosen direction, deliver all formats', status: 'done', priority: 'high', project: p3._id },
    { title: 'Brand guidelines PDF', description: '40-page brand book with usage rules', status: 'done', priority: 'medium', project: p3._id },
  ]);

  // Tasks for project 4
  await Task.insertMany([
    { title: 'GA4 API integration', description: 'Connect Google Analytics 4 data API', status: 'done', priority: 'high', project: p4._id },
    { title: 'Search Console data pull', description: 'Keywords, impressions, CTR over time', status: 'in-progress', priority: 'high', project: p4._id },
    { title: 'Dashboard UI design', description: 'Charts, filters and date range picker', status: 'todo', priority: 'medium', project: p4._id },
    { title: 'Automated weekly reports', description: 'PDF export sent via email every Monday', status: 'todo', priority: 'low', project: p4._id },
  ]);

  console.log('Tasks created');
  console.log('✅ Seed complete! Guest credentials: guest@demo.com / demo1234');
  process.exit(0);
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});