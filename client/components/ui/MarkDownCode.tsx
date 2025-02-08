"use client"
import {useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy , ClipboardPaste} from 'lucide-react';
import { useTheme } from "next-themes";

interface CodeProps {
  children: string;
  language: string;
}

const Code = ({ children, language }: CodeProps) => {
  const [copied, setCopied] = useState(false);
    const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [copied])

  return (
    <div className="relative rounded-lg overflow-hidden">
      <CopyToClipboard text={children} onCopy={() => setCopied(true)}>
        <button className='absolute top-[1rem] right-[1rem] z-50'>
          {copied ? <ClipboardPaste /> : <Copy />}
        </button>
      </CopyToClipboard>
      <SyntaxHighlighter
        language={language}
        style={(theme == "dark") ? materialDark : materialLight}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

export default Code