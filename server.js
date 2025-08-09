// server.js - Minimal Express backend to serve static files and product APIs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // helper to read/write JSON
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// simple products endpoint
app.get('/api/products', async (req, res) => {
  const products = await db.readProducts();
  res.json(products);
});

// search endpoint with optional category filter
app.get('/api/search', async (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const category = (req.query.category || '').toLowerCase();
  const products = await db.readProducts();
  const filtered = products.filter(p => {
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    const matchCat = !category || category === 'all' || p.category.toLowerCase() === category;
    return matchQ && matchCat;
  });
  res.json(filtered);
});

// get product by id
app.get('/api/product/:id', async (req, res) => {
  const products = await db.readProducts();
  const p = products.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

// simple server-side cart persistence (demo)
app.post('/api/cart/save', async (req, res) => {
  // accepts { id: optional, items: [...] } returns saved cart id
  const payload = req.body;
  const dbData = await db.readDB();
  const cartId = payload.id || uuidv4();
  dbData.carts = dbData.carts || {};
  dbData.carts[cartId] = { items: payload.items || [], updated: Date.now() };
  await db.writeDB(dbData);
  res.json({ id: cartId });
});

app.get('/api/cart/:id', async (req, res) => {
  const dbData = await db.readDB();
  const cart = (dbData.carts && dbData.carts[req.params.id]) || { items: [] };
  res.json(cart);
});

// fallback single page friendly
app.get('*', (req, res) => {
  // serve index.html for any unknown route — static files are in /public
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
