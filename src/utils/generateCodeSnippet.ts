import { ReactNode } from "react";

type GenerateCodeSnippetProps = {
  component: string;
  props: Record<string, ReactNode>;
};

export function generateCodeSnippet({
  component,
  props,
}: GenerateCodeSnippetProps) {
  const propsString = Object.entries(props)
    .map(([key, value]) => {
      if (key === "children" || !value) return null;
      if (value === true) return `${key}`;
      if (typeof value === "string") return `${key}="${value}"`;
      return `${key}={${value}}`;
    })
    .filter(Boolean)
    .join(" ");

  const closingTag = props.children
    ? `>${props.children}</${component}>`
    : " />";

  const code = `<${component} ${propsString}${closingTag}`;

  return code;
}
