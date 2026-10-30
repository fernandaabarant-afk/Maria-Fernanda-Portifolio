import { Project, Skill, Service, SocialLinks } from '../types';

/* ==========================================================================
   1. CONTATOS E REDES SOCIAIS (Centralizado)
   Altere aqui para atualizar todos os links em todo o portfólio de uma só vez!
   ========================================================================== */
export const contactAndSocialLinks: SocialLinks = {
  email: 'fernandaabarant@gmail.com',
  whatsapp: '5511920889940',
  whatsappFormatted: '(11) 92088-9940',
  whatsappUrl: 'https://wa.me/5511920889940?text=Ol%C3%A1%20Maria%20Fernanda%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!',
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
   - id: Identificador único
   - name: Nome do projeto
   - description: Descrição resumida
   - fullDescription: Descrição detalhada exibida no modal
   - image: Imagem ou thumbnail de apresentação
   - technologies: Lista de tecnologias utilizadas
   - demoUrl: Link da demonstração ao vivo (deploy)
   - githubUrl: Link do repositório oficial no GitHub
   - hasInteractiveDemo: true para abrir demo interativo no modal
   - features: Lista de recursos principais implementados
   ========================================================================== */
export const projectsData: Project[] = [
  {
    id: 'minha-economia',
    name: 'Minha Economia',
    title: 'Minha Economia',
    description: 'Aplicativo completo para economia pessoal, gestão de orçamento, metas e análise financeira.',
    fullDescription:
      'Aplicação web desenvolvida em React e TypeScript para controle financeiro pessoal completo. Inclui autenticação de usuários, dashboard de receitas e despesas, controle de orçamentos, definição de metas financeiras, extrato de transações e relatórios visuais com persistência de dados.',
    technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Vite'],
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Vite'],
    image: '/assets/projects/finance-thumb.png',
    demoUrl: 'https://fernandaabarant-afk.github.io/Minha-Economia/',
    githubUrl: 'https://github.com/fernandaabarant-afk/Minha-Economia',
    hasInteractiveDemo: true,
    category: 'web',
    features: [
      'Gestão de receitas, despesas e saldo líquido em tempo real',
      'Definição e acompanhamento de metas financeiras e orçamentos',
      'Histórico completo de transações com categorização e filtros',
      'Dashboard com métricas e resumos gráficos intuitivos',
      'Deploy ativo no GitHub Pages e código aberto no GitHub',
    ],
  },
  {
    id: 'mafe',
    name: 'MAFE — Minha IA',
    title: 'MAFE — Minha IA',
    description: 'Companheira interativa de inteligência artificial criada com HTML, CSS e JavaScript moderno.',
    fullDescription:
      'Uma aplicação web que oferece uma companheira de IA acolhedora e interativa, com layout delicado em rosa e lilás, avatar personalizado, status em tempo real e sistema de mensagens interativas para conversar, aprender e trocar ideias.',
    technologies: ['JavaScript', 'HTML5', 'CSS3'],
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    image: '/assets/projects/mafe-thumb.png',
    demoUrl: 'https://fernandaabarant-afk.github.io/Mafe/',
    githubUrl: 'https://github.com/fernandaabarant-afk/Mafe',
    hasInteractiveDemo: true,
    category: 'web',
    features: [
      'Chat interativo com respostas dinâmicas e design aconchegante',
      'Identidade visual única com avatar floral e paleta rosa suave',
      'Indicador de status "Pronta para conversar" em tempo real',
      'Design responsivo adaptável para celulares e computadores',
      'Deploy ativo no GitHub Pages e código aberto no GitHub',
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
      'Código limpo em HTML5, CSS3, JavaScript e React',
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
