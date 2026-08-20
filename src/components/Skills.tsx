import React, { useState } from 'react';
import {
  Code,
  Globe,
  Database,
  Wrench,
  Terminal,
  FileCode,
  Coffee,
  Braces,
  Binary,
  Layout,
  Palette,
  Atom,
  Server,
  Layers,
  HardDrive,
  GitBranch,
  Github,
  Cpu,
  Sparkles,
  Check
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { Skill } from '../types/portfolio';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'languages' | 'web' | 'database' | 'tools'>('all');

  const categories = [
    { key: 'all', label: 'All Skills', icon: Sparkles, count: skillsData.length },
    { key: 'languages', label: 'Programming Languages', icon: Code, count: skillsData.filter(s => s.category === 'languages').length },
    { key: 'web', label: 'Web Development', icon: Globe, count: skillsData.filter(s => s.category === 'web').length },
    { key: 'database', label: 'Databases', icon: Database, count: skillsData.filter(s => s.category === 'database').length },
    { key: 'tools', label: 'Tools & Hardware', icon: Wrench, count: skillsData.filter(s => s.category === 'tools').length },
  ];

  const filteredSkills = selectedCategory === 'all'
    ? skillsData
    : skillsData.filter(s => s.category === selectedCategory);

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-5 h-5 text-indigo-400" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-blue-400" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-amber-400" />;
      case 'Braces': return <Braces className="w-5 h-5 text-yellow-400" />;
      case 'Binary': return <Binary className="w-5 h-5 text-emerald-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-orange-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-cyan-400" />;
      case 'Atom': return <Atom className="w-5 h-5 text-sky-400" />;
      case 'Server': return <Server className="w-5 h-5 text-green-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-purple-400" />;
      case 'Database': return <Database className="w-5 h-5 text-indigo-400" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5 text-emerald-400" />;
      case 'DatabaseZap': return <Database className="w-5 h-5 text-blue-400" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-orange-400" />;
      case 'Github': return <Github className="w-5 h-5 text-slate-200" />;
      case 'Code': return <Code className="w-5 h-5 text-blue-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-teal-400" />;
      default: return <Code className="w-5 h-5 text-indigo-400" />;
    }
  };

  const getProficiencyBadgeColor = (prof: string) => {
    switch (prof) {
      case 'Advanced':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Proficient':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Intermediate':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-white/5 text-slate-300 border-white/10';
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-mono mb-3 backdrop-blur-md">
            <Wrench className="w-3.5 h-3.5" />
            <span>Technical Proficiency & Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & Competencies
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-3 mb-2" />
          <p className="text-sm text-slate-400 max-w-xl">
            A comprehensive overview of programming languages, modern web frameworks, database engines, and developer tools in my workflow.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                id={`btn-skill-cat-${cat.key}`}
                onClick={() => setSelectedCategory(cat.key as any)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer backdrop-blur-md ${
                  isSelected
                    ? 'bg-white text-slate-900 font-bold shadow-lg shadow-black/20 border border-white/30'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-slate-200 text-slate-900 font-bold' : 'bg-white/10 text-slate-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredSkills.map((skill: Skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.08] transition-all duration-300 group shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Icon, Title & Proficiency */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {getSkillIcon(skill.icon)}
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getProficiencyBadgeColor(skill.proficiency)}`}>
                    {skill.proficiency}
                  </span>
                </div>

                {/* Skill Name */}
                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition">
                  {skill.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed line-clamp-2">
                  {skill.description}
                </p>
              </div>

              <div>
                {/* Animated Level Bar */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Proficiency</span>
                    <span className="text-blue-300 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-1000 group-hover:opacity-100 opacity-80"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

                {/* Tags */}
                {skill.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                    {skill.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
