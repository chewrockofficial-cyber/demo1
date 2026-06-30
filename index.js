import express from 'express'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import Database from 'better-sqlite3'
import authRouter from './routes/auth.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 3000

const db = new Database(join(__dirname, 'db.sqlite'))

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    email       TEXT    UNIQUE NOT NULL,
    password    TEXT    NOT NULL,
    nickname    TEXT    NOT NULL,
    profile_img TEXT,
    created_at  TEXT    NOT NULL
  );
  CREATE TABLE IF NOT EXISTS records (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL,
    gym_name    TEXT    NOT NULL,
    route_name  TEXT,
    color       TEXT,
    grade       TEXT,
    result      TEXT    NOT NULL,
    memo        TEXT,
    photo_url   TEXT,
    climbed_at  TEXT    NOT NULL,
    created_at  TEXT    NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`)

app.use(express.json())
app.use(express.static(join(__dirname, 'public')))
app.locals.db = db

app.use('/api/auth', authRouter)

app.get('/api/hello', (req, res) => {
  res.json({ message: 'hello, chewrock' })
})

app.listen(PORT, () => {
  console.log(`✅  Server running → http://localhost:${PORT}`)
})
