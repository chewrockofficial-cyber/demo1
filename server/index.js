<<<<<<< HEAD
import express from 'express'
import cors from 'cors'
//import Database from 'better-sqlite3'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Express 설정 ───────────────────────────────────────────────
const app  = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.static(join(__dirname, '../../client')))

// ── 라우트 ────────────────────────────────────────────────────

// GET /api/hello  → 기본 인사
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, chewrock! 🎉' })
})

// GET /api/messages  → 저장된 메시지 전체 조회
app.get('/api/messages', (req, res) => {
  const rows = 'hello, ';
  res.json(rows)
})

// POST /api/messages  → 메시지 저장
app.post('/api/messages', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'text 필드가 필요합니다.' })

  const info   = 'info';//stmts.insertMessage.run({ text })
  const newMsg = 'asdf';//stmts.getMessage.get(info.lastInsertRowid)

  res.status(201).json(newMsg)
})

// ── 서버 시작 ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Server running → http://localhost:${PORT}`)
})
=======
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
app.use(express.static(path.join(__dirname, '../../client')));

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
>>>>>>> 3f3fb4da540d81b7583ab736e8fe34cd2788ac5e
