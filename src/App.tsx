import React, { useState } from 'react';
import { ProfilePhotoProvider } from './context/ProfilePhotoContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Achievements } from './components/Achievements';
import { GitHubSection } from './components/GitHubSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <ProfilePhotoProvider>
      <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden font-sans relative">
        {/* Ambient Frosted Glass Background Glow Orbs */}
        <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="fixed top-[35%] left-[-8%] w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[110px] pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none z-0" />
        <div className="fixed bottom-[15%] left-[20%] w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

        {/* Navigation Bar */}
        <Navbar onOpenResume={() => setIsResumeModalOpen(true)} />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Achievements />
          <GitHubSection />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Resume View & Print Modal */}
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
      </div>
    </ProfilePhotoProvider>
  );
}
