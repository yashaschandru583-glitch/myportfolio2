import React from 'react';
import {
  ArrowDown,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  Code2,
  Cpu,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Terminal,
  Camera
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useProfilePhoto } from '../context/ProfilePhotoContext';

export const Hero: React.FC = () => {
  const { photoUrl, openUploadModal } = useProfilePhoto();

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Decorative Gradients & Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-br from-indigo-600/15 via-purple-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d0d_1px,transparent_1px),linear-gradient(to_bottom,#1f293d0d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Introduction & Call-to-Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-inner text-xs font-mono text-blue-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Software Internships & Projects</span>
            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">{personalInfo.name}</span>
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-slate-300">
                {personalInfo.professionalTitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              "{personalInfo.bio}"
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-sm shadow-xl hover:bg-blue-50 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
              >
                <span>View My Projects</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm font-semibold text-sm shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social & Direct Contact Links */}
            <div className="pt-4 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <span className="text-xs font-mono text-slate-400">Connect & Call:</span>
              <div className="flex items-center gap-2.5 flex-wrap justify-center">
                {/* Phone Call Link */}
                <a
                  href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-blue-300 border border-white/10 text-xs font-mono transition"
                  title="Direct Call"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>{personalInfo.phone}</span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-blue-400 border border-white/10 transition"
                  title={`Email ${personalInfo.email}`}
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>

                {/* GitHub */}
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-blue-400 border border-white/10 transition"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-blue-400 border border-white/10 transition"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                {/* Instagram */}
                <a
                  href={personalInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-pink-400 border border-white/10 transition"
                  title="Instagram Profile"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Profile Card with Direct Photo Upload Controls */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Frosted Glass Profile Card */}
              <div className="relative p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center">
                {/* Floating Microcontroller / Tech Badges */}
                <div className="absolute -top-3 -right-3 px-3 py-1 rounded-xl bg-[#020617]/90 border border-white/15 text-[11px] font-mono text-blue-400 backdrop-blur-md shadow-lg flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  <span>C++ & Arduino</span>
                </div>

                <div className="absolute -bottom-3 -left-3 px-3 py-1 rounded-xl bg-[#020617]/90 border border-white/15 text-[11px] font-mono text-purple-400 backdrop-blur-md shadow-lg flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>React & Node.js</span>
                </div>

                {/* Circular Profile Photo with interactive trigger */}
                <div className="relative group/heroavatar cursor-pointer my-2" onClick={openUploadModal}>
                  <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-2xl shadow-indigo-950/70">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center relative">
                      <img
                        src={photoUrl}
                        alt="YASHAS C Profile"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover/heroavatar:scale-105 transition-transform duration-300"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover/heroavatar:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white text-xs font-medium">
                        <Camera className="w-6 h-6 text-blue-400" />
                        <span>Change Photo</span>
                      </div>
                    </div>
                  </div>

                  {/* Online Status Indicator */}
                  <span className="absolute bottom-3 right-3 w-5 h-5 bg-emerald-500 border-2 border-[#020617] rounded-full shadow-lg" title="Active & Coding" />
                </div>

                {/* Name & Title */}
                <h3 className="text-2xl font-bold text-white tracking-tight mt-3">
                  {personalInfo.name}
                </h3>
                <p className="text-xs text-blue-400 font-mono mt-1">
                  {personalInfo.professionalTitle}
                </p>

                {/* Direct Upload Photo Button */}
                <div className="mt-4 w-full">
                  <button
                    type="button"
                    id="btn-hero-upload-profile-photo"
                    onClick={openUploadModal}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-medium transition cursor-pointer shadow-md"
                  >
                    <Camera className="w-4 h-4 text-blue-400" />
                    <span>Upload / Change Profile Photo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition text-xs font-mono"
        aria-label="Scroll to About Section"
      >
        <span>Explore</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-indigo-400" />
      </a>
    </section>
  );
};
