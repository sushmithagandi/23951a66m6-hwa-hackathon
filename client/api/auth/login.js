const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const json = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json', ...corsHeaders });
  res.end(JSON.stringify(body));
};

const readBody = (req) =>
  new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); } catch { resolve({}); }
    });
  });

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') { res.writeHead(204, corsHeaders); res.end(); return; }
  if (req.method !== 'POST') return json(res, 405, { message: 'Method not allowed.' });
  const body = await readBody(req);
  const { email, password } = body;
  if (!email || !password) return json(res, 400, { message: 'Email and password are required.' });
  const user = { id: 'usr_' + Math.random().toString(36).slice(2, 10), name: String(email).split('@')[0], email: String(email).toLowerCase() };
  return json(res, 200, { user, token: user.id });
}
