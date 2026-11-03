/**
 * CONTEÚDO DO SITE — edite aqui.
 *
 * Tudo que muda com frequência (telefones, endereços, segmentos, perguntas,
 * depoimentos) vive neste arquivo. Os componentes só leem daqui.
 *
 * Campos com `null` ou listas vazias simplesmente não aparecem no site,
 * então nada "quebrado" vai ao ar enquanto a informação não chega.
 */

export type Phone = { label: string; number: string };

export type Unit = {
  id: string;
  tag: string;
  city: string;
  address: string[];
  hours: string | null;
  phones: Phone[];
  /** Apenas dígitos, com DDI e DDD. Ex.: 5561986262137 */
  whatsapp: string | null;
  mapsUrl: string;
  photo: string | null;
  geo?: { postalCode?: string; locality: string; region: string };
};

export type Segment = {
  name: string;
  age: string | null;
  text: string;
  photo: string | null;
  accent: 'red' | 'gold';
  highlight?: boolean;
};

export type Testimonial = { quote: string; name: string; role: string; initial: string };

export type Faq = { q: string; a: string };

export type Formacao = {
  slug: string;
  name: string;
  kind: string;
  /** Frase curta para o cartão da página inicial. */
  pitch: string;
  /** Logo oficial (em public/), com largura e altura reais do arquivo. */
  logo: { src: string; w: number; h: number; alt: string };
  /** Selo de destaque no cartão (ex.: "Bolsas de até 80%"). */
  badge: string | null;
  title: string;
  lead: string;
  facts: { title: string; text: string }[];
  /** Áreas e cursos. Lista vazia = a página convida para falar com a equipe. */
  areas: { title: string; courses: string; icon: 'briefcase' | 'cpu' | 'heart' | 'book' | 'monitor' | 'bolt' | 'tool' }[];
  modalities: { title: string; text: string; featured?: boolean }[];
  steps: { title: string; text: string }[];
  contact: {
    whatsapp: string;
    email: string | null;
    address: string[] | null;
    hours: string[] | null;
    instagram: string | null;
    mapsUrl: string | null;
  };
  externalUrl: string | null;
  externalLabel: string;
  whatsappMessage: string;
};

export const school = {
  name: 'Colégio Êxito',
  slogan: 'Quem tem êxito tem tudo!',
  foundedYear: 1989,
  description:
    'Colégio Êxito: da Educação Infantil ao Ensino Médio no Novo Gama e em Valparaíso de Goiás. Acompanhamento de perto, família informada e polo Unopar. Matrículas 2027 abertas.',
  enrollmentYear: 2027,
  /** WhatsApp principal usado nos botões de agendamento. */
  whatsapp: '5561986262137',
  whatsappDisplay: '(61) 98626-2137',
  whatsappMessage: 'Olá! Vim pelo site e gostaria de agendar uma visita ao Colégio Êxito.',
  visitHours: 'Segunda a sexta · 7h30–11h30 e 13h30–17h30',
  social: {
    instagram: 'https://www.instagram.com/colegioexitooficial/',
    facebook: 'https://www.facebook.com/ColegioExitoII',
  },
  instagramHandle: '@colegioexitooficial',
  instagramReels: 'https://www.instagram.com/colegioexitooficial/reels/',
  /** Reel em destaque na página inicial (o código depois de /reel/ no link). */
  featuredReel: 'DdBougIBujZ',
  /** Links de serviços. `null` = ainda sem endereço; o link fica oculto. */
  services: {
    conexao: null as string | null,
    unicollege: null as string | null,
    matricula: null as string | null,
    webmail: null as string | null,
    blog: null as string | null,
  },
  stats: [
    { value: `${new Date().getFullYear() - 1989} anos`, label: 'educando desde 1989' },
    { value: '77', star: true, label: 'avaliações de famílias no Google' },
    { value: '7,8 mil', label: 'acompanham no Instagram' },
  ],
};

export const units: Unit[] = [
  {
    id: 'novo-gama',
    tag: 'Unidade I',
    city: 'Novo Gama',
    address: [
      'Qd 578, Lt 10/12, Rua 102, Pq. Estrela Dalva VI (Pedregal)',
      'Novo Gama – GO · CEP 72860-541',
    ],
    hours: 'Seg a sex · 7h30–11h30 e 13h30–17h30',
    phones: [
      { label: 'Secretaria', number: '6136281707' },
      { label: 'Secretaria', number: '6136086195' },
    ],
    whatsapp: '5561986262137',
    mapsUrl: 'https://share.google/vttkJEW57ycWue5fw',
    photo: null,
    geo: { postalCode: '72860-541', locality: 'Novo Gama', region: 'GO' },
  },
  {
    id: 'valparaiso',
    tag: 'Unidade II',
    city: 'Valparaíso de Goiás',
    address: ['Quadra 122 Lote 09/14, Jardim Céu Azul', 'Valparaíso de Goiás – GO'],
    hours: null,
    phones: [
      { label: 'Secretaria', number: '6136241735' },
      { label: 'Secretaria', number: '6136244062' },
    ],
    whatsapp: null, // TODO: confirmar o WhatsApp da Unidade II
    mapsUrl: 'https://share.google/XqeIMQirPjSmhgo65',
    photo: null,
    geo: { locality: 'Valparaíso de Goiás', region: 'GO' },
  },
];

export const segments: Segment[] = [
  {
    name: 'Berçário',
    age: null,
    text: 'Cuidado, segurança e rotina para os primeiros passos, com uma equipe que você conhece pelo nome.',
    photo: null,
    accent: 'red',
  },
  {
    name: 'Educação Infantil',
    age: null,
    text: 'Rotina, afeto e as primeiras descobertas num ambiente seguro. Onde a curiosidade vira hábito.',
    photo: null,
    accent: 'gold',
  },
  {
    name: 'Fundamental I',
    age: '1º ao 5º ano',
    text: 'Alfabetização firme e base sólida em leitura e matemática, a fundação de tudo que vem depois.',
    photo: null,
    accent: 'gold',
  },
  {
    name: 'Fundamental II',
    age: '6º ao 9º ano',
    text: 'A fase em que muitos se perdem. Aqui o acompanhamento aperta: método de estudo e responsabilidade.',
    photo: null,
    accent: 'red',
  },
  {
    name: 'Ensino Médio',
    age: '1ª a 3ª série',
    text: 'Novo Ensino Médio com ENEM e vestibular no foco, e o depois planejado: faculdade ou curso técnico na mesma casa.',
    photo: null,
    accent: 'gold',
  },
  {
    name: 'Polo Unopar',
    age: 'Graduação',
    text: 'Diploma reconhecido nacionalmente, conceito 4 no MEC, e o Canal Conecta para vagas de emprego.',
    photo: null,
    accent: 'red',
    highlight: true,
  },
];

export const pillars = [
  'Professor que conhece seu filho pelo nome',
  'Dificuldade percebida antes da prova',
  'Família avisada enquanto dá tempo de agir',
  'Disciplina e respeito como regra, não discurso',
  'Da creche à faculdade, na mesma casa',
];

/** Proposta pedagógica e metodologia (texto institucional da escola). */
export const metodo = {
  pillars: [
    { title: 'BNCC + Parte Diversificada', text: 'O currículo nacional completo, ampliado com projetos que despertam o interesse do aluno e da comunidade.' },
    { title: 'Vida Cidadã', text: 'Saúde, meio ambiente, trabalho, ciência, cultura e vida em família entram nas aulas, não ficam no discurso.' },
    { title: 'Cada aluno no seu ritmo', text: 'O planejamento considera o nível, o ritmo e a motivação de cada estudante. Ninguém fica invisível.' },
    { title: 'Protagonismo e pensamento crítico', text: 'Aprendizado ativo: o aluno pesquisa, cria, debate e organiza. Sai daqui sabendo pensar.' },
    { title: 'Projetos e estudos do meio', text: 'Projetos temáticos, visitas monitoradas e pesquisas sobre os ecossistemas da nossa região.' },
    { title: 'Arte, esporte e tecnologia', text: 'Oficinas, atividades esportivas, artes, informática e vídeo como linguagens de aprendizagem.' },
  ],
  compare: [
    ['O boletim avisa a família quando já é tarde', 'O professor percebe cedo e a família é avisada antes da prova'],
    ['Conteúdo decorado para a prova', 'Conhecimento ligado à vida real: Vida Cidadã'],
    ['Turma tratada como média', 'Ritmo e motivação de cada aluno respeitados'],
    ['A escola acaba no 3º ano', 'Faculdade e cursos técnicos na mesma casa'],
    ['Aluno que só escuta', 'Aluno protagonista: pesquisa, cria e lidera'],
  ],
};

export const steps = [
  { title: 'O professor percebe', text: 'Dúvida e queda de rendimento são registradas na hora.' },
  { title: 'A coordenação age', text: 'Reforço, conversa com o aluno, plano de recuperação.' },
  { title: 'A família fica sabendo', text: 'Contato direto, antes da prova, não depois.' },
  { title: 'O resultado aparece', text: 'Notas, frequência e evolução no portal Conexão Êxito.' },
];

/**
 * Depoimentos REAIS, com autorização por escrito do responsável.
 * Enquanto a lista estiver vazia, a seção não aparece no site.
 */
export const testimonials: Testimonial[] = [];

/**
 * Perguntas frequentes. Só entram no site as que têm resposta definitiva.
 */
export const faqs: Faq[] = [
  {
    q: 'Como funciona a matrícula?',
    a: 'Agende uma visita, conheça a unidade e converse com a coordenação. Na visita, a secretaria explica documentos, valores e prazos para a sua série.',
  },
  {
    q: 'Como acompanho notas e frequência?',
    a: 'Pelo portal Conexão Êxito e pelo contato direto com a coordenação, que avisa a família assim que percebe alguma dificuldade.',
  },
  {
    q: 'Posso visitar antes de decidir?',
    a: 'Sim, e recomendamos. As visitas acontecem de segunda a sexta, das 7h30 às 11h30 e das 13h30 às 17h30. Agende pelo WhatsApp.',
  },
  // TODO: incluir quando houver resposta oficial:
  // { q: 'Quais turnos vocês oferecem?', a: '...' },
  // { q: 'Meu filho vem de outra escola. Vai acompanhar?', a: '...' },
];

/**
 * Formação profissional: o que espera o aluno depois da escola.
 * Cada item vira uma página própria (/unopar, /tec-mais).
 */
export const formacoes: Formacao[] = [
  {
    slug: 'unopar',
    name: 'Unopar Anhanguera',
    kind: 'Faculdade',
    logo: { src: '/img/parceiros/unopar-anhanguera.webp', w: 520, h: 441, alt: 'Unopar Anhanguera, Polo Novo Gama' },
    pitch: 'Graduação presencial, semipresencial ou 100% EAD em Novo Gama, com diploma reconhecido pelo MEC.',
    badge: 'Bolsas de até 80%',
    title: 'A faculdade continua aqui, perto de casa.',
    lead: 'O polo Unopar Anhanguera de Novo Gama funciona no endereço da Unidade I do Colégio Êxito. Quem termina o Ensino Médio segue para a graduação sem precisar se deslocar até Brasília.',
    facts: [
      { title: 'Bolsas de até 80%', text: 'Condições especiais. Consulte a disponibilidade para o seu curso.' },
      { title: 'Diploma reconhecido pelo MEC', text: 'Credibilidade nacional, respeitada pelo mercado de trabalho.' },
      { title: 'Rede Anhanguera', text: 'Uma das maiores redes de ensino do país.' },
      { title: 'Apoio na matrícula', text: 'Orientação local sobre documentação e financiamento.' },
    ],
    areas: [
      { title: 'Administração e Gestão', courses: 'Administração, RH, Logística e Processos Gerenciais.', icon: 'briefcase' },
      { title: 'Tecnologia', courses: 'Análise de Sistemas e Redes, com foco nas tendências digitais.', icon: 'cpu' },
      { title: 'Saúde', courses: 'Enfermagem, Biomedicina e Gestão Pública da Saúde, com laboratórios e prática.', icon: 'heart' },
      { title: 'Educação', courses: 'Pedagogia, Letras e Educação Física.', icon: 'book' },
      { title: '100% EAD', courses: 'Flexibilidade total para conciliar estudo, trabalho e família.', icon: 'monitor' },
      { title: 'Cursos livres', courses: 'Formações rápidas para qualificação imediata em diversas áreas.', icon: 'bolt' },
    ],
    modalities: [
      { title: 'Presencial', text: 'Rotina diária no polo, contato direto com professores e colegas.' },
      { title: 'Semipresencial', text: 'Aulas online com encontros presenciais semanais para prática e suporte.', featured: true },
      { title: '100% EAD', text: 'Horário livre. Estude de onde quiser, com a mesma qualidade da rede.' },
    ],
    steps: [
      { title: 'Escolha a área', text: 'Veja os cursos e as modalidades que combinam com a sua rotina.' },
      { title: 'Consulte sua bolsa', text: 'Fale com um consultor do polo pelo WhatsApp.' },
      { title: 'Faça a matrícula', text: 'Com apoio local na documentação e no financiamento.' },
      { title: 'Comece a estudar', text: 'Conte com o polo durante todo o curso.' },
    ],
    contact: {
      whatsapp: '5561986262140',
      email: 'contato@anhangueranovogama.com.br',
      address: ['R. 102, Quadra 578 - Lote 10', 'Parque Estrela Dalva VI, Novo Gama - GO, 72860-541'],
      hours: ['Segunda a sexta: 13h30 às 17h30', 'Sábado: 8h às 12h'],
      instagram: 'https://www.instagram.com/novogama.anhanguera/',
      mapsUrl: 'https://share.google/vttkJEW57ycWue5fw',
    },
    externalUrl: 'https://unopar-anhanguera.netlify.app/',
    externalLabel: 'Ver o site do polo',
    whatsappMessage: 'Olá! Vim pelo site do Colégio Êxito e quero consultar cursos e bolsas da Unopar Anhanguera Novo Gama.',
  },
  {
    slug: 'tec-mais',
    name: 'TEC Mais',
    kind: 'Cursos técnicos e livres',
    logo: { src: '/img/parceiros/tec-mais.webp', w: 720, h: 203, alt: 'TEC Mais Cursos Técnicos' },
    pitch: 'Cursos de saúde e segurança em Valparaíso: aprenda o que ninguém te ensina, antes de precisar.',
    badge: null,
    title: 'Aprenda o que ninguém te ensina. Antes de precisar.',
    lead: 'A TEC Mais, em Valparaíso de Goiás, forma gente pronta para agir: primeiros socorros, atendimento pré-hospitalar, cuidado com idosos e segurança. Cursos práticos que viram profissão e, um dia, podem salvar uma vida bem na sua frente.',
    facts: [
      { title: 'Prática de verdade', text: 'Protocolos treinados com as mãos, não só lidos na apostila.' },
      { title: 'Cursos rápidos e diretos', text: 'Primeiros Socorros em 8 horas, por exemplo. Sem enrolação.' },
      { title: 'Saúde e segurança', text: 'Formações que abrem portas no mercado e servem para a vida.' },
      { title: 'Na mesma casa do Êxito', text: 'O mesmo cuidado e acompanhamento de perto que as famílias já conhecem.' },
    ],
    areas: [
      { title: 'Primeiros Socorros', courses: 'Reconhecer a emergência, ligar para o 192 e agir certo até o socorro chegar. Carga horária de 8h.', icon: 'heart' },
      { title: 'APH: Atendimento Pré-Hospitalar', courses: 'O atendimento no local da ocorrência, com técnica e sangue-frio.', icon: 'bolt' },
      { title: 'Feridas e Curativos', courses: 'Avaliação, limpeza e cuidado correto de feridas.', icon: 'tool' },
      { title: 'Cuidador de Idoso', courses: 'Rotina, segurança e dignidade no cuidado com a pessoa idosa.', icon: 'heart' },
      { title: 'Combate a Incêndio', courses: 'Prevenção, uso de extintores e evacuação segura.', icon: 'bolt' },
      { title: 'Injetáveis', courses: 'Técnicas de aplicação com segurança e boas práticas.', icon: 'tool' },
    ],
    modalities: [],
    steps: [
      { title: 'Escolha o curso', text: 'Veja as turmas abertas e as datas mais próximas.' },
      { title: 'Tire suas dúvidas', text: 'Duração, horários, pré-requisitos e valores pelo WhatsApp.' },
      { title: 'Garanta sua vaga', text: 'Matrícula simples e rápida, com atendimento humano.' },
      { title: 'Aprenda na prática', text: 'Do primeiro dia ao certificado, com acompanhamento.' },
    ],
    contact: {
      whatsapp: '5561986262137', // TODO: confirmar o WhatsApp da TEC Mais
      email: null,
      address: ['Valparaíso de Goiás – GO'],
      hours: null,
      instagram: 'https://www.instagram.com/tecmais.valparaisodegoias/',
      mapsUrl: null,
    },
    externalUrl: 'https://www.instagram.com/tecmais.valparaisodegoias/',
    externalLabel: 'Ver no Instagram',
    whatsappMessage: 'Olá! Vim pelo site do Colégio Êxito e quero saber sobre os cursos da TEC Mais.',
  },
];

/** Liga um cartão de segmento (ex.: "Polo Unopar") à página de formação. */
export const formacaoBySegment = (name: string) => {
  const n = name.toLowerCase();
  return formacoes.find((f) => n.includes(f.slug.replace('-', ' ')) || n.includes(f.name.toLowerCase()));
};

export type GalleryItem = { title: string; caption: string | null; date: string | null; photo: string };

/** Galeria de atividades (fallback local; o normal é vir do Supabase). */
export const gallery: GalleryItem[] = [];

// ——— utilitários ———

export const waLink = (number: string, message = school.whatsappMessage) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const telLink = (number: string) => `tel:+55${number}`;

export const formatPhone = (n: string) =>
  n.length === 11
    ? `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`
    : `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
