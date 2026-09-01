// ponytail: replaces customHttp.yml rewrites (Amplify-only). Static files are served
// by the assets binding; only unmatched paths reach here.
const BACKEND = 'https://dgzvl0b4x5nn2.cloudfront.net';
const PROXIED = ['/api/', '/users/', '/oauth2/', '/logout'];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const proxied = PROXIED.some(
      (p) => url.pathname === p.replace(/\/$/, '') || url.pathname.startsWith(p)
    );
    if (!proxied) return env.ASSETS.fetch(request);

    const res = await fetch(BACKEND + url.pathname + url.search, request);
    // Backend sets Domain=<its own host>; strip it so the session cookie sticks to ours.
    const out = new Response(res.body, res);
    const cookies = res.headers.getSetCookie?.() ?? [];
    if (cookies.length) {
      out.headers.delete('set-cookie');
      for (const c of cookies) out.headers.append('set-cookie', c.replace(/;\s*Domain=[^;]*/i, ''));
    }
    return out;
  },
};
