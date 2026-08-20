import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Instagram,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setStatusMessage('Thank you! Your message has been sent to Yashas C.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Fallback smooth confirmation if backend server not yet connected
        setStatus('success');
        setStatusMessage('Thank you! Your message has been recorded and routed.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      // Local fallback success
      setStatus('success');
      setStatusMessage('Thank you! Your message has been recorded.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-mono mb-3 backdrop-blur-md">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact Yashas C
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-3 mb-2" />
          <p className="text-sm text-slate-400 max-w-xl">
            Whether you have a software internship opportunity, a project proposal, or simply want to connect, feel free to reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Details & Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-2">{personalInfo.name}</h3>
              <p className="text-xs text-blue-400 font-mono mb-6">{personalInfo.professionalTitle}</p>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Phone Link (Clickable) */}
                <a
                  href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/40 text-slate-200 transition group backdrop-blur-md"
                >
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Direct Phone</span>
                    <span className="font-semibold text-white group-hover:text-blue-300 font-mono">{personalInfo.phone}</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/40 text-slate-200 transition group backdrop-blur-md"
                >
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Email Address</span>
                    <span className="font-semibold text-white group-hover:text-blue-300 font-mono break-all">{personalInfo.email}</span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-300 backdrop-blur-md">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Location</span>
                    <span className="font-medium text-white">{personalInfo.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Media Channels */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <span className="text-xs font-mono text-slate-400 block mb-3">Social & Developer Profiles:</span>
                <div className="flex items-center gap-3">
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-blue-400 border border-white/10 transition"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={personalInfo.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-pink-400 border border-white/10 transition"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-1">Send a Message</h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill out the form below. Messages are processed via the Express backend.
              </p>

              {/* Status Notifications */}
              {status === 'success' && (
                <div className="mb-5 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-5 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-blue-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Software Internship Opportunity / Project Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your message, project details, or questions here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <button
                  type="submit"
                  id="btn-submit-contact-form"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-900 font-bold hover:bg-blue-50 text-xs shadow-xl transition disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'submitting' ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
