import { ReactNode } from "react";

type GenerateCodeSnippetProps = {
  componentName: string;
  props: Record<string, ReactNode>;
};

export function generateCodeSnippet({
  componentName,
  props,
}: GenerateCodeSnippetProps) {
  let code: string;
  const propsString = Object.keys(props)
    .map((key) => {
      if (key !== "children") return `${key}="${props[key]}"`;
    })
    .join(" ");

  if (props.children) {
    code = `<${componentName}${propsString}>
  ${props.children}
</${componentName}>`;
  } else {
    code = `<${componentName}${propsString} />`;
  }

  return code;
}
