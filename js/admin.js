/**
 * PORTFÓLIO PESSOAL — MARIA FERNANDA
 * admin.js: Painel Administrativo Protegido por Senha em JavaScript Puro
 */

import { getPortfolioData, savePortfolioData, resetPortfolioData, verifyAdminPassword, setAdminPassword } from './data.js';
import { showToast } from './app.js';

let isAdminLoggedIn = false;
let adminDraft = null;
let currentTab = 'info';

/**
 * Inicializa os atalhos e gatilhos do painel administrativo
 */
export function initAdminPanel() {
  const triggerBtn = document.getElementById('btn-admin-trigger');
  triggerBtn?.addEventListener('click', openAdminModal);

  // Atalho de teclado Ctrl + Shift + A ou Alt + A
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
      e.preventDefault();
      openAdminModal();
    }
  });

  // Verificação de URL com ?admin ou #admin
  if (window.location.search.includes('admin') || window.location.hash.includes('admin')) {
    openAdminModal();
  }

  // Fechar modal ao clicar fora ou no botão X
  document.getElementById('close-admin-modal')?.addEventListener('click', closeAdminModal);
  document.getElementById('admin-modal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('admin-modal')) {
      closeAdminModal();
    }
  });
}

/**
 * Abre o modal administrativo
 */
export function openAdminModal() {
  const modal = document.getElementById('admin-modal');
  if (!modal) return;

  if (!isAdminLoggedIn) {
    renderLoginForm();
  } else {
    adminDraft = JSON.parse(JSON.stringify(getPortfolioData()));
    renderAdminDashboard();
  }

  modal.classList.add('active');
}

/**
 * Fecha o modal administrativo
 */
export function closeAdminModal() {
  const modal = document.getElementById('admin-modal');
  if (modal) modal.classList.remove('active');
}

/**
 * Renderiza tela de login com senha
 */
function renderLoginForm() {
  const container = document.getElementById('admin-modal-content');
  if (!container) return;

  container.innerHTML = `
    <div style="text-align:center; padding: 2rem 1rem;">
      <div style="width:56px; height:56px; border-radius:1rem; background:rgba(236,90,128,0.2); border:1px solid var(--color-primary); color:var(--color-primary-light); display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem; font-size:1.5rem;">
        🔒
      </div>
      <h2 class="modal-title">Painel Administrativo</h2>
      <p style="font-size:0.8rem; color:#b7a8bd; margin-bottom:1.5rem;">
        Área restrita de Maria Fernanda para gerenciamento de conteúdo.
      </p>

      <form id="admin-login-form" style="max-width:320px; margin:0 auto;">
        <div class="form-group">
          <label class="form-label">Senha de Acesso</label>
          <input type="password" id="admin-password-input" class="form-input" placeholder="Digite sua senha..." required autofocus>
        </div>
        <div id="admin-login-error" style="color:#f87171; font-size:0.75rem; margin-bottom:0.75rem; display:none;">
          Senha incorreta! (Dica padrão: mafe2026)
        </div>
        <button type="submit" class="btn-primary" style="width:100%; justify-content:center; margin-top:0.5rem;">
          Entrar no Painel
        </button>
      </form>
    </div>
  `;

  document.getElementById('admin-login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const pwd = document.getElementById('admin-password-input')?.value;
    if (verifyAdminPassword(pwd)) {
      isAdminLoggedIn = true;
      adminDraft = JSON.parse(JSON.stringify(getPortfolioData()));
      renderAdminDashboard();
    } else {
      const errorMsg = document.getElementById('admin-login-error');
      if (errorMsg) errorMsg.style.display = 'block';
    }
  });
}

/**
 * Renderiza o painel principal com abas de edição
 */
function renderAdminDashboard() {
  const container = document.getElementById('admin-modal-content');
  if (!container) return;

  container.innerHTML = `
    <div class="admin-header">
      <div style="display:flex; align-items:center; gap:0.75rem;">
        <span style="font-size:1.25rem;">✨</span>
        <div>
          <h2 style="font-size:1.15rem; font-weight:700; color:#fff;">Painel Administrativo</h2>
          <span style="font-size:0.7rem; color:#b7a8bd;">Edição em tempo real de conteúdo</span>
        </div>
      </div>
      <button id="admin-logout-btn" style="font-size:0.75rem; color:#f87171; padding:0.35rem 0.75rem; border-radius:0.5rem; background:rgba(248,113,113,0.1); cursor:pointer;">
        Sair
      </button>
    </div>

    <div class="admin-tabs">
      <button class="admin-tab-btn ${currentTab === 'info' ? 'active' : ''}" data-tab="info">👤 Perfil & Contatos</button>
      <button class="admin-tab-btn ${currentTab === 'projects' ? 'active' : ''}" data-tab="projects">📁 Projetos (${adminDraft.projects.length})</button>
      <button class="admin-tab-btn ${currentTab === 'skills' ? 'active' : ''}" data-tab="skills">⚡ Habilidades (${adminDraft.skills.length})</button>
      <button class="admin-tab-btn ${currentTab === 'services' ? 'active' : ''}" data-tab="services">💼 Serviços</button>
      <button class="admin-tab-btn ${currentTab === 'quotes' ? 'active' : ''}" data-tab="quotes">✍️ Frases & Textos</button>
      <button class="admin-tab-btn ${currentTab === 'security' ? 'active' : ''}" data-tab="security">🔒 Segurança</button>
    </div>

    <div class="admin-body" id="admin-tab-content">
      <!-- Conteúdo da Aba Ativa -->
    </div>

    <div class="admin-footer">
      <button id="admin-cancel-btn" class="btn-secondary" style="font-size:0.8rem; padding:0.5rem 1rem;">
        Descartar Mudanças
      </button>
      <div style="display:flex; gap:0.75rem;">
        <button id="admin-save-btn" class="btn-primary" style="font-size:0.85rem; padding:0.55rem 1.4rem;">
          💾 Salvar Alterações
        </button>
      </div>
    </div>
  `;

  // Evento de logout
  document.getElementById('admin-logout-btn')?.addEventListener('click', () => {
    isAdminLoggedIn = false;
    renderLoginForm();
  });

  // Troca de abas
  container.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTab = btn.getAttribute('data-tab');
      container.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTabBody();
    });
  });

  // Botões de ação do rodapé
  document.getElementById('admin-save-btn')?.addEventListener('click', () => {
    savePortfolioData(adminDraft);
    showToast('✨ Alterações salvas com sucesso no portfólio!');
    closeAdminModal();
  });

  document.getElementById('admin-cancel-btn')?.addEventListener('click', () => {
    adminDraft = JSON.parse(JSON.stringify(getPortfolioData()));
    renderTabBody();
    showToast('Alterações não salvas foram descartadas.');
  });

  renderTabBody();
}

/**
 * Renderiza o corpo da aba selecionada
 */
function renderTabBody() {
  const content = document.getElementById('admin-tab-content');
  if (!content) return;

  switch (currentTab) {
    case 'info':
      renderInfoTab(content);
      break;
    case 'projects':
      renderProjectsTab(content);
      break;
    case 'skills':
      renderSkillsTab(content);
      break;
    case 'services':
      renderServicesTab(content);
      break;
    case 'quotes':
      renderQuotesTab(content);
      break;
    case 'security':
      renderSecurityTab(content);
      break;
  }
}

/**
 * ABA 1: PERFIL & CONTATOS
 */
function renderInfoTab(container) {
  const info = adminDraft.personalInfo;
  container.innerHTML = `
    <!-- Foto de Perfil / Avatar -->
    <div style="background:#20152e; border:1px solid rgba(244,152,172,0.25); border-radius:1rem; padding:1rem; margin-bottom:1.5rem; display:flex; align-items:center; gap:1.25rem;">
      <div style="width:72px; height:72px; border-radius:1rem; overflow:hidden; border:2px solid var(--color-primary); flex-shrink:0;">
        <img id="admin-preview-avatar" src="${info.avatarUrl || '/assets/character/avatar-portrait.png'}" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <div style="flex:1;">
        <label class="form-label">Foto de Perfil / Avatar Anime</label>
        <div style="display:flex; gap:0.5rem; margin-top:0.35rem;">
          <input type="text" id="admin-avatar-url" class="form-input" value="${info.avatarUrl || ''}" placeholder="Cole URL da imagem ou envie arquivo">
          <label class="btn-secondary" style="padding:0.4rem 0.8rem; font-size:0.75rem; cursor:pointer; display:inline-flex; align-items:center; gap:0.35rem; white-space:nowrap;">
            📁 Subir
            <input type="file" id="admin-avatar-file" accept="image/*" style="display:none;">
          </label>
        </div>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
      <div class="form-group">
        <label class="form-label">Nome Completo</label>
        <input type="text" id="input-name" class="form-input" value="${info.name}">
      </div>
      <div class="form-group">
        <label class="form-label">Cargo / Título</label>
        <input type="text" id="input-role" class="form-input" value="${info.role}">
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:1rem; margin-bottom:1rem;">
      <div class="form-group">
        <label class="form-label">E-mail</label>
        <input type="email" id="input-email" class="form-input" value="${info.email}">
      </div>
      <div class="form-group">
        <label class="form-label">WhatsApp (com DDD)</label>
        <input type="text" id="input-whatsapp" class="form-input" value="${info.whatsapp}">
      </div>
      <div class="form-group">
        <label class="form-label">Localização</label>
        <input type="text" id="input-location" class="form-input" value="${info.location}">
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
      <div class="form-group">
        <label class="form-label">GitHub Link</label>
        <input type="text" id="input-github" class="form-input" value="${info.github}">
      </div>
      <div class="form-group">
        <label class="form-label">LinkedIn Link</label>
        <input type="text" id="input-linkedin" class="form-input" value="${info.linkedin}">
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
      <div class="form-group">
        <label class="form-label">Formação</label>
        <input type="text" id="input-education" class="form-input" value="${info.education}">
      </div>
      <div class="form-group">
        <label class="form-label">Foco Profissional</label>
        <input type="text" id="input-focus" class="form-input" value="${info.focus}">
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Disponibilidade</label>
      <input type="text" id="input-availability" class="form-input" value="${info.availability}">
    </div>

    <div class="form-group">
      <label class="form-label">Parágrafos da Seção "Sobre Mim"</label>
      ${info.aboutParagraphs.map((par, i) => `
        <textarea id="input-about-${i}" class="form-textarea" rows="2" style="margin-bottom:0.5rem;">${par}</textarea>
      `).join('')}
    </div>
  `;

  // Bindings
  document.getElementById('admin-avatar-url')?.addEventListener('input', (e) => {
    adminDraft.personalInfo.avatarUrl = e.target.value;
    const preview = document.getElementById('admin-preview-avatar');
    if (preview) preview.src = e.target.value;
  });

  document.getElementById('admin-avatar-file')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        adminDraft.personalInfo.avatarUrl = reader.result;
        const inputUrl = document.getElementById('admin-avatar-url');
        if (inputUrl) inputUrl.value = reader.result;
        const preview = document.getElementById('admin-preview-avatar');
        if (preview) preview.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  });

  document.getElementById('input-name')?.addEventListener('input', e => adminDraft.personalInfo.name = e.target.value);
  document.getElementById('input-role')?.addEventListener('input', e => adminDraft.personalInfo.role = e.target.value);
  document.getElementById('input-email')?.addEventListener('input', e => adminDraft.personalInfo.email = e.target.value);
  document.getElementById('input-whatsapp')?.addEventListener('input', e => {
    adminDraft.personalInfo.whatsapp = e.target.value;
    adminDraft.personalInfo.whatsappUrl = `https://wa.me/${e.target.value.replace(/\D/g, '')}`;
  });
  document.getElementById('input-location')?.addEventListener('input', e => adminDraft.personalInfo.location = e.target.value);
  document.getElementById('input-github')?.addEventListener('input', e => adminDraft.personalInfo.github = e.target.value);
  document.getElementById('input-linkedin')?.addEventListener('input', e => adminDraft.personalInfo.linkedin = e.target.value);
  document.getElementById('input-education')?.addEventListener('input', e => adminDraft.personalInfo.education = e.target.value);
  document.getElementById('input-focus')?.addEventListener('input', e => adminDraft.personalInfo.focus = e.target.value);
  document.getElementById('input-availability')?.addEventListener('input', e => adminDraft.personalInfo.availability = e.target.value);

  info.aboutParagraphs.forEach((_, i) => {
    document.getElementById(`input-about-${i}`)?.addEventListener('input', e => {
      adminDraft.personalInfo.aboutParagraphs[i] = e.target.value;
    });
  });
}

/**
 * ABA 2: PROJETOS (CRUD & REORDENAÇÃO)
 */
function renderProjectsTab(container) {
  container.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem;">
      <div>
        <h3 style="font-size:0.95rem; font-weight:700; color:#fff;">Meus Trabalhos & Projetos</h3>
        <p style="font-size:0.75rem; color:#b7a8bd;">Adicione, altere títulos, fotos, links e ordem de exibição.</p>
      </div>
      <button id="admin-add-project-btn" class="btn-primary" style="font-size:0.75rem; padding:0.45rem 0.9rem;">
        + Novo Projeto
      </button>
    </div>

    <div id="admin-projects-list">
      ${adminDraft.projects.map((proj, idx) => `
        <div class="admin-project-item">
          <div class="admin-project-header">
            <span style="font-weight:700; font-size:0.875rem; color:var(--text-pink);">#${idx + 1} - ${proj.name}</span>
            <div style="display:flex; gap:0.35rem;">
              <button class="btn-icon-sm" data-move-up="${idx}" title="Subir na lista" ${idx === 0 ? 'disabled style="opacity:0.3;"' : ''}>▲</button>
              <button class="btn-icon-sm" data-move-down="${idx}" title="Descer na lista" ${idx === adminDraft.projects.length - 1 ? 'disabled style="opacity:0.3;"' : ''}>▼</button>
              <button class="btn-icon-sm" data-delete-proj="${idx}" style="color:#f87171;" title="Excluir projeto">✕</button>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:0.75rem;">
            <div>
              <label class="form-label">Nome do Projeto</label>
              <input type="text" class="form-input" data-proj-field="name" data-idx="${idx}" value="${proj.name}">
            </div>
            <div>
              <label class="form-label">Imagem (URL ou arquivo)</label>
              <input type="text" class="form-input" data-proj-field="image" data-idx="${idx}" value="${proj.image}">
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:0.75rem;">
            <div>
              <label class="form-label">Demonstração Online (URL)</label>
              <input type="text" class="form-input" data-proj-field="demoUrl" data-idx="${idx}" value="${proj.demoUrl || ''}" placeholder="https://...">
            </div>
            <div>
              <label class="form-label">Repositório GitHub (URL)</label>
              <input type="text" class="form-input" data-proj-field="githubUrl" data-idx="${idx}" value="${proj.githubUrl}">
            </div>
          </div>

          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Descrição</label>
            <textarea class="form-textarea" rows="2" data-proj-field="description" data-idx="${idx}">${proj.description}</textarea>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Adicionar projeto
  document.getElementById('admin-add-project-btn')?.addEventListener('click', () => {
    adminDraft.projects.unshift({
      id: `projeto-${Date.now()}`,
      name: "Novo Projeto",
      title: "Novo Projeto",
      description: "Descrição breve do projeto...",
      fullDescription: "Descrição detalhada do projeto...",
      image: "/assets/projects/todo-thumb.png",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      tags: ["HTML5", "CSS3", "JavaScript"],
      demoUrl: "https://github.com",
      githubUrl: "https://github.com/fernandaabarant-afk",
      features: ["Interface moderna", "Código limpo"]
    });
    renderProjectsTab(container);
  });

  // Reordenação
  container.querySelectorAll('[data-move-up]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-move-up'), 10);
      if (idx > 0) {
        const item = adminDraft.projects.splice(idx, 1)[0];
        adminDraft.projects.splice(idx - 1, 0, item);
        renderProjectsTab(container);
      }
    });
  });

  container.querySelectorAll('[data-move-down]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-move-down'), 10);
      if (idx < adminDraft.projects.length - 1) {
        const item = adminDraft.projects.splice(idx, 1)[0];
        adminDraft.projects.splice(idx + 1, 0, item);
        renderProjectsTab(container);
      }
    });
  });

  // Exclusão
  container.querySelectorAll('[data-delete-proj]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-delete-proj'), 10);
      if (confirm(`Deseja realmente remover o projeto "${adminDraft.projects[idx].name}"?`)) {
        adminDraft.projects.splice(idx, 1);
        renderProjectsTab(container);
      }
    });
  });

  // Edição de campos
  container.querySelectorAll('[data-proj-field]').forEach(input => {
    input.addEventListener('input', () => {
      const field = input.getAttribute('data-proj-field');
      const idx = parseInt(input.getAttribute('data-idx'), 10);
      adminDraft.projects[idx][field] = input.value;
      if (field === 'name') adminDraft.projects[idx].title = input.value;
    });
  });
}

/**
 * ABA 3: HABILIDADES
 */
function renderSkillsTab(container) {
  container.innerHTML = `
    <h3 style="font-size:0.95rem; font-weight:700; color:#fff; margin-bottom:1rem;">Habilidades Técnicas</h3>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
      ${adminDraft.skills.map((skill, idx) => `
        <div style="background:#20152e; border:1px solid rgba(244,152,172,0.25); border-radius:1rem; padding:0.85rem;">
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
            <span style="font-weight:700; color:var(--text-pink); font-size:0.85rem;">${skill.name}</span>
          </div>
          <textarea class="form-textarea" rows="2" data-skill-idx="${idx}">${skill.description}</textarea>
        </div>
      `).join('')}
    </div>
  `;

  container.querySelectorAll('[data-skill-idx]').forEach(textarea => {
    textarea.addEventListener('input', () => {
      const idx = parseInt(textarea.getAttribute('data-skill-idx'), 10);
      adminDraft.skills[idx].description = textarea.value;
    });
  });
}

/**
 * ABA 4: SERVIÇOS
 */
function renderServicesTab(container) {
  container.innerHTML = `
    <h3 style="font-size:0.95rem; font-weight:700; color:#fff; margin-bottom:1rem;">Serviços Oferecidos</h3>
    <div style="display:flex; flex-direction:column; gap:1rem;">
      ${adminDraft.services.map((serv, idx) => `
        <div style="background:#20152e; border:1px solid rgba(244,152,172,0.25); border-radius:1rem; padding:1rem;">
          <div class="form-group">
            <label class="form-label">Título do Serviço</label>
            <input type="text" class="form-input" data-serv-title="${idx}" value="${serv.title}">
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Descrição</label>
            <textarea class="form-textarea" rows="2" data-serv-desc="${idx}">${serv.description}</textarea>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  container.querySelectorAll('[data-serv-title]').forEach(input => {
    input.addEventListener('input', () => {
      const idx = parseInt(input.getAttribute('data-serv-title'), 10);
      adminDraft.services[idx].title = input.value;
    });
  });

  container.querySelectorAll('[data-serv-desc]').forEach(textarea => {
    textarea.addEventListener('input', () => {
      const idx = parseInt(textarea.getAttribute('data-serv-desc'), 10);
      adminDraft.services[idx].description = textarea.value;
    });
  });
}

/**
 * ABA 5: FRASES & CITAÇÕES
 */
function renderQuotesTab(container) {
  const quotes = adminDraft.personalInfo.handwrittenQuotes;
  container.innerHTML = `
    <h3 style="font-size:0.95rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Citações Manuscritas</h3>
    <p style="font-size:0.75rem; color:#b7a8bd; margin-bottom:1.25rem;">
      Frases em tipografia cursiva que acompanham as seções do portfólio.
    </p>

    <div class="form-group">
      <label class="form-label">Frase do Topo (Hero)</label>
      <input type="text" id="quote-hero" class="form-input" value="${quotes.hero}">
    </div>

    <div class="form-group">
      <label class="form-label">Frase do "Sobre Mim"</label>
      <input type="text" id="quote-about" class="form-input" value="${quotes.about}">
    </div>

    <div class="form-group">
      <label class="form-label">Frase das "Habilidades"</label>
      <input type="text" id="quote-skills" class="form-input" value="${quotes.skills}">
    </div>

    <div class="form-group">
      <label class="form-label">Frase do "Contato"</label>
      <input type="text" id="quote-contact" class="form-input" value="${quotes.contact}">
    </div>
  `;

  document.getElementById('quote-hero')?.addEventListener('input', e => quotes.hero = e.target.value);
  document.getElementById('quote-about')?.addEventListener('input', e => quotes.about = e.target.value);
  document.getElementById('quote-skills')?.addEventListener('input', e => quotes.skills = e.target.value);
  document.getElementById('quote-contact')?.addEventListener('input', e => quotes.contact = e.target.value);
}

/**
 * ABA 6: SEGURANÇA
 */
function renderSecurityTab(container) {
  container.innerHTML = `
    <h3 style="font-size:0.95rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Segurança & Restauração</h3>
    <p style="font-size:0.75rem; color:#b7a8bd; margin-bottom:1.5rem;">
      Gerencie a senha de acesso ou restaure todas as informações de fábrica.
    </p>

    <div style="background:#20152e; border:1px solid rgba(244,152,172,0.25); border-radius:1rem; padding:1.25rem; margin-bottom:1.5rem;">
      <h4 style="font-size:0.875rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Alterar Senha Administrativa</h4>
      <form id="form-change-pwd">
        <div class="form-group">
          <label class="form-label">Nova Senha</label>
          <input type="password" id="input-new-pwd" class="form-input" placeholder="Mínimo 4 caracteres" required>
        </div>
        <button type="submit" class="btn-primary" style="font-size:0.75rem; padding:0.4rem 0.85rem;">
          Atualizar Senha
        </button>
      </form>
    </div>

    <div style="background:#261218; border:1px solid rgba(248,113,113,0.3); border-radius:1rem; padding:1.25rem;">
      <h4 style="font-size:0.875rem; font-weight:700; color:#f87171; margin-bottom:0.5rem;">Restaurar Padrão de Fábrica</h4>
      <p style="font-size:0.75rem; color:#d5cad8; margin-bottom:1rem;">
        Isso removerá todas as alterações locais e restaurará os dados originais fornecidos por Maria Fernanda.
      </p>
      <button id="btn-factory-reset" style="background:#dc2626; color:#fff; font-size:0.75rem; font-weight:600; padding:0.45rem 0.9rem; border-radius:0.5rem; cursor:pointer;">
        Restaurar Configurações Originais
      </button>
    </div>
  `;

  document.getElementById('form-change-pwd')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPwd = document.getElementById('input-new-pwd')?.value;
    if (newPwd && newPwd.length >= 4) {
      setAdminPassword(newPwd);
      showToast('🔒 Senha alterada com sucesso!');
      document.getElementById('input-new-pwd').value = '';
    } else {
      alert('A senha deve conter pelo menos 4 caracteres.');
    }
  });

  document.getElementById('btn-factory-reset')?.addEventListener('click', () => {
    if (confirm('Tem certeza de que deseja restaurar as configurações de fábrica do portfólio?')) {
      resetPortfolioData();
      adminDraft = JSON.parse(JSON.stringify(getPortfolioData()));
      showToast('Configurações originais restauradas!');
      closeAdminModal();
    }
  });
}
