import { Project, Skill, Service, SocialLinks } from '../types';

/* ==========================================================================
   1. CONTATOS E REDES SOCIAIS (Centralizado)
   Altere aqui para atualizar todos os links em todo o portfólio de uma só vez!
   ========================================================================== */
export const contactAndSocialLinks: SocialLinks & { whatsappFormatted: string } = {
  email: 'fernandaabarant@gmail.com',
  whatsapp: '5511990273328',
  whatsappFormatted: '(11) 99027-3328',
  whatsappUrl: 'https://wa.me/5511990273328?text=Ol%C3%A1%20Maria%20Fernanda%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!',
  linkedin: 'https://www.linkedin.com/in/mariaabarant/',
  github: 'https://github.com/fernandaabarant-afk',
  instagram: 'https://instagram.com',
};

/* ==========================================================================
   2. INFORMAÇÕES PESSOAIS & TEXTOS
   ========================================================================== */
export const personalInfo = {
  name: 'Maria Fernanda',
  nickname: 'Mafe',
  role: 'Desenvolvedora Web & Criativa',
  tagline: 'OLÁ, EU SOU ♡',
  heroSubtitle: 'Transformando ideias em experiências digitais.',
  heroDescription:
    'Desenvolvimento, criatividade e tecnologia em cada projeto. Seja bem-vindo(a) ao meu portfólio!',
  location: 'Brasil',
  education: 'Em andamento',
  focus: 'Desenvolvimento Web e Front-end',
  availability: 'Projetos, oportunidades e novos desafios',

  // Redes sociais e contatos apontando para o objeto centralizado
  email: contactAndSocialLinks.email,
  github: contactAndSocialLinks.github,
  linkedin: contactAndSocialLinks.linkedin,
  whatsapp: contactAndSocialLinks.whatsapp,
  whatsappUrl: contactAndSocialLinks.whatsappUrl,
  whatsappFormatted: contactAndSocialLinks.whatsappFormatted,
  instagram: contactAndSocialLinks.instagram,

  aboutParagraphs: [
    'Sou uma apaixonada por tecnologia, por criar soluções e por transformar ideias em algo real. Gosto de aprender, explorar novas ferramentas e sempre busco evoluir nos meus projetos, seja no front-end, no back-end ou em novas áreas da tecnologia.',
    'Acredito que a tecnologia pode tornar a vida das pessoas mais simples, bonita e conectada. E é isso que me motiva todos os dias.',
  ],
  handwrittenQuotes: {
    hero: 'sonhe planeje conquiste ♡',
    about: 'Pequenos códigos, grandes sonhos ♡',
    skills: 'Código também é uma forma de arte ♡',
    contact: 'Vamos conversar? ♡',
  },
};

/* ==========================================================================
   3. PROJETOS (Estrutura Centralizada e de Fácil Atualização)
   Para adicionar, editar ou remover um projeto, basta modificar esta lista!
   Cada projeto contém:
   - name: Nome do projeto
   - description: Descrição resumida
   - image: Imagem ou thumbnail de apresentação
   - technologies: Lista de tecnologias utilizadas
   - demoUrl: Link da demonstração ao vivo (deploy)
   - githubUrl: Link do repositório no GitHub
   ========================================================================== */
export const projectsData: Project[] = [
  {
    id: 'minha-economia',
    name: 'Minha Economia',
    title: 'Minha Economia',
    description: 'Aplicativo intuitivo para gestão financeira pessoal com cálculo dinâmico de saldo.',
    fullDescription:
      'Dashboard desenvolvido para gerenciamento financeiro pessoal. Permite lançar despesas, receitas, calcular o saldo líquido em tempo real e acompanhar o histórico de transações com categorização visual.',
    technologies: ['TypeScript', 'React', 'HTML5', 'CSS3'],
    tags: ['TypeScript', 'React', 'HTML5', 'CSS3'],
    image: '/assets/projects/finance-thumb.png',
    demoUrl: 'https://fernandaabarant-afk.github.io/Minha-Economia/',
    githubUrl: 'https://github.com/fernandaabarant-afk/Minha-Economia',
    hasInteractiveDemo: true,
    category: 'web',
    features: [
      'Cálculo automático de Entradas, Saídas e Saldo Total',
      'Histórico de transações com data e descrição',
      'Destaque com cores para valores positivos (verde/rosa) e negativos',
      'Interface limpa, moderna e responsiva',
      'Disponível no GitHub e com deploy online',
    ],
  },
  {
    id: 'music-player',
    name: 'Music Player',
    title: 'Music Player',
    description: 'Player de música lofi com interface moderna, controles de áudio e visualizador estético.',
    fullDescription:
      'Um reprodutor de áudio com interface inspirada em setups de programação e estética anime lofi. Conta com controles de reprodução, barra de progresso interativa, ajuste de volume e efeitos visuais.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    image: '/assets/projects/music-thumb.png',
    demoUrl: 'https://fernandaabarant-afk.github.io/Mafe/',
    githubUrl: 'https://github.com/fernandaabarant-afk/Mafe',
    hasInteractiveDemo: true,
    category: 'app',
    features: [
      'Player funcional com faixas relaxantes de lofi/estudo',
      'Controles completos: Play, Pause, Próxima, Anterior e Volume',
      'Visualizador estético com onda de som animada',
      'Timer de duração e tempo decorrido em tempo real',
      'Tema escuro com detalhes em neon rosa e lilás',
    ],
  },
  {
    id: 'todo-list',
    name: 'To Do List',
    title: 'To Do List',
    description: 'Lista de tarefas com design simples, minimalista e funcional para organização diária.',
    fullDescription:
      'Uma aplicação web elegante para gestão de tarefas diárias. Permite adicionar, concluir, filtrar e excluir afazeres com persistência local no navegador e animações suaves.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    image: '/assets/projects/todo-thumb.png',
    demoUrl: 'https://fernandaabarant-afk.github.io/Mafe/',
    githubUrl: 'https://github.com/fernandaabarant-afk/Mafe',
    hasInteractiveDemo: true,
    category: 'web',
    features: [
      'Adição e exclusão rápida de tarefas',
      'Marcação de tarefas concluídas com efeito riscado',
      'Filtros por status (Todas, Pendentes, Concluídas)',
      'Armazenamento no LocalStorage do navegador',
      'Design em tons pastéis e cantos suaves',
    ],
  },
];

/* ==========================================================================
   4. HABILIDADES TÉCNICAS
   ========================================================================== */
export const skillsData: Skill[] = [
  {
    name: 'HTML5',
    category: 'frontend',
    icon: 'html',
    color: '#E34F26',
    description: 'Estruturação semântica, acessibilidade e SEO para páginas web modernas.',
  },
  {
    name: 'CSS3',
    category: 'frontend',
    icon: 'css',
    color: '#1572B6',
    description: 'Estilização responsiva, flexbox, grid, animações fluidas e design visual atraente.',
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    icon: 'js',
    color: '#F7DF1E',
    description: 'Interatividade dinâmica, manipulação do DOM, funções assíncronas e lógica de programação.',
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    icon: 'ts',
    color: '#3178C6',
    description: 'Tipagem estática, segurança de código e escalabilidade em aplicações modernas.',
  },
  {
    name: 'React',
    category: 'frontend',
    icon: 'react',
    color: '#61DAFB',
    description: 'Componentização modular, hooks, gerenciamento de estado e interfaces reativas.',
  },
  {
    name: 'Git',
    category: 'tools',
    icon: 'git',
    color: '#F05032',
    description: 'Controle de versões de código, criação de branches e histórico de alterações.',
  },
  {
    name: 'GitHub',
    category: 'tools',
    icon: 'github',
    color: '#ec5a80',
    description: 'Hospedagem de repositórios, colaboração em projetos de código aberto e documentação.',
  },
  {
    name: 'Figma',
    category: 'tools',
    icon: 'figma',
    color: '#F24E1E',
    description: 'Prototipagem de interfaces, wireframes, design systems e layouts interativos.',
  },
];

/* ==========================================================================
   5. SERVIÇOS OFERECIDOS
   ========================================================================== */
export const servicesData: Service[] = [
  {
    id: 'web-dev',
    title: 'Desenvolvimento Web & Landing Pages',
    description:
      'Criação de websites modernos, elegantes e 100% responsivos para apresentar marcas, produtos, projetos pessoais ou portfólios profissionais.',
    icon: 'code',
    deliverables: [
      'Design adaptável para celular, tablet e desktop',
      'Código limpo em HTML5, CSS3 e JavaScript',
      'Otimização para carregamento rápido',
      'Estrutura preparada para SEO básico',
    ],
  },
  {
    id: 'ui-ux',
    title: 'Prototipagem de Interfaces no Figma',
    description:
      'Desenvolvimento de wireframes e protótipos visuais no Figma com foco em estética, harmonia de cores, tipografia e facilidade de navegação.',
    icon: 'figma',
    deliverables: [
      'Criação de paleta de cores e guia de estilo',
      'Design de telas intuitivas e atraentes',
      'Protótipos navegáveis para visualização prévia',
      'Exportação de especificações para desenvolvimento',
    ],
  },
  {
    id: 'front-optimization',
    title: 'Modernização & Ajustes Front-end',
    description:
      'Aprimoramento de páginas existentes, correção de pequenos bugs de layout, melhorias de responsividade e inserção de interatividade visual.',
    icon: 'sparkles',
    deliverables: [
      'Adequação de telas quebradas em dispositivos móveis',
      'Inserção de animações e microinterações suaves',
      'Organização de folhas de estilo e boas práticas',
      'Ajustes de acessibilidade e legibilidade',
    ],
  },
];
