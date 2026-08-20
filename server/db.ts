import { MongoClient, Db } from 'mongodb';

let dbInstance: Db | null = null;
let clientInstance: MongoClient | null = null;

// In-memory fallback data store for initial catalog & contact messages
export interface StoredProject {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  category: string;
  githubUrl: string;
  liveDemoUrl?: string;
  featured?: boolean;
  metrics?: string;
  createdAt?: Date;
}

export interface StoredContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: Date;
  ip?: string;
}

const inMemoryProjects: StoredProject[] = [
  {
    id: 'street-light-controller',
    title: 'Automatic Street Light Controller',
    description: 'An Arduino-based smart IoT system that automatically controls street lights based on surrounding light intensity.',
    longDescription: 'Designed and built an intelligent lighting control system using an Arduino microcontroller, Light Dependent Resistor (LDR) analog sensors, and relay switches.',
    image: '/src/assets/images/street_light_controller_1787213899467.jpg',
    technologies: ['Arduino', 'C/C++', 'LDR Sensor', 'Relay Module'],
    category: 'iot',
    githubUrl: 'https://github.com/yashas-c/automatic-street-light-controller',
    liveDemoUrl: 'https://github.com/yashas-c/automatic-street-light-controller',
    featured: true,
    metrics: 'Energy Efficient'
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio Website',
    description: 'A responsive full-stack portfolio website showcasing projects, technical skills, education, and achievements.',
    longDescription: 'Engineered with React, Vite, Tailwind CSS, and a Node.js Express backend with MongoDB and profile photo management.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    technologies: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Express.js'],
    category: 'fullstack',
    githubUrl: 'https://github.com/yashas-c/yashas-c-portfolio',
    liveDemoUrl: 'https://github.com/yashas-c/yashas-c-portfolio',
    featured: true,
    metrics: 'Full-Stack Portfolio'
  },
  {
    id: 'government-services-locator',
    title: 'Government Services Locator',
    description: 'A web/mobile application prototype that helps citizens locate nearby public government offices and essential civic services.',
    longDescription: 'Categorized search for municipal offices, civil identity centers, and public utilities with operating hours and checklists.',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=900&q=80',
    technologies: ['React.js', 'JavaScript', 'Node.js', 'REST API'],
    category: 'web',
    githubUrl: 'https://github.com/yashas-c/government-services-locator',
    liveDemoUrl: 'https://github.com/yashas-c/government-services-locator',
    featured: true,
    metrics: 'Citizen Utility'
  }
];

const inMemoryMessages: StoredContactMessage[] = [];

/**
 * Connect to MongoDB database if URI is provided in environment variables.
 */
export async function getDatabase(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return null;
  }

  if (dbInstance) {
    return dbInstance;
  }

  try {
    clientInstance = new MongoClient(uri);
    await clientInstance.connect();
    dbInstance = clientInstance.db(process.env.MONGODB_DB_NAME || 'yashas_portfolio');
    console.log('✅ Successfully connected to MongoDB cluster');
    return dbInstance;
  } catch (err) {
    console.warn('⚠️ MongoDB connection failed, using in-memory fallback store:', err);
    return null;
  }
}

// Project Operations
export async function getAllProjects(): Promise<StoredProject[]> {
  const db = await getDatabase();
  if (db) {
    try {
      const items = await db.collection<StoredProject>('projects').find().toArray();
      if (items.length > 0) return items;
    } catch (err) {
      console.error('Error fetching projects from MongoDB:', err);
    }
  }
  return [...inMemoryProjects];
}

export async function createProject(project: StoredProject): Promise<StoredProject> {
  const db = await getDatabase();
  if (db) {
    try {
      await db.collection('projects').insertOne({ ...project, createdAt: new Date() });
      return project;
    } catch (err) {
      console.error('Error creating project in MongoDB:', err);
    }
  }
  inMemoryProjects.unshift(project);
  return project;
}

export async function updateProject(id: string, updates: Partial<StoredProject>): Promise<StoredProject | null> {
  const db = await getDatabase();
  if (db) {
    try {
      await db.collection('projects').updateOne({ id }, { $set: updates });
      const updated = await db.collection<StoredProject>('projects').findOne({ id });
      if (updated) return updated;
    } catch (err) {
      console.error('Error updating project in MongoDB:', err);
    }
  }
  const idx = inMemoryProjects.findIndex(p => p.id === id);
  if (idx !== -1) {
    inMemoryProjects[idx] = { ...inMemoryProjects[idx], ...updates };
    return inMemoryProjects[idx];
  }
  return null;
}

export async function deleteProject(id: string): Promise<boolean> {
  const db = await getDatabase();
  if (db) {
    try {
      const res = await db.collection('projects').deleteOne({ id });
      return res.deletedCount > 0;
    } catch (err) {
      console.error('Error deleting project in MongoDB:', err);
    }
  }
  const idx = inMemoryProjects.findIndex(p => p.id === id);
  if (idx !== -1) {
    inMemoryProjects.splice(idx, 1);
    return true;
  }
  return false;
}

// Contact Operations
export async function saveContactMessage(msg: StoredContactMessage): Promise<StoredContactMessage> {
  const db = await getDatabase();
  if (db) {
    try {
      await db.collection('messages').insertOne(msg);
      return msg;
    } catch (err) {
      console.error('Error saving message in MongoDB:', err);
    }
  }
  inMemoryMessages.unshift(msg);
  return msg;
}

export async function getContactMessages(): Promise<StoredContactMessage[]> {
  const db = await getDatabase();
  if (db) {
    try {
      return await db.collection<StoredContactMessage>('messages').find().sort({ createdAt: -1 }).toArray();
    } catch (err) {
      console.error('Error fetching messages from MongoDB:', err);
    }
  }
  return [...inMemoryMessages];
}
