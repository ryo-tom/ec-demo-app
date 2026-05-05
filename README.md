# ec-demo-app

Hono + Next.jsの学習用、ECサイトデモアプリ。

## 技術スタック

### Frontend
- Next.js（App Router / SSR）
- TypeScript
- Tailwind CSS（スタイリング）
- shadcn/ui（UIコンポーネント）

### Backend
- Hono（APIサーバ）
- Prisma（ORM）
- PostgreSQL（DB）

### Runtime
- Node.js（Next.js実行環境）
- Bun（Hono実行環境）

### Infrastructure

開発環境:
- Docker
- Docker Compose

## ディレクトリ構成

```
/
├── apps/
│   ├── web/          # Next.js（ECサイト + 管理画面）
│   └── api/          # Hono（REST API）
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```
