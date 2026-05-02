'use client'
import { useState } from 'react'

export function CopyButton({ value, children = '点击复制' }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      style={{
        padding: '8px 16px',
        background: '#16A34A',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
      }}
    >
      {copied ? '已复制！' : children}
    </button>
  )
}
