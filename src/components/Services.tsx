import React from 'react';
import { Layout, Palette, Sparkles, Check, ArrowRight, Heart } from 'lucide-react';
import { servicesData } from '../data/portfolioData';

interface ServicesProps {
  onOpenContact: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenContact }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Layout className="w-6 h-6 text-[#ec5a80]" />;
      case 'figma':
        return <Palette className="w-6 h-6 text-[#ec5a80]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#ec5a80]" />;
    }
  };

  return (
    <section id="servicos" className="py-20 lg:py-24 bg-[#fcf5f8] text-neutral-800 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce7eb] border border-[#f9cbd5] text-[#b02251] text-xs font-semibold tracking-wider uppercase">
            <span>Serviços</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight flex items-center justify-center gap-2">
            Como posso colaborar com você
            <Heart className="w-5 h-5 text-[#ec5a80] fill-[#ec5a80] inline shrink-0" />
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Soluções dedicadas para transformar sua visão em uma interface funcional, moderna e com identidade única.
          </p>
        </div>

        {/* 3 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-pink-100 hover:border-[#ec5a80]/40 shadow-sm hover:shadow-lg hover:shadow-[#ec5a80]/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#fdf2f4] border border-pink-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#ec5a80]/15 transition-all duration-300">
                  {getIcon(service.icon)}
                </div>

                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#ec5a80] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-2 border-t border-pink-50">
                  <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2.5">
                    O que inclui:
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-600">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#ec5a80] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-pink-50">
                <button
                  onClick={onOpenContact}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#fdf2f4] hover:bg-[#ec5a80] text-[#b02251] hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                >
                  <span>Conversar sobre projeto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
