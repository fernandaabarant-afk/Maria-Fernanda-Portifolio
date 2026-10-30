import React from 'react';
import { Mail, Github, Linkedin, Instagram, Heart, Copy, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface ContactProps {
  onOpenModal: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenModal }) => {
  const { personalInfo } = usePortfolio();
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contato" className="py-20 lg:py-28 bg-[#15111c] text-white relative overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ec5a80]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#a855f7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Character with headset and "Vamos conversar? ♡" */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
            <span className="font-handwriting text-2xl text-[#f498ac] select-none animate-soft-float">
              {personalInfo.handwrittenQuotes.contact}
            </span>

            <div className="relative group max-w-[210px] w-full">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#f498ac]/40 bg-[#20182c] shadow-lg shadow-[#ec5a80]/15">
                <img
                  src="/assets/character/contact-character.png"
                  alt="Maria Fernanda com headset rosa e gatinho"
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Heart floating badge */}
              <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#ec5a80] rounded-full flex items-center justify-center text-white text-xs shadow-md">
                ♡
              </div>
            </div>
          </div>

          {/* Center Column: Contact Information and Action */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec5a80]/15 border border-[#ec5a80]/40 text-[#f9cbd5] text-xs font-semibold tracking-wider uppercase">
              <span>Entre em Contato</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Vamos construir algo incrível!?
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light max-w-md mx-auto lg:mx-0">
              Estou sempre aberta a novas oportunidades, parcerias e projetos. Me manda uma mensagem! ♡
            </p>

            {/* Email & WhatsApp action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-sm shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>WhatsApp ({personalInfo.whatsappFormatted})</span>
              </a>

              <button
                onClick={onOpenModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#ec5a80] to-[#f498ac] hover:from-[#d9486e] hover:to-[#ec5a80] text-white font-medium text-sm shadow-lg shadow-[#ec5a80]/25 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Enviar e-mail</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-[#241a31] hover:bg-[#302242] border border-[#f498ac]/30 text-xs text-[#fce7eb] transition-colors cursor-pointer"
                title="Copiar endereço de e-mail"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#f498ac]" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            {/* Social links row */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-3 flex-wrap">
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] hover:text-white hover:bg-[#25D366] transition-all duration-200"
                aria-label="WhatsApp"
                title="WhatsApp direto no celular"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#20182c] border border-[#f498ac]/25 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#ec5a80] hover:bg-[#ec5a80]/20 transition-all duration-200"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#20182c] border border-[#f498ac]/25 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#ec5a80] hover:bg-[#ec5a80]/20 transition-all duration-200"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#20182c] border border-[#f498ac]/25 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#ec5a80] hover:bg-[#ec5a80]/20 transition-all duration-200"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Code block matching reference */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative max-w-sm w-full">
              {/* Window frame */}
              <div className="rounded-2xl bg-[#0f0c14]/90 border border-[#f498ac]/30 shadow-2xl p-5 font-code text-xs sm:text-sm text-[#f9cbd5]/90 space-y-2">
                {/* Window top dots */}
                <div className="flex items-center gap-1.5 pb-2 border-b border-white/5 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ec5a80]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-neutral-400 ml-2 font-mono">sonhos.html</span>
                </div>

                <div className="text-neutral-400">&lt;<span className="text-[#ec5a80]">div</span> <span className="text-pink-300">class</span>=<span className="text-emerald-300">"sonhos"</span>&gt;</div>
                <div className="pl-4 text-neutral-400">&lt;<span className="text-[#ec5a80]">p</span>&gt;<span className="text-[#fce7eb]">gratidão</span>&lt;/<span className="text-[#ec5a80]">p</span>&gt;</div>
                <div className="pl-4 text-neutral-400">&lt;<span className="text-[#ec5a80]">p</span>&gt;<span className="text-[#fce7eb]">foco</span>&lt;/<span className="text-[#ec5a80]">p</span>&gt;</div>
                <div className="pl-4 text-neutral-400">&lt;<span className="text-[#ec5a80]">p</span>&gt;<span className="text-[#fce7eb]">evolução</span>&lt;/<span className="text-[#ec5a80]">p</span>&gt;</div>
                <div className="text-neutral-400 flex items-center gap-1">
                  &lt;/<span className="text-[#ec5a80]">div</span>&gt;
                  <span className="text-[#ec5a80] font-handwriting text-lg pl-1">♡</span>
                </div>
              </div>

              {/* Ambient blur behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ec5a80]/20 to-[#a855f7]/20 rounded-2xl blur-lg -z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
