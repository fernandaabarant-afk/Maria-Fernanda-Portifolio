import React, { useState } from 'react';
import { Sparkles, Mail, Github, Linkedin, Instagram, ArrowRight, Heart, Code2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const [easterEggMessage, setEasterEggMessage] = useState<string | null>(null);

  const handleEasterEgg = (type: 'cat' | 'code') => {
    if (type === 'cat') {
      setEasterEggMessage('Miauuu! 🐾 O gatinho deu ronrom para te dar boa sorte!');
    } else {
      setEasterEggMessage('✨ console.log("Maria Fernanda") executado com sucesso no terminal!');
    }
    setTimeout(() => {
      setEasterEggMessage(null);
    }, 4500);
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projetos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 lg:pt-28 lg:pb-20 overflow-hidden bg-gradient-to-b from-[#141019] via-[#1a1322] to-[#22162a]"
    >
      {/* Background ambient glow circles */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#ec5a80]/10 rounded-full blur-3xl pointer-events-none animate-gentle-pulse" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-[#a855f7]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating doodle hearts in background */}
      <div className="absolute top-28 right-1/3 text-[#f498ac]/20 text-3xl font-handwriting select-none pointer-events-none animate-soft-float">
        ♡
      </div>
      <div className="absolute bottom-20 left-12 text-[#f498ac]/25 text-4xl font-handwriting select-none pointer-events-none animate-soft-float" style={{ animationDelay: '1.5s' }}>
        ♡
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Intro copy & Actions */}
          <div className="lg:col-span-5 text-left space-y-6">
            
            {/* Tag badge matching reference */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ec5a80]/15 border border-[#ec5a80]/40 text-[#f9cbd5] text-xs sm:text-sm font-medium tracking-wide">
              <span>{personalInfo.tagline}</span>
            </div>

            {/* Title & Name */}
            <div className="space-y-2">
              <h1 className="font-handwriting text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none">
                <span className="bg-gradient-to-r from-white via-[#fce7eb] to-[#f498ac] bg-clip-text text-transparent drop-shadow-sm">
                  {personalInfo.name}
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#f9cbd5]/90 leading-snug">
                {personalInfo.heroSubtitle}
              </h2>
            </div>

            {/* Description */}
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-lg font-light">
              {personalInfo.heroDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#ec5a80] to-[#f498ac] hover:from-[#e14872] hover:to-[#ec5a80] text-white font-medium text-sm sm:text-base shadow-lg shadow-[#ec5a80]/25 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
                <span>Conheça meus projetos</span>
              </button>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2a1c35]/80 hover:bg-[#382447] border border-[#f498ac]/35 text-[#fce7eb] hover:text-white font-medium text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#f498ac]" />
                <span>Entre em contato</span>
              </button>
            </div>

            {/* Social links row */}
            <div className="flex items-center gap-4 pt-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#22182b] border border-[#f498ac]/25 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#ec5a80] hover:bg-[#ec5a80]/20 transition-all duration-200"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#22182b] border border-[#f498ac]/25 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#ec5a80] hover:bg-[#ec5a80]/20 transition-all duration-200"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#22182b] border border-[#f498ac]/25 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#ec5a80] hover:bg-[#ec5a80]/20 transition-all duration-200"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenContact}
                className="w-10 h-10 rounded-full bg-[#22182b] border border-[#f498ac]/25 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#ec5a80] hover:bg-[#ec5a80]/20 transition-all duration-200 cursor-pointer"
                aria-label="E-mail"
                title="Enviar E-mail"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive feedback toast */}
            {easterEggMessage && (
              <div className="bg-[#ec5a80]/20 border border-[#f498ac]/40 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#fce7eb] flex items-center gap-2 animate-in fade-in duration-300">
                <Heart className="w-4 h-4 text-[#ec5a80] fill-[#ec5a80] shrink-0" />
                <span>{easterEggMessage}</span>
              </div>
            )}
          </div>

          {/* Right Column: Character at Setup */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="relative group max-w-xl w-full">
              {/* Outer soft glow border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ec5a80]/30 to-[#a855f7]/30 rounded-3xl blur-md group-hover:blur-lg transition-all duration-500 opacity-70 group-hover:opacity-100" />
              
              {/* Main setup container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#f498ac]/30 bg-[#191222] shadow-2xl">
                <img
                  src="/assets/character/hero-setup.png"
                  alt="Maria Fernanda no setup de programação anime com headset rosa"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.01]"
                />

                {/* Interactive Clickable Hotspots overlay */}
                {/* Hotspot 1: Code monitor easter egg */}
                <button
                  onClick={() => handleEasterEgg('code')}
                  className="absolute top-[28%] right-[22%] px-2.5 py-1 rounded-md bg-black/60 hover:bg-black/80 border border-[#f498ac]/40 text-[11px] text-[#f9cbd5] font-code flex items-center gap-1.5 transition-all duration-200 cursor-pointer hover:border-[#ec5a80]"
                  title="Clique para testar o código"
                >
                  <Code2 className="w-3 h-3 text-[#f498ac]" />
                  <span>const name = "Maria Fernanda"</span>
                </button>

                {/* Hotspot 2: Cat easter egg */}
                <button
                  onClick={() => handleEasterEgg('cat')}
                  className="absolute bottom-[20%] right-[32%] w-10 h-8 rounded-full opacity-0 hover:opacity-100 bg-white/10 border border-[#f498ac]/50 flex items-center justify-center text-xs text-white transition-opacity cursor-pointer"
                  title="Fazer carinho no gatinho"
                >
                  🐾
                </button>

                {/* Cute caption badge at bottom */}
                <div className="absolute bottom-3 left-3 bg-[#130f1b]/80 backdrop-blur-md border border-[#f498ac]/20 px-3 py-1 rounded-full text-xs text-[#fce7eb] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ec5a80] animate-pulse" />
                  <span>Setup da Maria Fernanda • Online</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
