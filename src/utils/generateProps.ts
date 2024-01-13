import { FunctionComponent } from "react";
import { Props, PropsObj } from "../static/types";

type GenerateProps<T> = {
  Component: FunctionComponent<T>;
  defaultProps: T;
  variantProps?: PropsObj;
  examples?: Record<string, T>;
};

export function generateProps<T>({
  Component,
  defaultProps,
  variantProps,
  examples,
}: GenerateProps<T>): Props<T> {
  return {
    Component,
    config: {
      defaultProps,
      variantProps: variantProps || {},
      examples: examples || {},
    },
  };
}
