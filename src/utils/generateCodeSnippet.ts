import { ReactNode } from "react";

export function generateCodeSnippet(props: Record<string, ReactNode>) {
  if (props.children) {
    return `
  <Button className="coe">
    ${props.children}
  </Button>
          `;
  }
  return `<Button />`;
}
