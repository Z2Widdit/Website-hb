/**
 * Block common sensitive / non-public paths from being served.
 */
const BLOCKED = [
  /^\/\.env(?:$|\.)/i,
  /^\/\.git(?:\/|$)/i,
  /^\/package(?:-lock)?\.json$/i,
  /^\/tailwind\.config\.js$/i,
  /^\/node_modules(?:\/|$)/i,
  /^\/vercel\.json$/i,
  /^\/\.npmrc$/i,
  /^\/\.yarnrc(?:\.yml)?$/i,
  /^\/composer\.(json|lock)$/i,
  /^\/\.DS_Store$/i,
];

export const config = {
  matcher: [
    '/.env',
    '/.env.local',
    '/.env.production',
    '/.git/:path*',
    '/package.json',
    '/package-lock.json',
    '/tailwind.config.js',
    '/node_modules/:path*',
    '/vercel.json',
  ],
};

export default function middleware(request) {
  const { pathname } = new URL(request.url);
  if (BLOCKED.some((re) => re.test(pathname))) {
    return new Response('Not Found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  }
}
