import React, { useState } from 'react';
import { Heart, ArrowRight, ExternalLink, Play } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projetos" className="py-20 lg:py-24 bg-[#fff9fa] text-neutral-800 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce7eb] border border-[#f9cbd5] text-[#b02251] text-xs font-semibold tracking-wider uppercase">
              <span>Meus Projetos</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight flex items-center gap-2">
              Projetos em destaque
              <Heart className="w-5 h-5 text-[#ec5a80] fill-[#ec5a80] inline shrink-0" />
            </h2>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Aqui estão alguns dos projetos que desenvolvi. Cada um deles foi uma oportunidade de aprender, praticar e colocar em prática minhas ideias.
            </p>
          </div>

          <div>
            {projects.length > 0 && (
              <button
                onClick={() => setSelectedProject(projects[0])}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ec5a80] to-[#f498ac] hover:from-[#e14872] hover:to-[#ec5a80] text-white text-sm font-medium shadow-md shadow-[#ec5a80]/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <span>Ver todos os projetos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-white rounded-3xl overflow-hidden border border-pink-100 hover:border-[#ec5a80]/40 shadow-sm hover:shadow-xl hover:shadow-[#ec5a80]/10 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Project Image Preview */}
              <div className="relative h-44 sm:h-48 overflow-hidden bg-[#fce7eb]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transform transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay hover badge */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-white/95 text-neutral-900 text-xs font-semibold shadow-md flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 text-[#ec5a80] fill-[#ec5a80]" />
                    Testar Demo Interativo
                  </span>
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-medium text-[#b02251] shadow-xs">
                  {(project.technologies || project.tags || []).join(' • ')}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#ec5a80] transition-colors">
                    {project.name || project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tags row */}
                <div className="flex flex-wrap gap-1.5">
                  {(project.technologies || project.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md bg-[#fdf2f4] text-[#b02251] text-[11px] font-medium border border-pink-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer action link */}
                <div className="pt-2 border-t border-pink-50 flex items-center justify-between text-xs font-semibold text-[#ec5a80] group-hover:text-[#b02251]">
                  <span className="flex items-center gap-1">
                    Ver projeto <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
