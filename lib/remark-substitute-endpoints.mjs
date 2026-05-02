// remark plugin: 在构建时把 MDX 里的 {{API_BASE}} / {{CONSOLE_BASE}} 等
// 占位符替换成 config/endpoints.js 中定义的实际 URL。
//
// 覆盖位置：正文文本、内联代码、代码块、链接 URL、链接 title、图片 URL。
// （注意：JSX 属性里的字符串需要在 MDX 里用 JS 表达式包裹才会被处理；
//  但既然图片已经全部移除，正常情况下用不上。）
//
// 占位符语法：@@KEY@@，KEY 必须在 endpoints 对象里存在。
// （注：不要用 {{KEY}}（MDX 把 {} 当 JS 表达式）或 <<KEY>>（MDX 把 < 当 JSX 标签）。）

import { visit } from 'unist-util-visit'
import endpoints from '../config/endpoints.js'

const PLACEHOLDER = /@@([A-Z][A-Z0-9_]*)@@/g

function substitute(input) {
  if (typeof input !== 'string') return input
  return input.replace(PLACEHOLDER, (match, key) => {
    return endpoints[key] !== undefined ? endpoints[key] : match
  })
}

export default function remarkSubstituteEndpoints() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.value && typeof node.value === 'string') {
        node.value = substitute(node.value)
      }
      if (node.url && typeof node.url === 'string') {
        node.url = substitute(node.url)
      }
      if (node.title && typeof node.title === 'string') {
        node.title = substitute(node.title)
      }
    })
  }
}
