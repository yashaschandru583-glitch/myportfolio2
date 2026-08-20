import React, { useState } from 'react';
import { Award, Trophy, Users, BookOpen, ExternalLink, Sparkles, CheckCircle2, X, Eye } from 'lucide-react';
import { achievementsData } from '../data/portfolioData';
import { Achievement } from '../types/portfolio';

export const Achievements: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'certification' | 'workshop' | 'hackathon' | 'academic'>('all');
  const [previewAchievement, setPreviewAchievement] = useState<Achievement | null>(null);

  const categories = [
    { key: 'all', label: 'All Honors', icon: Sparkles },
    { key: 'certification', label: 'Certifications', icon: Award },
    { key: 'hackathon', label: 'Hackathons', icon: Trophy },
    { key: 'workshop', label: 'Workshops', icon: Users },
    { key: 'academic', label: 'Academic Honors', icon: BookOpen },
  ];

  const filteredAchievements = selectedCategory === 'all'
    ? achievementsData
    : achievementsData.filter(a => a.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'certification':
        return <Award className="w-5 h-5 text-blue-400" />;
      case 'hackathon':
        return <Trophy className="w-5 h-5 text-amber-400" />;
      case 'workshop':
        return <Users className="w-5 h-5 text-emerald-400" />;
      case 'academic':
        return <BookOpen className="w-5 h-5 text-purple-400" />;
      default:
        return <Award className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'certification':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'hackathon':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'workshop':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'academic':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-white/5 text-slate-300 border-white/10';
    }
  };

  return (
    <section id="achievements" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-mono mb-3 backdrop-blur-md">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors & Certifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Achievements & Credentials
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-3 mb-2" />
          <p className="text-sm text-slate-400 max-w-xl">
            Verified course certifications, hackathon participation, embedded systems workshops, and academic recognitions.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                id={`btn-achieve-cat-${cat.key}`}
                onClick={() => setSelectedCategory(cat.key as any)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer backdrop-blur-md ${
                  isSelected
                    ? 'bg-white text-slate-900 font-bold shadow-lg shadow-black/20 border border-white/30'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.08] transition-all duration-300 shadow-2xl group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {getCategoryIcon(item.category)}
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full border ${getBadgeColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-blue-300 font-mono mt-1.5 mb-3">
                  <span>{item.issuer}</span>
                  <span className="text-slate-400 font-normal">{item.date}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Card Footer actions */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setPreviewAchievement(item)}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>View Details</span>
                </button>

                {item.credentialUrl && (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-300 hover:text-white hover:underline font-mono"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate / Achievement Preview Modal */}
      {previewAchievement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPreviewAchievement(null);
          }}
        >
          <div className="w-full max-w-lg bg-[#020617]/95 border border-white/15 rounded-3xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-150 backdrop-blur-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{previewAchievement.title}</h3>
                  <p className="text-xs text-blue-300 font-mono">{previewAchievement.issuer} • {previewAchievement.date}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewAchievement(null)}
                className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3 backdrop-blur-md">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 mx-auto flex items-center justify-center text-white shadow-xl shadow-black/40">
                  <Trophy className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Recognized To</span>
                  <h4 className="text-xl font-bold text-white tracking-wide">YASHAS C</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                  {previewAchievement.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPreviewAchievement(null)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 text-xs font-medium"
              >
                Close
              </button>
              {previewAchievement.credentialUrl && (
                <a
                  href={previewAchievement.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-900 font-bold hover:bg-blue-50 text-xs shadow-lg"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Verify Online</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
