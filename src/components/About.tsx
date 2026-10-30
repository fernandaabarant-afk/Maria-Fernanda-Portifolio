import React from 'react';
import { MapPin, GraduationCap, Monitor, Briefcase, Heart } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const About: React.FC = () => {
  const { personalInfo } = usePortfolio();

  const infoCards = [
    {
      icon: MapPin,
      label: 'Localização',
      value: personalInfo.location,
    },
    {
      icon: GraduationCap,
      label: 'Formação',
      value: personalInfo.education,
    },
    {
      icon: Monitor,
      label: 'Foco',
      value: personalInfo.focus,
    },
    {
      icon: Briefcase,
      label: 'Disponível para',
      value: personalInfo.availability,
    },
  ];

  return (
    <section id="sobre" className="relative py-20 lg:py-28 bg-[#fdf8fa] text-neutral-800 overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#22162a] to-transparent opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-[#f9cbd5]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#f498ac]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Floating handwritten doodle note */}
      <div className="hidden xl:block absolute top-24 right-16 font-handwriting text-2xl text-[#ec5a80]/80 rotate-6 select-none animate-soft-float">
        {personalInfo.handwrittenQuotes?.about || 'Pequenos códigos, grandes sonhos ♡'}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Polaroid photo frame with washi tape & cat sticker */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative group">
              {/* Polaroid Card */}
              <div className="relative bg-white p-3.5 pb-7 rounded-sm shadow-xl shadow-[#b02251]/10 border border-pink-100 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500 max-w-[280px] sm:max-w-[310px]">
                
                {/* Washi Tape at Top */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#f498ac]/80 backdrop-blur-sm rounded-sm shadow-sm transform -rotate-1 border-t border-b border-pink-300/40 z-20 opacity-90" />
                
                {/* Photo */}
                <div className="relative overflow-hidden rounded-sm bg-[#fce7eb] aspect-[4/5]">
                  <img
                    src={personalInfo.avatarUrl || '/assets/character/avatar-portrait.png'}
                    alt={`${personalInfo.name} — Polaroid com headset rosa`}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle pink overlay tone */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#ec5a80]/15 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Cute cat sticker at bottom right */}
                <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-white rounded-full p-1 shadow-md border border-pink-200 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <span className="text-xl" title="Gatinho da Maria">🐱</span>
                </div>

                {/* Polaroid caption */}
                <div className="mt-3 text-center">
                  <span className="font-handwriting text-lg text-[#ec5a80] tracking-wide">
                    Maria Fernanda ♡
                  </span>
                </div>
              </div>

              {/* Little cute hearts doodles below */}
              <div className="flex items-center justify-center gap-2 mt-4 text-[#f498ac] font-handwriting text-xl">
                <span>♡</span>
                <span>♡</span>
                <span>♡</span>
              </div>
            </div>
          </div>

          {/* Center Column: Bio and Description */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce7eb] border border-[#f9cbd5] text-[#b02251] text-xs font-semibold tracking-wider uppercase">
              <span>Sobre Mim</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight flex items-center gap-2">
              Prazer, sou a Maria Fernanda!
              <Heart className="w-5 h-5 text-[#ec5a80] fill-[#ec5a80] inline shrink-0" />
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-neutral-600 leading-relaxed text-sm sm:text-base font-normal">
              {personalInfo.aboutParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Signature */}
            <div className="pt-2">
              <span className="font-handwriting text-3xl sm:text-4xl text-[#ec5a80] select-none block">
                Maria Fernanda ♡
              </span>
            </div>
          </div>

          {/* Right Column: Info Cards Grid */}
          <div className="lg:col-span-3 space-y-3.5">
            {infoCards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-pink-100/80 shadow-sm hover:shadow-md hover:border-[#f498ac]/40 transition-all duration-300 flex items-start gap-3.5 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#fce7eb] text-[#ec5a80] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#ec5a80] group-hover:text-white transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-neutral-400 block uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-neutral-800 block mt-0.5 leading-snug">
                      {item.value}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Mobile quote */}
            <div className="block xl:hidden text-center pt-2 font-handwriting text-lg text-[#ec5a80]">
              {personalInfo.handwrittenQuotes.about}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
