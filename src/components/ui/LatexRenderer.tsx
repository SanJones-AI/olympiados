import React from 'react';
import katex from 'katex';

interface LatexRendererProps {
  content: string;
  className?: string;
  inline?: boolean;
}

export const LatexRenderer: React.FC<LatexRendererProps> = ({ content, className = '', inline = false }) => {
  if (!content) return null;

  // Helper to render LaTeX math safely with fallback
  const renderMath = (math: string, isDisplayMode: boolean) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: isDisplayMode,
        throwOnError: false,
      });
    } catch {
      return `<span class="text-rose-400 font-mono">${math}</span>`;
    }
  };

  // Process text into segments of plaintext and math
  const renderFormattedContent = (text: string) => {
    // Replace display math $$ ... $$
    const displayParts = text.split(/\$\$(.*?)\$\$/gs);
    const elements: React.ReactNode[] = [];

    displayParts.forEach((part, index) => {
      // Even index: regular text (may contain inline math $ ... $)
      if (index % 2 === 0) {
        // Split by inline math $ ... $
        const inlineParts = part.split(/\$(.*?)\$/g);
        inlineParts.forEach((subPart, subIndex) => {
          if (subIndex % 2 === 0) {
            // Pure text: format newlines into paragraphs or linebreaks
            if (subPart) {
              const lines = subPart.split('\n');
              lines.forEach((line, lineIdx) => {
                elements.push(<span key={`text-${index}-${subIndex}-${lineIdx}`}>{line}</span>);
                if (lineIdx < lines.length - 1) {
                  elements.push(<br key={`br-${index}-${subIndex}-${lineIdx}`} />);
                }
              });
            }
          } else {
            // Inline math
            const html = renderMath(subPart, false);
            elements.push(
              <span
                key={`inline-${index}-${subIndex}`}
                className="inline-math inline-block mx-0.5 align-baseline"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }
        });
      } else {
        // Display math
        const html = renderMath(part, true);
        elements.push(
          <div
            key={`display-${index}`}
            className="my-3 py-2 px-3 bg-zinc-900/60 border border-zinc-800/80 rounded-md overflow-x-auto text-center font-serif text-emerald-300"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
    });

    return elements;
  };

  if (inline) {
    const html = renderMath(content, false);
    return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return (
    <div className={`prose prose-invert max-w-none text-zinc-200 leading-relaxed font-sans text-sm md:text-base ${className}`}>
      {renderFormattedContent(content)}
    </div>
  );
};
