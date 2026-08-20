import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Sparkles, Phone, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useProfilePhoto } from '../context/ProfilePhotoContext';

interface NavbarProps {
  onOpenResume: () => void;
}

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'GitHub', href: '#github' },
  { name: 'Contact', href: '#contact' }
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { photoUrl, openUploadModal } = useProfilePhoto();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-3 sm:py-4"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className={`flex items-center justify-between px-4 sm:px-6 py-3 transition-all duration-300 rounded-2xl ${
          isScrolled
            ? 'bg-white/[0.07] backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/40'
            : 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20'
        }`}>
          {/* Brand Logo & Profile Avatar */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                openUploadModal();
              }}
              className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-0.5 cursor-pointer shadow-md shadow-indigo-950/60 transition group-hover:scale-105"
              title="Click to view/change profile picture"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
                <img
                  src={photoUrl}
                  alt="Yashas C Avatar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#020617] rounded-full" />
            </div>

            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-sm sm:text-base text-white flex items-center gap-1.5 group-hover:text-blue-400 transition-colors">
                {personalInfo.name}
              </span>
              <span className="text-[10px] text-slate-400 font-medium hidden md:block">Software Developer & CS Student</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`transition-colors cursor-pointer text-xs sm:text-sm font-medium ${
                    isActive
                      ? 'text-blue-400 font-semibold'
                      : 'hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Desktop Actions: Download Resume */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              id="btn-nav-resume"
              onClick={onOpenResume}
              className="bg-white text-slate-900 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold hover:bg-blue-50 transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Download Resume
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              id="btn-nav-resume-mobile"
              onClick={onOpenResume}
              className="px-3 py-1.5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow sm:hidden"
            >
              Resume
            </button>

            <button
              type="button"
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden mx-4 mt-2 bg-[#020617]/95 border border-white/10 backdrop-blur-2xl px-5 py-6 rounded-2xl shadow-2xl transition-all animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-1.5">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-white/10 text-blue-400 font-semibold border border-white/10'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <button
                type="button"
                id="btn-mobile-download-resume"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-sm shadow-md"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume (CV)</span>
              </button>

              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-medium text-xs hover:bg-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>Call {personalInfo.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
