import React from 'react';
import { X, ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';
import { TodoListDemo } from './demos/TodoListDemo';
import { MusicPlayerDemo } from './demos/MusicPlayerDemo';
import { FinanceTrackerDemo } from './demos/FinanceTrackerDemo';
import { MafeChatDemo } from './demos/MafeChatDemo';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const projectTitle = project.name || project.title;
  const projectTechs = project.technologies || project.tags || [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-pink-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-pink-100 flex items-center justify-between z-10">
          <div>
            <span className="text-xs font-semibold text-[#ec5a80] uppercase tracking-wider">
              Detalhes do Projeto
            </span>
            <h3 id="modal-title" className="text-xl font-bold text-neutral-900">
              {projectTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar modal de detalhes"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6 space-y-6">
          {/* Interactive Demo Component (if applicable) */}
          {project.hasInteractiveDemo && (
            <div>
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                Experimente a Aplicação
              </h4>
              {project.id === 'mafe' && <MafeChatDemo />}
              {(project.id === 'minha-economia' || project.id === 'controle-financeiro') && (
                <FinanceTrackerDemo />
              )}
              {project.id === 'music-player' && <MusicPlayerDemo />}
              {project.id === 'todo-list' && <TodoListDemo />}
            </div>
          )}

          {/* Project description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Sobre este trabalho
            </h4>
            <p className="text-neutral-700 text-sm leading-relaxed">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Tags / Technologies */}
          <div>
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Tecnologias Utilizadas
            </h4>
            <div className="flex flex-wrap gap-2">
              {projectTechs.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#fce7eb] text-[#b02251] text-xs font-medium border border-[#f9cbd5]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Recursos Implementados
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ec5a80]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions: Demo Link, GitHub Link, Close */}
          <div className="pt-2 flex flex-wrap gap-3 border-t border-pink-100">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ec5a80] to-[#f498ac] hover:from-[#d9486e] hover:to-[#ec5a80] text-white text-xs sm:text-sm font-medium shadow-sm transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Ver Demonstração Online</span>
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-medium transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Ver no GitHub</span>
            </a>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              Voltar aos projetos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
