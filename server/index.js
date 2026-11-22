import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'db.json');
const PORT = process.env.PORT || 5000;

const defaultDb = {
  users: [],
  carts: {},
  wishlists: {},
  orders: []
};

async function ensureDb() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dbPath);
  } catch {
    await fs.writeFile(dbPath, JSON.stringify(defaultDb, null, 2));
  }
}

async function readDb() {
  await ensureDb();
  const raw = await fs.readFile(dbPath, 'utf-8');
  try {
    const parsed = JSON.parse(raw);
    return { ...defaultDb, ...parsed };
  } catch {
    await fs.writeFile(dbPath, JSON.stringify(defaultDb, null, 2));
    return structuredClone(defaultDb);
  }
}

async function writeDb(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

function sanitizeUser(user) {
  const { password, ...safe } = user;
  return safe;
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, name: 'PawQuest API' });
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }
  if (String(password).length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  }
  const db = await readDb();
  const existing = db.users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
  if (existing) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }
  const user = {
    id: nanoid(),
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    password: String(password),
    createdAt: new Date().toISOString()
  };
  db.users.push(user);
  db.carts[user.id] = db.carts[user.id] || [];
  db.wishlists[user.id] = db.wishlists[user.id] || [];
  await writeDb(db);
  res.status(201).json({ user: sanitizeUser(user), token: user.id });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  const db = await readDb();
  const user = db.users.find(
    (u) => u.email.toLowerCase() === String(email || '').toLowerCase() && u.password === String(password || '')
  );
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }
  db.carts[user.id] = db.carts[user.id] || [];
  db.wishlists[user.id] = db.wishlists[user.id] || [];
  await writeDb(db);
  res.json({ user: sanitizeUser(user), token: user.id });
});

app.get('/api/me', async (req, res) => {
  const token = req.header('x-user-id');
  if (!token) return res.status(401).json({ message: 'Missing user token.' });
  const db = await readDb();
  const user = db.users.find((u) => u.id === token);
  if (!user) return res.status(401).json({ message: 'User not found.' });
  res.json({ user: sanitizeUser(user) });
});

app.get('/api/cart', async (req, res) => {
  const token = req.header('x-user-id');
  if (!token) return res.status(401).json({ message: 'Missing user token.' });
  const db = await readDb();
  res.json({ items: db.carts[token] || [] });
});

app.put('/api/cart', async (req, res) => {
  const token = req.header('x-user-id');
  if (!token) return res.status(401).json({ message: 'Missing user token.' });
  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  const db = await readDb();
  db.carts[token] = items;
  await writeDb(db);
  res.json({ items: db.carts[token] });
});

app.get('/api/wishlist', async (req, res) => {
  const token = req.header('x-user-id');
  if (!token) return res.status(401).json({ message: 'Missing user token.' });
  const db = await readDb();
  res.json({ items: db.wishlists[token] || [] });
});

app.put('/api/wishlist', async (req, res) => {
  const token = req.header('x-user-id');
  if (!token) return res.status(401).json({ message: 'Missing user token.' });
  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  const db = await readDb();
  db.wishlists[token] = items;
  await writeDb(db);
  res.json({ items: db.wishlists[token] });
});

app.post('/api/orders', async (req, res) => {
  const token = req.header('x-user-id');
  const orderInput = req.body?.order;
  if (!orderInput || !orderInput.items || !orderInput.items.length) {
    return res.status(400).json({ message: 'Order items are required.' });
  }
  const db = await readDb();
  const order = {
    id: nanoid(),
    userId: token || null,
    ...orderInput,
    createdAt: new Date().toISOString(),
    status: 'confirmed'
  };
  db.orders.push(order);
  if (token) db.carts[token] = [];
  await writeDb(db);
  res.status(201).json({ order });
});

app.get('/api/orders', async (req, res) => {
  const token = req.header('x-user-id');
  if (!token) return res.status(401).json({ message: 'Missing user token.' });
  const db = await readDb();
  const orders = db.orders.filter((o) => o.userId === token).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  res.json({ orders });
});

await ensureDb();
app.listen(PORT, () => {
  console.log(`PawQuest API running on http://localhost:${PORT}`);
});
