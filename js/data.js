/**
 * PORTFÓLIO PESSOAL — MARIA FERNANDA
 * data.js: Centralização de dados, persistência e gerenciamento do LocalStorage
 */

const STORAGE_KEY = 'maria_fernanda_portfolio_db_v1';
const PASSWORD_KEY = 'maria_fernanda_admin_pwd_v1';
const DEFAULT_PASSWORD = 'mafe2026';

export const DEFAULT_PORTFOLIO_DATA = {
  personalInfo: {
    name: "Maria Fernanda",
    nickname: "Mafe",
    role: "Desenvolvedora Web",
    tagline: "{ } Desenvolvedora Front-end",
    heroSubtitle: "Transformando ideias em experiências digitais.",
    heroDescription: "Desenvolvimento, criatividade e tecnologia em cada projeto. Seja bem-vindo(a) ao meu portfólio!",
    location: "Brasil",
    education: "Em andamento",
    focus: "Desenvolvimento Web e Front-end",
    availability: "Projetos, oportunidades e novos desafios",
    email: "fernandaabarant@gmail.com",
    github: "https://github.com/fernandaabarant-afk",
    linkedin: "https://www.linkedin.com/in/mariaabarant/",
    whatsapp: "5511920889940",
    whatsappUrl: "https://wa.me/5511920889940",
    whatsappFormatted: "(11) 92088-9940",
    instagram: "https://instagram.com",
    avatarUrl: "/assets/character/avatar-portrait.png",
    profileImage: "/assets/character/avatar-portrait.png",
    aboutParagraphs: [
      "Sou uma apaixonada por tecnologia, por criar soluções e por transformar ideias em algo real. Gosto de aprender, explorar novas ferramentas e sempre busco evoluir nos meus projetos, seja no front-end, no back-end ou em novas áreas da tecnologia.",
      "Acredito que a tecnologia pode tornar a vida das pessoas mais simples, bonita e conectada. E é isso que me motiva todos os dias."
    ],
    handwrittenQuotes: {
      hero: "sonhe planeje conquiste ♡",
      about: "Pequenos códigos, grandes sonhos ♡",
      skills: "Código também é uma forma de arte ♡",
      contact: "Vamos conversar? ♡"
    }
  },
  skills: [
    {
      name: "HTML5",
      category: "frontend",
      icon: "html",
      color: "#e44d26",
      description: "Estruturação semântica, acessibilidade e SEO."
    },
    {
      name: "CSS3",
      category: "frontend",
      icon: "css",
      color: "#264de4",
      description: "Estilização moderna, Flexbox, Grid e animações suaves."
    },
    {
      name: "JavaScript",
      category: "frontend",
      icon: "js",
      color: "#f7df1e",
      description: "Manipulação de DOM, requisições assíncronas e lógica interativa."
    },
    {
      name: "TypeScript",
      category: "frontend",
      icon: "ts",
      color: "#3178c6",
      description: "Tipagem estática, segurança e escalabilidade de código."
    },
    {
      name: "React",
      category: "frontend",
      icon: "react",
      color: "#61dafb",
      description: "Criação de componentes reutilizáveis, hooks e estados."
    },
    {
      name: "Git",
      category: "tools",
      icon: "git",
      color: "#f05032",
      description: "Controle de versão, commits estruturados e branching."
    },
    {
      name: "GitHub",
      category: "tools",
      icon: "github",
      color: "#ffffff",
      description: "Hospedagem de repositórios, colaboração e GitHub Pages."
    },
    {
      name: "Figma",
      category: "tools",
      icon: "figma",
      color: "#f24e1e",
      description: "Prototipagem de interfaces, wireframes e design systems."
    }
  ],
  projects: [
    {
      id: "minha-economia",
      name: "Minha Economia",
      title: "Minha Economia",
      description: "Aplicação de controle financeiro pessoal intuitiva para gerenciar receitas, despesas e metas de economia.",
      fullDescription: "Desenvolvido com foco na organização e simplicidade visual, permite aos usuários monitorar gastos e planejar sua saúde financeira com facilidade.",
      image: "/assets/projects/finance-thumb.png",
      technologies: ["JavaScript", "HTML5", "CSS3", "LocalStorage"],
      tags: ["JavaScript", "HTML5", "CSS3"],
      demoUrl: "https://fernandaabarant-afk.github.io/Minha-Economia/",
      githubUrl: "https://github.com/fernandaabarant-afk/Minha-Economia",
      features: [
        "Cadastro e categorização de despesas e receitas",
        "Cálculo automático de saldos e resumos",
        "Armazenamento local persistente no navegador",
        "Interface responsiva e moderna com paleta suave"
      ]
    },
    {
      id: "mafe",
      name: "Mafe",
      title: "Mafe",
      description: "Assistente pessoal inteligente e interativo voltado para produtividade, estudos e suporte na rotina diária.",
      fullDescription: "Projeto autoral integrando lógica de conversação amigável e design acolhedor, pensado para descomplicar a organização pessoal.",
      image: "/assets/projects/mafe-thumb.png",
      technologies: ["JavaScript", "CSS3", "HTML5"],
      tags: ["JavaScript", "CSS3", "HTML5"],
      demoUrl: "https://fernandaabarant-afk.github.io/Mafe/",
      githubUrl: "https://github.com/fernandaabarant-afk/Mafe",
      features: [
        "Chat interativo com respostas inteligentes",
        "Personalidade acolhedora e inspirada na criadora",
        "Interface moderna e fluida adaptada para smartphones"
      ]
    },
    {
      id: "music-player",
      name: "Music Player",
      title: "Music Player",
      description: "Player de música moderno com estética aconchegante, controles de áudio e visualização de faixas lofi.",
      fullDescription: "Desenvolvido para criar o ambiente ideal de concentração e estudo com playlists temáticas e feedback visual dos controles.",
      image: "/assets/projects/music-thumb.png",
      technologies: ["JavaScript", "HTML5", "CSS3"],
      tags: ["JavaScript", "HTML5", "CSS3"],
      demoUrl: "https://fernandaabarant-afk.github.io/Minha-Economia/",
      githubUrl: "https://github.com/fernandaabarant-afk",
      features: [
        "Controles de play, pause, avançar e retroceder",
        "Barra de progresso de áudio interativa",
        "Design anime programmer com visual lofi"
      ]
    },
    {
      id: "todo-list",
      name: "To Do List",
      title: "To Do List",
      description: "Lista de tarefas com design delicado, categorização e acompanhamento de conclusões diárias.",
      fullDescription: "Aplicação prática para organizar a rotina, gerenciar pendências e manter o foco nas metas prioritárias.",
      image: "/assets/projects/todo-thumb.png",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      tags: ["HTML5", "CSS3", "JavaScript"],
      demoUrl: "https://fernandaabarant-afk.github.io/Minha-Economia/",
      githubUrl: "https://github.com/fernandaabarant-afk",
      features: [
        "Criação, edição e exclusão de afazeres",
        "Filtros de concluídas e pendentes",
        "Armazenamento local persistente"
      ]
    }
  ],
  services: [
    {
      id: "desenvolvimento-web",
      title: "Desenvolvimento Web",
      description: "Criação de páginas e aplicações web modernas, funcionais, responsivas e otimizadas para todos os tamanhos de tela.",
      deliverables: ["Páginas institucionais e portfólios", "Aplicações dinâmicas e interativas", "Código limpo, estruturado e acessível"]
    },
    {
      id: "ui-ux-design",
      title: "UI/UX & Prototipagem",
      description: "Transformação de conceitos em protótipos navegáveis no Figma, com atenção cuidadosa à harmonia estética e à experiência do usuário.",
      deliverables: ["Wireframes e fluxo de navegação", "Design systems e guia de estilos", "Interfaces aconchegantes e personalizadas"]
    },
    {
      id: "landing-pages",
      title: "Landing Pages & Otimização",
      description: "Construção de landing pages focadas em conversão, apresentação de serviços, velocidade de carregamento e identidade visual única.",
      deliverables: ["Carregamento ultra-rápido", "Preparação completa para SEO", "Integração direta com WhatsApp e e-mail"]
    }
  ]
};

/**
 * Carrega os dados salvos ou os dados padrão
 */
export function getPortfolioData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PORTFOLIO_DATA;
    const parsed = JSON.parse(raw);
    return {
      personalInfo: { ...DEFAULT_PORTFOLIO_DATA.personalInfo, ...(parsed.personalInfo || {}) },
      skills: Array.isArray(parsed.skills) && parsed.skills.length > 0 ? parsed.skills : DEFAULT_PORTFOLIO_DATA.skills,
      projects: Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects : DEFAULT_PORTFOLIO_DATA.projects,
      services: Array.isArray(parsed.services) && parsed.services.length > 0 ? parsed.services : DEFAULT_PORTFOLIO_DATA.services
    };
  } catch (e) {
    console.warn("Erro ao ler LocalStorage, utilizando dados padrão:", e);
    return DEFAULT_PORTFOLIO_DATA;
  }
}

/**
 * Salva alterações no LocalStorage e notifica a aplicação
 */
export function savePortfolioData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('portfolio-updated', { detail: data }));
    return true;
  } catch (e) {
    console.error("Erro ao salvar no LocalStorage:", e);
    return false;
  }
}

/**
 * Restaura dados originais de fábrica
 */
export function resetPortfolioData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('portfolio-updated', { detail: DEFAULT_PORTFOLIO_DATA }));
    return true;
  } catch (e) {
    console.error("Erro ao resetar dados:", e);
    return false;
  }
}

/**
 * Autenticação administrativa
 */
export function verifyAdminPassword(pwd) {
  const stored = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
  return pwd === stored;
}

export function setAdminPassword(newPwd) {
  localStorage.setItem(PASSWORD_KEY, newPwd);
}
