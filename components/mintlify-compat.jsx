import { Callout, Cards, Tabs as NextraTabs } from 'nextra/components'
import Link from 'next/link'

// ---------- Callouts (Note / Tip / Warning / Info) ----------
export const Note = ({ children, ...props }) => (
  <Callout type="info" {...props}>{children}</Callout>
)
export const Tip = ({ children, ...props }) => (
  <Callout type="info" emoji="💡" {...props}>{children}</Callout>
)
// Mintlify also has <Tips> (plural) — alias to <Tip>
export const Tips = Tip
export const Warning = ({ children, ...props }) => (
  <Callout type="warning" {...props}>{children}</Callout>
)
export const Info = ({ children, ...props }) => (
  <Callout type="info" {...props}>{children}</Callout>
)

// ---------- Card / CardGroup ----------
export function Card({ title, icon, href, children, ...rest }) {
  const inner = (
    <div className="x:rounded-lg x:border x:border-gray-200 x:dark:border-neutral-800 x:p-4 x:hover:border-primary-500 x:transition-colors">
      {icon && <div className="x:text-2xl x:mb-2">{icon}</div>}
      {title && <div className="x:font-semibold x:mb-1">{title}</div>}
      {children && <div className="x:text-sm x:text-gray-600 x:dark:text-gray-400">{children}</div>}
    </div>
  )
  if (href) {
    if (href.startsWith('http')) {
      return <a href={href} target="_blank" rel="noreferrer" className="x:no-underline">{inner}</a>
    }
    return <Link href={href} className="x:no-underline">{inner}</Link>
  }
  return inner
}

// Mintlify also exposes <Columns> as an alias for CardGroup
export function Columns(props) {
  return <CardGroup {...props} />
}

export function CardGroup({ cols = 2, children }) {
  const cls = {
    1: 'x:grid-cols-1',
    2: 'x:grid-cols-1 x:md:grid-cols-2',
    3: 'x:grid-cols-1 x:md:grid-cols-3',
    4: 'x:grid-cols-1 x:md:grid-cols-4',
  }[cols] || 'x:grid-cols-1 x:md:grid-cols-2'
  return <div className={`x:grid x:gap-4 x:my-4 ${cls}`}>{children}</div>
}

// ---------- Tabs / Tab (Mintlify <Tabs><Tab title="X">) ----------
// Translate to Nextra <Tabs items={...}>
export function Tabs({ children }) {
  const arr = Array.isArray(children) ? children : [children]
  const items = arr.filter(Boolean).map((c) => c?.props?.title ?? 'Tab')
  return (
    <NextraTabs items={items}>
      {arr.filter(Boolean).map((c, i) => (
        <NextraTabs.Tab key={i}>{c.props.children}</NextraTabs.Tab>
      ))}
    </NextraTabs>
  )
}
export function Tab({ children }) {
  return <>{children}</>
}

// ---------- CodeGroup (multi-language code blocks) ----------
// Children should be <pre><code class="language-xxx">...</code></pre> blocks.
// We extract a label from the code element's metastring (first word) or fall back.
export function CodeGroup({ children }) {
  const arr = Array.isArray(children) ? children : [children]
  const items = arr.filter(Boolean).map((child, i) => {
    const codeProps = child?.props?.children?.props || {}
    const className = codeProps.className || ''
    const lang = (className.match(/language-(\w+)/) || [])[1]
    const meta = codeProps.metastring || ''
    const label = meta.trim().split(/\s+/)[0] || lang || `Tab ${i + 1}`
    return label
  })
  return (
    <NextraTabs items={items}>
      {arr.filter(Boolean).map((child, i) => (
        <NextraTabs.Tab key={i}>{child}</NextraTabs.Tab>
      ))}
    </NextraTabs>
  )
}

// ---------- Accordion / AccordionGroup ----------
export function Accordion({ title, children, defaultOpen = false }) {
  return (
    <details
      open={defaultOpen}
      className="x:my-2 x:rounded-md x:border x:border-gray-200 x:dark:border-neutral-800 x:p-3"
    >
      <summary className="x:cursor-pointer x:font-medium">{title}</summary>
      <div className="x:mt-2">{children}</div>
    </details>
  )
}
export function AccordionGroup({ children }) {
  return <div className="x:my-4">{children}</div>
}

// ---------- Steps / Step ----------
export function Steps({ children }) {
  return <ol className="x:list-decimal x:pl-6 x:space-y-3 x:my-4">{children}</ol>
}
export function Step({ title, children }) {
  return (
    <li>
      {title && <div className="x:font-semibold">{title}</div>}
      <div>{children}</div>
    </li>
  )
}

// ---------- ResponseField (Mintlify API parameter row) ----------
export function ResponseField({ name, type, required, default: defaultValue, children }) {
  return (
    <div className="x:my-3 x:rounded-md x:border x:border-gray-200 x:dark:border-neutral-800 x:p-3">
      <div className="x:flex x:flex-wrap x:gap-2 x:items-baseline x:mb-1">
        {name && <code className="x:font-mono x:font-semibold">{name}</code>}
        {type && <span className="x:text-xs x:text-gray-500">{type}</span>}
        {required && <span className="x:text-xs x:text-red-500">required</span>}
        {defaultValue !== undefined && <span className="x:text-xs x:text-gray-500">default: <code>{String(defaultValue)}</code></span>}
      </div>
      <div className="x:text-sm">{children}</div>
    </div>
  )
}

// Mintlify also has <ParamField> as a synonym
export const ParamField = ResponseField

// ---------- Update (changelog entry) ----------
export function Update({ label, description, children }) {
  return (
    <div className="x:my-4 x:border-l-2 x:border-primary-500 x:pl-4">
      {label && <div className="x:font-semibold x:text-primary-600 x:dark:text-primary-400">{label}</div>}
      {description && <div className="x:text-sm x:text-gray-500 x:mb-2">{description}</div>}
      <div>{children}</div>
    </div>
  )
}

// ---------- Frame (image wrapper) ----------
export function Frame({ children, caption }) {
  return (
    <figure className="x:my-4">
      {children}
      {caption && <figcaption className="x:text-center x:text-sm x:text-gray-500">{caption}</figcaption>}
    </figure>
  )
}
