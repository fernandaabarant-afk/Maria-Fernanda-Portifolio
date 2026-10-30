import React, { useState } from 'react';
import { X, Send, Mail, CheckCircle2, Copy, Heart, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    onClose();
  };

  const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    formData.subject || 'Contato através do portfólio'
  )}&body=${encodeURIComponent(
    `Olá Maria Fernanda,\n\nMeu nome é ${formData.name} (${formData.email}).\n\nMensagem:\n${formData.message}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#191322] border border-[#f498ac]/30 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#261c33] hover:bg-[#342645] text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#ec5a80]/20 border border-[#ec5a80] text-[#ec5a80] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Mensagem preparada com carinho! ♡</h3>
            <p className="text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed">
              Obrigada pelo interesse em conversar comigo, {formData.name}! Você também pode enviar a mensagem diretamente pelo seu cliente de e-mail:
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={mailtoLink}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#ec5a80] to-[#f498ac] text-white font-medium text-sm shadow-lg shadow-[#ec5a80]/30 transition-transform hover:scale-105"
              >
                <Mail className="w-4 h-4" />
                <span>Abrir no meu aplicativo de E-mail</span>
              </a>
              <button
                onClick={handleReset}
                className="text-xs text-neutral-400 hover:text-white pt-2 cursor-pointer"
              >
                Fechar janela
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ec5a80]/20 text-[#f9cbd5] text-xs font-medium border border-[#ec5a80]/30 mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Mande uma mensagem</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Vamos conversar?
                <Heart className="w-5 h-5 text-[#ec5a80] fill-[#ec5a80]" />
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Preencha os campos abaixo ou copie meu e-mail direto para sua caixa de entrada.
              </p>
            </div>

            {/* Quick Email & WhatsApp Bars */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#22182e] border border-[#f498ac]/20">
                <div className="flex items-center gap-2 min-w-0">
                  <Mail className="w-4 h-4 text-[#f498ac] shrink-0" />
                  <span className="text-xs sm:text-sm text-neutral-200 truncate font-code">
                    {personalInfo.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-xl bg-[#ec5a80]/20 hover:bg-[#ec5a80]/30 text-[#f9cbd5] border border-[#ec5a80]/40 text-xs font-medium flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>

              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Conversar direto pelo WhatsApp ({personalInfo.whatsappFormatted})</span>
              </a>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">Seu Nome *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome completo"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#22182e] border border-[#f498ac]/20 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#ec5a80] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">Seu E-mail *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#22182e] border border-[#f498ac]/20 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#ec5a80] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1 font-medium">Assunto</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Ex: Proposta de projeto ou oportunidade"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#22182e] border border-[#f498ac]/20 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#ec5a80] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1 font-medium">Mensagem *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Escreva sua mensagem aqui..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#22182e] border border-[#f498ac]/20 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#ec5a80] transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#ec5a80] to-[#f498ac] hover:from-[#d9486e] hover:to-[#ec5a80] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#ec5a80]/30 transition-transform active:scale-[0.99] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar mensagem</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
