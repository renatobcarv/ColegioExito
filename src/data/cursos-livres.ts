/**
 * Cursos de experiência prática da TEC Mais (um dia de teoria + prática) com acesso à TEC Mais Academy.
 * Páginas: /tec-mais/injetaveis e /tec-mais/aph. Modelo: "TEC Mais · Guia da Turma" (PDF da escola).
 * Para abrir uma turma nova, mude `turma` (data por extenso; null = "data a confirmar").
 */
export type CursoLivre = {
  slug: string;
  nome: string;
  nomeCurto: string;
  kicker: string;
  /** promessa principal (o trecho em `acento` aparece em itálico laranja) */
  titulo: string;
  acento: string;
  lead: string;
  fotoHero: { src: string; alt: string };
  turma: { data: string | null; horario: string; intervalo: string; local: string; carga: string };
  preco: { valor: string | null; nota: string; selo?: string; ancora?: string } ;
  programacao: { inicio: string; fim?: string; titulo: string; texto: string }[];
  conteudo: { titulo: string; texto: string }[];
  destaqueConteudo?: { label: string; valor: string };
  incluso: { titulo: string; texto: string; icone: 'book' | 'heart' | 'tool' | 'cap' | 'monitor' | 'check' }[];
  pratica: { intro: string; nota: string; grupos: { titulo: string; itens: string[] }[]; fotos: { src: string; alt: string }[]; fotosNota?: string };
  etapas: string[];
  bonusIntro: string;
  bonus: { titulo: string; texto: string; valor?: string; libera: string }[];
  telas: { src: string; alt: string; legenda: string }[];
  telasCelular: { src: string; alt: string }[];
  professor?: { nome: string; cargo: string; formacao: string[]; foto: string; fotoAula?: string };
  faq: { q: string; a: string }[];
  frase: string;
  finalTitulo: string;
  finalTexto: string;
  whatsappMessage: string;
};

const DIA = [
  { inicio: '08:00', titulo: 'Chegada + início', texto: 'Início da programação da turma, com café de boas-vindas e entrega dos materiais.' },
  { inicio: '08:00', fim: '12:00', titulo: 'Parte teórica', texto: 'Os fundamentos e conteúdos necessários para entender as técnicas trabalhadas na formação.' },
  { inicio: '12:00', fim: '13:30', titulo: 'Intervalo + lanche', texto: 'Pausa para descanso, com lanche oferecido pela TEC Mais.' },
  { inicio: '13:30', fim: '17:30', titulo: 'Parte prática', texto: 'Treino prático, com contato direto com as técnicas e os materiais da programação.' },
  { inicio: '17:30', titulo: 'Encerramento + acesso à plataforma', texto: 'Finalização da programação, entrega do mimo especial da turma e liberação do seu acesso à TEC Mais Academy.' },
];

const TURMA_BASE = { horario: '08h00 às 17h30', intervalo: '12h00 às 13h30 (indicamos restaurantes)', local: 'TEC Mais Cursos Técnicos', carga: '9h30 de programação' };

export const cursosLivres: CursoLivre[] = [
  {
    slug: 'injetaveis',
    nome: 'Administração de Medicamentos Injetáveis',
    nomeCurto: 'Injetáveis',
    kicker: 'TEC Mais · Experiência prática',
    titulo: 'Um dia de aprendizado, prática e desenvolvimento profissional.',
    acento: 'E um acesso que continua depois da aula.',
    lead: 'Teoria pela manhã, prática com simuladores à tarde, apostila, lanche e mimo especial. No fim do dia, você ainda recebe o acesso à TEC Mais Academy: a plataforma exclusiva com os guias para revisar tudo quando precisar.',
    fotoHero: { src: '/img/cursos/injetaveis-turma.webp', alt: 'Turma do curso de Administração de Medicamentos Injetáveis na TEC Mais' },
    turma: { data: null, ...TURMA_BASE },
    preco: { valor: null, nota: 'Valores, formas de pagamento e a data da próxima turma pelo WhatsApp, com atendimento humano.' },
    programacao: DIA,
    conteudo: [
      { titulo: 'Biossegurança', texto: 'Cuidados para realizar os procedimentos dentro de boas práticas de segurança.' },
      { titulo: 'Anatomia e fisiologia', texto: 'Fundamentos para entender os procedimentos e as estruturas envolvidas.' },
      { titulo: 'Ética e aspectos legais', texto: 'Atuação responsável e os aspectos éticos e legais da administração.' },
      { titulo: 'Comunicação com o paciente', texto: 'Como se comunicar antes, durante e depois do procedimento.' },
      { titulo: 'Cuidados pós-procedimento', texto: 'Orientações e cuidados no momento posterior à administração.' },
      { titulo: 'Técnicas de administração', texto: 'Contato com as principais vias e técnicas trabalhadas na aula.' },
    ],
    destaqueConteudo: { label: 'Vias e técnicas trabalhadas', valor: 'EV · IV · IM · SC · ID' },
    incluso: [
      { titulo: 'Material didático completo', texto: 'Apostila impressa com todo o conteúdo teórico, para acompanhar a aula e consultar depois.', icone: 'book' },
      { titulo: 'Prática com simuladores', texto: 'Kit completo de materiais e simuladores para o treino prático, sem custo adicional.', icone: 'tool' },
      { titulo: 'Lanche durante o intervalo', texto: 'Um lanche especial no intervalo, para recarregar as energias antes da prática.', icone: 'heart' },
      { titulo: 'Mimo especial da turma', texto: 'Uma lembrancinha exclusiva TEC Mais, entregue no encerramento do dia.', icone: 'cap' },
      { titulo: 'Acesso à TEC Mais Academy', texto: 'Login individual na plataforma exclusiva, com os 3 guias bônus do curso no celular.', icone: 'monitor' },
    ],
    pratica: {
      intro: 'É aqui que o conteúdo sai do papel.',
      nota: 'Prática em bonecos, simuladores e pessoas, sempre com supervisão da professora.',
      grupos: [
        { titulo: 'Punção', itens: ['Scalp 23', 'Abocath 24'] },
        { titulo: 'Aplicação', itens: ['Seringa com agulha 5 ml'] },
        { titulo: 'Biossegurança', itens: ['Luvas', 'Máscara', 'Álcool 70%'] },
        { titulo: 'Apoio e descarte', itens: ['Garrote', 'Cuba rim / bandeja', 'Descarpack', 'Algodão'] },
      ],
      fotos: [
        { src: '/img/cursos/ketiusse-duvida.webp', alt: 'A professora Ketiusse orientando uma punção venosa em aluno, com a turma acompanhando' },
        { src: '/img/cursos/ketiusse-explicando.webp', alt: 'A professora Ketiusse explicando os materiais da prática para a turma' },
        { src: '/img/cursos/injetaveis-materiais.webp', alt: 'Materiais da aula prática: seringas, luvas e caixa Descarpack' },
        { src: '/img/cursos/injetaveis-pratica-2.webp', alt: 'Alunas treinando punção venosa com a professora' },
      ],
    },
    etapas: ['Entender', 'Conhecer os materiais', 'Acompanhar as técnicas', 'Treinar', 'Tirar dúvidas', 'Encerrar'],
    bonusIntro: 'A aula acaba às 17h30. O aprendizado, não. Na plataforma, você revisa o cálculo, relembra a prática e se prepara para buscar oportunidades.',
    bonus: [
      { titulo: 'Guia de Cálculo de Medicamentos', texto: 'Conversões, regra de três, reconstituição, diluição, gotejamento, UI e insulina, com exercícios e gabarito comentado. Mais as fórmulas da aula e o checklist de conferência.', libera: 'Liberado no fim do curso' },
      { titulo: 'Guia Visual da Prática', texto: 'Materiais, biossegurança, antes/durante/depois, erros de atenção e descarte, em pranchas visuais com pouco texto.', libera: 'Liberado no fim do curso' },
      { titulo: 'Guia de Oportunidades Profissionais', texto: 'Escolha sua trilha, monte o currículo, copie mensagens prontas e siga um plano de 7 dias, com controle dos seus contatos.', libera: 'Liberado no fim do curso' },
    ],
    telas: [
      { src: '/img/cursos/plataforma-inj-materiais.webp', alt: 'Tela do Guia Visual da Prática na TEC Mais Academy', legenda: 'Guia Visual: os materiais da aula em pranchas' },
      { src: '/img/cursos/plataforma-inj-checklist.webp', alt: 'Tela do checklist de conferência na TEC Mais Academy', legenda: 'Checklist de conferência para marcar antes de preparar' },
    ],
    telasCelular: [
      { src: '/img/cursos/plataforma-m-bio.webp', alt: 'Regras de biossegurança na plataforma, no celular' },
    ],
    professor: {
      nome: 'Ketiusse Sanay Ribeiro de Morais',
      cargo: 'Enfermeira',
      formacao: ['Graduação em Enfermagem — FALOG', 'Pós-graduação em Docência — cursando', 'Pós-graduação em UTI — cursando'],
      foto: '/img/cursos/ketiusse.webp',
      fotoAula: '/img/cursos/ketiusse-sala.webp',
    },
    faq: [
      { q: 'Preciso ser da área da saúde?', a: 'Não para fazer o curso: ele aprofunda cálculo, preparo e biossegurança. Mas atenção: é um curso livre. Aplicar injetáveis profissionalmente é atividade de quem tem registro no conselho (COREN ou CRF). O guia de oportunidades da plataforma explica as trilhas para cada perfil.' },
      { q: 'A prática é de verdade?', a: 'Sim. À tarde, a turma treina com bonecos e simuladores, usando os materiais da programação, sempre com supervisão da professora.' },
      { q: 'Como funciona o acesso à plataforma?', a: 'No encerramento você recebe um login individual (e-mail e senha) para a TEC Mais Academy. Os guias ficam no seu celular, e o seu progresso fica salvo.' },
      { q: 'Recebo certificado?', a: 'Pergunte à equipe da TEC Mais pelo WhatsApp os detalhes de certificação da sua turma.' },
      { q: 'Quanto custa e quando é a próxima turma?', a: 'Valores, formas de pagamento e datas são passados pelo WhatsApp, com atendimento humano.' },
    ],
    frase: 'Aqui você aprende, pratica e ainda sai com material, lanche, uma lembrancinha e uma plataforma para continuar estudando.',
    finalTitulo: 'Seu dia de aprendizado está a uma mensagem de distância.',
    finalTexto: 'Chame a equipe da TEC Mais, garanta sua vaga e saia da aula com o acesso à TEC Mais Academy.',
    whatsappMessage: 'Olá! Vi a página do curso de Administração de Medicamentos Injetáveis e quero saber o valor e a data da próxima turma.',
  },
  {
    slug: 'aph',
    nome: 'APH · Atendimento Pré-Hospitalar',
    nomeCurto: 'APH',
    kicker: 'TEC Mais · Experiência prática · Turma fundadora',
    titulo: 'Quando acontece dentro da sua casa, não dá tempo de procurar no Google.',
    acento: 'Saia sabendo o que fazer.',
    lead: 'Um dia de teoria e prática em Atendimento Pré-Hospitalar, com apostila, lanche e mimo especial. E acesso à TEC Mais Academy com 4 bônus: peçonhentos, RCP para bebê, criança, adulto e idoso, emergências domésticas e APH no currículo.',
    fotoHero: { src: '/img/cursos/injetaveis-pratica-3.webp', alt: 'Turma da TEC Mais em aula prática com simuladores' },
    turma: { data: null, ...TURMA_BASE },
    preco: {
      valor: 'R$ 99',
      selo: 'Turma fundadora',
      ancora: 'Só os 4 bônus da plataforma valem R$ 388',
      nota: 'Esta é a primeira turma de APH da TEC Mais. Por isso, ela sai por apenas R$ 99. O valor vale só para a turma fundadora.',
    },
    programacao: DIA,
    conteudo: [
      { titulo: 'Segurança da cena', texto: 'Avaliar o local antes de agir, para não virar a segunda vítima.' },
      { titulo: 'Acionamento do socorro', texto: 'Quando e como ligar para o 192 e o 193, e o que dizer na ligação.' },
      { titulo: 'Suporte básico de vida e RCP', texto: 'Reconhecer a parada e fazer compressões no ritmo certo.' },
      { titulo: 'Engasgo', texto: 'Desobstrução de vias aéreas no bebê, na criança e no adulto.' },
      { titulo: 'Controle de hemorragias', texto: 'Pressão direta, curativo e o que nunca fazer num sangramento.' },
      { titulo: 'Imobilização', texto: 'Cuidados com a vítima de trauma até a chegada do socorro.' },
    ],
    destaqueConteudo: { label: 'Para quem é', valor: 'Mães · pais · cuidadores · profissionais' },
    incluso: [
      { titulo: 'Material didático', texto: 'Apostila com o conteúdo teórico, para acompanhar a aula e consultar depois.', icone: 'book' },
      { titulo: 'Prática com simuladores', texto: 'Treino das técnicas em manequins e simulações, com supervisão.', icone: 'tool' },
      { titulo: 'Lanche durante o intervalo', texto: 'Um lanche especial no intervalo, para recarregar as energias antes da prática.', icone: 'heart' },
      { titulo: 'Mimo especial da turma', texto: 'Uma lembrancinha exclusiva TEC Mais, entregue no encerramento do dia.', icone: 'cap' },
      { titulo: 'Acesso à TEC Mais Academy', texto: 'Login individual na plataforma exclusiva, com os 4 bônus do APH no seu celular.', icone: 'monitor' },
    ],
    pratica: {
      intro: 'Na hora H, o corpo faz o que treinou.',
      nota: 'Prática em manequins e simulações em duplas, com supervisão do instrutor.',
      grupos: [
        { titulo: 'RCP', itens: ['Compressões no ritmo de 100 a 120/min', 'Bebê, criança e adulto'] },
        { titulo: 'Engasgo', itens: ['Tapas nas costas e compressões', 'Manobra de Heimlich'] },
        { titulo: 'Hemorragia', itens: ['Pressão direta', 'Curativo compressivo'] },
        { titulo: 'Trauma', itens: ['Imobilização', 'Posição de segurança'] },
      ],
      fotos: [
        { src: '/img/cursos/injetaveis-pratica-1.webp', alt: 'Turma da TEC Mais em aula prática' },
        { src: '/img/cursos/injetaveis-turma.webp', alt: 'Turma da TEC Mais no laboratório' },
      ],
      fotosNota: 'Fotos de turmas da TEC Mais no laboratório. A turma fundadora de APH será a primeira deste curso.',
    },
    etapas: ['Entender', 'Ver a técnica', 'Treinar em duplas', 'Simular a situação', 'Tirar dúvidas', 'Encerrar'],
    bonusIntro: 'O que você aprende num dia, você revisa a vida inteira. Os bônus ficam na plataforma, no seu celular, para a hora em que você mais precisar.',
    bonus: [
      { titulo: 'Guia de Acidentes com Animais Peçonhentos', texto: 'Escorpião, cobra, aranha, abelha, água-viva e taturana: o que fazer, o que nunca fazer e um card de bolso para salvar no celular.', valor: 'R$ 97', libera: 'Liberado na matrícula' },
      { titulo: 'RCP por Fase da Vida', texto: 'Bebê, criança, adulto e idoso, num quadro só para imprimir. Com um metrônomo para treinar o ritmo certo.', valor: 'R$ 127', libera: 'Liberado na 1ª semana' },
      { titulo: 'Guia de Emergências Domésticas', texto: 'Queimadura, convulsão, desmaio, intoxicação, choque elétrico e sangramento. Mais os telefones de emergência para colar na geladeira.', valor: 'R$ 97', libera: 'Liberado na matrícula' },
      { titulo: 'APH no Currículo', texto: 'Onde o APH é diferencial, textos prontos para o currículo e o LinkedIn e como contar um atendimento na entrevista.', valor: 'R$ 67', libera: 'Liberado no fim do curso' },
    ],
    telas: [
      { src: '/img/cursos/plataforma-aph-fichas.webp', alt: 'Fichas de animais peçonhentos na TEC Mais Academy', legenda: 'Fichas por animal: o que fazer e o que nunca fazer' },
      { src: '/img/cursos/plataforma-aph-rcp.webp', alt: 'Quadro de RCP por fase da vida na TEC Mais Academy', legenda: 'Quadro da RCP: bebê, criança, adulto e idoso' },
    ],
    telasCelular: [
      { src: '/img/cursos/plataforma-m-metronomo.webp', alt: 'Metrônomo da RCP na plataforma, no celular' },
      { src: '/img/cursos/plataforma-m-card.webp', alt: 'Card de bolso de animais peçonhentos, no celular' },
    ],
    faq: [
      { q: 'Preciso ser da área da saúde?', a: 'Não. O APH é para qualquer pessoa: mães, pais, avós, cuidadores, professores, profissionais de academia, condomínio, eventos e quem quer se preparar para uma emergência.' },
      { q: 'Por que custa só R$ 99?', a: 'Porque é a primeira turma de APH da TEC Mais. A turma fundadora entra com preço de lançamento. O valor não vale para as próximas turmas.' },
      { q: 'A prática é de verdade?', a: 'Sim. À tarde, a turma treina as técnicas em manequins e simulações, com supervisão.' },
      { q: 'Como funciona o acesso à plataforma?', a: 'Você recebe um login individual (e-mail e senha) para a TEC Mais Academy. Os bônus são liberados em etapas: dois na matrícula, um na primeira semana e o último no fim do curso.' },
      { q: 'Isso me dá emprego?', a: 'O APH é um diferencial no currículo em áreas como brigada, segurança do trabalho, eventos, escolas, academias e cuidado de idosos. Não prometemos vaga, mas o bônus 4 mostra exatamente como usar o curso a seu favor.' },
    ],
    frase: 'Você não vai sair só com um certificado. Vai sair sabendo o que fazer quando acontecer dentro da sua casa.',
    finalTitulo: 'A primeira turma de APH da TEC Mais é por R$ 99.',
    finalTexto: 'Aula teórica, aula prática, apostila, lanche, mimo e 4 bônus na plataforma. Garanta sua vaga na turma fundadora.',
    whatsappMessage: 'Olá! Vi a página do curso de APH e quero garantir minha vaga na turma fundadora por R$ 99.',
  },
];
