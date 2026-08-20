export interface PersonalInfo {
  name: string;
  professionalTitle: string;
  tagline: string;
  bio: string;
  phone: string;
  email: string;
  githubUrl: string;
  githubUsername: string;
  linkedinUrl: string;
  instagramUrl: string;
  location: string;
  yearsOfLearning: number;
  projectsCompleted: number;
  technologiesLearned: number;
  certificationsCount: number;
}

export interface Skill {
  id: string;
  name: string;
  category: 'languages' | 'web' | 'database' | 'tools';
  level: number; // 0 - 100
  proficiency: 'Beginner' | 'Intermediate' | 'Proficient' | 'Advanced';
  icon: string;
  description: string;
  tags?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  category: 'web' | 'iot' | 'fullstack' | 'all';
  githubUrl: string;
  liveDemoUrl?: string;
  featured: boolean;
  highlights?: string[];
  metrics?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  university?: string;
  location: string;
  period: string;
  grade?: string;
  coursework: string[];
  description: string;
  achievements?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'certification' | 'workshop' | 'hackathon' | 'academic';
  description: string;
  credentialUrl?: string;
  image?: string;
  badgeColor?: string;
}

export interface GitHubRepo {
  id: number | string;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
}
