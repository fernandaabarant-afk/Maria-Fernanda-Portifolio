/**
 * PORTFÓLIO PESSOAL — MARIA FERNANDA
 * app.js: Renderização dinâmica, interações, modais, navegação e eventos
 */

import { getPortfolioData } from './data.js';
import { initAdminPanel, openAdminModal } from './admin.js';

// Estado global do app
let currentData = getPortfolioData();
let selectedSkill = null;

// Ícones SVG reutilizáveis
const ICONS = {
  heart: `<svg class="heart-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
  externalLink: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
  arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`
};

// Inicialização principal ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  setupNavigation();
  setupModals();
  setupEasterEggs();
  initAdminPanel();

  // Escuta atualizações do painel administrativo
  window.addEventListener('portfolio-updated', (e) => {
    currentData = e.detail;
    renderAll();
  });
});

/**
 * Renderiza todas as seções dinâmicas a partir do estado atual
 */
function renderAll() {
  const { personalInfo, skills, projects, services } = currentData;

  // 1. Textos do Topo & Navbar
  const navBrandAvatar = document.getElementById('nav-avatar-img');
  if (navBrandAvatar) navBrandAvatar.src = personalInfo.avatarUrl || '/assets/character/avatar-portrait.png';
  
  const navBrandName = document.getElementById('nav-brand-name');
  if (navBrandName) navBrandName.innerHTML = `${personalInfo.name} ${ICONS.heart}`;

  const navBrandRole = document.getElementById('nav-brand-role');
  if (navBrandRole) navBrandRole.textContent = personalInfo.role;

  const navQuote = document.getElementById('nav-quote');
  if (navQuote) navQuote.textContent = personalInfo.handwrittenQuotes?.hero || "sonhe planeje conquiste ♡";

  // 2. Hero Section
  const heroTag = document.getElementById('hero-tag');
  if (heroTag) heroTag.textContent = personalInfo.tagline;

  const heroName = document.getElementById('hero-name');
  if (heroName) heroName.innerHTML = `<span>${personalInfo.name}</span>`;

  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle) heroSubtitle.textContent = personalInfo.heroSubtitle;

  const heroDesc = document.getElementById('hero-desc');
  if (heroDesc) heroDesc.textContent = personalInfo.heroDescription;

  const heroGithub = document.getElementById('hero-github');
  if (heroGithub) heroGithub.href = personalInfo.github;

  const heroLinkedin = document.getElementById('hero-linkedin');
  if (heroLinkedin) heroLinkedin.href = personalInfo.linkedin;

  const heroInstagram = document.getElementById('hero-instagram');
  if (heroInstagram) heroInstagram.href = personalInfo.instagram || 'https://instagram.com';

  // 3. Sobre Mim
  const aboutAvatar = document.getElementById('about-avatar-img');
  if (aboutAvatar) aboutAvatar.src = personalInfo.avatarUrl || '/assets/character/avatar-portrait.png';

  const aboutQuote = document.getElementById('about-quote');
  if (aboutQuote) aboutQuote.textContent = personalInfo.handwrittenQuotes?.about || "Pequenos códigos, grandes sonhos ♡";

  const aboutParagraphsContainer = document.getElementById('about-paragraphs');
  if (aboutParagraphsContainer) {
    aboutParagraphsContainer.innerHTML = personalInfo.aboutParagraphs
      .map(p => `<p>${p}</p>`)
      .join('');
  }

  // Cards de Informações Pessoais
  const infoLocation = document.getElementById('info-location');
  if (infoLocation) infoLocation.textContent = personalInfo.location;

  const infoEducation = document.getElementById('info-education');
  if (infoEducation) infoEducation.textContent = personalInfo.education;

  const infoFocus = document.getElementById('info-focus');
  if (infoFocus) infoFocus.textContent = personalInfo.focus;

  const infoAvailability = document.getElementById('info-availability');
  if (infoAvailability) infoAvailability.textContent = personalInfo.availability;

  // 4. Habilidades
  const skillsQuote = document.getElementById('skills-quote');
  if (skillsQuote) skillsQuote.textContent = personalInfo.handwrittenQuotes?.skills || "Código também é uma forma de arte ♡";

  renderSkillsGrid(skills);

  // 5. Projetos
  renderProjectsGrid(projects);

  // 6. Serviços
  renderServicesGrid(services);

  // 7. Contato
  const contactQuote = document.getElementById('contact-quote');
  if (contactQuote) contactQuote.textContent = personalInfo.handwrittenQuotes?.contact || "Vamos conversar? ♡";

  const contactWhatsappBtn = document.getElementById('contact-whatsapp-btn');
  if (contactWhatsappBtn) {
    contactWhatsappBtn.href = personalInfo.whatsappUrl || `https://wa.me/${personalInfo.whatsapp}`;
    const contactWhatsappText = document.getElementById('contact-whatsapp-text');
    if (contactWhatsappText) {
      contactWhatsappText.textContent = `WhatsApp (${personalInfo.whatsappFormatted || '(11) 92088-9940'})`;
    }
  }

  const contactWhatsappIconBtn = document.getElementById('contact-whatsapp-icon-btn');
  if (contactWhatsappIconBtn) {
    contactWhatsappIconBtn.href = personalInfo.whatsappUrl || `https://wa.me/${personalInfo.whatsapp}`;
  }

  const contactGithub = document.getElementById('contact-github');
  if (contactGithub) contactGithub.href = personalInfo.github;

  const contactLinkedin = document.getElementById('contact-linkedin');
  if (contactLinkedin) contactLinkedin.href = personalInfo.linkedin;

  const contactInstagram = document.getElementById('contact-instagram');
  if (contactInstagram) contactInstagram.href = personalInfo.instagram || 'https://instagram.com';

  // 8. Footer
  const footerSignature = document.getElementById('footer-signature');
  if (footerSignature) footerSignature.textContent = `${personalInfo.name} ♡`;

  const footerCopyright = document.getElementById('footer-copyright');
  if (footerCopyright) {
    footerCopyright.innerHTML = `© ${new Date().getFullYear()} ${personalInfo.name}. Todos os direitos reservados. Feito com carinho e código ${ICONS.heart}`;
  }
}

/**
 * Renderiza o grid de habilidades interativas
 */
function renderSkillsGrid(skills) {
  const container = document.getElementById('skills-grid-container');
  if (!container) return;

  container.innerHTML = skills.map((skill, idx) => {
    const isSelected = selectedSkill && selectedSkill.name === skill.name;
    return `
      <div class="skill-card ${isSelected ? 'selected' : ''}" data-skill-idx="${idx}">
        <div class="skill-badge" style="background: rgba(236, 90, 128, 0.12); color: var(--color-wine);">
          <span>${skill.name.slice(0, 2)}</span>
        </div>
        <span class="skill-name">${skill.name}</span>
        <span class="skill-category">${skill.category === 'frontend' ? 'Front-end' : 'Ferramenta'}</span>
      </div>
    `;
  }).join('');

  // Eventos de clique para exibir detalhes da habilidade
  container.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-skill-idx'), 10);
      const clicked = skills[idx];
      selectedSkill = (selectedSkill && selectedSkill.name === clicked.name) ? null : clicked;
      renderSkillsGrid(skills);
      updateSkillDetailBox();
    });
  });
}

function updateSkillDetailBox() {
  const box = document.getElementById('skill-detail-box');
  if (!box) return;

  if (!selectedSkill) {
    box.style.display = 'none';
    return;
  }

  box.style.display = 'block';
  box.innerHTML = `
    <div class="skill-detail-header">
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <span style="color:var(--color-primary); font-size:1.1rem;">✓</span>
        <span>${selectedSkill.name}</span>
      </div>
      <button id="close-skill-detail" style="font-size:0.75rem; color:#888; cursor:pointer;">✕ Fechar</button>
    </div>
    <p style="font-size:0.825rem; color:var(--text-muted); line-height:1.5;">${selectedSkill.description}</p>
  `;

  document.getElementById('close-skill-detail')?.addEventListener('click', () => {
    selectedSkill = null;
    renderSkillsGrid(currentData.skills);
    updateSkillDetailBox();
  });
}

/**
 * Renderiza os cards de projetos reais
 */
function renderProjectsGrid(projects) {
  const container = document.getElementById('projects-grid-container');
  if (!container) return;

  container.innerHTML = projects.map((proj, idx) => {
    const tags = proj.technologies || proj.tags || [];
    return `
      <div class="project-card" data-proj-idx="${idx}">
        <div class="project-thumb-box">
          <img src="${proj.image}" alt="${proj.name}" loading="lazy">
          <div class="project-tech-badge">${tags.slice(0, 2).join(' • ')}</div>
        </div>
        <div class="project-content">
          <div>
            <h3 class="project-name">${proj.name}</h3>
            <p class="project-desc">${proj.description}</p>
          </div>
          <div class="project-tags">
            ${tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <div class="project-footer">
            <span style="display:flex; align-items:center; gap:0.35rem;">
              Ver projeto ${ICONS.arrowRight}
            </span>
            ${ICONS.externalLink}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Evento de clique para abrir modal com detalhes do projeto
  container.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-proj-idx'), 10);
      openProjectModal(projects[idx]);
    });
  });
}

/**
 * Renderiza os serviços oferecidos
 */
function renderServicesGrid(services) {
  const container = document.getElementById('services-grid-container');
  if (!container) return;

  container.innerHTML = services.map(service => `
    <div class="service-card">
      <div>
        <div class="service-icon-box">
          <span>✨</span>
        </div>
        <h3 class="service-title">${service.title}</h3>
        <p class="service-desc">${service.description}</p>
      </div>
      <div>
        <ul class="service-deliverables">
          ${service.deliverables.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

/**
 * Configuração da barra de navegação, scroll suave e menu mobile
 */
function setupNavigation() {
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const navLinks = document.getElementById('nav-links');

  // Sticky effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  toggleBtn?.addEventListener('click', () => {
    navLinks?.classList.toggle('mobile-open');
  });

  // Fechar menu mobile ao clicar em um link
  navLinks?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });

  // Botão voltar ao topo
  document.getElementById('btn-back-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Botão "Conheça meus projetos"
  document.getElementById('btn-hero-projects')?.addEventListener('click', () => {
    document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('btn-all-projects')?.addEventListener('click', () => {
    if (currentData.projects.length > 0) {
      openProjectModal(currentData.projects[0]);
    }
  });
}

/**
 * Modais: Contato e Detalhes do Projeto
 */
function setupModals() {
  const contactModal = document.getElementById('contact-modal');
  const openContactBtns = document.querySelectorAll('.open-contact-modal');
  const closeContactBtn = document.getElementById('close-contact-modal');
  const contactForm = document.getElementById('contact-form');
  const copyEmailBtn = document.getElementById('btn-copy-email');

  // Abrir modal de contato
  openContactBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      contactModal?.classList.add('active');
    });
  });

  // Fechar modal de contato
  closeContactBtn?.addEventListener('click', () => {
    contactModal?.classList.remove('active');
  });

  contactModal?.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      contactModal.classList.remove('active');
    }
  });

  // Copiar email com feedback
  copyEmailBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText(currentData.personalInfo.email);
    showToast('✨ E-mail copiado para a área de transferência!');
  });

  // Envio do formulário via mailto
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name')?.value;
    const email = document.getElementById('form-email')?.value;
    const subject = document.getElementById('form-subject')?.value || 'Contato via Portfólio';
    const message = document.getElementById('form-message')?.value;

    const body = `Olá Maria Fernanda,\n\nMeu nome é ${name} (${email}).\n\nMensagem:\n${message}`;
    const mailto = `mailto:${currentData.personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailto;
    contactModal?.classList.remove('active');
    showToast('💌 Abrindo seu aplicativo de e-mail...');
  });

  // Modal de Detalhes do Projeto
  const projectModal = document.getElementById('project-modal');
  const closeProjectBtn = document.getElementById('close-project-modal');

  closeProjectBtn?.addEventListener('click', () => {
    projectModal?.classList.remove('active');
  });

  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.classList.remove('active');
    }
  });
}

/**
 * Abre o modal com os dados de um projeto selecionado
 */
export function openProjectModal(project) {
  const modal = document.getElementById('project-modal');
  if (!modal || !project) return;

  document.getElementById('modal-project-title').textContent = project.name;
  document.getElementById('modal-project-desc').textContent = project.fullDescription || project.description;
  
  const tagsContainer = document.getElementById('modal-project-tags');
  if (tagsContainer) {
    const tags = project.technologies || project.tags || [];
    tagsContainer.innerHTML = tags.map(t => `<span class="tech-tag">${t}</span>`).join('');
  }

  const featuresContainer = document.getElementById('modal-project-features');
  if (featuresContainer) {
    if (project.features && project.features.length > 0) {
      featuresContainer.innerHTML = `
        <h4 style="font-size:0.75rem; text-transform:uppercase; color:#9c8e9f; margin-bottom:0.5rem; font-weight:700;">Recursos Implementados</h4>
        <ul style="list-style:none; display:grid; grid-template-columns:1fr 1fr; gap:0.4rem; font-size:0.8rem; color:#d5cad8;">
          ${project.features.map(f => `<li><span style="color:var(--color-primary); margin-right:0.35rem;">•</span>${f}</li>`).join('')}
        </ul>
      `;
    } else {
      featuresContainer.innerHTML = '';
    }
  }

  const demoBtn = document.getElementById('modal-project-demo-btn');
  if (demoBtn) {
    if (project.demoUrl) {
      demoBtn.href = project.demoUrl;
      demoBtn.style.display = 'inline-flex';
    } else {
      demoBtn.style.display = 'none';
    }
  }

  const githubBtn = document.getElementById('modal-project-github-btn');
  if (githubBtn) {
    githubBtn.href = project.githubUrl;
  }

  modal.classList.add('active');
}

/**
 * Easter Eggs interativos no setup da personagem
 */
function setupEasterEggs() {
  document.getElementById('code-easter-egg')?.addEventListener('click', () => {
    console.log("%c ✨ Maria Fernanda — Desenvolvedora Front-end ✨", "color: #ec5a80; font-size: 16px; font-weight: bold;");
    console.log("const developer = { name: 'Maria Fernanda', focus: 'Web & Front-end', passion: 'Code & Anime' };");
    showToast('✨ console.log("Maria Fernanda") executado com sucesso no terminal!');
  });

  document.getElementById('cat-easter-egg')?.addEventListener('click', () => {
    showToast('Miauuu! 🐾 O gatinho deu ronrom para te dar boa sorte!');
  });
}

/**
 * Notificação toast flutuante
 */
export function showToast(msg) {
  const existing = document.querySelector('.easter-egg-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'easter-egg-toast';
  toast.innerHTML = `<span>${msg}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
