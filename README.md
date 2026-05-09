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

## 開発

```bash
# Run in root directory

# 
bun --filter '*' dev


# Next.jsサーバー起動
bun run --filter web dev

# Honoサーバー起動
bun run --filter api dev
```

## PostgreSQL（Docker）

```bash
# docker exec -it <container_name> psql -U <POSTGRES_USER> -d <POSTGRES_DB>

docker exec -it ec-demo-app psql -U postgres -d demodb
```

## Prisma 

### 構成

```bash
apps/api/
├── prisma/
│   ├── generated/
│   │   └── prisma/
│   │       └── client/        # bunx prisma generate で生成
│   ├── migrations/             # マイグレーションファイル（自動生成）
│   │   └── 20250506xxxxxx_init/
│   │       └── migration.sql
│   ├── schema.prisma           # モデル定義
│   └── seed.ts                 # シードデータ
├── src/
│   └── lib/
│       └── prisma.ts           # Prismaクライアントの初期化
└── prisma.config.ts            # Prisma設定ファイル
```

- `prisma/generated/prisma/client/` … `bunx prisma generate` で自動生成。スキーマ変更のたびに再生成が必要。gitignore推奨
- `prisma/migrations/` … `bunx prisma migrate dev` で自動生成。マイグレーションのたびにファイルが追加される
- `prisma/schema.prisma` … `bunx prisma init` で自動生成。モデル定義は自分で編集する
- `prisma/seed.ts` … 自分で作成。`bunx prisma db seed` で実行
- `src/lib/prisma.ts` … 自分で作成。Prismaクライアントの初期化
- `prisma.config.ts` … `bunx prisma init` で自動生成。必要に応じて自分で編集

### コマンド

```bash
# schema.prisma を変更したら毎回セットで実行
# マイグレーション実行
bunx prisma migrate dev --name <migration_name>
bunx prisma generate

# シードデータの投入
bunx prisma db seed

# Prisma Studio（GUIでDBを確認・編集）
bunx prisma studio
```


