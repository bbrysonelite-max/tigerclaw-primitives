import { useState } from "react";

interface CopyCodeButtonProps {
  code: string;
}

export function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      {/* Toggle button */}
      <button
        onClick={() => setShowCode(!showCode)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-tc-border bg-tc-card-bg text-tc-text-faint text-xs font-mono transition-all duration-200 hover:border-[#E8722A] hover:text-[#E8722A] hover:shadow-[0_0_8px_rgba(232,114,42,0.2)] active:scale-95"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        {showCode ? "Hide Code" : "View Code"}
      </button>

      {/* Code panel */}
      {showCode && (
        <div className="mt-3 rounded-xl border border-tc-border bg-[#0d0d0d] overflow-hidden" style={{ animation: 'scaleIn 200ms cubic-bezier(0.23,1,0.32,1)' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-tc-border bg-[#111]">
            <span className="text-[10px] font-mono text-tc-text-faint uppercase tracking-wider">JSX / Tailwind</span>
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-200 ${
                copied
                  ? "bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30"
                  : "border border-tc-border text-tc-text-faint hover:border-[#E8722A] hover:text-[#E8722A]"
              }`}
            >
              {copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Copied
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                  Copy
                </>
              )}
            </button>
          </div>
          {/* Code content */}
          <pre className="p-4 overflow-x-auto max-h-[320px] overflow-y-auto text-xs leading-relaxed">
            <code className="text-tc-text-muted font-mono whitespace-pre">{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
