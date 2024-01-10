import { ReactNode } from "react";

export type InputTypes = string | boolean | ReactNode;

export type Props<T> = {
  defaultProps: T;
  multipleProps: Record<string, InputTypes>;
  examples: Record<string, T>;
};
