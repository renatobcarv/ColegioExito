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
  photoIllustrative?: boolean;
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
  /** true = foto ilustrativa (mostra o selo "imagem ilustrativa"). */
  photoIllustrative?: boolean;
  age: string | null;
  text: string;
  photo: string | null;
  accent: 'red' | 'gold';
  highlight?: boolean;
};

export type Testimonial = { quote: string; name: string; role: string; initial: string };

export type Faq = { q: string; a: string };

export type TechCourse = {
  slug: string;
  name: string;
  tagline: string;
  photo: string;
  featured?: boolean;
  hours: string;
  duration: string;
  schedule: string;
  salary: { headline: string; detail: string; source: string };
  careers: string[];
  modules: { title: string; subjects: string[] }[];
};

export type Formacao = {
  slug: string;
  /** Cursos técnicos (habilitação técnica de nível médio), com grade e informações da turma. */
  technical?: TechCourse[];
  /** Selos de credibilidade da instituição. */
  trust?: string[];
  testimonial?: { quote: string; name: string; role: string; photo: string };
  referral?: { title: string; text: string };
  name: string;
  kind: string;
  /** Frase curta para o cartão da página inicial. */
  pitch: string;
  /** Logo oficial (em public/), com largura e altura reais do arquivo. */
  logo: { src: string; w: number; h: number; alt: string };
  /** Paleta da marca: a página e o cartão da home usam estas cores. */
  theme: {
    primary: string; primaryDark: string; primaryDeep: string;
    accent: string; accentInk: string; accentBtn: string; soft: string;
  };
  /** Selo de destaque no cartão (ex.: "Bolsas de até 80%"). */
  badge: string | null;
  eyebrow: string;
  title: string;
  /** Trecho do título que ganha destaque na cor de acento. */
  titleAccent: string;
  lead: string;
  primaryCta: string;
  responseNote: string;
  proof: { value: string; label: string }[];
  painsTitle: string;
  painsAccent: string;
  pains: { pain: string; fix: string }[];
  factsTitle: string;
  facts: { title: string; text: string }[];
  /** Áreas e cursos. Lista vazia = a página convida para falar com a equipe. */
  areas: { title: string; courses: string; icon: 'briefcase' | 'cpu' | 'heart' | 'book' | 'monitor' | 'bolt' | 'tool' }[];
  modalities: { title: string; text: string; featured?: boolean }[];
  steps: { title: string; text: string }[];
  form: { title: string; text: string; selectLabel: string; cta: string; askModality: boolean };
  faq: Faq[];
  final: { title: string; text: string; cta: string };
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
    'Disciplina hoje. Faculdade e profissão amanhã. Há mais de 35 anos o Colégio Êxito forma os filhos do Entorno, da Educação Infantil ao Ensino Médio, com faculdade e cursos técnicos na mesma casa. Novo Gama e Valparaíso de Goiás. Matrículas 2027 abertas.',
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
    /** Unicollege: frequência, notas, boletim e anúncios (professores e famílias). */
    unicollege: 'https://www.unicollege.net/exito/Login.aspx?ReturnUrl=%2fexito%2f' as string | null,
    /** EADMAX: ambiente virtual de aprendizagem (aulas, materiais EAD e provas). */
    ead: 'https://www.exito.eadmax.net/' as string | null,
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
    whatsapp: '5561986263138', // WhatsApp da unidade Céu Azul (confirmado pela escola)
    mapsUrl: 'https://share.google/XqeIMQirPjSmhgo65',
    photo: null,
    geo: { locality: 'Valparaíso de Goiás', region: 'GO' },
  },
];

export const segments: Segment[] = [
  {
    name: 'Educação Infantil',
    age: '3 a 5 anos',
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
  },  {
    name: 'TEC Mais',
    age: 'Cursos técnicos',
    text: 'Técnico em Enfermagem, Segurança do Trabalho e Administração, à noite, com diploma válido em todo o país.',
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

/**
 * Programas e diferenciais do Êxito (seção "Programas Êxito").
 * TODO: confirmar com a escola as séries atendidas pelo Edify e pelo Mindset.
 */
export const programas = [
  {
    id: 'bilingue',
    tag: 'Parceria Edify',
    title: 'Programa Bilíngue Edify',
    text: 'Inglês vivido no dia a dia, não decorado. Em parceria com a Edify, o aluno aprende a se comunicar com naturalidade e ganha uma vantagem que o acompanha para a vida toda.',
    points: ['Inglês integrado à rotina escolar', 'Material e metodologia do programa Edify', 'Comunicação, escuta e confiança para falar'],
  },
  {
    id: 'mindset',
    tag: 'Ensino Médio',
    title: 'Mindset Ensino Médio',
    text: 'Nota alta é consequência de quem sabe aonde quer chegar. O Mindset trabalha projeto de vida, foco e disciplina de estudo para o ENEM e para as escolhas depois da escola.',
    points: ['Projeto de vida e escolha de carreira', 'Rotina, foco e método de estudo', 'Preparação para ENEM e vestibulares'],
  },
  {
    id: 'socioemocional',
    tag: 'Todas as fases',
    title: 'Educação Socioemocional',
    text: 'Saber lidar com as emoções, respeitar o outro e assumir responsabilidades também se aprende. É o que forma um aluno equilibrado, dentro e fora da sala.',
    points: ['Autoconhecimento e autocontrole', 'Empatia, respeito e convivência', 'Responsabilidade e tomada de decisão'],
  },
  {
    id: 'metodologias',
    tag: 'Jeito Êxito',
    title: 'Metodologias Inovadoras',
    text: 'Uma forma própria de ensinar, construída em mais de 35 anos: o aluno aprende fazendo, pesquisando e apresentando, com o professor acompanhando de perto cada passo.',
    points: ['Aprendizagem ativa e por projetos', 'Tecnologia, ambiente virtual e vídeo como linguagem', 'Acompanhamento individual do ritmo de cada aluno'],
  },
];

export const steps = [
  { title: 'O professor percebe', text: 'Dúvida e queda de rendimento são registradas na hora.' },
  { title: 'A coordenação age', text: 'Reforço, conversa com o aluno, plano de recuperação.' },
  { title: 'A família fica sabendo', text: 'Contato direto, antes da prova, não depois.' },
  { title: 'O resultado aparece', text: 'Notas, frequência, boletim e recados no portal Unicollege.' },
];

/**
 * Depoimentos REAIS, com autorização por escrito do responsável.
 * Enquanto a lista estiver vazia, a seção não aparece no site.
 */
export const testimonials: Testimonial[] = [];

/**
 * Depoimentos em VÍDEO de ALUNOS (YouTube, de preferência "Não listado").
 * Alunos menores de idade: só com autorização por escrito do responsável (LGPD/ECA).
 * `id` é o código do link: youtube.com/shorts/ESTE_CODIGO
 * `name`, `role` e `quote` são opcionais: preencha para mostrar quem fala e uma frase de destaque.
 */
export type VideoTestimonial = { id: string; name: string | null; role: string | null; quote: string | null };

export const videoTestimonials: VideoTestimonial[] = [
  { id: 'pWabEb88l9Y', name: null, role: null, quote: null },
  { id: 'wDKqMi1EUmk', name: null, role: null, quote: null },
];

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
    a: 'Pelo portal Unicollege (notas, frequência, boletim e recados) e pelo contato direto com a coordenação, que avisa a família assim que percebe alguma dificuldade.',
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
    theme: {
      primary: '#0062B1', primaryDark: '#004A8C', primaryDeep: '#002B55',
      accent: '#FF6B00', accentInk: '#B34700', accentBtn: '#E05A00', soft: '#EEF5FC',
    },
    pitch: 'Graduação presencial, semipresencial ou 100% EAD em Novo Gama, com diploma reconhecido pelo MEC e bolsas de até 80%.',
    badge: 'Bolsas de até 80%',
    eyebrow: 'Turmas em formação · Bolsas de até 80%',
    title: 'Seu diploma começa aqui no Novo Gama. Não em Brasília.',
    titleAccent: 'Não em Brasília.',
    lead: 'Faça faculdade na Unopar Anhanguera, uma das maiores redes de ensino do país, com diploma reconhecido pelo MEC e bolsas de até 80%. Presencial, semipresencial ou 100% EAD: você escolhe o formato que cabe na sua rotina.',
    primaryCta: 'Consultar minha bolsa',
    responseNote: 'Resposta média em menos de 15 minutos pelo WhatsApp',
    proof: [
      { value: 'até 80%', label: 'de bolsa' },
      { value: 'MEC', label: 'diploma reconhecido' },
      { value: '3', label: 'modalidades de estudo' },
      { value: '6', label: 'áreas de formação' },
    ],
    painsTitle: 'Faculdade não precisa custar duas horas de ônibus',
    painsAccent: 'por dia.',
    pains: [
      { pain: 'Atravessar o Entorno até Brasília depois de um dia de trabalho', fix: 'Polo no Novo Gama, no mesmo endereço da Unidade I do Colégio Êxito' },
      { pain: 'Uma mensalidade que não cabe no orçamento da família', fix: 'Bolsas de até 80%. Consulte a sua sem compromisso' },
      { pain: 'Um horário de aula que não fecha com trabalho e filhos', fix: 'Presencial, semipresencial ou 100% EAD: você escolhe' },
      { pain: 'Matrícula confusa, documentos e financiamento sem ninguém para ajudar', fix: 'Consultor local que orienta documentação e financiamento' },
    ],
    factsTitle: 'Por que a Unopar Anhanguera é a escolha certa',
    facts: [
      { title: 'Bolsas de até 80%', text: 'Condições especiais que mudam o valor final da sua faculdade. Consulte a disponibilidade para o seu curso.' },
      { title: 'Diploma reconhecido pelo MEC', text: 'Validade nacional e credibilidade respeitada pelo mercado de trabalho.' },
      { title: 'Rede Anhanguera', text: 'A estrutura de uma das maiores redes de ensino do Brasil, perto da sua casa.' },
      { title: 'Apoio na matrícula', text: 'Atendimento presencial para tirar dúvidas, organizar documentos e entender o financiamento.' },
    ],
    areas: [
      { title: 'Administração e Gestão', courses: 'Administração, RH, Logística e Processos Gerenciais para o mercado corporativo.', icon: 'briefcase' },
      { title: 'Tecnologia', courses: 'Análise de Sistemas e Redes, com foco nas tendências digitais.', icon: 'cpu' },
      { title: 'Saúde', courses: 'Enfermagem, Biomedicina e Gestão Pública da Saúde, com laboratórios e prática.', icon: 'heart' },
      { title: 'Educação', courses: 'Pedagogia, Letras e Educação Física para quem quer transformar vidas pelo ensino.', icon: 'book' },
      { title: '100% EAD', courses: 'Flexibilidade total para conciliar estudo, trabalho e família.', icon: 'monitor' },
      { title: 'Cursos livres', courses: 'Formações rápidas para qualificação imediata em diversas áreas.', icon: 'bolt' },
    ],
    modalities: [
      { title: 'Presencial', text: 'Rotina diária no polo, contato direto com professores e uma rede de contatos que abre portas.' },
      { title: 'Semipresencial', text: 'O equilíbrio ideal: aulas online com encontros presenciais semanais para prática e suporte.', featured: true },
      { title: '100% EAD', text: 'Horário livre. Estude de onde quiser, com a mesma qualidade de ensino da rede.' },
    ],
    steps: [
      { title: 'Escolha a área', text: 'Veja os cursos e a modalidade que combina com a sua rotina.' },
      { title: 'Consulte sua bolsa', text: 'Preencha o formulário e fale com um consultor do polo pelo WhatsApp.' },
      { title: 'Faça a matrícula', text: 'Com apoio local na documentação e no financiamento.' },
      { title: 'Comece a estudar', text: 'Conte com o polo do primeiro dia até a formatura.' },
    ],
    form: {
      title: 'Descubra sua bolsa em poucos minutos',
      text: 'Preencha e fale direto com um consultor do polo Novo Gama. Você recebe as condições disponíveis para o seu curso hoje.',
      selectLabel: 'Área de interesse',
      cta: 'Quero consultar minha bolsa',
      askModality: true,
    },
    faq: [
      { q: 'Quem pode se matricular na graduação?', a: 'Quem já concluiu o Ensino Médio. Se o seu filho está no 3º ano no Êxito, ele já pode planejar a faculdade com a gente, sem sair do bairro.' },
      { q: 'O diploma EAD vale o mesmo que o presencial?', a: 'Sim. O diploma é reconhecido pelo MEC e tem validade nacional, qualquer que seja a modalidade escolhida.' },
      { q: 'Como sei quanto de bolsa eu consigo?', a: 'As bolsas chegam a até 80% e variam por curso e período. Preencha o formulário: um consultor informa a sua condição pelo WhatsApp.' },
      { q: 'Preciso ir até o polo?', a: 'No presencial, sim. No semipresencial, nos encontros semanais. No 100% EAD você estuda de onde quiser e conta com o polo para o suporte.' },
      { q: 'Qual o horário de atendimento?', a: 'Segunda a sexta, das 13h30 às 17h30, e sábado, das 8h às 12h.' },
    ],
    final: {
      title: 'As turmas estão em formação. Sua bolsa não espera.',
      text: 'Cada semana adiada é uma semana a mais para o diploma. Consulte agora as condições para o seu curso.',
      cta: 'Consultar minha bolsa agora',
    },
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
    kind: 'Cursos técnicos',
    logo: { src: '/img/parceiros/tec-mais.webp', w: 720, h: 203, alt: 'TEC Mais Cursos Técnicos' },
    theme: {
      primary: '#1A1A8C', primaryDark: '#000066', primaryDeep: '#00003D',
      accent: '#F06022', accentInk: '#B8440F', accentBtn: '#E0551A', soft: '#F1F1FA',
    },
    pitch: 'Técnico em Enfermagem, Segurança do Trabalho e Administração em Valparaíso. Credenciada pelo CEE/MEC, com aulas à noite e diploma válido em todo o país.',
    badge: 'Enfermagem: o mais procurado',
    eyebrow: 'Matrículas abertas · Turmas noturnas · Valparaíso de Goiás',
    title: 'Em 24 meses, à noite, você sai com uma profissão. E com o diploma na mão.',
    titleAccent: 'E com o diploma na mão.',
    lead: 'Cursos técnicos de nível médio em Enfermagem, Segurança do Trabalho e Administração, credenciados pelo CEE/MEC e com profissões regulamentadas pelo conselho de classe. Aulas das 18h50 às 22h20, para você estudar sem largar o emprego.',
    primaryCta: 'Quero minha vaga',
    responseNote: 'Atendimento humano pelo WhatsApp',
    proof: [
      { value: '97%', label: 'de satisfação dos alunos' },
      { value: 'CEE/MEC', label: 'instituição credenciada' },
      { value: '24', label: 'meses para se formar' },
      { value: '18h50', label: 'aulas à noite, depois do trabalho' },
    ],
    painsTitle: 'Sem formação, o mercado escolhe por você.',
    painsAccent: 'Com ela, você escolhe o mercado.',
    pains: [
      { pain: 'Trabalhar muito e ganhar pouco, sem uma profissão definida', fix: 'Técnico em Enfermagem com piso nacional de R$ 3.325,00 (Lei 14.434/2022)' },
      { pain: 'Não poder parar de trabalhar para estudar', fix: 'Aulas à noite, das 18h50 às 22h20' },
      { pain: 'Medo de fazer um curso que não vale nada', fix: 'Instituição credenciada pelo CEE/MEC, diploma válido em todo o território nacional' },
      { pain: 'Aprender só teoria e travar na hora da prática', fix: 'Aulas práticas, laboratório e visitas técnicas desde o início' },
    ],
    factsTitle: 'Por que estudar na TEC Mais',
    facts: [
      { title: 'Credenciada pelo CEE/MEC', text: 'Profissões regulamentadas pelo conselho de classe e diploma válido em todo o país.' },
      { title: '97% de satisfação', text: 'A avaliação de quem já estudou com a gente.' },
      { title: 'Aulas práticas e visitas técnicas', text: 'Laboratório, simulações e campo, além da teoria.' },
      { title: 'Turmas noturnas', text: 'Das 18h50 às 22h20, para quem trabalha durante o dia.' },
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
      { title: 'Garanta sua vaga', text: 'Inscrição simples e rápida, com atendimento humano.' },
      { title: 'Aprenda na prática', text: 'Do primeiro dia ao fim do curso, com acompanhamento.' },
    ],
    form: {
      title: 'Garanta sua vaga na próxima turma',
      text: 'Preencha e fale direto com a equipe da TEC Mais. Você recebe datas, horários e valores do curso escolhido.',
      selectLabel: 'Curso de interesse',
      cta: 'Quero minha vaga',
      askModality: false,
    },
    faq: [
      { q: 'Quanto tempo dura o curso técnico?', a: 'Os três cursos técnicos duram 24 meses, com aulas à noite, das 18h50 às 22h20. Enfermagem e Segurança do Trabalho têm 1.200 horas; Administração, 800 horas.' },
      { q: 'O diploma é reconhecido?', a: 'Sim. A TEC Mais é credenciada pelo CEE/MEC e o diploma de habilitação técnica de nível médio é válido em todo o território nacional.' },
      { q: 'Preciso ter terminado o Ensino Médio?', a: 'Os requisitos de cada curso são informados no atendimento. Fale com a equipe pelo WhatsApp para saber a sua situação.' },
      { q: 'As aulas são práticas?', a: 'Sim. Há aulas em laboratório, simulações e visitas técnicas, com orientação de quem atua na área.' },
      { q: 'Também tem cursos rápidos?', a: 'Sim: Primeiros Socorros (8h), APH, Feridas e Curativos, Cuidador de Idoso, Combate a Incêndio e Injetáveis. Pergunte as próximas turmas.' },
    ],
    final: {
      title: 'Daqui a 24 meses, você vai agradecer por ter começado hoje.',
      text: 'As turmas noturnas têm vagas limitadas. Garanta a sua e comece a construir a sua profissão.',
      cta: 'Garantir minha vaga',
    },
    contact: {
      whatsapp: '5561998200367', // telefone do cartaz da TEC Mais na fachada da Unidade II
      email: null,
      address: ['No prédio da Unidade II do Colégio Êxito', 'Quadra 122 Lote 09/14, Jardim Céu Azul, Valparaíso de Goiás – GO'],
      hours: null,
      instagram: 'https://www.instagram.com/tecmais.valparaisodegoias/',
      mapsUrl: 'https://share.google/XqeIMQirPjSmhgo65',
    },
    externalUrl: 'https://www.instagram.com/tecmais.valparaisodegoias/',
    externalLabel: 'Ver no Instagram',
    whatsappMessage: 'Olá! Vim pelo site do Colégio Êxito e quero saber sobre os cursos técnicos da TEC Mais.',
    trust: ['Credenciada pelo CEE/MEC', 'Diploma válido em todo o Brasil', '97% de satisfação', 'Fundada por profissionais com mais de 25 anos em educação'],
    testimonial: {
      quote: 'Me formar no curso de Técnico em Enfermagem é um grande passo na minha vida, pois não foi fácil. Não é fácil cuidar de casa, filhos, trabalhar fora e ainda estudar, mas eu consegui. Tive apoio de todos pra não trancar o curso, e assim eu venci, me formei, e em pouco tempo já tinha meu diploma e meu tão sonhado COREN em mãos!',
      name: 'Daíse Campos',
      role: 'Técnica em Enfermagem, formada pela TEC Mais',
      photo: '/img/tec/daise.webp',
    },
    referral: { title: 'Indique e ganhe R$ 50', text: 'A cada amigo indicado que se matricular, você ganha R$ 50,00. Mande o nome e o telefone dele para a nossa equipe.' },
    technical: [
      {
        slug: 'enfermagem',
        name: 'Técnico em Enfermagem',
        tagline: 'Cuide de vidas com técnica, em hospitais, clínicas e home care.',
        photo: '/img/tec/enfermagem.webp',
        featured: true,
        hours: '1.200 horas',
        duration: '24 meses',
        schedule: 'Noturno · 18h50 às 22h20',
        salary: { headline: 'R$ 3.325,00', detail: 'piso nacional do técnico em enfermagem', source: 'Lei 14.434/2022' },
        careers: ['Hospitais', 'Clínicas e consultórios', 'Unidades de Saúde da Família', 'Home care', 'Laboratórios de análises clínicas', 'Saúde mental', 'Institutos de reabilitação', 'Vigilância sanitária'],
        modules: [
          { title: 'Módulo I', subjects: ['Fundamentos e Técnicas de Procedimentos em Enfermagem', 'Anatomia e Fisiologia Humana', 'Introdução à Assistência de Enfermagem', 'Fundamentos da Saúde Coletiva', 'Comunicação Empresarial (EAD)', 'Biossegurança em Enfermagem'] },
          { title: 'Módulo II', subjects: ['Enfermagem em Clínica Médica', 'Saúde da Criança e da Mulher', 'Farmacologia Aplicada à Enfermagem', 'Oncologia', 'Psicologia Aplicada à Enfermagem'] },
          { title: 'Módulo III', subjects: ['Enfermagem em Urgência e Emergência', 'Enfermagem em Saúde Mental', 'Geriatria', 'Hemodiálise', 'Ética Profissional e Administração Hospitalar'] },
          { title: 'Módulo IV', subjects: ['Enfermagem Cirúrgica', 'Enfermagem na UTI', 'Nutrição e Dietética', 'Apoio ao Diagnóstico', 'Microbiologia e Parasitologia'] },
        ],
      },
      {
        slug: 'seguranca-do-trabalho',
        name: 'Técnico em Segurança do Trabalho',
        tagline: 'Proteja pessoas em obras, indústrias e empresas de todos os setores.',
        photo: '/img/tec/seguranca.webp',
        hours: '1.200 horas',
        duration: '24 meses',
        schedule: 'Noturno · 18h50 às 22h20',
        salary: { headline: 'R$ 2.000 a R$ 5.000+', detail: 'do salário inicial aos setores de maior risco', source: 'média salarial no Brasil' },
        careers: ['Indústrias', 'Construção civil', 'Comércio e serviços', 'Setor público', 'Consultorias', 'Ambientes hospitalares', 'Transporte e logística', 'Treinamentos e palestras'],
        modules: [
          { title: 'Módulo I · Parâmetros de Segurança e Saúde', subjects: ['Segurança do Trabalho', 'Metodologia Científica e Relatórios', 'E-Social', 'Análise de Projetos em Segurança', 'Investigação de Acidentes', 'Legislação Trabalhista e Previdenciária'] },
          { title: 'Módulo II · Administração em Segurança', subjects: ['Gestão de Atividades de Alto Risco', 'Gerenciamento de Risco', 'Auditorias e Perícias', 'Planos de Emergência', 'Gestão de Qualidade', 'Empreendedorismo'] },
          { title: 'Módulo III · Processos Industriais', subjects: ['Máquinas e Equipamentos', 'Desenho Técnico Industrial', 'Programas de Saúde e Segurança', 'Prevenção e Combate ao Sinistro', 'Técnica de Treinamento', 'Legislação Ambiental'] },
          { title: 'Módulo IV · Saúde e Segurança Integradas', subjects: ['Medicina do Trabalho', 'Higiene Ocupacional', 'Primeiros Socorros', 'Educação em Saúde e Segurança', 'Psicologia do Trabalho', 'Ergonomia'] },
        ],
      },
      {
        slug: 'administracao',
        name: 'Técnico em Administração',
        tagline: 'Gestão, vendas, RH e finanças: a profissão que toda empresa precisa.',
        photo: '/img/tec/administracao.webp',
        hours: '800 horas',
        duration: '24 meses',
        schedule: 'Noturno · 18h50 às 22h20',
        salary: { headline: 'R$ 2.478 a R$ 5.121', detail: 'do piso ao teto da profissão', source: 'Portal Salário' },
        careers: ['RH', 'Vendas', 'Logística', 'Marketing', 'Financeiro', 'Setor público', 'Contabilidade', 'Empreendedorismo'],
        modules: [
          { title: 'Módulo I', subjects: ['Gestão de Vendas e Negociação', 'Marketing', 'Recrutamento e Seleção', 'Matemática Básica', 'Teoria Geral da Administração', 'Comunicação Empresarial'] },
          { title: 'Módulo II', subjects: ['Liderança e Gestão de Pessoas', 'Legislação Trabalhista e Previdência', 'Matemática Financeira', 'Introdução à Logística', 'ESG', 'Gestão da Qualidade'] },
          { title: 'Módulo III', subjects: ['Contabilidade Básica', 'Empreendedorismo e Inovação', 'Treinamento e Desenvolvimento de Pessoas', 'Habilidades Pessoais e Crescimento Profissional', 'Saúde e Segurança no Trabalho', 'Ética Profissional'] },
          { title: 'Módulo IV', subjects: ['Avaliação de Desempenho', 'Contabilidade Tributária', 'Custo e Formação de Preços', 'Gestão de Processos', 'Gestão da Produção', 'Economia e Mercado'] },
        ],
      },
    ],
  },
];

/**
 * "Saiba mais" de cada fase do ensino (janela aberta pelo cartão).
 * A chave é o nome do segmento, igual ao do Supabase/site.
 */
export const segmentDetails: Record<string, { title: string; intro: string; points: string[]; quote?: string }> = {
  'Educação Infantil': {
    title: 'Onde a curiosidade vira hábito de aprender',
    intro: 'Dos 3 aos 5 anos: rotina, afeto e as primeiras descobertas, num ambiente seguro e acolhedor para o desenvolvimento acadêmico e pessoal.',
    points: [
      'Primeiras linguagens: falar, desenhar, brincar, criar e se expressar',
      'Atividades artísticas e de convivência que ensinam a respeitar o outro',
      'Planejamento que considera o ritmo e a motivação de cada criança',
      'Família informada sobre cada avanço',
    ],
  },
  'Fundamental I': {
    title: 'A base sólida de tudo o que vem depois',
    intro: 'Do 1º ao 5º ano, alfabetização firme e base forte em leitura e matemática, seguindo a BNCC com a Parte Diversificada do Êxito.',
    points: [
      'Alfabetização e leitura com acompanhamento próximo do professor',
      'Matemática construída com compreensão, não só com decoreba',
      'Temas da Vida Cidadã: saúde, meio ambiente, família e convivência',
      'Projetos, artes e tecnologia como linguagens de aprendizagem',
      'Dificuldade percebida cedo e família avisada antes da prova',
    ],
  },
  'Fundamental II': {
    title: 'A fase em que muitos se perdem. Aqui, o acompanhamento aperta.',
    intro: 'Do 6º ao 9º ano, o Êxito incentiva a autonomia nos estudos e nas relações, com um professor por disciplina e mais independência.',
    points: [
      'Um professor especialista por disciplina',
      'Oficinas e atividades esportivas além das aulas regulares',
      'Projetos temáticos, visitas monitoradas e estudos do meio',
      'Alunos incentivados a organizar atividades de convivência e interação',
      'Formação de valores: pensamento crítico, liberdade de pensamento e responsabilidade',
    ],
    quote: 'Método de estudo e responsabilidade: é aqui que o aluno aprende a aprender.',
  },
  'Ensino Médio': {
    title: 'Novo Ensino Médio com o depois já planejado',
    intro: 'Da 1ª à 3ª série, preparação para o ENEM e para o vestibular, com foco em uma escolha de carreira consciente.',
    points: [
      'Novo Ensino Médio alinhado à BNCC e à legislação educacional',
      'Preparação para ENEM e vestibulares',
      'Protagonismo: pesquisa, debate e projetos que formam cidadãos críticos',
      'Programa Mindset: projeto de vida, foco e disciplina de estudo para o ENEM',
      'Ponte direta para a faculdade (Polo Unopar Anhanguera) e para cursos técnicos (TEC Mais)',
    ],
    quote: 'A escola não termina no 3º ano: a faculdade e a profissão continuam na mesma casa.',
  },
};

/** Liga um cartão de segmento (ex.: "Polo Unopar") à página de formação. */
export const formacaoBySegment = (name: string) => {
  const n = name.toLowerCase();
  return formacoes.find((f) => n.includes(f.slug.replace('-', ' ')) || n.includes(f.name.toLowerCase()));
};

export type GalleryItem = { title: string; caption: string | null; date: string | null; photo: string };

/**
 * Galeria de atividades (carrossel "Vida no Êxito").
 * Fotos daqui ficam em public/img/galeria/ e somam com as cadastradas no Supabase (tabela galeria).
 * Ex.: { title: 'Festa Junina 2026', caption: 'Apresentação do Fundamental I', date: '2026-06-20', photo: '/img/galeria/festa-junina-1.webp' }
 */
export const gallery: GalleryItem[] = [
  { title: 'Intervalo no refeitório', caption: 'Alunos do Fundamental II e do Ensino Médio', date: null, photo: '/img/fotos/refeitorio.webp' },
  { title: 'Unidade I · Novo Gama', caption: 'Colégio Êxito e Polo Universitário Unopar Anhanguera', date: null, photo: '/img/fotos/fachada-novo-gama.webp' },
  { title: 'Unidade II · Valparaíso de Goiás', caption: 'Colégio Êxito e TEC Mais Cursos Técnicos', date: null, photo: '/img/fotos/fachada-valparaiso.webp' },
];

/**
 * Fotos do site (em public/img/fotos). Usadas quando o Supabase não tem foto cadastrada.
 * illustrative: true mostra o selo "imagem ilustrativa"; troque por foto real e apague a marca.
 */
/** Tours virtuais 360° (dd360) de cada unidade, na seção "Por dentro do Êxito". */
export const tours = [
  { unitId: 'novo-gama', label: 'Unidade I · Pedregal', city: 'Novo Gama', url: 'https://dd360.app/colegioexito1', cover: '/img/fotos/fachada-novo-gama.webp' },
  { unitId: 'valparaiso', label: 'Unidade II · Céu Azul', city: 'Valparaíso de Goiás', url: 'https://dd360.app/colegioexito2', cover: '/img/fotos/fachada-valparaiso.webp' },
];

export type SitePhoto = { src: string; alt: string; illustrative?: boolean };
export const photos: {
  hero: SitePhoto;
  segments: Record<string, SitePhoto>;
  units: Record<string, SitePhoto>;
} = {
  hero: { src: '/img/fotos/fundamental-i.webp', alt: 'Professora do Colégio Êxito acompanhando de perto uma aluna do Fundamental I', illustrative: true },
  segments: {
    'Educação Infantil': { src: '/img/fotos/educacao-infantil.webp', alt: 'Crianças da Educação Infantil pintando com a professora', illustrative: true },
    'Fundamental I': { src: '/img/fotos/fundamental-i.webp', alt: 'Turma do Fundamental I em aula', illustrative: true },
    'Fundamental II': { src: '/img/fotos/fundamental-ii-9ano.webp', alt: 'Aula de matemática do 9º ano', illustrative: true },
    'Ensino Médio': { src: '/img/fotos/refeitorio.webp', alt: 'Alunos do Colégio Êxito no refeitório' },
  },
  units: {
    'novo-gama': { src: '/img/fotos/fachada-novo-gama.webp', alt: 'Fachada do Colégio Êxito, Unidade I, Novo Gama' },
    'valparaiso': { src: '/img/fotos/fachada-valparaiso.webp', alt: 'Fachada do Colégio Êxito, Unidade II, Valparaíso de Goiás' },
  },
};

// ——— utilitários ———

export const waLink = (number: string, message = school.whatsappMessage) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const telLink = (number: string) => `tel:+55${number}`;

export const formatPhone = (n: string) =>
  n.length === 11
    ? `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`
    : `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
