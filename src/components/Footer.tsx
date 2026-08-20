import React from 'react';
import { ArrowUp, Github, Linkedin, Instagram, Mail, Phone, Heart, Terminal } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#020617]/80 backdrop-blur-md text-slate-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Brand & Title */}
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
              <span>{personalInfo.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            </h3>
            <p className="text-xs text-slate-400">
              {personalInfo.professionalTitle}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-medium text-slate-300">
            <a href="#home" className="hover:text-blue-400 transition">Home</a>
            <a href="#about" className="hover:text-blue-400 transition">About</a>
            <a href="#skills" className="hover:text-blue-400 transition">Skills</a>
            <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
            <a href="#education" className="hover:text-blue-400 transition">Education</a>
            <a href="#achievements" className="hover:text-blue-400 transition">Achievements</a>
            <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
          </div>

          {/* Back to Top */}
          <button
            type="button"
            id="btn-back-to-top"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer backdrop-blur-md"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="hover:text-slate-300 font-mono">
              {personalInfo.phone}
            </a>
            <span>•</span>
            <a href={`mailto:${personalInfo.email}`} className="hover:text-slate-300">
              {personalInfo.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
