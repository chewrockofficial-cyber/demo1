# chewrock

> Web + Node.js(Express) + lowdb 로 구성한 미니 풀스택 보일러플레이트

## 구조

```
chewrock/
├── client/
│   └── index.html        ← 프론트엔드 (정적 파일)
└── server/
    ├── index.js          ← Express 서버 (ES Module)
    ├── package.json
    └── data/
        └── db.json       ← lowdb JSON 저장소 (자동 생성)
```

## 실행

```bash
cd server
npm install
npm run dev      # node --watch 로 파일 변경 시 자동 재시작
```

브라우저에서 http://localhost:3000 접속

## API

| Method | Path           | 설명                  |
|--------|----------------|-----------------------|
| GET    | /api/hello     | "Hello, chewrock!" 반환 |
| GET    | /api/messages  | 저장된 메시지 목록     |
| POST   | /api/messages  | 메시지 저장 `{ text }` |

## 다음 단계

- [ ] 사용자 인증 추가 (JWT)
- [ ] lowdb → SQLite(better-sqlite3) 또는 PostgreSQL 마이그레이션
- [ ] FlutterFlow WebView 연동
