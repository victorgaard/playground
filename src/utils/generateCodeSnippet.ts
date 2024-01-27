import reactElementToJSXString from "react-element-to-jsx-string";
import { PropsObj } from "@/static/types";
import { isValidElement } from "react";

type GenerateCodeSnippetProps = {
  component: string;
  props: PropsObj;
};

function handleChildren(children: React.ReactNode | string) {
  if (typeof children === "string") return children;

  return reactElementToJSXString(children, {
    showDefaultProps: false,
    useBooleanShorthandSyntax: false,
  })
    .replace(/<\/?>/g, "")
    .replace(/>\s+</g, "><")
    .trim();
}

export function generateCodeSnippet({
  component,
  props,
}: GenerateCodeSnippetProps) {
  const propsString = Object.entries(props)
    .map(([key, value]) => {
      if (key === "children" || !value) return null;

      if (value === true) return `${key}`;

      if (typeof value === "string") return `${key}="${value}"`;

      if (typeof value === "object" && isValidElement(value))
        return `${key}={${handleChildren(value)}}`;

      if (typeof value === "object" && Object.entries(value).length > 0)
        return `${key}={${key}}`;

      return `${key}={${value}}`;
    })
    .filter(Boolean)
    .join(" ");

  const closingTag = props.children
    ? `>${handleChildren(props.children)}</${component}>`
    : " />";

  const code = `<${component} ${propsString}${closingTag}`;

  return code;
}
