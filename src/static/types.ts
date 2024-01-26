import { FunctionComponent, ReactNode } from "react";

export type InputType = string | boolean | ReactNode | string[];

export type PropsObj = Record<string, InputType>;

export type Props<T> = {
  Component: FunctionComponent<T>;
  config: {
    defaultProps: T;
    variantProps: PropsObj;
    examples: Record<string, T>;
  };
};

export type ImportedProps<T> = {
  props: Props<T>;
};

export type ComponentFound = [string, ImportedProps<PropsObj>];