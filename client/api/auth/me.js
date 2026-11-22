const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'x-user-id',
};

const json = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json', ...corsHeaders });
  res.end(JSON.stringify(body));
};

export default function handler(req, res) {
  if (req.method === 'OPTIONS') { res.writeHead(204, corsHeaders); res.end(); return; }
  const token = req.headers['x-user-id'];
  if (!token) return json(res, 401, { message: 'Missing user token.' });
  return json(res, 200, { user: { id: token, name: 'Customer', email: 'customer@example.com' } });
}
