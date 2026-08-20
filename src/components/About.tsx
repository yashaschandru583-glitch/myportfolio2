import React from 'react';
import { Briefcase, Code2, Globe, Cpu, CheckCircle2, Sparkles, Award, Layers, Calendar, Terminal } from 'lucide-react';
import { personalInfo, aboutDetails } from '../data/portfolioData';
import { ProfilePhotoUploader } from './ProfilePhotoUploader';
import { useProfilePhoto } from '../context/ProfilePhotoContext';

export const About: React.FC = () => {
  const { openUploadModal } = useProfilePhoto();

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-indigo-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      default:
        return <Terminal className="w-5 h-5 text-indigo-400" />;
    }
  };

  const stats = [
    { label: 'Projects Completed', value: `${personalInfo.projectsCompleted}+`, icon: Layers, color: 'text-blue-400', border: 'border-blue-500/20' },
    { label: 'Technologies Learned', value: `${personalInfo.technologiesLearned}+`, icon: Code2, color: 'text-indigo-400', border: 'border-indigo-500/20' },
    { label: 'Certifications', value: `${personalInfo.certificationsCount}+`, icon: Award, color: 'text-purple-400', border: 'border-purple-500/20' },
    { label: 'Years of Learning', value: `${personalInfo.yearsOfLearning}+`, icon: Calendar, color: 'text-emerald-400', border: 'border-emerald-500/20' },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-mono mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Background & Engineering Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-3" />
        </div>

        {/* Main Grid: Profile Card on left, Story & Interests on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Dedicated Profile Photo Card with Uploader */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <ProfilePhotoUploader showCard={true} className="w-full max-w-sm" />
            
            <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center w-full max-w-sm text-xs text-slate-400">
              <span className="text-slate-300 font-medium">Tip: </span> 
              Click <span className="text-blue-400 font-semibold">"Upload Profile Photo"</span> anytime to personalize the avatar across all sections.
            </div>
          </div>

          {/* Right: Narrative, Pillars & Stats */}
          <div className="lg:col-span-8 space-y-8">
            {/* Narrative Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {aboutDetails.headline}
              </h3>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {aboutDetails.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Quick Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-6 mt-6 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Strong Computer Science & OOP Fundamentals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Full-Stack MERN / React & Node.js Developer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Microcontroller & Arduino IoT Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Relational & NoSQL Database Modeling</span>
                </div>
              </div>
            </div>

            {/* 4 Pillars of Interest */}
            <div>
              <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <span>Core Focus & Engineering Domains</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aboutDetails.pillars.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.08] backdrop-blur-md transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                        {getPillarIcon(pillar.icon)}
                      </div>
                      <h5 className="font-semibold text-white text-sm group-hover:text-blue-300 transition">
                        {pillar.title}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center text-center relative group hover:bg-white/[0.08] hover:border-white/20 transition shadow-lg"
                  >
                    <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                    <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium mt-1">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
