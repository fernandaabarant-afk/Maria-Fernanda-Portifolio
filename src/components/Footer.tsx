import React from 'react';
import { ArrowUp, Heart, Lock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { personalInfo, openAdminPanel } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#100d16] text-neutral-400 py-8 border-t border-[#f498ac]/15 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Signature */}
        <div className="flex items-center gap-2">
          <span className="font-handwriting text-2xl text-[#f498ac]">
            {personalInfo.name} ♡
          </span>
        </div>

        {/* Center Tagline */}
        <div className="text-center text-neutral-400 text-xs flex items-center justify-center gap-1.5 flex-wrap">
          <span>Desenvolvedora</span>
          <span className="text-[#ec5a80]">•</span>
          <span>Criativa</span>
          <span className="text-[#ec5a80]">•</span>
          <span>Apaixonada por tecnologia</span>
        </div>

        {/* Right buttons: Discreet Admin trigger + Back to top */}
        <div className="flex items-center gap-2">
          {/* Discreet Admin Lock Button */}
          <button
            onClick={openAdminPanel}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#181220] hover:bg-[#251830] text-neutral-500 hover:text-[#f498ac] border border-white/5 hover:border-[#f498ac]/30 transition-all cursor-pointer"
            title="Painel Administrativo (Ctrl+Shift+A ou ?admin)"
            aria-label="Acesso Administrativo"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1e1728] hover:bg-[#2b1f3a] text-neutral-300 hover:text-white border border-[#f498ac]/20 text-xs transition-colors cursor-pointer group"
            title="Voltar ao topo"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 text-[#ec5a80]" />
          </button>
        </div>

      </div>

      <div className="text-center text-[11px] text-neutral-500 mt-4 pt-4 border-t border-white/5 max-w-6xl mx-auto px-4 flex items-center justify-center gap-1.5 flex-wrap">
        <span>© {new Date().getFullYear()} {personalInfo.name}. Todos os direitos reservados. Feito com carinho e código</span>
        <Heart className="w-3 h-3 text-[#ec5a80] fill-[#ec5a80] inline ml-0.5" />
      </div>
    </footer>
  );
};
