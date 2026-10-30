/**
 * TypeScript Type Definitions for Portfolio
 * Centralized interfaces for projects, skills, services, contacts and administrative settings
 */

export interface Project {
  id: string;
  name: string;
  title?: string; // Fallback compatibility
  description: string;
  fullDescription?: string;
  image: string;
  technologies: string[];
  tags?: string[]; // Fallback compatibility
  demoUrl?: string; // Link da demonstração ao vivo
  githubUrl: string; // Link do repositório no GitHub
  hasInteractiveDemo?: boolean;
  category?: 'web' | 'app' | 'frontend';
  features?: string[];
  stars?: number;
  forks?: number;
  updatedAt?: string;
  isFromGithub?: boolean;
  language?: string;
}

export interface SocialLinks {
  email: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  whatsappUrl: string;
  whatsappFormatted: string;
  instagram?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'tools';
  icon: string;
  color: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
}

export interface PersonalInfo {
  name: string;
  nickname: string;
  role: string;
  tagline: string;
  heroSubtitle: string;
  heroDescription: string;
  location: string;
  education: string;
  focus: string;
  availability: string;
  email: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  whatsappUrl: string;
  whatsappFormatted: string;
  instagram?: string;
  aboutParagraphs: string[];
  profileImage?: string;
  avatarUrl?: string;
  handwrittenQuotes: {
    hero: string;
    about: string;
    skills: string;
    contact: string;
  };
}

export interface PortfolioDatabase {
  personalInfo: PersonalInfo;
  projects: Project[];
  skills: Skill[];
  services: Service[];
  version: number;
  lastUpdated: string;
}
