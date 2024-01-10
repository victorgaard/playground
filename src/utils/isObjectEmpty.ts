import { PropsObj } from "./types";

export function isObjectEmpty(obj: PropsObj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
