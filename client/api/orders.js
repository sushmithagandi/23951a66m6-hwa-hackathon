const orders = [];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
  if (req.method === 'POST') {
    const body = await readBody(req);
    const order = body && body.order ? body.order : {};
    if (!order.items || !order.items.length) {
      return json(res, 400, { message: 'Order items are required.' });
    }
    const created = {
      id: 'ord_' + Math.random().toString(36).slice(2, 10),
      userId: null,
      ...order,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };
    orders.push(created);
    return json(res, 201, { order: created });
  }
  if (req.method === 'GET') {
    return json(res, 200, { orders: orders.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
  }
  return json(res, 405, { message: 'Method not allowed.' });
}
