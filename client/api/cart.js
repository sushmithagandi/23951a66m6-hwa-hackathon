const carts = {};
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
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
  const token = req.headers['x-user-id'];
  if (!token) return json(res, 401, { message: 'Missing user token.' });
  if (req.method === 'GET') {
    return json(res, 200, { items: carts[token] || [] });
  }
  if (req.method === 'PUT') {
    const body = await readBody(req);
    const items = Array.isArray(body.items) ? body.items : [];
    carts[token] = items;
    return json(res, 200, { items });
  }
  return json(res, 405, { message: 'Method not allowed.' });
}
