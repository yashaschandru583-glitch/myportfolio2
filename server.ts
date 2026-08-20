import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  saveContactMessage,
  getContactMessages,
  StoredProject,
  StoredContactMessage
} from './server/db';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Health Check Endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      owner: 'YASHAS C',
      title: 'Computer Science Student & Aspiring Software Developer',
      timestamp: new Date().toISOString(),
      database: process.env.MONGODB_URI ? 'MongoDB Connected' : 'In-Memory Fallback'
    });
  });

  // Projects API
  app.get('/api/projects', async (req: Request, res: Response) => {
    try {
      const projects = await getAllProjects();
      res.json(projects);
    } catch (err) {
      console.error('Failed to get projects:', err);
      res.status(500).json({ error: 'Failed to retrieve projects' });
    }
  });

  app.post('/api/projects', async (req: Request, res: Response) => {
    try {
      const { title, description, longDescription, image, technologies, category, githubUrl, liveDemoUrl, metrics } = req.body;
      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
      }

      const newProject: StoredProject = {
        id: `proj-${Date.now()}`,
        title,
        description,
        longDescription: longDescription || description,
        image: image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
        technologies: Array.isArray(technologies) ? technologies : (technologies ? [technologies] : ['JavaScript']),
        category: category || 'web',
        githubUrl: githubUrl || 'https://github.com/yashas-c',
        liveDemoUrl: liveDemoUrl || githubUrl || 'https://github.com/yashas-c',
        metrics: metrics || 'Active',
        featured: false,
        createdAt: new Date()
      };

      const saved = await createProject(newProject);
      res.status(201).json({ success: true, project: saved });
    } catch (err) {
      console.error('Failed to create project:', err);
      res.status(500).json({ error: 'Internal server error while saving project' });
    }
  });

  app.put('/api/projects/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updated = await updateProject(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json({ success: true, project: updated });
    } catch (err) {
      console.error('Failed to update project:', err);
      res.status(500).json({ error: 'Failed to update project' });
    }
  });

  app.delete('/api/projects/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await deleteProject(id);
      if (!success) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json({ success: true, message: 'Project deleted successfully' });
    } catch (err) {
      console.error('Failed to delete project:', err);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  });

  // Contact API Endpoint
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
      }

      const newMessage: StoredContactMessage = {
        id: `msg-${Date.now()}`,
        name,
        email,
        subject: subject || 'Portfolio Inquiry',
        message,
        createdAt: new Date(),
        ip: req.ip
      };

      await saveContactMessage(newMessage);

      console.log(`📩 New portfolio message received from ${name} (${email}): "${subject}"`);

      res.status(200).json({
        success: true,
        message: 'Message successfully sent to Yashas C! Thank you for getting in touch.'
      });
    } catch (err) {
      console.error('Contact endpoint error:', err);
      res.status(500).json({ error: 'Server error processing contact message' });
    }
  });

  app.get('/api/contact/messages', async (req: Request, res: Response) => {
    try {
      const messages = await getContactMessages();
      res.json(messages);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });

  // Vite development middleware or static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Yashas C Portfolio server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
