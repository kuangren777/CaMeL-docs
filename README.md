# CaMeL AI 文档

Nextra v4 + Next.js 15（App Router）驱动的 [CaMeL AI](https://camel.kr777.top) 文档站。

## 本地开发

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## 构建与生产运行

```bash
pnpm build
pnpm start        # http://localhost:3000
```

## Docker 部署

```bash
docker compose up -d --build
# 访问 http://localhost:3000
```

或手动：

```bash
docker build -t camel-docs .
docker run -d -p 3000:3000 --name camel-docs camel-docs
```

镜像采用 multi-stage + Next.js `output: 'standalone'`，最终运行时镜像约 200MB。

## 目录结构

```
.
├── app/                        # Next.js App Router (layout + catch-all MDX route)
│   ├── layout.jsx
│   ├── globals.css
│   └── [[...mdxPath]]/page.jsx
├── content/                    # MDX 文档内容（按 URL 路径组织）
│   ├── _meta.js
│   ├── index.mdx
│   ├── quick-start.mdx
│   ├── clients/
│   ├── api/
│   ├── FAQs/
│   ├── blogs/
│   ├── update/
│   └── terms-and-privacy/
├── components/
│   └── mintlify-compat.jsx     # Mintlify 组件兼容层 (Card / Tabs / Callout / ...)
├── mdx-components.js           # 全局 MDX 组件注册
├── public/                     # 静态资源 (favicon / logo / images)
├── next.config.mjs
├── Dockerfile
├── docker-compose.yml
└── legacy/                     # 旧 Mintlify 站完整保留（仅供参考）
```

## 写作约定

- 每个 MDX 必须有 frontmatter（`title` / `description`）。
- 内部链接用根相对路径，去掉 `.mdx` 后缀（例：`/api/Claude-Code`）。
- 调整侧边栏顺序/标题：编辑对应目录下的 `_meta.js`。
- Mintlify 专有组件（`<Card>` `<Tabs>` `<Accordion>` `<CodeGroup>` `<Note>` 等）通过 `components/mintlify-compat.jsx` 兼容渲染，**直接复制旧 MDX 即可**。

## 端点配置（重要）

所有 API / 控制台 URL 都集中在 [`config/endpoints.js`](./config/endpoints.js)：

```js
{
  API_BASE:     process.env.CAMEL_API_BASE     || 'https://api.kr777.top',
  CONSOLE_BASE: process.env.CAMEL_CONSOLE_BASE || 'https://camel.kr777.top',
}
```

文档里**不要**直写 URL，统一用占位符：

```mdx
curl @@API_BASE@@/v1/chat/completions
[获取 Key](@@CONSOLE_BASE@@/token)
```

构建时由 [`lib/remark-substitute-endpoints.mjs`](./lib/remark-substitute-endpoints.mjs) 自动替换。修改端点只需要改这一个文件，或运行容器时设环境变量：

```bash
docker run -e CAMEL_API_BASE=https://other.example.com \
           -e CAMEL_CONSOLE_BASE=https://console.example.com \
           -p 3000:3000 camel-docs
```

> 占位符必须用 `@@KEY@@`，不要用 `{{KEY}}`（MDX 会解析成 JS）或 `<<KEY>>`（MDX 会解析成 JSX 标签）。

## 图片策略

文档**不内嵌图片**——所有原 Mintlify CDN 图片已替换为 `> 📷 [图片：xxx]` 文字占位符。如确需图片，请放到 `public/` 下用相对路径引用，避免依赖外部 CDN。

## 主题与品牌

- 主色：`#16A34A`（绿色，沿用旧站）
- 主题配置：`app/layout.jsx`
- Logo：`public/logo/{light,dark}.svg`

## 旧 Mintlify 站

旧的 Mintlify 全站完整保留在 [`legacy/`](./legacy)，包括 `docs.json` 与所有原始 MDX，仅供对照与回退。
