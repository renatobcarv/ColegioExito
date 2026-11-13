/**
 * Páginas de apresentação dos cursos técnicos da TEC Mais (/tec-mais/<slug>).
 * Grade, carga horária, horário e salário vêm de `formacoes` (site.ts → technical).
 * Aqui fica a copy de venda de cada curso.
 *
 * Método: Schwartz (nível de consciência) na promessa, PAS (problema → agitação → solução) no antes/depois,
 * StoryBrand (o aluno é o herói, a TEC Mais é a guia), equação de valor de Hormozi (resultado × chance ÷ tempo × esforço)
 * no "tudo incluso" e objeções respondidas antes do botão. Regra: nenhum número sem fonte, nenhuma escassez falsa.
 */

export type CursoCopy = {
  slug: string;
  /** cor de destaque da página (a base é o azul TEC) */
  hue: string;
  hueSoft: string;
  heroTitle: string;
  heroAccent: string;
  heroLead: string;
  /** frase curta que aparece em cima do título */
  heroKicker: string;
  /** a profissão em uma frase, para o card do hero */
  oneLiner: string;
  /** fato de autoridade com fonte (lei, norma) */
  authority: { title: string; text: string; source: string };
  personas: { title: string; text: string }[];
  before: string[];
  after: string[];
  /** um turno de trabalho, para o aluno se enxergar na profissão */
  day: { time: string; title: string; text: string }[];
  skills: { title: string; text: string; icon: 'heart' | 'bolt' | 'tool' | 'book' | 'briefcase' | 'cpu' | 'monitor' | 'check' | 'cap' }[];
  objections: { q: string; a: string }[];
  finalTitle: string;
  finalText: string;
  whatsappMessage: string;
};

export const cursos: CursoCopy[] = [
  {
    slug: 'enfermagem',
    hue: '#F06022',
    hueSoft: '#FFF1EA',
    heroKicker: 'O curso técnico mais procurado da TEC Mais',
    heroTitle: 'Tem gente que só sonha em cuidar de vidas.',
    heroAccent: 'Você pode fazer disso a sua profissão.',
    heroLead: 'Em 24 meses, com aulas à noite, você se forma Técnico(a) em Enfermagem, pede o seu COREN e entra numa área que tem piso salarial nacional garantido por lei. Sem largar o emprego para estudar.',
    oneLiner: 'A profissão que está ao lado do paciente do primeiro ao último minuto do plantão.',
    authority: {
      title: 'Piso nacional garantido por lei',
      text: 'O Técnico em Enfermagem é uma das poucas profissões de nível médio com piso salarial nacional: R$ 3.325,00 para 44 horas semanais.',
      source: 'Lei 14.434/2022',
    },
    personas: [
      { title: 'Terminou o Ensino Médio e quer uma profissão de verdade', text: 'Em vez de esperar anos por uma faculdade, você sai em 24 meses com diploma, registro no conselho e um mercado que não para de contratar.' },
      { title: 'Já cuida de alguém e quer ser paga por isso', text: 'Se você já é a pessoa que a família chama quando alguém adoece, falta só a técnica, o diploma e o COREN.' },
      { title: 'Trabalha de dia e quer mudar de vida à noite', text: 'Aulas das 18h50 às 22h20. Você continua trabalhando enquanto constrói a profissão que vai substituir o emprego atual.' },
    ],
    before: ['Emprego sem profissão definida, que qualquer um pode ocupar', 'Salário que depende da boa vontade do patrão', 'Vontade de ajudar pessoas, mas sem preparo para agir', 'Medo de começar e não dar conta da rotina'],
    after: ['Diploma de Técnico(a) em Enfermagem e registro no COREN', 'Piso nacional de R$ 3.325,00 garantido pela Lei 14.434/2022', 'Técnica para agir com segurança em hospital, clínica ou home care', 'Uma turma noturna que caminha junto até a formatura'],
    day: [
      { time: '07h00', title: 'Passagem de plantão', text: 'Você recebe os pacientes da equipe anterior: quem piorou, quem melhorou, o que ficou pendente.' },
      { time: '08h00', title: 'Sinais vitais e medicação', text: 'Pressão, temperatura, saturação. Prepara e administra a medicação prescrita, conferindo cada etapa.' },
      { time: '10h30', title: 'Curativos e procedimentos', text: 'Curativos, sondagens, coleta de exames, sempre com técnica asséptica e biossegurança.' },
      { time: '14h00', title: 'Cuidado que ninguém vê', text: 'Higiene, conforto, orientação à família. É aqui que o paciente lembra do seu nome.' },
      { time: '18h00', title: 'Registro e passagem', text: 'Anota tudo no prontuário e passa o plantão. Você foi a diferença no dia de alguém.' },
    ],
    skills: [
      { title: 'Sinais vitais e avaliação', text: 'Aferir, interpretar e comunicar a tempo o que está fora do normal.', icon: 'heart' },
      { title: 'Medicação com segurança', text: 'Farmacologia, cálculo de dose e os 9 certos da administração.', icon: 'tool' },
      { title: 'Urgência e emergência', text: 'Agir com técnica e calma quando cada minuto conta.', icon: 'bolt' },
      { title: 'Curativos e procedimentos', text: 'Técnica asséptica, biossegurança e cuidado com feridas.', icon: 'check' },
      { title: 'UTI, centro cirúrgico e hemodiálise', text: 'Conteúdo dos setores que mais exigem e mais valorizam o técnico.', icon: 'cpu' },
      { title: 'Ética e saúde coletiva', text: 'Postura profissional, SUS e cuidado da criança, da mulher e do idoso.', icon: 'book' },
    ],
    objections: [
      { q: 'Tenho medo de sangue. Dá para ser técnico(a) de enfermagem?', a: 'Muita gente começa assim. As aulas práticas em laboratório existem justamente para você se acostumar aos poucos, com orientação, antes de chegar ao paciente real.' },
      { q: 'Trabalho o dia inteiro. Vou conseguir acompanhar?', a: 'O curso foi pensado para quem trabalha: aulas das 18h50 às 22h20. A Daíse, que se formou aqui, conciliou casa, filhos, trabalho e estudo, e conta isso no depoimento abaixo.' },
      { q: 'Depois de formado, eu já posso trabalhar?', a: 'Com o diploma em mãos você solicita o registro no COREN, que é o que habilita o exercício da profissão. A equipe da TEC Mais orienta esse passo.' },
      { q: 'Quanto custa?', a: 'Os valores, as condições de pagamento e as datas da próxima turma são passados pelo WhatsApp, com atendimento humano. Pergunte também sobre o Indique e Ganhe.' },
      { q: 'O diploma vale em outro estado?', a: 'Sim. A TEC Mais é credenciada pelo CEE/MEC e o diploma de habilitação técnica de nível médio é válido em todo o território nacional.' },
    ],
    finalTitle: 'Daqui a 24 meses alguém vai estar de jaleco, com o COREN na carteira.',
    finalText: 'Pode ser você. As turmas noturnas têm vagas limitadas: fale com a equipe e veja a data da próxima.',
    whatsappMessage: 'Olá! Vi a página do curso Técnico em Enfermagem da TEC Mais e quero saber valores e a data da próxima turma.',
  },
  {
    slug: 'seguranca-do-trabalho',
    hue: '#F2B705',
    hueSoft: '#FFF8E0',
    heroKicker: 'A profissão que a lei manda as empresas terem',
    heroTitle: 'Toda empresa tem riscos.',
    heroAccent: 'As melhores pagam alguém para cuidar deles.',
    heroLead: 'Em 24 meses, à noite, você se forma Técnico(a) em Segurança do Trabalho: a pessoa que evita acidentes, treina equipes e garante que a empresa cumpra as Normas Regulamentadoras. Uma função que existe em obra, indústria, hospital, comércio e órgão público.',
    oneLiner: 'A pessoa que faz todo mundo voltar para casa inteiro no fim do expediente.',
    authority: {
      title: 'Exigido por norma',
      text: 'Pela NR-4, empresas a partir de determinado número de empregados e grau de risco são obrigadas a manter técnicos de segurança no SESMT. A profissão é regulamentada pela Lei 7.410/1985.',
      source: 'NR-4 · Lei 7.410/1985',
    },
    personas: [
      { title: 'Quer uma profissão técnica fora da área da saúde', text: 'Campo, obra, indústria e escritório: um trabalho que mistura rua, gente e responsabilidade, com mercado em todo setor da economia.' },
      { title: 'Já trabalha em obra, indústria ou logística', text: 'Você já conhece o chão de fábrica. Com o diploma, passa de quem obedece às regras para quem as define e fiscaliza.' },
      { title: 'Gosta de liderar, ensinar e organizar', text: 'Treinamentos, palestras, DDS e planos de emergência. Se você gosta de estar à frente, essa é a sua área.' },
    ],
    before: ['Trabalho braçal ou rotineiro, sem perspectiva de crescer', 'Ver riscos no dia a dia sem ter autoridade para agir', 'Salário estagnado na mesma função há anos', 'Currículo igual ao de todo mundo'],
    after: ['Diploma de Técnico(a) em Segurança do Trabalho, com registro profissional', 'Uma função que as empresas precisam manter por norma (NR-4)', 'Autoridade para inspecionar, orientar e parar uma atividade de risco', 'Mercado em obra, indústria, hospital, logística e setor público'],
    day: [
      { time: '07h00', title: 'DDS com a equipe', text: 'O Diálogo Diário de Segurança: 10 minutos para alinhar os riscos do dia antes de o trabalho começar.' },
      { time: '08h30', title: 'Inspeção de campo', text: 'Confere EPIs, andaimes, máquinas e sinalização. Encontrou risco? Orienta e corrige na hora.' },
      { time: '11h00', title: 'Permissão de trabalho', text: 'Libera atividades de alto risco, como altura e espaço confinado, só depois de tudo conferido.' },
      { time: '14h00', title: 'Treinamento', text: 'Ministra treinamentos de NR, brigada de incêndio e primeiros socorros para os colaboradores.' },
      { time: '16h30', title: 'Relatórios e indicadores', text: 'Registra inspeções, investiga incidentes e acompanha os números de segurança da empresa.' },
    ],
    skills: [
      { title: 'Normas Regulamentadoras', text: 'Ler, aplicar e cobrar as NRs no dia a dia da empresa.', icon: 'book' },
      { title: 'Gerenciamento de riscos', text: 'Identificar, avaliar e controlar riscos antes que virem acidente.', icon: 'bolt' },
      { title: 'Investigação de acidentes', text: 'Descobrir a causa raiz e impedir que se repita.', icon: 'check' },
      { title: 'Planos de emergência e combate a incêndio', text: 'Brigada, rotas de fuga e prevenção de sinistros.', icon: 'tool' },
      { title: 'Higiene ocupacional e ergonomia', text: 'Ruído, calor, postura: a saúde do trabalhador no longo prazo.', icon: 'heart' },
      { title: 'E-Social e legislação', text: 'A parte legal e previdenciária que toda empresa precisa cumprir.', icon: 'monitor' },
    ],
    objections: [
      { q: 'Só existe vaga em indústria grande?', a: 'Não. Há demanda em construção civil, comércio, serviços, hospitais, transporte, logística, consultorias e no setor público.' },
      { q: 'Preciso ser bom em matemática?', a: 'O curso traz o que você precisa, aplicado à prática: cálculos de risco, indicadores e leitura de projetos, explicados passo a passo.' },
      { q: 'Trabalho o dia inteiro. Dá para conciliar?', a: 'Sim. As aulas são à noite, das 18h50 às 22h20, pensadas para quem trabalha durante o dia.' },
      { q: 'Quanto custa?', a: 'Valores, condições e a data da próxima turma são passados pelo WhatsApp, com atendimento humano. Pergunte também sobre o Indique e Ganhe.' },
      { q: 'O diploma é reconhecido?', a: 'Sim. A TEC Mais é credenciada pelo CEE/MEC e o diploma de habilitação técnica de nível médio vale em todo o país.' },
    ],
    finalTitle: 'Alguém vai ser responsável pela segurança de centenas de pessoas.',
    finalText: 'Daqui a 24 meses, pode ser você. As turmas noturnas têm vagas limitadas: fale com a equipe e veja a próxima.',
    whatsappMessage: 'Olá! Vi a página do curso Técnico em Segurança do Trabalho da TEC Mais e quero saber valores e a data da próxima turma.',
  },
  {
    slug: 'administracao',
    hue: '#3D5BFF',
    hueSoft: '#EEF1FF',
    heroKicker: 'A profissão que toda empresa precisa',
    heroTitle: 'Toda empresa precisa de alguém que organize a casa.',
    heroAccent: 'Seja essa pessoa.',
    heroLead: 'Em 24 meses, à noite, você se forma Técnico(a) em Administração e aprende o que move qualquer negócio: vendas, pessoas, finanças, logística e processos. Serve para conseguir uma vaga melhor, crescer onde você já está ou abrir o seu próprio negócio.',
    oneLiner: 'A pessoa que faz a empresa funcionar: do caixa ao RH, do estoque à reunião com o dono.',
    authority: {
      title: 'Serve em qualquer setor',
      text: 'Comércio, indústria, saúde, serviços ou setor público: toda organização precisa de gestão de pessoas, dinheiro, estoque e processos. É a formação técnica mais versátil.',
      source: 'Grade curricular TEC Mais',
    },
    personas: [
      { title: 'Quer sair do operacional e ir para o escritório', text: 'Do balcão, do caixa ou do estoque para as funções administrativas, de RH, financeiro e compras.' },
      { title: 'Quer crescer na empresa onde já trabalha', text: 'Supervisão e liderança pedem quem entende de números, pessoas e processos. O diploma mostra que você entende.' },
      { title: 'Sonha em ter o próprio negócio', text: 'Custos, preço, vendas, contabilidade e empreendedorismo: o que separa quem abre de quem sobrevive.' },
    ],
    before: ['Emprego operacional sem caminho claro de promoção', 'Ver o negócio por dentro sem entender os números', 'Ideia de empreender, mas sem saber precificar ou controlar o caixa', 'Currículo sem nenhuma formação técnica'],
    after: ['Diploma de Técnico(a) em Administração', 'Base de vendas, RH, finanças, logística e processos', 'Capacidade de precificar, controlar custos e liderar uma equipe', 'Portas abertas no comércio, na indústria, em serviços e em concursos'],
    day: [
      { time: '08h00', title: 'Indicadores do dia', text: 'Confere vendas, caixa e estoque. Os números dizem onde agir primeiro.' },
      { time: '09h30', title: 'Pessoas', text: 'Escala, recrutamento, treinamento e conversa com a equipe.' },
      { time: '11h00', title: 'Compras e fornecedores', text: 'Cotação, negociação e prazo de entrega sem parar a operação.' },
      { time: '14h00', title: 'Financeiro', text: 'Contas a pagar e a receber, fluxo de caixa e formação de preço.' },
      { time: '16h30', title: 'Melhoria de processos', text: 'Encontra o gargalo e organiza um jeito melhor de fazer. É assim que se cresce.' },
    ],
    skills: [
      { title: 'Vendas e negociação', text: 'Vender, negociar com fornecedores e encantar clientes.', icon: 'briefcase' },
      { title: 'Gestão de pessoas', text: 'Recrutamento, liderança, treinamento e avaliação de desempenho.', icon: 'heart' },
      { title: 'Finanças e custos', text: 'Matemática financeira, custos, formação de preços e contabilidade.', icon: 'cpu' },
      { title: 'Logística e produção', text: 'Estoque, compras e processos que não param a operação.', icon: 'tool' },
      { title: 'Marketing', text: 'Como atrair e manter clientes, do comércio de bairro à empresa grande.', icon: 'monitor' },
      { title: 'Empreendedorismo e ESG', text: 'Abrir, organizar e fazer crescer um negócio de forma responsável.', icon: 'bolt' },
    ],
    objections: [
      { q: 'Administração não é só para quem faz faculdade?', a: 'O curso técnico é o caminho mais rápido para entrar na área: 24 meses, à noite, focado no que as empresas usam no dia a dia. E se quiser seguir, a faculdade fica mais fácil depois.' },
      { q: 'Serve para quem quer abrir o próprio negócio?', a: 'Sim. A grade tem empreendedorismo, custos, formação de preços, contabilidade, vendas e marketing: o básico que todo dono de negócio precisa dominar.' },
      { q: 'Trabalho o dia inteiro. Dá para conciliar?', a: 'Sim. As aulas são das 18h50 às 22h20, pensadas para quem trabalha durante o dia.' },
      { q: 'Quanto custa?', a: 'Valores, condições e a data da próxima turma são passados pelo WhatsApp, com atendimento humano. Pergunte também sobre o Indique e Ganhe.' },
      { q: 'O diploma é reconhecido?', a: 'Sim. A TEC Mais é credenciada pelo CEE/MEC e o diploma vale em todo o país.' },
    ],
    finalTitle: 'Quem entende de gestão nunca fica sem lugar.',
    finalText: 'Em 24 meses, à noite, você pode ser essa pessoa. As turmas têm vagas limitadas: fale com a equipe e veja a próxima.',
    whatsappMessage: 'Olá! Vi a página do curso Técnico em Administração da TEC Mais e quero saber valores e a data da próxima turma.',
  },
];
