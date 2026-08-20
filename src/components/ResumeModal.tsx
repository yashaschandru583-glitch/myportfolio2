import React from 'react';
import { X, Download, Printer, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, CheckCircle } from 'lucide-react';
import { personalInfo, educationData, skillsData, initialProjects, achievementsData } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="resume-modal"
        className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#020617]/95 border border-white/15 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 backdrop-blur-2xl"
      >
        {/* Modal Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-sm font-semibold text-white font-mono">YASHAS C — Curriculum Vitae</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-print-resume"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-medium transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <a
              href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-900 font-bold hover:bg-blue-50 text-xs transition shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Yashas</span>
            </a>
            <button
              type="button"
              id="btn-close-resume"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Container (Printable) */}
        <div className="p-6 md:p-10 overflow-y-auto bg-[#020617]/90 text-slate-200 space-y-8 print:p-0 print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-white/10 pb-6 print:border-black">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight print:text-black">{personalInfo.name}</h1>
                <p className="text-blue-400 font-medium text-base mt-1 print:text-blue-700">{personalInfo.professionalTitle}</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xl print:text-gray-600">{personalInfo.tagline}</p>
              </div>

              {/* Contact Info Pills */}
              <div className="text-xs space-y-1.5 text-slate-300 font-mono print:text-black">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-400 print:text-black" />
                  <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="hover:underline">{personalInfo.phone}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400 print:text-black" />
                  <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 print:text-black" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Github className="w-3.5 h-3.5 text-blue-400 print:text-black" />
                  <a href={personalInfo.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">github.com/{personalInfo.githubUsername}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-sm uppercase tracking-wider font-bold text-blue-400 mb-3 border-b border-white/10 pb-1 print:text-blue-800 print:border-black font-mono">
              Education
            </h2>
            <div className="space-y-4">
              {educationData.map((edu) => (
                <div key={edu.id} className="text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold text-white print:text-black">
                    <span>{edu.degree}</span>
                    <span className="text-xs text-blue-300 font-mono print:text-gray-700">{edu.period}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 print:text-gray-600">
                    {edu.institution} {edu.university ? `• ${edu.university}` : ''} | <span className="text-emerald-400 font-medium print:text-black">{edu.grade}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 print:text-gray-700">{edu.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {edu.coursework.slice(0, 5).map((course, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono print:border print:border-gray-300 print:bg-gray-100 print:text-black">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-sm uppercase tracking-wider font-bold text-blue-400 mb-3 border-b border-white/10 pb-1 print:text-blue-800 print:border-black font-mono">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 print:bg-white print:border-gray-300">
                <span className="font-semibold text-white block mb-1 print:text-black">Programming Languages:</span>
                <span className="text-slate-300 print:text-gray-800">C, C++, Java, JavaScript (ES6+), Python</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 print:bg-white print:border-gray-300">
                <span className="font-semibold text-white block mb-1 print:text-black">Web & Frameworks:</span>
                <span className="text-slate-300 print:text-gray-800">React.js, Node.js, Express.js, HTML5, CSS3, Tailwind CSS</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 print:bg-white print:border-gray-300">
                <span className="font-semibold text-white block mb-1 print:text-black">Databases & Querying:</span>
                <span className="text-slate-300 print:text-gray-800">MySQL, MongoDB, PostgreSQL, Schema Design</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 print:bg-white print:border-gray-300">
                <span className="font-semibold text-white block mb-1 print:text-black">Tools & Hardware:</span>
                <span className="text-slate-300 print:text-gray-800">Git, GitHub, VS Code, Arduino, ESP32, REST APIs</span>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="text-sm uppercase tracking-wider font-bold text-blue-400 mb-3 border-b border-white/10 pb-1 print:text-blue-800 print:border-black font-mono">
              Key Projects
            </h2>
            <div className="space-y-4">
              {initialProjects.slice(0, 3).map((proj) => (
                <div key={proj.id} className="text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-white text-sm print:text-black">
                    <span>{proj.title}</span>
                    <span className="text-[11px] text-blue-300 font-mono print:text-gray-700">{proj.technologies.join(', ')}</span>
                  </div>
                  <p className="text-slate-300 print:text-gray-700">{proj.description}</p>
                  {proj.highlights && (
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-400 print:text-gray-600">
                      {proj.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div>
            <h2 className="text-sm uppercase tracking-wider font-bold text-blue-400 mb-3 border-b border-white/10 pb-1 print:text-blue-800 print:border-black font-mono">
              Certifications & Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {achievementsData.slice(0, 4).map((ach) => (
                <div key={ach.id} className="flex items-start gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 print:bg-white print:border-gray-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5 print:text-black" />
                  <div>
                    <div className="font-semibold text-white print:text-black">{ach.title}</div>
                    <div className="text-[11px] text-slate-400 print:text-gray-600">{ach.issuer} ({ach.date})</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
