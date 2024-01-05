import { ReactNode } from "react";

type GenerateCodeSnippetProps = {
  componentName: string;
  props: Record<string, ReactNode>;
};

export function generateCodeSnippet({
  componentName,
  props,
}: GenerateCodeSnippetProps) {
  if (props.children) {
    return `<${componentName} className="coe">
  ${props.children}
</${componentName}>`;
  }
  return `<${componentName} />`;
}
