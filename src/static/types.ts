import { ReactNode } from "react";

export type InputType = string | boolean | ReactNode | string[];

export type PropsObj = Record<string, InputType>;

export type Props<T> = {
  defaultProps: T;
  variantProps: PropsObj;
  examples: Record<string, T>;
};
