#!/usr/bin/env node
// 一次性脚本：
//   1) 把所有 MDX 中硬编码的 https://api.kr777.top → {{API_BASE}}
//                              https://camel.kr777.top → {{CONSOLE_BASE}}
//   2) 把所有 <img ...> 标签和 ![alt](url) Markdown 图片，替换为
//      纯文字占位符：> 📷 [图片：alt 文字]（保留 alt 作为说明）
//
// 后续维护：端点变化只需改 config/endpoints.js；新增图片不要写到 MDX，
// 改用文字 + 必要时引用 public/ 下的本地资源。
//
// 执行：node scripts/normalize-mdx.mjs

import { readFile, writeFile, readdir } from 'node:fs/promises'
import path from 'node:path'

async function walkMdx(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...await walkMdx(full))
    else if (entry.isFile() && entry.name.endsWith('.mdx')) out.push(full)
  }
  return out
}

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..')
const CONTENT = path.join(ROOT, 'content')

// --- patterns ---
const API_RE = /https:\/\/api\.kr777\.top/g
const CONSOLE_RE = /https:\/\/camel\.kr777\.top/g

// <img ...> 单标签（自闭合 / 不闭合 / 闭合都接受）
const IMG_HTML_RE = /<img\s+([^>]*?)\/?>(\s*<\/img>)?/gi

// Markdown 图片 ![alt](url "title")
const IMG_MD_RE = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g

function extractAttr(attrString, name) {
  const m = attrString.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i'))
  return m ? m[1] : ''
}

function replaceImg(match, attrs) {
  const alt = extractAttr(attrs, 'alt') || extractAttr(attrs, 'title') || ''
  const cleanAlt = alt.trim() || '示意图'
  return `> 📷 [图片：${cleanAlt}]`
}

function replaceMdImg(match, alt) {
  const cleanAlt = (alt || '').trim() || '示意图'
  return `> 📷 [图片：${cleanAlt}]`
}

async function main() {
  const files = await walkMdx(CONTENT)

  let totalUrls = 0
  let totalImgs = 0
  let touched = 0

  for (const file of files) {
    let src = await readFile(file, 'utf8')
    const original = src

    src = src.replace(API_RE, () => { totalUrls++; return '@@API_BASE@@' })
    src = src.replace(CONSOLE_RE, () => { totalUrls++; return '@@CONSOLE_BASE@@' })
    src = src.replace(IMG_HTML_RE, (m, attrs) => { totalImgs++; return replaceImg(m, attrs) })
    src = src.replace(IMG_MD_RE, (m, alt) => { totalImgs++; return replaceMdImg(m, alt) })

    if (src !== original) {
      await writeFile(file, src)
      touched++
    }
  }

  console.log(`Files touched: ${touched} / ${files.length}`)
  console.log(`URL substitutions: ${totalUrls}`)
  console.log(`Image replacements: ${totalImgs}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
