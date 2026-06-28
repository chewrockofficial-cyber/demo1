const Database = require('better-sqlite3');
const path = require('path');

// DB 파일은 server/ 폴더 안에 저장
const DB_PATH = path.join(__dirname, 'data.db');

const db = new Database(DB_PATH);

// ─── Schema 초기화 ────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
  );
`);

// 초기 데이터 (없을 때만 삽입)
const exists = db.prepare(`SELECT COUNT(*) as cnt FROM messages`).get();
if (exists.cnt === 0) {
  db.prepare(`INSERT INTO messages (text) VALUES (?)`).run('hello, chewrock');
}

// ─── Query helpers ────────────────────────────────────────────────────────────
module.exports = {
  getHello() {
    const row = db.prepare(`SELECT text FROM messages ORDER BY id LIMIT 1`).get();
    return row ? row.text : 'hello, chewrock';
  },

  getAllMessages() {
    return db.prepare(`SELECT * FROM messages ORDER BY id`).all();
  },

  addMessage(text) {
    const info = db.prepare(`INSERT INTO messages (text) VALUES (?)`).run(text);
    return db.prepare(`SELECT * FROM messages WHERE id = ?`).get(info.lastInsertRowid);
  },
};
