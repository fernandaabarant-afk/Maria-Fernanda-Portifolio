import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioDatabase, PersonalInfo, Project, Skill, Service } from '../types';
import {
  loadPortfolioData,
  savePortfolioData,
  resetPortfolioData,
  isAdminAuthenticated,
  verifyAdminPassword,
  adminLogout,
} from '../services/portfolioStorage';

interface PortfolioContextType {
  data: PortfolioDatabase;
  personalInfo: PersonalInfo;
  projects: Project[];
  skills: Skill[];
  services: Service[];
  isAdmin: boolean;
  isAdminPanelOpen: boolean;
  openAdminPanel: () => void;
  closeAdminPanel: () => void;
  loginAdmin: (pwd: string) => boolean;
  logoutAdmin: () => void;
  saveData: (newData: PortfolioDatabase) => boolean;
  resetData: () => boolean;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioDatabase>(() => loadPortfolioData());
  const [isAdmin, setIsAdmin] = useState<boolean>(() => isAdminAuthenticated());
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleUpdate = () => {
      setData(loadPortfolioData());
    };

    window.addEventListener('portfolio-data-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('portfolio-data-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Atalho de teclado para abrir o painel admin (Ctrl + Shift + A ou Alt + A)
  // Além disso, suporte para parâmetro ?admin na URL
  useEffect(() => {
    const checkUrl = () => {
      if (window.location.search.includes('admin') || window.location.hash.includes('admin')) {
        setIsAdminPanelOpen(true);
      }
    };
    checkUrl();

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsAdminPanelOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const loginAdmin = (pwd: string): boolean => {
    const ok = verifyAdminPassword(pwd);
    if (ok) {
      setIsAdmin(true);
    }
    return ok;
  };

  const logoutAdmin = () => {
    adminLogout();
    setIsAdmin(false);
  };

  const saveData = (newData: PortfolioDatabase): boolean => {
    const success = savePortfolioData(newData);
    if (success) {
      setData(newData);
    }
    return success;
  };

  const resetData = (): boolean => {
    const success = resetPortfolioData();
    if (success) {
      setData(loadPortfolioData());
    }
    return success;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        personalInfo: data.personalInfo,
        projects: data.projects,
        skills: data.skills,
        services: data.services,
        isAdmin,
        isAdminPanelOpen,
        openAdminPanel: () => setIsAdminPanelOpen(true),
        closeAdminPanel: () => setIsAdminPanelOpen(false),
        loginAdmin,
        logoutAdmin,
        saveData,
        resetData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export function usePortfolio(): PortfolioContextType {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return ctx;
}
