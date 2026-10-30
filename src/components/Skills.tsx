import React, { useState } from 'react';
import { Heart, Info, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Skill } from '../types';
import { TechIconBadge } from './icons/TechIcons';

export const Skills: React.FC = () => {
  const { skills, personalInfo } = usePortfolio();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <section id="habilidades" className="py-20 lg:py-24 bg-[#faf2f5] text-neutral-800 relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-[#f498ac]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#fce7eb]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce7eb] border border-[#f9cbd5] text-[#b02251] text-xs font-semibold tracking-wider uppercase">
              <span>Minhas Habilidades</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight flex items-center gap-2">
              Tecnologias que eu utilizo
              <Heart className="w-5 h-5 text-[#ec5a80] fill-[#ec5a80] inline shrink-0" />
            </h2>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Estou sempre aprendendo e aprimorando meus conhecimentos. Aqui estão algumas das tecnologias e ferramentas com as quais construo meus projetos:
            </p>

            <div className="p-4 rounded-2xl bg-white/70 border border-pink-100 text-xs text-neutral-600 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#b02251]">
                <Info className="w-4 h-4 text-[#ec5a80]" />
                <span>Evolução contínua</span>
              </div>
              <p>
                Pratico código diariamente criando páginas, resolvendo desafios de lógica e explorando novas bibliotecas e frameworks.
              </p>
            </div>
          </div>

          {/* Center 8-card grid */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
              {skills.map((skill) => {
                const isSelected = selectedSkill?.name === skill.name;
                return (
                  <button
                    key={skill.name}
                    onClick={() => setSelectedSkill(isSelected ? null : skill)}
                    className={`relative p-3.5 rounded-2xl transition-all duration-200 text-center flex flex-col items-center justify-center gap-2 border cursor-pointer group ${
                      isSelected
                        ? 'bg-white border-[#ec5a80] shadow-md shadow-[#ec5a80]/15 scale-105'
                        : 'bg-white/80 hover:bg-white border-pink-100 hover:border-[#f498ac] hover:shadow-sm'
                    }`}
                  >
                    <div className="transform transition-transform group-hover:scale-110">
                      <TechIconBadge iconName={skill.icon} />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-800 group-hover:text-[#ec5a80] transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-neutral-400 capitalize">
                      {skill.category === 'frontend' ? 'Front-end' : 'Ferramenta'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected skill details banner */}
            {selectedSkill && (
              <div className="mt-4 p-4 rounded-2xl bg-white border border-[#ec5a80]/30 shadow-sm animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ec5a80]" />
                    <h4 className="font-semibold text-sm text-neutral-900">
                      {selectedSkill.name}
                    </h4>
                  </div>
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="text-xs text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    ✕ Fechar
                  </button>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {selectedSkill.description}
                </p>
              </div>
            )}
          </div>

          {/* Right Setup Photo & Quote */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center space-y-4">
            <div className="relative group max-w-[260px] w-full">
              {/* Photo frame */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-white shadow-lg shadow-[#b02251]/10 bg-white p-2">
                <img
                  src="/assets/character/skills-setup.png"
                  alt="Maria Fernanda programando no setup"
                  className="w-full h-auto rounded-xl object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Little cute corner heart */}
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#ec5a80] text-white rounded-full flex items-center justify-center text-xs shadow-md">
                ♡
              </div>
            </div>

            {/* Handwritten Quote */}
            <div className="text-center font-handwriting text-xl text-[#ec5a80] max-w-xs select-none">
              {personalInfo.handwrittenQuotes.skills}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
