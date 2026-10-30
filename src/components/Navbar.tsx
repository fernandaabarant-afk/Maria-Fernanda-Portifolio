import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['inicio', 'sobre', 'habilidades', 'projetos', 'servicos', 'contato'];
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

  const navItems = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'contato', label: 'Contato' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#15111c]/90 backdrop-blur-md border-b border-[#f498ac]/15 shadow-lg shadow-black/20 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Avatar */}
        <button
          onClick={() => scrollTo('inicio')}
          className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#f498ac] shadow-sm shadow-[#ec5a80]/30 transition-transform group-hover:scale-105">
              <img
                src="/assets/character/avatar-portrait.png"
                alt="Maria Fernanda Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#15111c]" title="Disponível para projetos" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-medium text-sm sm:text-base group-hover:text-[#f498ac] transition-colors flex items-center gap-1.5">
              Maria Fernanda
              <Heart className="w-3.5 h-3.5 text-[#ec5a80] fill-[#ec5a80] inline opacity-80" />
            </span>
            <span className="text-xs text-neutral-400 font-normal">Desenvolvedora Web</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-[#1d1726]/60 backdrop-blur-sm border border-[#f498ac]/20 rounded-full px-4 py-1.5 shadow-inner shadow-black/20">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-3.5 py-1 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-[#ec5a80]/25 border border-[#f498ac]/40 shadow-sm shadow-[#ec5a80]/20'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Floating handwritten phrase */}
        <div className="hidden lg:flex items-center gap-1.5 text-right font-handwriting text-[#f9cbd5] text-xl select-none animate-soft-float">
          <span>{personalInfo.handwrittenQuotes.hero}</span>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#20182a] border border-[#f498ac]/30 text-neutral-200 hover:text-white hover:border-[#f498ac] transition-colors focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#181321] border-b border-[#f498ac]/20 px-4 pt-3 pb-5 mt-2 space-y-1 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between py-1 mb-2 border-b border-white/5">
            <span className="font-handwriting text-base text-[#f498ac]">
              {personalInfo.handwrittenQuotes.hero}
            </span>
            <span className="text-xs text-neutral-400">Navegação</span>
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-[#ec5a80]/20 text-[#f9cbd5] border border-[#ec5a80]/30 font-semibold'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => scrollTo('contato')}
              className="w-full text-center py-2 px-4 rounded-full bg-gradient-to-r from-[#ec5a80] to-[#f498ac] text-white font-medium text-sm shadow-md shadow-[#ec5a80]/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Falar com a Maria Fernanda
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
