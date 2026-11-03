/**
 * Conteúdo editável: vem do Supabase no momento do build.
 *
 * - Sem as variáveis do Supabase → usa o conteúdo local de `site.ts`.
 * - Tabelas ainda não criadas → usa o conteúdo local e avisa no log.
 * - Supabase fora do ar → o build FALHA de propósito; a Vercel mantém
 *   a versão anterior no ar em vez de publicar um site vazio.
 */
import { createClient } from '@supabase/supabase-js';
import * as local from './site';
import type { Faq, Segment, Testimonial, Unit } from './site';

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

async function load() {
  if (!url || !key) {
    console.warn('[conteúdo] Supabase não configurado — usando src/data/site.ts');
    return { units: local.units, segments: local.segments, testimonials: local.testimonials, faqs: local.faqs, source: 'local' };
  }

  const db = createClient(url, key, { auth: { persistSession: false } });
  const get = async (table: string) => {
    const { data, error } = await db.from(table).select('*').order('ordem');
    if (error) {
      if (MISSING_TABLE.has(error.code)) return null;
      throw new Error(`[conteúdo] Falha ao ler "${table}" do Supabase: ${error.message}`);
    }
    return data as Row[];
  };

  const [u, s, d, p] = await Promise.all(['unidades', 'segmentos', 'depoimentos', 'perguntas'].map(get));

  if (u === null || s === null || d === null || p === null) {
    console.warn('[conteúdo] Tabelas não encontradas — rode supabase/migrations/0001_conteudo.sql. Usando conteúdo local.');
    return { units: local.units, segments: local.segments, testimonials: local.testimonials, faqs: local.faqs, source: 'local' };
  }

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

  console.info(`[conteúdo] Supabase: ${units.length} unidades, ${segments.length} segmentos, ${testimonials.length} depoimentos, ${faqs.length} perguntas`);
  return { units, segments, testimonials, faqs, source: 'supabase' };
}

export const { units, segments, testimonials, faqs, source } = await load();
