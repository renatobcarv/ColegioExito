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

export type Formacao = {
  slug: string;
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
    whatsapp: '5561986263138', // WhatsApp da unidade Céu Azul (confirmado pela escola)
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
    kind: 'Cursos técnicos e livres',
    logo: { src: '/img/parceiros/tec-mais.webp', w: 720, h: 203, alt: 'TEC Mais Cursos Técnicos' },
    theme: {
      primary: '#1A1A8C', primaryDark: '#000066', primaryDeep: '#00003D',
      accent: '#F06022', accentInk: '#B8440F', accentBtn: '#E0551A', soft: '#F1F1FA',
    },
    pitch: 'Cursos de saúde e segurança em Valparaíso: aprenda o que ninguém te ensina, antes de precisar.',
    badge: 'Primeiros Socorros em 8h',
    eyebrow: 'Cursos de saúde e segurança · Valparaíso de Goiás',
    title: 'Numa emergência, ninguém pergunta seu diploma. Pergunta quem sabe o que fazer.',
    titleAccent: 'quem sabe o que fazer.',
    lead: 'Na TEC Mais você aprende, com as mãos, o que salva vidas e abre portas no mercado: Primeiros Socorros, APH, Feridas e Curativos, Cuidador de Idoso, Combate a Incêndio e Injetáveis. Cursos diretos, práticos e perto de casa.',
    primaryCta: 'Quero me inscrever',
    responseNote: 'Atendimento humano pelo WhatsApp',
    proof: [
      { value: '6', label: 'cursos de saúde e segurança' },
      { value: '8h', label: 'para aprender Primeiros Socorros' },
      { value: '192', label: 'quando e como acionar o socorro' },
      { value: 'Prática', label: 'protocolos treinados com as mãos' },
    ],
    painsTitle: 'O medo que paralisa não é falta de coragem.',
    painsAccent: 'É falta de treino.',
    pains: [
      { pain: 'Travar quando alguém passa mal bem na sua frente', fix: 'O protocolo certo, na ordem certa, treinado em aula até virar reflexo' },
      { pain: 'Ouvir um conselho errado e não ter segurança para discordar', fix: 'Conhecimento para agir com calma até o socorro chegar' },
      { pain: 'Querer trabalhar na área da saúde sem saber por onde começar', fix: 'Cursos que viram currículo: Cuidador de Idoso, Feridas e Curativos, Injetáveis' },
      { pain: 'Cursos longos e caros que adiam o seu objetivo', fix: 'Formações diretas ao ponto. Primeiros Socorros em 8 horas' },
    ],
    factsTitle: 'Por que aprender na TEC Mais',
    facts: [
      { title: 'Prática de verdade', text: 'Protocolos treinados com as mãos, não só lidos na apostila.' },
      { title: 'Cursos rápidos e diretos', text: 'Primeiros Socorros em 8 horas, por exemplo. Sem enrolação.' },
      { title: 'Saúde e segurança', text: 'Formações que abrem portas no mercado e servem para a vida inteira.' },
      { title: 'Na mesma casa do Êxito', text: 'O cuidado e o acompanhamento de perto que as famílias de Valparaíso já conhecem.' },
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
      { q: 'Preciso ter experiência na área da saúde?', a: 'Depende do curso. Primeiros Socorros, por exemplo, é para qualquer pessoa que quer saber agir. Os pré-requisitos de cada curso são informados no atendimento.' },
      { q: 'Quanto tempo dura cada curso?', a: 'Primeiros Socorros tem 8 horas. A duração dos demais é informada no atendimento, junto com as datas das próximas turmas.' },
      { q: 'As aulas são práticas?', a: 'Sim. Você treina os protocolos com as mãos, com orientação de quem atua na área.' },
      { q: 'Onde ficam as aulas?', a: 'Em Valparaíso de Goiás. Chame no WhatsApp para receber o endereço e o calendário das turmas.' },
    ],
    final: {
      title: 'A próxima emergência não marca hora.',
      text: 'Mas a sua inscrição pode ser hoje. Garanta sua vaga e aprenda o que ninguém te ensina, antes de precisar.',
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
    whatsappMessage: 'Olá! Vim pelo site do Colégio Êxito e quero saber sobre os cursos da TEC Mais.',
  },
];

/**
 * "Saiba mais" de cada fase do ensino (janela aberta pelo cartão).
 * A chave é o nome do segmento, igual ao do Supabase/site.
 */
export const segmentDetails: Record<string, { title: string; intro: string; points: string[]; quote?: string }> = {
  'Berçário': {
    title: 'Os primeiros passos, com quem você conhece pelo nome',
    intro: 'No Berçário, a prioridade é que seu filho se sinta seguro e que você saia tranquilo para trabalhar.',
    points: [
      'Rotina organizada de cuidado, alimentação e descanso',
      'Ambiente acolhedor e seguro, pensado para os primeiros anos',
      'Estímulos respeitando o ritmo e as características de cada criança',
      'Comunicação próxima com a família sobre o dia a dia',
    ],
  },
  'Educação Infantil': {
    title: 'Onde a curiosidade vira hábito de aprender',
    intro: 'Rotina, afeto e as primeiras descobertas, num ambiente seguro e acolhedor para o desenvolvimento acadêmico e pessoal.',
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
export type SitePhoto = { src: string; alt: string; illustrative?: boolean };
export const photos: {
  hero: SitePhoto;
  segments: Record<string, SitePhoto>;
  units: Record<string, SitePhoto>;
} = {
  hero: { src: '/img/fotos/fundamental-i.webp', alt: 'Professora do Colégio Êxito acompanhando de perto uma aluna do Fundamental I', illustrative: true },
  segments: {
    'Berçário': { src: '/img/fotos/bercario.webp', alt: 'Bebês do Berçário brincando com a professora', illustrative: true },
    'Educação Infantil': { src: '/img/fotos/educacao-infantil.webp', alt: 'Crianças da Educação Infantil pintando com a professora', illustrative: true },
    'Fundamental I': { src: '/img/fotos/fundamental-i.webp', alt: 'Turma do Fundamental I em aula', illustrative: true },
    'Fundamental II': { src: '/img/fotos/fundamental-ii-9ano.webp', alt: 'Aula de matemática do 9º ano', illustrative: true },
    'Ensino Médio': { src: '/img/fotos/refeitorio.webp', alt: 'Alunos do Colégio Êxito no refeitório' },
    'Polo Unopar': { src: '/img/fotos/fachada-novo-gama.webp', alt: 'Fachada da Unidade I com o Polo Universitário Unopar Anhanguera' },
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
