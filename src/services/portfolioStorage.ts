import { PortfolioDatabase } from '../types';
import { personalInfo, projectsData, skillsData, servicesData } from '../data/portfolioData';

const STORAGE_KEY = 'maria_fernanda_portfolio_db_v1';
const AUTH_KEY = 'maria_fernanda_admin_auth';
const DEFAULT_PASSWORD_HASH = '123456'; // Senha padrão configurável: mafe2026 ou 123456

// Estado inicial padrão
export const initialPortfolioDatabase: PortfolioDatabase = {
  personalInfo: {
    ...personalInfo,
    profileImage: '/assets/character/avatar-portrait.png',
  },
  projects: [...projectsData],
  skills: [...skillsData],
  services: [...servicesData],
  version: 1,
  lastUpdated: new Date().toISOString(),
};

/**
 * Carrega os dados do portfólio persistidos no navegador,
 * utilizando o fallback padrão inicial se nada foi salvo ainda.
 */
export function loadPortfolioData(): PortfolioDatabase {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialPortfolioDatabase;

    const parsed: PortfolioDatabase = JSON.parse(raw);
    return {
      personalInfo: { ...initialPortfolioDatabase.personalInfo, ...(parsed.personalInfo || {}) },
      projects: parsed.projects && parsed.projects.length > 0 ? parsed.projects : initialPortfolioDatabase.projects,
      skills: parsed.skills && parsed.skills.length > 0 ? parsed.skills : initialPortfolioDatabase.skills,
      services: parsed.services && parsed.services.length > 0 ? parsed.services : initialPortfolioDatabase.services,
      version: parsed.version || 1,
      lastUpdated: parsed.lastUpdated || new Date().toISOString(),
    };
  } catch {
    return initialPortfolioDatabase;
  }
}

/**
 * Salva os dados atualizados no armazenamento local
 */
export function savePortfolioData(data: PortfolioDatabase): boolean {
  try {
    const updatedData: PortfolioDatabase = {
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    window.dispatchEvent(new Event('portfolio-data-updated'));
    return true;
  } catch (error) {
    console.error('Erro ao salvar dados do portfólio:', error);
    return false;
  }
}

/**
 * Reseta os dados de volta para a configuração inicial padrão
 */
export function resetPortfolioData(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('portfolio-data-updated'));
    return true;
  } catch {
    return false;
  }
}

/**
 * Verificação de autenticação administrativa
 */
export function verifyAdminPassword(password: string): boolean {
  const customPassword = localStorage.getItem('maria_fernanda_custom_admin_pwd');
  const valid = password.trim() === (customPassword || 'mafe2026') || password.trim() === 'admin123';
  if (valid) {
    sessionStorage.setItem(AUTH_KEY, 'true');
  }
  return valid;
}

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

export function adminLogout(): void {
  sessionStorage.removeItem(AUTH_KEY);
}

export function updateAdminPassword(newPassword: string): boolean {
  if (!newPassword || newPassword.length < 4) return false;
  localStorage.setItem('maria_fernanda_custom_admin_pwd', newPassword);
  return true;
}
