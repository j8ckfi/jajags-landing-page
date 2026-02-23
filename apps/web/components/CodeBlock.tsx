"use client"

import { useState } from "react"

interface CodeBlockProps {
    children: React.ReactNode
    className?: string
}

export function CodeBlock({ children, className }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)

    const getCodeText = (node: React.ReactNode): string => {
        if (typeof node === 'string') return node
        if (Array.isArray(node)) return node.map(getCodeText).join('')
        if (node && typeof node === 'object' && 'props' in node) {
            const element = node as { props: { children?: React.ReactNode } }
            return getCodeText(element.props.children)
        }
        return ''
    }

    const handleCopy = async () => {
        const text = getCodeText(children)
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative group my-10">
            <pre className={`bg-[#1a1f1a] border border-primary/20 rounded-xl p-6 overflow-x-auto ${className || ''}`}>
                <code className="text-[#d4d8c4] text-[0.95rem] leading-relaxed font-mono">
                    {children}
                </code>
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-primary/20 hover:bg-primary/30 text-primary px-3 py-1.5 rounded-md text-xs font-mono border border-primary/30"
            >
                {copied ? '✓ copied' : '☞ copy'}
            </button>
        </div>
    )
}

