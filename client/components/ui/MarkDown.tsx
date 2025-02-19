import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";
import { CodeBlock } from "@/components/ui/code-block";
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you
import remarkGfm from 'remark-gfm'

export default function MarkDown({data} : {data : string}) {
    return (
        <ReactMarkdown className="text-sm" rehypePlugins={[rehypeRaw, rehypeKatex]} remarkPlugins={[remarkMath, remarkGfm]}
            components={{
                code(props) {
                    const { children, className } = props
                    const match = /language-(\w+)/.exec(className || '')
                    return match && (
                        <CodeBlock
                            language={match[1]}
                            code={String(children).replace(/\n$/, '')}
                            filename={""}
                            className="drop-shadow-lg bg-background"
                        />
                    )
                }
            }}>
            {data}
        </ReactMarkdown>
    )
}
