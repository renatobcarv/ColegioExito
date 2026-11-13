/**
 * Conteúdo editável: vem do Supabase no momento do build.
 *
 * - Sem as variáveis do Supabase → usa o conteúdo local de `site.ts`.
 * - Tabelas ainda não criadas → usa o conteúdo local e avisa no log.
 * - Supabase fora do ar (ou projeto pausado) → tenta 3 vezes e, se não der,
 *   publica com o conteúdo local e avisa no log (o site nunca sai vazio).
 */
import { createClient } from '@supabase/supabase-js';
import * as local from './site';
import type { Faq, GalleryItem, Segment, Testimonial, Unit } from './site';

const env = (k: string): string | undefined =>
  (import.meta.env as Record<string, string | undefined>)[k] ?? process.env[k];

const url = env('SUPABASE_URL') ?? env('NEXT_PUBLIC_SUPABASE_URL') ?? env('PUBLIC_SUPABASE_URL');
const key =
  env('SUPABASE_PUBLISHABLE_KEY') ??
  env('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') ??
  env('NEXT_PUBLIC_SUPABASE_ANON_KEY') ??
  env('SUPABASE_ANON_KEY');

/** Caminho no bucket "fotos" → URL pública. URLs completas e caminhos "/img/..." passam direto. */
const photo = (v: string | null | undefined): string | null => {
  if (!v) return null;
  if (/^https?:\/\//.test(v) || v.startsWith('/')) return v;
  return `${url}/storage/v1/object/public/fotos/${v.replace(/^fotos\//, '')}`;
};

const digits = (v: string | null | undefined) => (v ? v.replace(/\D/g, '') : '');

type Row = Record<string, any>;

const MISSING_TABLE = new Set(['PGRST205', '42P01']);

const LOCAL = () => ({ units: local.units, segments: local.segments, testimonials: local.testimonials, faqs: local.faqs, gallery: local.gallery, source: 'local' });

async function load() {
  for (let i = 1; i <= 3; i++) {
    try {
      return await loadSupabase();
    } catch (e) {
      console.warn(`[conteúdo] Tentativa ${i}/3 falhou: ${(e as Error).message}`);
      if (i < 3) await new Promise((r) => setTimeout(r, 1500 * i));
    }
  }
  console.warn('[conteúdo] ⚠ Supabase inacessível (projeto pausado? URL errada?) — publicando com o conteúdo de src/data/site.ts');
  return LOCAL();
}

async function loadSupabase() {
  if (!url || !key) {
    console.warn('[conteúdo] Supabase não configurado — usando src/data/site.ts');
    return { units: local.units, segments: local.segments, testimonials: local.testimonials, faqs: local.faqs, gallery: local.gallery, source: 'local' };
  }

  const db = createClient(url, key, { auth: { persistSession: false } });
  const get = async (table: string) => {
    const { data, error } = await db.from(table).select('*').order('ordem').abortSignal(AbortSignal.timeout(15000));
    if (error) {
      if (MISSING_TABLE.has(error.code)) return null;
      throw new Error(`[conteúdo] Falha ao ler "${table}" do Supabase: ${error.message}`);
    }
    return data as Row[];
  };

  const [u, s, d, p] = await Promise.all(['unidades', 'segmentos', 'depoimentos', 'perguntas'].map(get));

  if (u === null || s === null || d === null || p === null) {
    console.warn('[conteúdo] Tabelas não encontradas — rode supabase/migrations/0001_conteudo.sql. Usando conteúdo local.');
    return { units: local.units, segments: local.segments, testimonials: local.testimonials, faqs: local.faqs, gallery: local.gallery, source: 'local' };
  }

  // A galeria é opcional: sem a tabela (0002 ainda não rodado), o carrossel só não aparece.
  const g = (await get('galeria')) ?? [];

  const units: Unit[] = u.map((r) => ({
    id: r.id,
    tag: r.rotulo,
    city: r.cidade,
    address: [r.endereco_linha1, r.endereco_linha2].filter(Boolean),
    hours: r.horario || null,
    phones: [r.telefone1, r.telefone2].map(digits).filter(Boolean).map((number) => ({ label: 'Secretaria', number })),
    whatsapp: digits(r.whatsapp) || null,
    mapsUrl: r.mapa_url,
    photo: photo(r.foto),
    geo: { postalCode: r.cep || undefined, locality: r.cidade, region: r.uf || 'GO' },
  }));

  const segments: Segment[] = s.map((r) => ({
    name: r.nome,
    age: r.faixa_etaria || null,
    text: r.texto,
    photo: photo(r.foto),
    accent: r.cor === 'vermelho' ? 'red' : 'gold',
    highlight: Boolean(r.destaque),
  }));

  const testimonials: Testimonial[] = d.map((r) => ({
    quote: r.texto,
    name: r.nome,
    role: r.papel,
    initial: String(r.nome).trim().charAt(0).toUpperCase(),
  }));

  const faqs: Faq[] = p.map((r) => ({ q: r.pergunta, a: r.resposta }));

  const gallery: GalleryItem[] = g
    .map((r) => ({ title: r.titulo, caption: r.legenda || null, date: r.data || null, photo: photo(r.foto) ?? '' }))
    .filter((it) => it.photo)
    // fotos colocadas direto no site (public/img/galeria) entram depois das do Supabase
    .concat(local.gallery);

  console.info(`[conteúdo] Supabase: ${units.length} unidades, ${segments.length} segmentos, ${testimonials.length} depoimentos, ${faqs.length} perguntas, ${gallery.length} fotos na galeria`);
  return { units, segments, testimonials, faqs, gallery, source: 'supabase' };
}

const raw = await load();

// Foto do Supabase tem prioridade; sem ela, usa as fotos do site (src/data/site.ts → photos).
// O mesmo vale para o WhatsApp: sem número no Supabase, usa o de site.ts.
export const units: Unit[] = raw.units.map((u) => {
  const p = local.photos.units[u.id];
  const whatsapp = u.whatsapp ?? local.units.find((l) => l.id === u.id)?.whatsapp ?? null;
  const withPhoto = u.photo || !p ? u : { ...u, photo: p.src, photoIllustrative: p.illustrative };
  return { ...withPhoto, whatsapp };
});
// Berçário não é mais oferecido; Educação Infantil é de 3 a 5 anos; TEC Mais entra na jornada.
const segBase = raw.segments
  .filter((s) => s.name !== 'Berçário')
  .map((s) => (s.name === 'Educação Infantil' && !s.age ? { ...s, age: '3 a 5 anos' } : s));
for (const ls of local.segments) if (!segBase.some((s) => s.name === ls.name) && ls.name === 'TEC Mais') segBase.push(ls);
export const segments: Segment[] = segBase.map((s) => {
  const p = local.photos.segments[s.name];
  return s.photo || !p ? s : { ...s, photo: p.src, photoIllustrative: p.illustrative };
});
export const { testimonials, faqs, gallery, source } = raw;
