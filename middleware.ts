/**
 * Vercel Routing Middleware: protege o Portal do Aluno TEC Mais (/tec-mais/academy).
 * Pede senha (Basic Auth). Qualquer usuário + a senha definida em ACADEMY_PASSWORD
 * (Vercel → Settings → Environment Variables). Sem a variável, o portal fica bloqueado.
 */
export const config = { matcher: ['/tec-mais/academy', '/tec-mais/academy/:path*'] };

const REALM = 'Portal do Aluno TEC Mais';

function sameText(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export default function middleware(request: Request): Response | undefined {
  const secret = process.env.ACADEMY_PASSWORD;
  if (!secret) {
    return new Response('Portal do Aluno indisponível no momento.', {
      status: 503,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' },
    });
  }
  const auth = request.headers.get('authorization') ?? '';
  if (auth.startsWith('Basic ')) {
    try {
      const decoded = atob(auth.slice(6));
      const pass = decoded.slice(decoded.indexOf(':') + 1);
      if (sameText(pass, secret)) return undefined; // senha certa: segue para a página
    } catch {
      /* cabeçalho inválido: pede de novo */
    }
  }
  return new Response('Acesso restrito aos alunos da TEC Mais. Peça a senha à secretaria.', {
    status: 401,
    headers: {
      'www-authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex',
    },
  });
}
