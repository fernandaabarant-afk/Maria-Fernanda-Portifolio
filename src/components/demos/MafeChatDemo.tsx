import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: number;
  sender: 'user' | 'mafe';
  text: string;
  time: string;
}

export const MafeChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'mafe',
      text: 'Oi! Eu sou a MAFE 💗 Sua companheira de IA! Como posso te ajudar hoje?',
      time: 'Agora',
    },
    {
      id: 2,
      sender: 'user',
      text: 'Oi Mafe! Me conta o que você faz?',
      time: 'Agora',
    },
    {
      id: 3,
      sender: 'mafe',
      text: 'Eu sou um espaço para você conversar, aprender, planejar ideias e criar coisas incríveis! ✨',
      time: 'Agora',
    },
  ]);

  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const userQuery = inputText.trim();
    setInputText('');

    // Resposta amigável da Mafe
    setTimeout(() => {
      let reply = 'Adorei conversar com você! Estou pronta para te apoiar em qualquer desafio de programação e criatividade ♡';
      const qLower = userQuery.toLowerCase();
      if (qLower.includes('oi') || qLower.includes('olá')) {
        reply = 'Oláa! Que alegria ter você aqui no meu cantinho digital! 🌸';
      } else if (qLower.includes('projeto') || qLower.includes('código')) {
        reply = 'Construir projetos reais é a melhor forma de evoluir na tecnologia! Quer ver o código no GitHub? 💻';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'mafe',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 600);
  };

  return (
    <div className="bg-[#181122] rounded-2xl border border-pink-400/30 overflow-hidden text-white shadow-xl">
      {/* Header */}
      <div className="bg-[#241733] px-4 py-3 border-b border-pink-400/20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ec5a80] to-[#f498ac] flex items-center justify-center font-bold text-white text-xs shadow-sm">
            M
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-[#fce7eb]">MAFE</span>
              <span className="text-[10px] text-pink-300">✿</span>
              <span className="text-[10px] bg-[#ec5a80]/20 text-[#f9cbd5] px-2 py-0.5 rounded-full font-medium border border-[#ec5a80]/30">
                Demo Interativo
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Pronta para conversar
            </span>
          </div>
        </div>
        <span className="text-xs text-neutral-400 font-handwriting text-pink-300">
          Sua companheira de IA ♡
        </span>
      </div>

      {/* Message Area */}
      <div className="p-4 space-y-3 max-h-56 overflow-y-auto bg-[#140e1d]/80 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2 ${
              m.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.sender === 'mafe' && (
              <div className="w-6 h-6 rounded-full bg-[#ec5a80] flex items-center justify-center text-[10px] text-white shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`max-w-[78%] px-3.5 py-2 rounded-2xl ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-[#ec5a80] to-[#f498ac] text-white rounded-tr-xs'
                  : 'bg-[#291c38] text-[#fce7eb] border border-pink-400/20 rounded-tl-xs'
              }`}
            >
              <p className="leading-relaxed">{m.text}</p>
              <span className="text-[9px] text-white/50 block text-right mt-1">
                {m.time}
              </span>
            </div>
            {m.sender === 'user' && (
              <div className="w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center text-[10px] text-white shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-2.5 bg-[#20142e] border-t border-pink-400/20 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Mande uma mensagem para a Mafe..."
          className="flex-1 px-3 py-1.5 rounded-xl bg-[#130d1c] border border-pink-400/20 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#ec5a80]"
        />
        <button
          type="submit"
          className="px-3.5 py-1.5 bg-[#ec5a80] hover:bg-[#d9486e] text-white rounded-xl text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
