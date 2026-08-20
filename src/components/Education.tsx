import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { educationData } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-mono mb-3 backdrop-blur-md">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education Timeline
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-3 mb-2" />
          <p className="text-sm text-slate-400 max-w-xl">
            My structured educational qualifications, core engineering coursework, and academic milestones in Computer Science.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-12">
          {educationData.map((edu, index) => (
            <div key={edu.id} className="relative group">
              {/* Timeline Node Icon / Dot */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#020617] border-2 border-blue-500 flex items-center justify-center text-blue-400 shadow-lg shadow-black/50 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Education Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white/5 border border-white/10 group-hover:border-blue-500/40 backdrop-blur-md shadow-2xl transition-all duration-300">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition">
                      {edu.degree}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-blue-300 mt-1 font-medium">
                      <span>{edu.institution}</span>
                      {edu.university && <span>• {edu.university}</span>}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 text-[11px] font-mono border border-white/10">
                      <Calendar className="w-3 h-3 text-blue-400" />
                      <span>{edu.period}</span>
                    </span>

                    {edu.grade && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[11px] font-mono border border-emerald-500/30">
                        <Award className="w-3 h-3" />
                        <span>{edu.grade}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{edu.location}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {edu.description}
                </p>

                {/* Coursework Tags */}
                <div className="space-y-2 mb-4">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                    <span>Relevant Coursework & Subjects:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10 font-mono"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Achievements */}
                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="pt-3 border-t border-white/10 space-y-1.5">
                    <span className="text-xs font-semibold text-slate-400">Milestones & Honors:</span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {edu.achievements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
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
