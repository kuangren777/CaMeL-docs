// 站点端点配置 — 唯一可信源 (Single Source of Truth)
//
// 修改这里的 URL 后，所有 MDX 文档 / 组件中通过 {{API_BASE}} / {{CONSOLE_BASE}}
// 等占位符引用的端点都会在构建时一并替换。无需逐文件改。
//
// 用法（在任何 .mdx 文件里）：
//   curl @@API_BASE@@/v1/chat/completions
//   API Key 在 [@@CONSOLE_BASE@@/token](@@CONSOLE_BASE@@/token) 获取
//
// 注意：占位符必须用 @@KEY@@。
// （不要用 {{KEY}}：MDX 会当 JS 表达式；不要用 <<KEY>>：MDX 会当 JSX 标签。）
//
// 也可用环境变量覆盖（在 docker run / deployment 里设置）：
//   CAMEL_API_BASE=https://other.example.com
//   CAMEL_CONSOLE_BASE=https://console.example.com

const endpoints = {
  // OpenAI / Anthropic 兼容 API 接入域名
  API_BASE: process.env.CAMEL_API_BASE || 'https://api.kr777.top',

  // 控制台、Key 管理、模型广场、充值等 Web 后台
  CONSOLE_BASE: process.env.CAMEL_CONSOLE_BASE || 'https://camel.kr777.top',
}

module.exports = endpoints
