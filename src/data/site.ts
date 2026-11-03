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
    instagram: 'https://instagram.com/colegioexitooficial',
    facebook: 'https://www.facebook.com/ColegioExitoII',
  },
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
    text: 'ENEM e vestibular com foco no depois: uma escolha de carreira consciente.',
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

// ——— utilitários ———

export const waLink = (number: string, message = school.whatsappMessage) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const telLink = (number: string) => `tel:+55${number}`;

export const formatPhone = (n: string) =>
  n.length === 11
    ? `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`
    : `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
