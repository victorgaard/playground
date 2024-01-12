import { Props, PropsObj } from "../static/types";

type GenerateProps<T> = {
  defaultProps: T;
  variantProps?: PropsObj;
  examples?: Record<string, T>;
};

export function generateProps<T>({
  defaultProps,
  variantProps,
  examples,
}: GenerateProps<T>): Props<T> {
  return {
    defaultProps,
    variantProps: variantProps || {},
    examples: examples || {},
  };
}
