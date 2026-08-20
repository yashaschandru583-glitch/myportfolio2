import React, { useState, useEffect } from 'react';
import {
  Code,
  Github,
  ExternalLink,
  Layers,
  Sparkles,
  Cpu,
  Globe,
  Plus,
  X,
  Check,
  AlertCircle,
  FolderGit2,
  Maximize2
} from 'lucide-react';
import { initialProjects } from '../data/portfolioData';
import { Project } from '../types/portfolio';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'fullstack' | 'iot' | 'web'>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiNotice, setApiNotice] = useState<string | null>(null);

  // Form state for adding project via API
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: 'web',
    technologies: '',
    githubUrl: '',
    liveDemoUrl: '',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
    metrics: 'Active Build'
  });

  useEffect(() => {
    // Attempt to fetch from Express backend API if available
    fetch('/api/projects')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('API not available');
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {
        // Fallback to client-side initial projects seamlessly
      });
  }, []);

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory || (selectedCategory === 'all'));

  const handleAddProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;

    setIsSubmitting(true);
    setApiNotice(null);

    const projectPayload: Project = {
      id: `custom-${Date.now()}`,
      title: newProject.title,
      description: newProject.description,
      longDescription: newProject.longDescription || newProject.description,
      category: newProject.category as any,
      technologies: newProject.technologies.split(',').map(t => t.trim()).filter(Boolean),
      githubUrl: newProject.githubUrl || 'https://github.com/yashas-c',
      liveDemoUrl: newProject.liveDemoUrl || newProject.githubUrl || 'https://github.com/yashas-c',
      image: newProject.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
      featured: false,
      metrics: newProject.metrics
    };

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectPayload)
      });

      if (res.ok) {
        const saved = await res.json();
        setProjects(prev => [saved.project || projectPayload, ...prev]);
        setApiNotice('Project added to backend & local catalog successfully!');
      } else {
        // Local fallback
        setProjects(prev => [projectPayload, ...prev]);
        setApiNotice('Project added to current catalog!');
      }
    } catch {
      setProjects(prev => [projectPayload, ...prev]);
      setApiNotice('Project added to local catalog!');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setIsAddModalOpen(false);
        setApiNotice(null);
        setNewProject({
          title: '',
          description: '',
          longDescription: '',
          category: 'web',
          technologies: '',
          githubUrl: '',
          liveDemoUrl: '',
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
          metrics: 'Active Build'
        });
      }, 1200);
    }
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-mono mb-3 backdrop-blur-md">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Projects Portfolio
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-3 mb-2" />
          <p className="text-sm text-slate-400 max-w-2xl">
            Explore hardware IoT systems, full-stack web platforms, and software tools engineered with clean architecture and modern frameworks.
          </p>
        </div>

        {/* Filter Controls & Add Project Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              id="btn-proj-filter-all"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer backdrop-blur-md ${
                selectedCategory === 'all'
                  ? 'bg-white text-slate-900 font-bold shadow-lg shadow-black/20 border border-white/30'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              All Projects ({projects.length})
            </button>

            <button
              type="button"
              id="btn-proj-filter-iot"
              onClick={() => setSelectedCategory('iot')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer backdrop-blur-md ${
                selectedCategory === 'iot'
                  ? 'bg-white text-slate-900 font-bold shadow-lg shadow-black/20 border border-white/30'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>IoT & Hardware</span>
            </button>

            <button
              type="button"
              id="btn-proj-filter-fullstack"
              onClick={() => setSelectedCategory('fullstack')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer backdrop-blur-md ${
                selectedCategory === 'fullstack'
                  ? 'bg-white text-slate-900 font-bold shadow-lg shadow-black/20 border border-white/30'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full-Stack Web</span>
            </button>

            <button
              type="button"
              id="btn-proj-filter-web"
              onClick={() => setSelectedCategory('web')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer backdrop-blur-md ${
                selectedCategory === 'web'
                  ? 'bg-white text-slate-900 font-bold shadow-lg shadow-black/20 border border-white/30'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Web Applications</span>
            </button>
          </div>

          <button
            type="button"
            id="btn-open-add-project"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 text-xs font-medium transition cursor-pointer backdrop-blur-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden hover:border-blue-500/50 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Project Image Container */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-xl bg-[#020617]/80 border border-white/15 text-[10px] font-mono text-blue-400 backdrop-blur-md uppercase">
                      {project.category}
                    </span>
                  </div>

                  {project.metrics && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 backdrop-blur-md">
                        {project.metrics}
                      </span>
                    </div>
                  )}

                  {/* Quick Details Trigger */}
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(project)}
                    className="absolute bottom-3 right-3 p-2 rounded-xl bg-[#020617]/80 text-slate-300 hover:text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md cursor-pointer"
                    title="View Detailed Architecture"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Project Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 text-blue-300 border border-white/10 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-medium transition"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-blue-50 text-xs transition shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Project Modal */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModalProject(null);
          }}
        >
          <div className="w-full max-w-2xl bg-[#020617]/95 border border-white/15 rounded-3xl shadow-2xl overflow-hidden p-6 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150 backdrop-blur-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">{activeModalProject.title}</h3>
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="w-full h-60 rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold text-blue-400 mb-1">Architecture & Implementation</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeModalProject.longDescription || activeModalProject.description}
                </p>
              </div>

              {activeModalProject.highlights && (
                <div>
                  <h4 className="text-xs uppercase font-bold text-blue-400 mb-2">Key Highlights</h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {activeModalProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="text-xs uppercase font-bold text-blue-400 mb-2">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.technologies.map((tech, idx) => (
                    <span key={idx} className="text-xs px-3 py-1 rounded-lg bg-white/5 text-blue-300 font-mono border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-medium"
              >
                <Github className="w-4 h-4" />
                <span>View Source</span>
              </a>
              {activeModalProject.liveDemoUrl && (
                <a
                  href={activeModalProject.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-blue-50 shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add New Project Modal (API Connected) */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddModalOpen(false);
          }}
        >
          <div className="w-full max-w-lg bg-[#020617]/95 border border-white/15 rounded-3xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto backdrop-blur-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">Add Project to Portfolio</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {apiNotice && (
              <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{apiNotice}</span>
              </div>
            )}

            <form onSubmit={handleAddProjectSubmit} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart IoT Soil Moisture Sensor"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-200 focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="web">Web Application</option>
                    <option value="iot">IoT & Hardware</option>
                    <option value="fullstack">Full-Stack</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Metrics / Badge</label>
                  <input
                    type="text"
                    placeholder="e.g. 99.8% Uptime"
                    value={newProject.metrics}
                    onChange={(e) => setNewProject({ ...newProject, metrics: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Short Description *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Brief 1-2 sentence overview of the project"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Technologies (comma separated) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arduino, C++, ESP8266, React"
                  value={newProject.technologies}
                  onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">GitHub Repo URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/yashas-c/..."
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Live Demo URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newProject.liveDemoUrl}
                    onChange={(e) => setNewProject({ ...newProject, liveDemoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold hover:bg-blue-50 transition disabled:opacity-50 shadow-md"
                >
                  {isSubmitting ? 'Saving...' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
