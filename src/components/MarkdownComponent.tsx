//! File: src/components/MarkdownComponent/tsx

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import type { Components } from "react-markdown";

const MarkdownComponents: Components = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={oneDark}
        language={match[1]}
        PreTag="div"
        className="rounded-md my-4"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code
        className="bg-theme-accent/10 text-theme-accent px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    );
  },
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-theme-text mb-6 mt-8 font-playfair">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold text-theme-text mb-4 mt-6 font-playfair">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-theme-text mb-3 mt-5 font-playfair">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-theme-text leading-relaxed mb-4">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-theme-accent hover:text-theme-highlight underline decoration-theme-accent/30 hover:decoration-theme-highlight transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-theme-accent bg-theme-accent/5 pl-4 py-2 my-4 italic text-theme-text">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 text-theme-text space-y-1">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 text-theme-text space-y-1">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-theme-text leading-relaxed">{children}</li>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border border-theme-border rounded-lg">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-theme-secondary-bg">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 text-left font-semibold text-theme-text border-b border-theme-border">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 text-theme-text border-b border-theme-border">
      {children}
    </td>
  ),
  img: ({ src, alt }) => (
    <div className="my-6">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt || ""}
        width={800}
        height={400}
        className="rounded-lg mx-auto"
      />
    </div>
  ),
};

export default MarkdownComponents;
