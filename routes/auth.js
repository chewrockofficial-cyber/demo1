import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'chewrock-secret-key'

router.post('/register', async (req, res) => {
  const { email, password, nickname } = req.body
  if (!email || !password || !nickname)
    return res.status(400).json({ error: '입력값이 부족해요.' })
  const db = req.app.locals.db
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
  if (existing) return res.status(409).json({ error: '이미 사용 중인 이메일이에요.' })
  const hashed = await bcrypt.hash(password, 10)
  const now = new Date().toISOString()
  const result = db.prepare('INSERT INTO users (email, password, nickname, created_at) VALUES (?, ?, ?, ?)').run(email, hashed, nickname, now)
  const token = jwt.sign({ userId: result.lastInsertRowid }, JWT_SECRET, { expiresIn: '30d' })
  res.status(201).json({ token, user: { id: result.lastInsertRowid, email, nickname } })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ error: '이메일과 비밀번호를 입력해주세요.' })
  const db = req.app.locals.db
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  if (!user) return res.status(401).json({ error: '이메일 또는 비밀번호가 올바르지 않아요.' })
  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ error: '이메일 또는 비밀번호가 올바르지 않아요.' })
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30d' })
  res.json({ token, user: { id: user.id, email: user.email, nickname: user.nickname } })
})

router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: '로그인이 필요해요.' })
  try {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET)
    const db = req.app.locals.db
    const user = db.prepare('SELECT id, email, nickname, created_at FROM users WHERE id = ?').get(decoded.userId)
    res.json({ user })
  } catch {
    res.status(401).json({ error: '토큰이 유효하지 않아요.' })
  }
})

export default router