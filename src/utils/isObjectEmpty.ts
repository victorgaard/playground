import { ReactNode } from "react";

export function isObjectEmpty(obj: Record<string, ReactNode>) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
