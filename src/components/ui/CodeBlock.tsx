import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "@/assets/code.css";

export function CodeBlock({
  children,
  className,
}: React.PropsWithChildren & React.HTMLAttributes<HTMLPreElement>) {
  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  return (
    <pre className="text-xs">
      <code className={className}>{children}</code>
    </pre>
  );
}
