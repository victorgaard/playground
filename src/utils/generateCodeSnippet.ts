import { ReactNode } from "react";

type GenerateCodeSnippetProps = {
  componentName: string;
  props: Record<string, ReactNode>;
};

export function generateCodeSnippet({
  componentName,
  props,
}: GenerateCodeSnippetProps) {
  const propsString = Object.entries(props)
    .map(([key, value]) => {
      if (key !== "children") {
        if (typeof value === "string") {
          return `${key}="${value}"`;
        } else if (value === true) {
          return `${key}`;
        } else if (!value) {
          return null;
        } else {
          return `${key}={${value}}`;
        }
      }
      return null;
    })
    .filter(Boolean)
    .join(" ");

  const closingTag = props.children
    ? `>${props.children}</${componentName}>`
    : " />";

  const code = `<${componentName} ${propsString}${closingTag}`;

  return code;
}
