/* ==========================================================
   TEC Mais Academy · conteúdo do Portal do Aluno
   Para editar um texto, mude aqui e publique. Tudo é criptografado no build.
   Cada módulo tem aulas; "type" define como a aula é desenhada (veja app.js → R).
   "nota" é recado interno para a professora: não aparece para o aluno.
   ========================================================== */
var TMA_CURSO = {
  nome: 'Administração de Medicamentos Injetáveis',
  kit: 'Kit do aluno · Medicamentos Injetáveis',
  whatsapp: '5561998200367',
  rodape: 'Material educacional de apoio. Não substitui prescrição, bula, protocolo institucional, treinamento prático ou supervisão profissional.',
};

var TMA_MODULOS = [
  {
    id: 'calculo',
    titulo: 'Cálculo de Medicamentos',
    resumo: 'Conversões, regra de três, reconstituição, diluição, gotejamento, UI e insulina.',
    cor: 'orange',
    icone: 'calc',
    aulas: [
      { id: 'guia', titulo: 'O guia completo em PDF', h: ['O guia completo,', 'no seu bolso.'], kk: 'Guia de cálculo', tipo: 'pdf', min: 'Leitura · 31 páginas' },
      { id: 'consulta', titulo: 'Consulta rápida', h: ['As contas da aula,', 'numa olhada.'], kk: 'Consulta rápida', tipo: 'formulas', min: '5 min' },
      { id: 'checklist', titulo: 'Checklist de conferência', h: ['Antes de preparar,', 'marque cada item.'], kk: 'Checklist de conferência', tipo: 'checklist', min: 'Ferramenta' },
    ],
  },
  {
    id: 'visual',
    titulo: 'Guia Visual da Prática',
    resumo: 'Materiais, biossegurança, etapas, erros de atenção e descarte, em pranchas com pouco texto.',
    cor: 'blue',
    icone: 'eye',
    previa: 'O conteúdo técnico deste módulo está em validação pela professora do curso.',
    aulas: [
      { id: 'materiais', titulo: 'Conheça os materiais', h: ['Conheça os', 'materiais.'], kk: 'Prancha 1', num: '01', tipo: 'materiais', min: '3 min', nota: 'Confirmar lista e trocar ícones por fotos dos materiais da aula' },
      { id: 'biosseguranca', titulo: 'Biossegurança em 5 regras', h: ['Biossegurança', 'em 5 regras.'], kk: 'Prancha 2', num: '02', tipo: 'regras', min: '2 min', nota: 'Confirmar as 5 regras que mais repete em sala' },
      { id: 'etapas', titulo: 'Antes, durante e depois', h: ['Antes, durante', 'e depois.'], kk: 'Prancha 3', num: '03', tipo: 'etapas', min: '4 min', nota: 'Ajustar os pontos de cada etapa ao que foi ensinado' },
      { id: 'erros', titulo: 'Erros de atenção', h: ['Erros de atenção', 'que você vai evitar.'], kk: 'Prancha 4', num: '04', tipo: 'erros', min: '3 min', nota: 'Incluir os erros que mais vê nas turmas' },
      { id: 'descarte', titulo: 'Descarte no lugar certo', h: ['Descarte', 'no lugar certo.'], kk: 'Prancha 5', num: '05', tipo: 'descarte', min: '2 min', nota: 'Confirmar a classificação usada em sala' },
      { id: 'duvida', titulo: 'Na dúvida, pare', h: ['Na dúvida,', 'pare.'], kk: 'Prancha 6', num: '06', tipo: 'duvida', min: '1 min' },
    ],
  },
  {
    id: 'carreira',
    titulo: 'Oportunidades Profissionais',
    resumo: 'Sua trilha, currículo pronto, mensagens, plano de 7 dias e controle de contatos.',
    cor: 'green',
    icone: 'briefcase',
    aulas: [
      { id: 'antes', titulo: 'Do curso à primeira oportunidade', h: ['Do curso à', 'primeira oportunidade.'], kk: '01 · Antes de começar', tipo: 'antes', min: '3 min' },
      { id: 'trilha', titulo: 'Escolha sua trilha', h: ['Escolha sua trilha.', 'O portal se ajusta a você.'], kk: '02 · Em qual trilha você está?', tipo: 'trilhas', min: '2 min' },
      { id: 'onde', titulo: 'Onde procurar', h: ['A melhor vaga quase nunca', 'vira anúncio.'], kk: '03 · Onde procurar', tipo: 'onde', min: '5 min' },
      { id: 'curriculo', titulo: 'Seu currículo', h: ['Uma página, honesta,', 'pronta em 10 minutos.'], kk: '04 · Seu currículo', tipo: 'curriculo', min: 'Ferramenta' },
      { id: 'mensagens', titulo: 'Mensagens prontas', h: ['Curta, educada e', 'com um pedido claro.'], kk: '05 · Mensagens prontas', tipo: 'mensagens', min: 'Ferramenta' },
      { id: 'plano', titulo: 'Plano de 7 dias', h: ['7 dias. Uma hora por dia.', 'Marque cada passo.'], kk: '06 · Plano de ação', tipo: 'plano', min: 'Ferramenta' },
      { id: 'contatos', titulo: 'Controle de contatos', h: ['O que não é anotado', 'é esquecido.'], kk: '07 · Controle de contatos', tipo: 'contatos', min: 'Ferramenta' },
      { id: 'entrevista', titulo: 'A entrevista', h: ['A entrevista se ganha', 'antes de começar.'], kk: '08 · Quando chamarem para conversar', tipo: 'entrevista', min: '6 min' },
      { id: 'perfil', titulo: 'Perfil e golpes', h: ['Antes de responder,', 'eles olham seu perfil.'], kk: '09 · Seu perfil · 10 · Cuidado com golpes', tipo: 'perfil', min: '4 min' },
      { id: 'proximo', titulo: 'Próximo passo', h: ['O curso abriu uma porta.', 'A formação faz você atravessar.'], kk: '11 · Próximo passo', tipo: 'proximo', min: '2 min' },
    ],
  },
];

/* atalhos da tela inicial */
var TMA_FERRAMENTAS = [
  { aula: 'checklist', titulo: 'Checklist de conferência', texto: 'Marque item por item antes de preparar.', icone: 'clipboard' },
  { aula: 'consulta', titulo: 'Consulta rápida', texto: 'As fórmulas da aula, numa olhada.', icone: 'calc' },
  { aula: 'curriculo', titulo: 'Montar currículo', texto: 'Preencha e copie, pronto em 10 minutos.', icone: 'file' },
  { aula: 'mensagens', titulo: 'Mensagens prontas', texto: 'WhatsApp, e-mail, visita e follow-up.', icone: 'chat' },
  { aula: 'plano', titulo: 'Plano de 7 dias', texto: 'Uma hora por dia, passo a passo.', icone: 'calendar' },
  { aula: 'contatos', titulo: 'Controle de contatos', texto: 'Quem você procurou e o próximo passo.', icone: 'list' },
];

var TMA_DADOS = {
  marquee: ['Clínicas', 'Vacinação', 'Farmácias', 'Laboratórios', 'Home care', 'Consultórios', 'Hospitais e UPAs', 'Estética'],
  pdfTopicos: ['Conversões de unidades', 'Regra de três', 'Reconstituição de pó', 'Diluição', 'Gotejamento', 'UI e insulina', 'Exercícios com gabarito comentado'],

  formulas: [
    { t: 'Conversões', f: ['1 g = 1.000 mg', '1 mg = 1.000 mcg', '1 L = 1.000 mL'], n: 'Para unidade menor, multiplique. Para maior, divida.' },
    { t: 'Volume a aspirar', f: ['(dose × mL do frasco) ÷ mg do frasco'], n: 'Ou: dose ÷ concentração (mg/mL).' },
    { t: 'Concentração', f: ['mg ÷ mL = mg/mL'], n: '250 mg/5 mL = 50 mg/mL.' },
    { t: 'Diluição', f: ['C1 × V1 = C2 × V2'], n: 'Diluente = V2 − V1.' },
    { t: 'Porcentagem', f: ['% × 10 = mg/mL'], n: 'Vale para solução em g/100 mL.' },
    { t: 'Gotejamento', f: ['gotas/min = (mL × fator) ÷ min', 'microgotas/min = mL ÷ h'], n: 'Confira o fator na embalagem do equipo.' },
  ],

  checklist: [
    'Li a prescrição completa: medicamento, dose, via, horário e tempo.',
    'Li o rótulo do frasco que está na minha mão: concentração, apresentação e validade.',
    'Prescrição e frasco estão na mesma unidade (ou converti antes).',
    'Se for UI, trabalhei só com UI. Não converti para mg.',
    'Se for pó: conferi o diluente, a quantidade a adicionar e o volume final no rótulo ou bula.',
    'Se for diluição: confirmei se o volume da prescrição é volume final ou de diluente.',
    'Se for gotejamento: conferi o fator de gotas do equipo e converti o tempo para minutos.',
    'Se usei IA: refiz a conta com o método dos 5 passos e o resultado bate.',
    'O resultado faz sentido comparado ao tamanho do frasco e à proporção pedida.',
    'O volume cabe na escala da seringa e está de acordo com o protocolo.',
    'Algo ausente, ambíguo ou estranho? Parei e confirmei com o responsável.',
  ],

  materiais: [
    { t: 'Seringa', il: 'seringa', d: 'Graduada em mL. O volume escolhido deve combinar com a dose calculada.', i: 'syringe' },
    { t: 'Agulha', il: 'agulha', d: 'Vem com protetor. Calibre e comprimento seguem o protocolo e a via prescrita.', i: 'needle' },
    { t: 'Ampola', il: 'ampola', d: 'Frasco de vidro de dose única. Abertura com proteção para evitar cortes.', i: 'ampoule' },
    { t: 'Frasco-ampola', il: 'frasco', d: 'Tampa de borracha. Pode conter pó que precisa de reconstituição.', i: 'vial' },
    { t: 'Álcool 70%', il: 'alcool', d: 'Para antissepsia, conforme o protocolo da instituição.', i: 'droplet' },
    { t: 'Algodão ou gaze', il: 'algodao', d: 'Para a antissepsia e a compressão após o procedimento.', i: 'gauze' },
    { t: 'Luvas de procedimento', il: 'luva', d: 'Barreira de proteção. Trocar a cada atendimento.', i: 'hand' },
    { t: 'Caixa de perfurocortante', il: 'caixa', d: 'Coletor rígido para agulhas, seringas com agulha e ampolas.', i: 'box' },
  ],

  regras: [
    { t: 'Higienize as mãos', il: 'maos', d: 'Antes e depois de cada contato com o paciente.', i: 'wash' },
    { t: 'Use EPI', il: 'epi', d: 'Luvas de procedimento, trocadas a cada atendimento.', i: 'shield' },
    { t: 'Nunca reencape agulhas', il: 'reencape', d: 'É a causa mais comum de acidente com perfurocortante.', i: 'ban' },
    { t: 'Descarte na hora', il: 'descartar', d: 'Direto na caixa de perfurocortante, ao alcance da mão.', i: 'box' },
    { t: 'Acidente? Comunique', il: 'acidente', d: 'Lave o local e avise o responsável imediatamente.', i: 'megaphone' },
  ],

  etapas: [
    { t: 'Antes', k: 'Conferir', l: ['Prescrição completa e legível', 'Medicamento, dose e via batem com a prescrição', 'Rótulo, concentração e validade conferidos', 'Cálculo refeito e com sentido', 'Paciente identificado e orientado'] },
    { t: 'Durante', k: 'Atenção', l: ['Técnica asséptica do início ao fim', 'Material ao alcance, caixa de descarte próxima', 'Observar as reações do paciente', 'Algo estranho? Parar antes de continuar'] },
    { t: 'Depois', k: 'Registrar', l: ['Descarte imediato e correto', 'Higienizar as mãos', 'Registrar o que foi feito', 'Observar e orientar o paciente', 'Comunicar qualquer intercorrência'] },
  ],
  noveCertos: ['Paciente certo', 'Medicamento certo', 'Dose certa', 'Via certa', 'Hora certa', 'Registro certo', 'Orientação certa', 'Forma certa', 'Resposta certa'],

  erros: [
    ['Confiar na memória sobre a concentração do frasco', 'Ler o rótulo do frasco que está na sua mão, toda vez'],
    ['Calcular com unidades diferentes (g com mg, mcg com mg)', 'Converter tudo para a mesma unidade antes da conta'],
    ['Usar o volume de diluente como volume final no pó', 'Conferir o volume final no rótulo ou na bula'],
    ['Reencapar a agulha depois de usar', 'Descartar seringa e agulha juntas, direto na caixa'],
    ['Seguir em frente quando algo parece estranho', 'Parar e confirmar com o responsável'],
  ],

  descarte: [
    { t: 'Caixa de perfurocortante', c: 'orange', il: 'caixa2', l: ['Agulhas e seringas com agulha, sem desconectar', 'Ampolas de vidro', 'Nunca encha além da linha indicada na caixa'] },
    { t: 'Lixo infectante', c: 'pink', il: 'infectante', l: ['Algodão, gaze e luvas com material biológico', 'Saco identificado, conforme o protocolo'] },
    { t: 'Lixo comum', c: 'teal', il: 'comum', l: ['Embalagens e papéis sem contato com material biológico', 'Na dúvida, siga a orientação do serviço'] },
  ],

  duvida: [
    { t: 'Pare', d: 'Não continue o preparo nem a administração.' },
    { t: 'Confira', d: 'Prescrição, rótulo, bula e protocolo da instituição.' },
    { t: 'Pergunte', d: 'Enfermeiro responsável, prescritor ou farmacêutico.' },
  ],

  antes: [
    { t: 'É um curso livre', il: 'casa', d: 'Ele aprofunda seu conhecimento em cálculo, preparo e biossegurança, mas não habilita, sozinho, ninguém a aplicar medicamentos injetáveis.' },
    { t: 'Quem pode aplicar', il: 'escudo', d: 'Equipe de enfermagem (enfermeiro, técnico e auxiliar) com COREN ativo, e farmacêuticos com CRF, dentro das regras do seu conselho.' },
    { t: 'Por isso, existem trilhas', il: 'relogio', d: 'O tipo de oportunidade que você vai buscar depende de quem você já é profissionalmente. A próxima aula mostra as três trilhas.' },
  ],

  trilhas: [
    { id: 'A', t: 'Já habilitado', p: 'Técnico, auxiliar ou enfermeiro com COREN ativo; farmacêutico com CRF.', b: 'Vagas em clínicas, consultórios, home care, farmácias, laboratórios e vacinação.', c: 'Reforça o currículo com atualização em técnica, cálculo e biossegurança.' },
    { id: 'B', t: 'Em formação', p: 'Estudante de Técnico em Enfermagem, Enfermagem ou Farmácia.', b: 'Estágios, vagas de apoio (recepção, auxiliar administrativo) e contatos para quando se formar.', c: 'Mostra iniciativa e adianta conteúdo da sua formação.' },
    { id: 'C', t: 'Sem formação na área', p: 'Fez o curso por interesse, cuidado familiar ou para conhecer a área.', b: 'Funções de apoio em saúde e o próximo passo de formação.', c: 'É o primeiro contato com a área, não uma autorização para aplicar.' },
  ],

  lugares: [
    { t: 'Clínicas e policlínicas', a: 'Técnico de enfermagem, sala de medicação', bc: 'Recepção, apoio administrativo' },
    { t: 'Clínicas de vacinação', a: 'Aplicador habilitado', bc: 'Atendimento, agendamento' },
    { t: 'Farmácias e drogarias', a: 'Farmacêutico; técnico conforme regras locais', bc: 'Balconista, atendimento' },
    { t: 'Laboratórios de análises', a: 'Coleta, com a formação exigida', bc: 'Recepção, cadastro' },
    { t: 'Home care', a: 'Técnico ou auxiliar de enfermagem', bc: 'Cuidador, sem procedimentos invasivos' },
    { t: 'Estética e dermatologia', a: 'Equipe de enfermagem sob responsável técnico', bc: 'Recepção, atendimento comercial' },
    { t: 'Hospitais e UPAs', a: 'Processos seletivos e concursos', bc: 'Vagas administrativas e estágio' },
  ],
  canais: [
    { t: 'Google Maps', tag: 'Maps', d: 'Pesquise "clínica", "vacinação", "laboratório", "home care" + seu bairro. Anote nome, telefone e horário no controle.', i: 'pin' },
    { t: 'Instagram', tag: 'Insta', d: 'Mesmas palavras + cidade. Veja se a clínica está ativa e se publica vagas nos stories.', i: 'phone' },
    { t: 'Sites de vagas', tag: 'Vagas', d: 'Indeed, Catho, InfoJobs e LinkedIn Vagas, filtrando pela sua cidade.', i: 'search' },
    { t: 'LinkedIn', tag: 'In', d: 'Perfil completo com o curso; siga clínicas e hospitais da região.', i: 'user' },
    { t: 'Grupos locais', tag: 'Grupos', d: 'Vagas da cidade no WhatsApp e Facebook. Desconfie de vaga sem nome de empresa.', i: 'chat' },
    { t: 'Conhecidos da área', tag: 'Rede', d: 'Avise quem trabalha em saúde. Indicação ainda é o canal mais forte.', i: 'users' },
    { t: 'Seleções públicas', tag: 'Edital', d: 'Na Trilha A, acompanhe editais da secretaria de saúde do estado e do município.', i: 'file' },
  ],

  cvExemplo: {
    nome: 'Ana Paula Souza', cidade: 'Valparaíso de Goiás – GO', whats: '(61) 9 0000-0000', email: 'anapaula.souza@email.com',
    obj: 'técnica de enfermagem em clínica ou serviço de vacinação', reg: 'COREN-GO nº 000.000 – Técnica de Enfermagem',
    form: 'Técnico em Enfermagem – Escola Exemplo – concluído em 2025\nEnsino médio – Colégio Estadual Exemplo – 2021', mes: 'out/2026',
    exp: 'Estágio supervisionado – UBS Exemplo – fev a jun/2025\n· Apoio à sala de vacinação e ao acolhimento de pacientes\nAtendente – Farmácia Exemplo – 2022 a 2024\n· Atendimento a cerca de 80 clientes por dia',
    comp: 'Atendimento ao público · Organização · Atenção a detalhes · Trabalho em equipe', disp: 'Manhã e tarde, de segunda a sábado · Início imediato',
  },
  cvCampos: [
    { k: 'nome', l: 'Nome completo', ph: 'Ana Paula Souza' },
    { k: 'cidade', l: 'Cidade – UF', ph: 'Valparaíso de Goiás – GO' },
    { k: 'whats', l: 'WhatsApp', ph: '(61) 9 0000-0000', type: 'tel' },
    { k: 'email', l: 'E-mail', ph: 'seunome@email.com', type: 'email' },
    { k: 'obj', l: 'Função que você busca', ph: 'técnica de enfermagem em clínica ou vacinação', h: 'O objetivo é montado a partir disso e da sua trilha.', full: true },
    { k: 'reg', l: 'Registro profissional', ph: 'COREN-GO nº 000.000 – Técnica de Enfermagem', h: 'Deixe em branco se não tiver. Nunca coloque o curso aqui.', full: true },
    { k: 'form', l: 'Formação', ph: 'Técnico em Enfermagem – Escola – 2025\nEnsino médio – Colégio – 2021', area: true, full: true },
    { k: 'mes', l: 'Mês/ano do curso na TEC Mais', ph: 'out/2026' },
    { k: 'exp', l: 'Experiência', ph: 'Atendente – Farmácia Exemplo – 2022 a 2024\n· Atendimento a cerca de 80 clientes por dia', h: 'Uma linha por cargo, e embaixo uma ação concreta começando com verbo.', area: true, full: true },
    { k: 'comp', l: 'Competências', ph: 'Atendimento ao público · Organização · Trabalho em equipe', full: true },
    { k: 'disp', l: 'Disponibilidade', ph: 'Manhã e tarde, de segunda a sábado · Início imediato', full: true },
  ],
  cvDicas: [
    'Nunca escreva "aplicador de injetáveis" sem registro profissional. O curso entra em Cursos complementares, nunca em Registro.',
    'Use um e-mail com o seu nome e salve o arquivo como Curriculo-SeuNome.pdf.',
    'Leve duas cópias impressas sempre que visitar um estabelecimento.',
  ],

  mensagens: [
    { k: 'Primeiro contato', c: 'WhatsApp', t: 'A', b: 'Bom dia! Meu nome é {nome}, sou {funcao} com registro ativo aqui em {cidade}. Concluí recentemente uma capacitação em administração de medicamentos injetáveis e gostaria de saber se a clínica está recebendo currículos. Posso enviar o meu por aqui ou levar pessoalmente, como preferirem. Obrigado(a)!' },
    { k: 'Primeiro contato', c: 'WhatsApp', t: 'BC', b: 'Bom dia! Meu nome é {nome}, moro em {cidade} e estou buscando oportunidade na área da saúde, em funções de [recepção / apoio / atendimento]. Tenho experiência com [atendimento ao público / organização] e fiz recentemente um curso de capacitação na área. A clínica está recebendo currículos? Posso enviar por aqui. Obrigado(a)!' },
    { k: 'E-mail', c: 'Com currículo em anexo', t: 'all', b: 'Assunto: Currículo – [Cargo pretendido] – {nome}\n\nOlá, equipe da [Nome da clínica].\n\nMeu nome é {nome} e tenho interesse em atuar como [cargo] em sua equipe. [Uma frase sobre sua formação ou experiência mais relevante.] Recentemente concluí o curso de Administração de Medicamentos Injetáveis na TEC Mais Academy, que reforçou minha base em cálculo, biossegurança e cuidado com o paciente.\n\nEnvio meu currículo em anexo e fico à disposição para uma conversa.\n\nAtenciosamente,\n{nome} · {whats}' },
    { k: 'Visita presencial', c: 'Na recepção', t: 'all', b: 'Boa tarde! Meu nome é {nome}. Estou deixando meu currículo para a área de [cargo]. Com quem eu poderia falar sobre oportunidades, ou qual o melhor contato para acompanhar?', n: 'Anote o nome de quem atendeu.' },
    { k: 'Follow-up', c: '3 a 5 dias sem resposta', t: 'all', b: 'Olá, tudo bem? Aqui é {nome}, enviei meu currículo para [cargo] no dia [data]. Gostaria só de confirmar se chegou e se há previsão de seleção. Continuo à disposição. Obrigado(a)!' },
    { k: 'Resposta ao "não"', c: 'Feche bem', t: 'all', b: 'Entendo, obrigado(a) pelo retorno! Posso deixar meu currículo com vocês para uma próxima oportunidade? Se surgir algo, fico à disposição.', n: 'Muitas contratações saem dessa segunda conversa.' },
    { k: 'Pedido de indicação', c: 'Para conhecidos da área', t: 'all', b: 'Oi, [nome]! Tudo bem? Estou buscando oportunidade em [função] e lembrei de você, que trabalha na área. Se souber de alguma clínica contratando ou puder indicar meu currículo, eu agradeço muito. Posso te mandar por aqui?' },
    { k: 'Depois da entrevista', c: 'No mesmo dia', t: 'all', b: 'Olá, [nome]! Obrigado(a) pela conversa de hoje. Gostei de conhecer a rotina da [clínica] e sigo à disposição para os próximos passos.' },
  ],

  plano: [
    ['Base pronta', ['Confirmar minha trilha (A, B ou C)', 'Preencher o currículo e salvar em PDF', 'Deixar foto e recado do WhatsApp profissionais']],
    ['Mapear', ['Listar 20 estabelecimentos no controle de contatos', 'Cadastrar o currículo em pelo menos 2 sites de vagas']],
    ['Primeiros contatos', ['Enviar a mensagem de primeiro contato para 10 estabelecimentos', 'Avisar 5 conhecidos que trabalham em saúde']],
    ['Ir até lá', ['Visitar 3 a 5 estabelecimentos próximos com currículo impresso', 'Anotar nome e contato de quem atendeu']],
    ['Ampliar', ['Enviar mensagem para os outros 10 estabelecimentos', 'Completar o LinkedIn e seguir 10 clínicas ou hospitais da região']],
    ['Acompanhar', ['Enviar follow-up para quem não respondeu', 'Responder com educação todos os retornos, inclusive os "não"']],
    ['Revisar e decidir', ['Contar contatos, respostas e conversas', 'Repetir mais do que funcionou (mensagem, visita ou indicação)', 'Montar a lista dos próximos 20 estabelecimentos']],
  ],

  status: ['A contatar', 'Mensagem enviada', 'Visitado', 'Respondeu', 'Entrevista', 'Sem vaga agora'],

  levar: ['Duas cópias do currículo impressas', 'Documento com foto e carteira do conselho (se tiver)', 'Certificados, incluindo o da TEC Mais', 'Caneta e papel com as suas perguntas'],
  apresentar: ['Chegue 10 minutos antes. Atraso na primeira conversa raramente é perdoado.', 'Roupa limpa e discreta; cabelo preso e unhas curtas, como em ambiente de saúde.', 'Celular no silencioso e guardado.'],
  perguntas: [
    ['Fale um pouco sobre você.', 'Em 1 minuto: formação, experiência mais relevante e por que quer trabalhar ali.'],
    ['Por que você quer trabalhar aqui?', 'Cite algo real que você viu da clínica: o atendimento, a localização, a especialidade.'],
    ['Qual a sua experiência?', 'Seja exato. Se for pouca, mostre o que já fez com responsabilidade em outros trabalhos.'],
    ['O que faria se tivesse dúvida em um procedimento?', 'Pararia e confirmaria com o responsável antes de continuar. É a resposta que todo gestor de saúde quer ouvir.'],
    ['Qual o seu ponto fraco?', 'Um ponto verdadeiro e o que você está fazendo para melhorar.'],
    ['Qual a sua disponibilidade?', 'Dias e turnos com clareza. Não prometa o que não consegue cumprir.'],
  ],
  vocePergunta: ['Como é a rotina de quem ocupa essa função?', 'Quem seria meu responsável direto?', 'Existe treinamento inicial ou período de experiência?', 'Qual o próximo passo do processo?'],

  perfil: [
    { t: 'Foto do WhatsApp', d: 'Rosto visível, fundo neutro, sem óculos escuros ou filtros.', i: 'user' },
    { t: 'Recado do WhatsApp', d: '"Técnica de Enfermagem · COREN-GO" ou "Em busca de oportunidade na área da saúde".', i: 'chat' },
    { t: 'LinkedIn', tag: 'In', d: 'Formação real no título e o curso da TEC Mais em Licenças e certificados.', i: 'briefcase' },
    { t: 'Instagram aberto', d: 'Revise o que aparece. Recrutadores também olham.', i: 'eye' },
  ],

  golpes: [
    'Pede pagamento para "garantir a vaga", cadastro, kit ou treinamento obrigatório.',
    'Oferece trabalho aplicando injetáveis sem exigir registro profissional.',
    'Promete salário muito acima do mercado para pouca exigência.',
    'Não informa nome da empresa, endereço ou CNPJ.',
    'Pede documentos completos ou dados bancários antes da entrevista.',
  ],

  conselhos: [
    { t: 'Cofen', u: 'https://www.cofen.gov.br' },
    { t: 'Coren-GO', u: 'https://www.corengo.org.br' },
    { t: 'Coren-DF', u: 'https://www.coren-df.gov.br' },
    { t: 'CFF', u: 'https://site.cff.org.br' },
  ],
};

/* Ilustrações originais do kit (traço). Chave → conteúdo do <svg>; "v" = viewBox 64 ou 24. */
var TMA_ILUS = {
  seringa: [64, '<path d="M14 50 44 20"/><path d="m38 14 12 12"/><path d="m41 17 6 6"/><path d="M20 36l8 8"/><path d="M26 30l8 8"/><path d="m14 50-4 4"/><path d="M50 8l6 6"/>'],
  agulha: [64, '<path d="M32 6v34"/><rect x="25" y="40" width="14" height="10" rx="2"/><path d="M28 50v6h8v-6"/>'],
  ampola: [64, '<path d="M26 6h12v8l4 6v34a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V20l4-6z"/><path d="M26 14h12"/><path d="M22 32h20"/>'],
  frasco: [64, '<rect x="22" y="6" width="20" height="8" rx="2"/><path d="M24 14h16v4l4 4v32a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V22l4-4z"/><path d="M20 36h24"/>'],
  alcool: [64, '<path d="M24 8h16v8H24z"/><path d="M22 16h20l2 8v28a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V24z"/><path d="M26 34h12M32 28v12"/>'],
  algodao: [64, '<circle cx="24" cy="32" r="10"/><circle cx="36" cy="28" r="10"/><circle cx="40" cy="40" r="9"/>'],
  luva: [64, '<path d="M22 56V28l-6-8a3 3 0 0 1 5-3l5 6V12a3 3 0 0 1 6 0v12-16a3 3 0 0 1 6 0v16-12a3 3 0 0 1 6 0v28c0 8-5 16-14 16"/>'],
  caixa: [64, '<path d="M12 22h40v30a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4z"/><path d="M8 22h48l-6-10H14z"/><path d="M12 34h40" stroke-dasharray="4 4"/><path d="m26 44 4 4 8-8"/>'],
  caixa2: [64, '<path d="M12 22h40v30a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4z"/><path d="M8 22h48l-6-10H14z"/><path d="M12 34h40" stroke-dasharray="4 4"/>'],
  infectante: [64, '<path d="M16 18h32l-3 38H19z"/><path d="M12 18h40"/><path d="M26 12h12v6H26z"/><circle cx="32" cy="36" r="6"/>'],
  comum: [64, '<path d="M16 18h32l-3 38H19z"/><path d="M12 18h40"/><path d="M26 12h12v6H26z"/><path d="M26 36h12"/>'],
  maos: [24, '<path d="M7 11V6a2 2 0 0 1 4 0v4-6a2 2 0 0 1 4 0v6-4a2 2 0 0 1 4 0v8c0 4-3 8-8 8-3 0-5-2-6-4l-2-4a2 2 0 0 1 3-2z"/>'],
  epi: [24, '<path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z"/>'],
  reencape: [24, '<path d="M5 19 19 5"/><path d="m3 3 18 18"/>'],
  descartar: [24, '<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M4 12h16"/>'],
  acidente: [24, '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16v.5"/>'],
  casa: [24, '<path d="M4 19V8l8-4 8 4v11"/><path d="M9 19v-6h6v6"/>'],
  escudo: [24, '<path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z"/><path d="m9 12 2 2 4-4"/>'],
  relogio: [24, '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>'],
  maleta: [24, '<rect x="4" y="7" width="16" height="13" rx="2"/><path d="M9 7V5h6v2"/>'],
  pessoa: [24, '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>'],
  capelo: [24, '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>'],
};
