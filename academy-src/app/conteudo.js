/* ==========================================================
   TEC Mais Academy · mapa do Portal do Aluno
   O conteúdo (textos, ilustrações, ícones, checklist, currículo, mensagens...) mora nas páginas
   originais em academy-src/paginas/. Aqui só se define a área de membros: módulos, aulas e
   qual pedaço da página cada aula mostra ("secoes" = seletores CSS de blocos da página).
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
    pagina: 'calculo',
    titulo: 'Cálculo de Medicamentos',
    resumo: 'Conversões, regra de três, reconstituição, diluição, gotejamento, UI e insulina.',
    cor: 'orange',
    icone: 'calc',
    aulas: [
      { id: 'guia', titulo: 'O guia completo em PDF', tipo: 'pdf', min: 'Leitura · 31 páginas' },
      { id: 'consulta', titulo: 'Consulta rápida: as contas da aula', secoes: ['#consulta'], min: '5 min' },
      { id: 'checklist', titulo: 'Checklist de conferência', secoes: ['#checklist'], min: 'Ferramenta' },
    ],
  },
  {
    id: 'visual',
    pagina: 'visual',
    titulo: 'Guia Visual da Prática',
    resumo: 'Materiais, biossegurança, etapas, erros de atenção e descarte, em pranchas com pouco texto.',
    cor: 'blue',
    icone: 'eye',
    previa: true,
    aulas: [
      { id: 'materiais', titulo: 'Prancha 1 · Conheça os materiais', secoes: ['.draft', '#topo', '#materiais'], min: '3 min' },
      { id: 'biosseguranca', titulo: 'Prancha 2 · Biossegurança em 5 regras', secoes: ['#bio'], min: '2 min' },
      { id: 'etapas', titulo: 'Prancha 3 · Antes, durante e depois', secoes: ['#etapas'], min: '4 min' },
      { id: 'erros', titulo: 'Prancha 4 · Erros de atenção', secoes: ['#erros'], min: '3 min' },
      { id: 'descarte', titulo: 'Prancha 5 · Descarte no lugar certo', secoes: ['#descarte'], min: '2 min' },
      { id: 'duvida', titulo: 'Prancha 6 · Na dúvida, pare', secoes: ['#duvida'], min: '1 min' },
    ],
  },
  {
    id: 'carreira',
    pagina: 'carreira',
    titulo: 'Oportunidades Profissionais',
    resumo: 'Sua trilha, currículo pronto, mensagens, plano de 7 dias e controle de contatos.',
    cor: 'green',
    icone: 'briefcase',
    aulas: [
      { id: 'antes', titulo: 'Do curso à primeira oportunidade', secoes: ['#topo', '.marquee', '#antes'], min: '3 min' },
      { id: 'trilha', titulo: 'Escolha sua trilha', secoes: ['#trilhas'], min: '2 min' },
      { id: 'onde', titulo: 'Onde procurar', secoes: ['#onde'], min: '5 min' },
      { id: 'curriculo', titulo: 'Seu currículo em 10 minutos', secoes: ['#curriculo'], min: 'Ferramenta' },
      { id: 'mensagens', titulo: 'Mensagens prontas', secoes: ['#mensagens'], min: 'Ferramenta' },
      { id: 'plano', titulo: 'Plano de ação de 7 dias', secoes: ['#plano'], min: 'Ferramenta' },
      { id: 'contatos', titulo: 'Controle de contatos', secoes: ['#controle'], min: 'Ferramenta' },
      { id: 'entrevista', titulo: 'Quando chamarem para conversar', secoes: ['#entrevista'], min: '6 min' },
      { id: 'perfil', titulo: 'Seu perfil e cuidado com golpes', secoes: ['#perfil'], min: '4 min' },
      { id: 'proximo', titulo: 'Próximo passo', secoes: ['#proximo'], min: '2 min' },
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

/* links entre as páginas originais → aula do portal */
var TMA_LINKS = {
  'index.html': '', 'guia-visual.html': 'materiais', 'oportunidades.html': 'antes', 'guia-calculos.pdf': 'guia',
  '#consulta': 'consulta', '#checklist': 'checklist', '#materiais': 'materiais', '#bio': 'biosseguranca', '#etapas': 'etapas',
  '#erros': 'erros', '#descarte': 'descarte', '#duvida': 'duvida', '#antes': 'antes', '#trilhas': 'trilha', '#onde': 'onde',
  '#curriculo': 'curriculo', '#mensagens': 'mensagens', '#plano': 'plano', '#controle': 'contatos', '#entrevista': 'entrevista',
  '#perfil': 'perfil', '#proximo': 'proximo',
};

var TMA_DADOS = {
  pdfTopicos: ['Conversões de unidades', 'Regra de três', 'Reconstituição de pó', 'Diluição', 'Gotejamento', 'UI e insulina', 'Exercícios com gabarito comentado'],
};
