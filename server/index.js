const express = require('express');
const cors = require('cors');
const path = require('path');
//const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Static files (client)
app.use(express.static(path.join(__dirname, '../client')));

// ─── Routes ──────────────────────────────────────────────────────────────────

// Health check
app.get('/api/hello', (req, res) => {
  const message = 'hello, yejin'; //db.getHello();
  res.json({ message });
});

// 루트: index.html 서빙
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Chewrock server running at http://localhost:${PORT}`);
});
