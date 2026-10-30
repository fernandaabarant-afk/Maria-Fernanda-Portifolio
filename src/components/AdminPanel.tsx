import React, { useState } from 'react';
import {
  X,
  Lock,
  LogOut,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Eye,
  User,
  FolderGit2,
  Sparkles,
  Layers,
  Palette,
  Key,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Github,
  Upload,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioDatabase, Project, Skill, Service } from '../types';
import { updateAdminPassword } from '../services/portfolioStorage';

export const AdminPanel: React.FC = () => {
  const {
    data,
    isAdmin,
    isAdminPanelOpen,
    closeAdminPanel,
    loginAdmin,
    logoutAdmin,
    saveData,
    resetData,
  } = usePortfolio();

  // Estados locais para edição
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'projects' | 'skills' | 'services' | 'quotes' | 'security'>('info');

  // Estado do rascunho de alterações
  const [draft, setDraft] = useState<PortfolioDatabase>(() => JSON.parse(JSON.stringify(data)));
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);

  // Nova senha
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);

  if (!isAdminPanelOpen) return null;

  // 1. Tela de Login protegida
  if (!isAdmin) {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setLoginError(null);
      const ok = loginAdmin(passwordInput);
      if (ok) {
        setPasswordInput('');
        setDraft(JSON.parse(JSON.stringify(data)));
      } else {
        setLoginError('Senha incorreta! Dica padrão: mafe2026');
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
        <div
          className="bg-[#181122] border border-[#f498ac]/40 text-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeAdminPanel}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#241733] hover:bg-[#342448] text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar painel"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#ec5a80]/20 border border-[#ec5a80]/50 text-[#f498ac] flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Painel Administrativo</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Área restrita de Maria Fernanda para gerenciamento de conteúdo.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
              <div className="text-left">
                <label className="block text-xs text-neutral-300 mb-1 font-medium">
                  Senha de Acesso
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Digite sua senha administrativa..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#22182e] border border-[#f498ac]/30 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#ec5a80] transition-colors"
                />
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ec5a80] to-[#f498ac] hover:from-[#d9486e] hover:to-[#ec5a80] text-white font-medium text-sm shadow-md shadow-[#ec5a80]/30 transition-transform active:scale-[0.99] cursor-pointer"
              >
                Acessar Painel
              </button>
            </form>

            <p className="text-[11px] text-neutral-500">
              Dica: a senha inicial é <code className="text-[#f9cbd5] bg-white/5 px-1 py-0.5 rounded">mafe2026</code> (você pode alterá-la na aba Segurança).
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Ações de Salvar / Cancelar / Resetar
  const handleSaveAll = () => {
    // Atualizar formatador do WhatsApp se número mudou
    const rawNumber = draft.personalInfo.whatsapp.replace(/\D/g, '');
    let formatted = draft.personalInfo.whatsappFormatted;
    if (rawNumber.length >= 11) {
      const ddd = rawNumber.slice(-11, -9);
      const part1 = rawNumber.slice(-9, -4);
      const part2 = rawNumber.slice(-4);
      formatted = `(${ddd}) ${part1}-${part2}`;
    }

    const updatedDraft: PortfolioDatabase = {
      ...draft,
      personalInfo: {
        ...draft.personalInfo,
        whatsapp: rawNumber,
        whatsappFormatted: formatted,
        whatsappUrl: `https://wa.me/${rawNumber}?text=Ol%C3%A1%20Maria%20Fernanda%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!`,
      },
    };

    const ok = saveData(updatedDraft);
    if (ok) {
      setDraft(updatedDraft);
      setSaveStatus({ type: 'success', message: 'Alterações publicadas no portfólio com sucesso! ✨' });
      setTimeout(() => setSaveStatus(null), 4000);
    } else {
      setSaveStatus({ type: 'error', message: 'Erro ao salvar. Verifique o espaço local do navegador.' });
    }
  };

  const handleCancelChanges = () => {
    setDraft(JSON.parse(JSON.stringify(data)));
    setSaveStatus({ type: 'success', message: 'Alterações descartadas. Dados originais recarregados.' });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleResetToFactory = () => {
    if (confirm('Tem certeza que deseja restaurar as configurações originais padrão do portfólio?')) {
      resetData();
      setDraft(JSON.parse(JSON.stringify(data)));
      setSaveStatus({ type: 'success', message: 'Configurações de fábrica restauradas com sucesso!' });
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  // Funções de manipulação de projetos
  const handleAddProject = () => {
    const newProj: Project = {
      id: `projeto-${Date.now()}`,
      name: 'Novo Projeto',
      title: 'Novo Projeto',
      description: 'Breve descrição sobre o novo trabalho...',
      fullDescription: 'Descrição detalhada sobre os desafios e soluções técnicas deste projeto...',
      image: '/assets/projects/todo-thumb.png',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      tags: ['HTML5', 'CSS3', 'JavaScript'],
      demoUrl: 'https://github.com',
      githubUrl: 'https://github.com/fernandaabarant-afk',
      hasInteractiveDemo: false,
      category: 'web',
      features: ['Interface responsiva', 'Código limpo e documentado'],
    };

    setDraft({
      ...draft,
      projects: [newProj, ...draft.projects],
    });
    setEditingProjectIndex(0);
  };

  const handleDeleteProject = (index: number) => {
    if (confirm('Deseja realmente remover este projeto?')) {
      const updated = draft.projects.filter((_, i) => i !== index);
      setDraft({ ...draft, projects: updated });
      if (editingProjectIndex === index) setEditingProjectIndex(null);
    }
  };

  const handleMoveProject = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= draft.projects.length) return;
    const arr = [...draft.projects];
    const [moved] = arr.splice(index, 1);
    arr.splice(target, 0, moved);
    setDraft({ ...draft, projects: arr });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      setPasswordStatus('A senha deve ter no mínimo 4 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus('As senhas digitadas não coincidem.');
      return;
    }
    updateAdminPassword(newPassword);
    setPasswordStatus('Senha administrativa atualizada com sucesso! 🔒');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-[#161020] border border-[#f498ac]/35 text-white rounded-3xl max-w-5xl w-full max-h-[95vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#20152e] px-6 py-4 border-b border-[#f498ac]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ec5a80] to-[#f498ac] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
                Painel Administrativo
                <span className="text-[10px] bg-[#ec5a80]/20 text-[#f9cbd5] px-2 py-0.5 rounded-full border border-[#ec5a80]/30 font-medium">
                  Maria Fernanda
                </span>
              </h2>
              <span className="text-xs text-neutral-400">Edição e personalização ao vivo do portfólio</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logoutAdmin();
                closeAdminPanel();
              }}
              className="px-3 py-1.5 rounded-xl bg-[#2a1b3d] hover:bg-[#382452] text-xs text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Sair do painel"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
            <button
              onClick={closeAdminPanel}
              className="w-8 h-8 rounded-full bg-[#2a1b3d] hover:bg-[#382452] text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action / Notification Banner */}
        {saveStatus && (
          <div
            className={`px-6 py-2.5 text-xs flex items-center justify-between border-b ${
              saveStatus.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/80 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {saveStatus.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400" />
              )}
              <span>{saveStatus.message}</span>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-[#1a1226] px-6 py-2 border-b border-white/5 flex gap-2 overflow-x-auto">
          {[
            { id: 'info', label: 'Perfil & Contatos', icon: User },
            { id: 'projects', label: `Projetos (${draft.projects.length})`, icon: FolderGit2 },
            { id: 'skills', label: `Habilidades (${draft.skills.length})`, icon: Layers },
            { id: 'services', label: `Serviços (${draft.services.length})`, icon: Sparkles },
            { id: 'quotes', label: 'Frases & Textos', icon: Palette },
            { id: 'security', label: 'Segurança / Senha', icon: Key },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#ec5a80] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: PERFIL & CONTATOS */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Foto de Perfil / Avatar */}
              <div className="bg-[#20152e] border border-[#f498ac]/25 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-5">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#ec5a80] bg-[#140d1e] shadow-md shadow-[#ec5a80]/20">
                    <img
                      src={draft.personalInfo.avatarUrl || draft.personalInfo.profileImage || '/assets/character/avatar-portrait.png'}
                      alt="Foto de Perfil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 w-full space-y-2">
                  <label className="block text-xs font-semibold text-[#f9cbd5]">
                    Foto de Perfil / Avatar Anime
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="URL da imagem (ou envie um arquivo abaixo)"
                      value={draft.personalInfo.avatarUrl || draft.personalInfo.profileImage || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDraft({
                          ...draft,
                          personalInfo: {
                            ...draft.personalInfo,
                            avatarUrl: val,
                            profileImage: val,
                          },
                        });
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-[#140d1e] border border-pink-400/20 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                    />

                    <label className="px-3.5 py-1.5 rounded-xl bg-[#2e1d42] hover:bg-[#3d2757] text-[#f498ac] text-xs font-medium border border-[#f498ac]/30 flex items-center justify-center gap-1.5 cursor-pointer shrink-0 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Subir Imagem</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              const result = reader.result as string;
                              setDraft({
                                ...draft,
                                personalInfo: {
                                  ...draft.personalInfo,
                                  avatarUrl: result,
                                  profileImage: result,
                                },
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setDraft({
                          ...draft,
                          personalInfo: {
                            ...draft.personalInfo,
                            avatarUrl: '/assets/character/avatar-portrait.png',
                            profileImage: '/assets/character/avatar-portrait.png',
                          },
                        });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs transition-colors cursor-pointer shrink-0"
                    >
                      Padrão
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Você pode colar um link de imagem ou fazer upload direto do seu computador/celular.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">Nome Completo</label>
                  <input
                    type="text"
                    value={draft.personalInfo.name}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personalInfo: { ...draft.personalInfo, name: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">Cargo / Subtítulo</label>
                  <input
                    type="text"
                    value={draft.personalInfo.role}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personalInfo: { ...draft.personalInfo, role: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">E-mail Principal</label>
                  <input
                    type="email"
                    value={draft.personalInfo.email}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personalInfo: { ...draft.personalInfo, email: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">WhatsApp (com DDD)</label>
                  <input
                    type="text"
                    value={draft.personalInfo.whatsapp}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personalInfo: { ...draft.personalInfo, whatsapp: e.target.value },
                      })
                    }
                    placeholder="5511920889940"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">Localização</label>
                  <input
                    type="text"
                    value={draft.personalInfo.location}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personalInfo: { ...draft.personalInfo, location: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">Link do GitHub</label>
                  <input
                    type="text"
                    value={draft.personalInfo.github}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personalInfo: { ...draft.personalInfo, github: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">Link do LinkedIn</label>
                  <input
                    type="text"
                    value={draft.personalInfo.linkedin}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personalInfo: { ...draft.personalInfo, linkedin: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">Link do Instagram</label>
                  <input
                    type="text"
                    value={draft.personalInfo.instagram || ''}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personalInfo: { ...draft.personalInfo, instagram: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">Formação</label>
                  <input
                    type="text"
                    value={draft.personalInfo.education}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personalInfo: { ...draft.personalInfo, education: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">Foco Profissional</label>
                  <input
                    type="text"
                    value={draft.personalInfo.focus}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personalInfo: { ...draft.personalInfo, focus: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1 font-medium">Disponibilidade</label>
                <input
                  type="text"
                  value={draft.personalInfo.availability}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      personalInfo: { ...draft.personalInfo, availability: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1 font-medium">
                  Texto "Sobre Mim" (Parágrafos)
                </label>
                <div className="space-y-2">
                  {draft.personalInfo.aboutParagraphs.map((par, pIdx) => (
                    <textarea
                      key={pIdx}
                      rows={2}
                      value={par}
                      onChange={(e) => {
                        const updated = [...draft.personalInfo.aboutParagraphs];
                        updated[pIdx] = e.target.value;
                        setDraft({
                          ...draft,
                          personalInfo: { ...draft.personalInfo, aboutParagraphs: updated },
                        });
                      }}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs focus:outline-none focus:border-[#ec5a80] resize-none"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJETOS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#fce7eb]">Gerenciar Trabalhos & Projetos</h3>
                  <p className="text-xs text-neutral-400">
                    Adicione, edite, ordene ou remova projetos. As alterações aparecerão imediatamente no portfólio.
                  </p>
                </div>
                <button
                  onClick={handleAddProject}
                  className="px-4 py-2 rounded-xl bg-[#ec5a80] hover:bg-[#d9486e] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Projeto</span>
                </button>
              </div>

              <div className="space-y-4">
                {draft.projects.map((proj, idx) => {
                  const isEditing = editingProjectIndex === idx;
                  return (
                    <div
                      key={proj.id}
                      className="bg-[#20152e] border border-[#f498ac]/25 rounded-2xl p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-[#2e1d42] text-xs font-mono flex items-center justify-center text-neutral-300">
                            #{idx + 1}
                          </span>
                          <div>
                            <h4 className="font-bold text-sm text-white">{proj.name || proj.title}</h4>
                            <span className="text-[11px] text-neutral-400">
                              {(proj.technologies || proj.tags || []).join(' • ')}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleMoveProject(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg bg-[#2e1d42] hover:bg-[#3d2757] text-neutral-300 disabled:opacity-30 cursor-pointer"
                            title="Mover para cima"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveProject(idx, 'down')}
                            disabled={idx === draft.projects.length - 1}
                            className="p-1.5 rounded-lg bg-[#2e1d42] hover:bg-[#3d2757] text-neutral-300 disabled:opacity-30 cursor-pointer"
                            title="Mover para baixo"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingProjectIndex(isEditing ? null : idx)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                              isEditing
                                ? 'bg-white text-neutral-900'
                                : 'bg-[#2e1d42] hover:bg-[#3d2757] text-neutral-200'
                            }`}
                          >
                            {isEditing ? 'Fechar' : 'Editar'}
                          </button>
                          <button
                            onClick={() => handleDeleteProject(idx)}
                            className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900 text-rose-300 border border-rose-500/30 transition-colors cursor-pointer"
                            title="Excluir projeto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Formulário de Edição Aberto */}
                      {isEditing && (
                        <div className="pt-4 border-t border-white/10 space-y-4 animate-in fade-in duration-150">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-neutral-300 mb-1 font-medium">Nome do Projeto</label>
                              <input
                                type="text"
                                value={proj.name}
                                onChange={(e) => {
                                  const projs = [...draft.projects];
                                  projs[idx].name = e.target.value;
                                  projs[idx].title = e.target.value;
                                  setDraft({ ...draft, projects: projs });
                                }}
                                className="w-full px-3 py-1.5 rounded-xl bg-[#140d1e] border border-pink-400/20 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-neutral-300 mb-1 font-medium">Imagem / Thumbnail</label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={proj.image}
                                  onChange={(e) => {
                                    const projs = [...draft.projects];
                                    projs[idx].image = e.target.value;
                                    setDraft({ ...draft, projects: projs });
                                  }}
                                  placeholder="URL ou envie arquivo"
                                  className="flex-1 px-3 py-1.5 rounded-xl bg-[#140d1e] border border-pink-400/20 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                                />
                                <label className="px-3 py-1.5 rounded-xl bg-[#2e1d42] hover:bg-[#3d2757] text-[#f498ac] text-xs font-medium border border-[#f498ac]/30 flex items-center justify-center gap-1 cursor-pointer shrink-0 transition-colors">
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Subir</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                          const result = reader.result as string;
                                          const projs = [...draft.projects];
                                          projs[idx].image = result;
                                          setDraft({ ...draft, projects: projs });
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-neutral-300 mb-1 font-medium">Link da Demonstração Online</label>
                              <input
                                type="text"
                                value={proj.demoUrl || ''}
                                onChange={(e) => {
                                  const projs = [...draft.projects];
                                  projs[idx].demoUrl = e.target.value;
                                  setDraft({ ...draft, projects: projs });
                                }}
                                placeholder="https://..."
                                className="w-full px-3 py-1.5 rounded-xl bg-[#140d1e] border border-pink-400/20 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-neutral-300 mb-1 font-medium">Link do GitHub</label>
                              <input
                                type="text"
                                value={proj.githubUrl}
                                onChange={(e) => {
                                  const projs = [...draft.projects];
                                  projs[idx].githubUrl = e.target.value;
                                  setDraft({ ...draft, projects: projs });
                                }}
                                className="w-full px-3 py-1.5 rounded-xl bg-[#140d1e] border border-pink-400/20 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs text-neutral-300 mb-1 font-medium">
                              Tecnologias (separadas por vírgula)
                            </label>
                            <input
                              type="text"
                              value={(proj.technologies || []).join(', ')}
                              onChange={(e) => {
                                const projs = [...draft.projects];
                                const list = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                                projs[idx].technologies = list;
                                projs[idx].tags = list;
                                setDraft({ ...draft, projects: projs });
                              }}
                              className="w-full px-3 py-1.5 rounded-xl bg-[#140d1e] border border-pink-400/20 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-neutral-300 mb-1 font-medium">Descrição Curta (Card)</label>
                            <input
                              type="text"
                              value={proj.description}
                              onChange={(e) => {
                                const projs = [...draft.projects];
                                projs[idx].description = e.target.value;
                                setDraft({ ...draft, projects: projs });
                              }}
                              className="w-full px-3 py-1.5 rounded-xl bg-[#140d1e] border border-pink-400/20 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-neutral-300 mb-1 font-medium">Descrição Completa (Modal)</label>
                            <textarea
                              rows={3}
                              value={proj.fullDescription || ''}
                              onChange={(e) => {
                                const projs = [...draft.projects];
                                projs[idx].fullDescription = e.target.value;
                                setDraft({ ...draft, projects: projs });
                              }}
                              className="w-full px-3 py-1.5 rounded-xl bg-[#140d1e] border border-pink-400/20 text-white text-xs focus:outline-none focus:border-[#ec5a80] resize-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: HABILIDADES */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#fce7eb]">Tecnologias & Habilidades</h3>
                  <p className="text-xs text-neutral-400">Edite as descrições e títulos das ferramentas.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {draft.skills.map((skill, sIdx) => (
                  <div key={skill.name} className="p-3.5 rounded-2xl bg-[#20152e] border border-pink-400/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{skill.name}</span>
                      <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full capitalize text-neutral-300">
                        {skill.category}
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      value={skill.description}
                      onChange={(e) => {
                        const updated = [...draft.skills];
                        updated[sIdx].description = e.target.value;
                        setDraft({ ...draft, skills: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-xl bg-[#140d1e] border border-pink-400/20 text-white text-xs focus:outline-none focus:border-[#ec5a80] resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SERVIÇOS */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-sm text-[#fce7eb]">Serviços Oferecidos</h3>
                <p className="text-xs text-neutral-400">Altere os títulos, descrições e entregáveis dos serviços.</p>
              </div>

              <div className="space-y-4">
                {draft.services.map((srv, sIdx) => (
                  <div key={srv.id} className="p-4 rounded-2xl bg-[#20152e] border border-pink-400/20 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-neutral-300 mb-1 font-medium">Título do Serviço</label>
                        <input
                          type="text"
                          value={srv.title}
                          onChange={(e) => {
                            const updated = [...draft.services];
                            updated[sIdx].title = e.target.value;
                            setDraft({ ...draft, services: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-[#140d1e] border border-pink-400/20 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-300 mb-1 font-medium">Descrição</label>
                        <input
                          type="text"
                          value={srv.description}
                          onChange={(e) => {
                            const updated = [...draft.services];
                            updated[sIdx].description = e.target.value;
                            setDraft({ ...draft, services: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-[#140d1e] border border-pink-400/20 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 mb-1 font-medium">
                        O que inclui (separados por vírgula)
                      </label>
                      <input
                        type="text"
                        value={srv.deliverables.join(', ')}
                        onChange={(e) => {
                          const updated = [...draft.services];
                          updated[sIdx].deliverables = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                          setDraft({ ...draft, services: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-[#140d1e] border border-pink-400/20 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FRASES & TEXTOS */}
          {activeTab === 'quotes' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-sm text-[#fce7eb]">Frases Manuscritas & Slogans</h3>
                <p className="text-xs text-neutral-400">Edite as citações carinhosas que aparecem pelo site.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">Frase Hero (Topo)</label>
                  <input
                    type="text"
                    value={draft.personalInfo.handwrittenQuotes.hero}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personalInfo: {
                          ...draft.personalInfo,
                          handwrittenQuotes: { ...draft.personalInfo.handwrittenQuotes, hero: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs font-handwriting text-base focus:outline-none focus:border-[#ec5a80]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">Frase Sobre Mim</label>
                  <input
                    type="text"
                    value={draft.personalInfo.handwrittenQuotes.about}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personalInfo: {
                          ...draft.personalInfo,
                          handwrittenQuotes: { ...draft.personalInfo.handwrittenQuotes, about: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs font-handwriting text-base focus:outline-none focus:border-[#ec5a80]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">Frase Habilidades</label>
                  <input
                    type="text"
                    value={draft.personalInfo.handwrittenQuotes.skills}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personalInfo: {
                          ...draft.personalInfo,
                          handwrittenQuotes: { ...draft.personalInfo.handwrittenQuotes, skills: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs font-handwriting text-base focus:outline-none focus:border-[#ec5a80]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">Frase Contato</label>
                  <input
                    type="text"
                    value={draft.personalInfo.handwrittenQuotes.contact}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personalInfo: {
                          ...draft.personalInfo,
                          handwrittenQuotes: { ...draft.personalInfo.handwrittenQuotes, contact: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs font-handwriting text-base focus:outline-none focus:border-[#ec5a80]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SEGURANÇA */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-md">
              <div>
                <h3 className="font-bold text-sm text-[#fce7eb]">Alterar Senha Administrativa</h3>
                <p className="text-xs text-neutral-400">
                  Defina uma nova senha para proteger o acesso ao painel administrativo.
                </p>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-3.5">
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">Nova Senha</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mínimo 4 caracteres"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">Confirmar Nova Senha</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repita a nova senha"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#20152e] border border-[#f498ac]/25 text-white text-xs focus:outline-none focus:border-[#ec5a80]"
                  />
                </div>

                {passwordStatus && (
                  <div className="p-3 rounded-xl bg-[#251736] border border-pink-400/30 text-xs text-[#fce7eb]">
                    {passwordStatus}
                  </div>
                )}

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#ec5a80] hover:bg-[#d9486e] text-white text-xs font-semibold cursor-pointer transition-colors"
                >
                  Salvar Nova Senha
                </button>
              </form>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={handleResetToFactory}
                  className="px-4 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar dados de fábrica originais</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-[#20152e] px-6 py-4 border-t border-[#f498ac]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>Última atualização:</span>
            <span className="text-white font-mono text-[11px]">
              {new Date(draft.lastUpdated).toLocaleDateString()} {new Date(draft.lastUpdated).toLocaleTimeString()}
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleCancelChanges}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#2c1d3f] hover:bg-[#392652] text-xs font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              Cancelar Alterações
            </button>
            <button
              onClick={handleSaveAll}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ec5a80] to-[#f498ac] hover:from-[#d9486e] hover:to-[#ec5a80] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#ec5a80]/30 transition-transform active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
