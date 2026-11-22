const users = [];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-user-id',
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
  const { name, email, password } = body;
  if (!name || !email || !password) {
    return json(res, 400, { message: 'Name, email, and password are required.' });
  }
  if (String(password).length < 6) {
    return json(res, 400, { message: 'Password must be at least 6 characters.' });
  }
  if (users.find((u) => u.email.toLowerCase() === String(email).toLowerCase())) {
    return json(res, 409, { message: 'An account with this email already exists.' });
  }
  const user = { id: 'usr_' + Math.random().toString(36).slice(2, 10), name: String(name).trim(), email: String(email).trim().toLowerCase(), createdAt: new Date().toISOString() };
  users.push(user);
  return json(res, 201, { user, token: user.id });
}
