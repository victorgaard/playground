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
    ? `>${props.children}</${component}>`
    : " />";

  const code = `<${component} ${propsString}${closingTag}`;

  return code;
}
